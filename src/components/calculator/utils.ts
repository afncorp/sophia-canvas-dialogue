import { CONVENTIONAL_MI_RATES, VA_FUNDING_FEE_RATE, LoanType } from './types';

export function formatCurrencyWhole(n: number): string {
  if (!isFinite(n)) n = 0;
  return Math.round(n).toLocaleString('en-US');
}

export function formatCurrency(n: number): string {
  if (!isFinite(n)) n = 0;
  return n.toLocaleString('en-US', { 
    style: 'currency', 
    currency: 'USD', 
    maximumFractionDigits: 0 
  });
}

export function parseCurrency(str: string): number {
  const cleaned = (str || '').toString().replace(/[^\d]/g, '');
  return cleaned ? parseInt(cleaned, 10) : 0;
}

export function parsePercent(str: string): number {
  const cleaned = (str || '').toString().replace(/[^\d.]/g, '');
  return cleaned ? parseFloat(cleaned) : 0;
}

export function calcPayment(loan: number, rate: number, term: number): number {
  const r = rate / 1200;
  const n = term * 12;
  if (r === 0) return loan / n;
  return loan * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
}

// Snap percent to 1% steps, but preserve a special 3.5% stop
export function snapPercent(p: number): number {
  if (!isFinite(p)) return 0;
  if (Math.abs(p - 3.5) <= 0.5) return 3.5;
  return Math.round(p);
}

// Get recommended HOI at 0.35% annually
export function getRecommendedInsurance(price: number): number {
  if (!price) return 0;
  const annual = price * 0.0035;
  return Math.round(annual / 50) * 50;
}

// Get LTV tier for conventional MI (round up to next tier)
export function getConventionalMITier(ltv: number): number | null {
  if (ltv <= 80) return null; // No MI required
  if (ltv <= 85) return 85;
  if (ltv <= 90) return 90;
  return 95;
}

// Get term bucket for MI rates
export function getTermBucket(term: number): number {
  if (term <= 15) return 15;
  if (term <= 20) return 20;
  if (term <= 25) return 25;
  return 30;
}

// Calculate mortgage insurance based on loan type
export function calculateMI(
  loanType: LoanType,
  loanAmount: number,
  ltv: number,
  term: number
): number {
  if (loanType === 'va') {
    // VA loans have no monthly MI
    return 0;
  }
  
  if (loanType === 'fha') {
    // FHA MIP rates
    const annualRate = ltv > 95 ? 0.55 : 0.50;
    // Note: For FHA, we calculate on the total loan (including UFMIP)
    return loanAmount * (annualRate / 100) / 12;
  }
  
  if (loanType === 'conv') {
    const tier = getConventionalMITier(ltv);
    if (!tier) return 0;
    
    const termBucket = getTermBucket(term);
    const annualRate = CONVENTIONAL_MI_RATES[tier]?.[termBucket] || 0.0019;
    
    return loanAmount * annualRate / 12;
  }
  
  return 0;
}

// Calculate total loan amount including any upfront fees
export function calculateTotalLoan(
  loanType: LoanType,
  baseLoanAmount: number
): { totalLoan: number; upfrontFee: number } {
  if (loanType === 'va') {
    // VA: Add 2.15% funding fee to loan amount
    const fundingFee = baseLoanAmount * VA_FUNDING_FEE_RATE;
    return {
      totalLoan: baseLoanAmount + fundingFee,
      upfrontFee: fundingFee,
    };
  }
  
  if (loanType === 'fha') {
    // FHA: Add 1.75% UFMIP to loan amount
    const ufmip = baseLoanAmount * 0.0175;
    return {
      totalLoan: baseLoanAmount + ufmip,
      upfrontFee: ufmip,
    };
  }
  
  // Conventional: no upfront fee
  return {
    totalLoan: baseLoanAmount,
    upfrontFee: 0,
  };
}

// Calculate max affordable home price based on income and debt
export function calculateMaxAffordablePrice(
  loanType: LoanType,
  grossMonthlyIncome: number,
  monthlyDebt: number,
  downPercent: number,
  interestRate: number,
  loanTerm: number,
  taxRate: number, // in hundredths, e.g., 120 = 1.20%
  insuranceRate: number, // as decimal, e.g., 0.0035
  hoaMonthly: number
): number {
  // Max DTI by loan type (Conventional: 45%, FHA/VA: 56%)
  const maxDTI = loanType === 'conv' ? 0.45 : 0.56;
  
  // Max total housing payment allowed
  const maxHousingPayment = (grossMonthlyIncome * maxDTI) - monthlyDebt;
  
  if (maxHousingPayment <= 0) return 0;
  
  // Setup for iterative calculation
  const r = interestRate / 1200;
  const n = loanTerm * 12;
  const taxRateMonthly = (taxRate / 10000) / 12;
  const insuranceRateMonthly = insuranceRate / 12;
  const downRatio = downPercent / 100;
  const loanRatio = 1 - downRatio;
  const ltv = loanRatio * 100;
  
  // Binary search for max home price
  let low = 0;
  let high = 10000000;
  
  for (let i = 0; i < 50; i++) {
    const mid = (low + high) / 2;
    const baseLoan = mid * loanRatio;
    
    // Calculate total loan with fees
    let totalLoan = baseLoan;
    if (loanType === 'va') {
      totalLoan = baseLoan * (1 + VA_FUNDING_FEE_RATE);
    } else if (loanType === 'fha') {
      totalLoan = baseLoan * 1.0175; // 1.75% UFMIP
    }
    
    // P&I calculation
    let pi: number;
    if (r === 0) {
      pi = totalLoan / n;
    } else {
      pi = totalLoan * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    }
    
    // Other costs
    const taxes = mid * taxRateMonthly;
    const insurance = mid * insuranceRateMonthly;
    
    // MI calculation (for FHA, calculate on total loan including UFMIP)
    const miBase = loanType === 'fha' ? totalLoan : baseLoan;
    const mi = calculateMI(loanType, miBase, ltv, loanTerm);
    
    const totalPayment = pi + taxes + insurance + hoaMonthly + mi;
    
    if (totalPayment <= maxHousingPayment) {
      low = mid;
    } else {
      high = mid;
    }
  }
  
  // Round to nearest $1000
  return Math.floor(low / 1000) * 1000;
}
