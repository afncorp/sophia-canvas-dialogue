export type Purpose = 'purchase' | 'refi';
export type LoanType = 'conv' | 'fha' | 'va';

export interface CalculatorState {
  purpose: Purpose;
  loanType: LoanType;
  homePrice: number;
  downPercent: number;
  interestRate: number;
  loanTerm: number;
  taxRate: number;
  insuranceAnnual: number;
  hoaMonthly: number;
}

export interface PaymentBreakdown {
  principalInterest: number;
  propertyTax: number;
  insurance: number;
  hoa: number;
  mortgageInsurance: number;
  total: number;
}

// Conventional MI rate table (annual rates)
// LTV tiers: 85%, 90%, 95% - round up to next tier
export const CONVENTIONAL_MI_RATES: Record<number, Record<number, number>> = {
  // LTV tier -> Term -> Annual Rate
  85: { 15: 0.0012, 20: 0.0014, 25: 0.0014, 30: 0.0013 },
  90: { 15: 0.0013, 20: 0.0018, 25: 0.0019, 30: 0.0019 },
  95: { 15: 0.0019, 20: 0.0019, 25: 0.0028, 30: 0.0028 },
};

export const VA_FUNDING_FEE_RATE = 0.0215; // 2.15%
