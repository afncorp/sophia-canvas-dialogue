import { useState, useCallback, useMemo, useEffect } from 'react';
import { Purpose, LoanType, PaymentBreakdown } from './types';
import {
  formatCurrencyWhole,
  parseCurrency,
  parsePercent,
  calcPayment,
  snapPercent,
  getRecommendedInsurance,
  calculateMI,
  calculateTotalLoan,
} from './utils';
import { SegmentControl } from './SegmentControl';
import { PaymentBar } from './PaymentBar';
import { RangeSlider } from './RangeSlider';
import { AdvancedSettings } from './AdvancedSettings';

export function MortgageCalculator() {
  // Core state
  const [purpose, setPurpose] = useState<Purpose>('purchase');
  const [loanType, setLoanType] = useState<LoanType>('conv');
  
  // Price and down payment
  const [homePrice, setHomePrice] = useState(500000);
  const [downPercent, setDownPercent] = useState(20);
  
  // Rate and term
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  
  // Advanced settings (taxRate stored as hundredths, e.g., 120 = 1.20%)
  const [taxRate, setTaxRate] = useState(120);
  const [insuranceAnnual, setInsuranceAnnual] = useState(() => getRecommendedInsurance(500000));
  const [hoaMonthly, setHoaMonthly] = useState(0);

  // Input values for editable fields
  const [homePriceInput, setHomePriceInput] = useState(formatCurrencyWhole(500000));
  const [downAmtInput, setDownAmtInput] = useState('');
  const [downPctInput, setDownPctInput] = useState('');
  const [loanAmtInput, setLoanAmtInput] = useState('');
  const [loanPctInput, setLoanPctInput] = useState('');

  // Update insurance when price changes
  useEffect(() => {
    setInsuranceAnnual(getRecommendedInsurance(homePrice));
  }, [homePrice]);

  // Derived values
  const downAmount = useMemo(() => {
    return homePrice * (downPercent / 100);
  }, [homePrice, downPercent]);

  const baseLoanAmount = useMemo(() => {
    return homePrice - downAmount;
  }, [homePrice, downAmount]);

  const loanPercent = useMemo(() => {
    return homePrice > 0 ? (baseLoanAmount / homePrice) * 100 : 0;
  }, [baseLoanAmount, homePrice]);

  const ltv = loanPercent;

  // Calculate total loan with upfront fees
  const { totalLoan } = useMemo(() => {
    return calculateTotalLoan(loanType, baseLoanAmount);
  }, [loanType, baseLoanAmount]);

  // Payment breakdown
  const breakdown: PaymentBreakdown = useMemo(() => {
    const pi = calcPayment(totalLoan, interestRate, loanTerm);
    const taxRateDecimal = taxRate / 10000;
    const taxes = (homePrice * taxRateDecimal) / 12;
    const insurance = insuranceAnnual / 12;
    const hoa = hoaMonthly;
    
    // For FHA, MI is calculated on the total loan (including UFMIP)
    const miBase = loanType === 'fha' ? totalLoan : baseLoanAmount;
    const mi = calculateMI(loanType, miBase, ltv, loanTerm);
    
    const total = pi + taxes + insurance + hoa + mi;

    return {
      principalInterest: pi,
      propertyTax: taxes,
      insurance,
      hoa,
      mortgageInsurance: mi,
      total,
    };
  }, [totalLoan, baseLoanAmount, interestRate, loanTerm, homePrice, taxRate, insuranceAnnual, hoaMonthly, loanType, ltv]);

  // Update display inputs
  useEffect(() => {
    setDownAmtInput(formatCurrencyWhole(downAmount));
    setDownPctInput(downPercent.toFixed(1).replace(/\.0$/, ''));
    setLoanAmtInput(formatCurrencyWhole(baseLoanAmount));
    setLoanPctInput(loanPercent.toFixed(1).replace(/\.0$/, ''));
  }, [downAmount, downPercent, baseLoanAmount, loanPercent]);

  // Handlers
  const handleHomePriceChange = useCallback((value: number) => {
    setHomePrice(value);
    setHomePriceInput(formatCurrencyWhole(value));
  }, []);

  const handleHomePriceInputChange = useCallback((value: string) => {
    setHomePriceInput(value);
  }, []);

  const handleHomePriceInputBlur = useCallback(() => {
    const parsed = parseCurrency(homePriceInput);
    const clamped = Math.max(100000, Math.min(3000000, parsed));
    setHomePrice(clamped);
    setHomePriceInput(formatCurrencyWhole(clamped));
  }, [homePriceInput]);

  const handleDownPercentChange = useCallback((value: number) => {
    const snapped = snapPercent(value);
    setDownPercent(snapped);
  }, []);

  const handleDownAmtInputBlur = useCallback(() => {
    const parsed = parseCurrency(downAmtInput);
    const clamped = Math.max(0, Math.min(homePrice, parsed));
    const pct = homePrice > 0 ? (clamped / homePrice) * 100 : 0;
    setDownPercent(snapPercent(pct));
  }, [downAmtInput, homePrice]);

  const handleDownPctInputBlur = useCallback(() => {
    const parsed = parsePercent(downPctInput);
    const clamped = Math.max(0, Math.min(100, parsed));
    setDownPercent(snapPercent(clamped));
  }, [downPctInput]);

  const handleLoanAmtInputBlur = useCallback(() => {
    const parsed = parseCurrency(loanAmtInput);
    const clamped = Math.max(0, Math.min(homePrice, parsed));
    const downAmt = homePrice - clamped;
    const pct = homePrice > 0 ? (downAmt / homePrice) * 100 : 0;
    setDownPercent(snapPercent(pct));
  }, [loanAmtInput, homePrice]);

  const handleLoanPctInputBlur = useCallback(() => {
    const parsed = parsePercent(loanPctInput);
    const clamped = Math.max(0, Math.min(100, parsed));
    const downPct = 100 - clamped;
    setDownPercent(snapPercent(downPct));
  }, [loanPctInput]);

  const miRequired = ltv > 80;
  const programLabel = `${loanType === 'conv' ? 'Conventional' : loanType.toUpperCase()} · ${purpose === 'refi' ? 'Refinance' : 'Purchase'}`;

  return (
    <div className="calculator-container w-full max-w-[420px] md:max-w-[420px] p-[18px_14px_20px] md:p-[22px_18px_24px]">
      {/* Header */}
      <div className="text-left mb-3.5">
        <div className="text-[13px] uppercase tracking-wide text-muted-foreground mb-1">
          Payment Calculator
        </div>
        <div className="flex justify-between items-start gap-2.5">
          <div className="text-[32px] font-bold text-primary">
            ${formatCurrencyWhole(breakdown.total)}
            <span className="text-sm font-medium text-muted-foreground ml-1">/mo</span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-full text-[11px] mt-2 mr-[-4px]">
            <span className="w-[7px] h-[7px] rounded-full bg-[hsl(var(--color-green))] shadow-[0_0_12px_hsl(var(--color-green)/0.6)]" />
            <span>{programLabel}</span>
          </div>
        </div>
      </div>

      {/* Purpose & Loan Type Segments - same line, full width */}
      <div className="flex gap-2 mb-3 items-center w-full">
        <SegmentControl
          options={[
            { value: 'purchase', label: 'Purch' },
            { value: 'refi', label: 'Refi' },
          ]}
          value={purpose}
          onChange={setPurpose}
          className="flex-1"
        />
        <SegmentControl
          options={[
            { value: 'conv', label: 'Conv' },
            { value: 'fha', label: 'FHA' },
            { value: 'va', label: 'VA' },
          ]}
          value={loanType}
          onChange={setLoanType}
          className="flex-[1.5]"
        />
      </div>

      {/* Payment Breakdown */}
      <PaymentBar breakdown={breakdown} />

      {/* Core Sliders Card */}
      <div className="calculator-card p-3.5 mt-3">
        {/* Home Price / Property Value */}
        <div className="mb-4">
          <div className="text-[13px] font-semibold text-foreground">
            {purpose === 'refi' ? 'Property Value' : 'Home Price'}
          </div>
          <div className="flex justify-start items-baseline gap-1 mb-2">
            <div className="flex items-baseline gap-1 text-xl font-semibold text-primary">
              <span className="text-[0.8em] opacity-90">$</span>
              <input
                type="text"
                className="value-input text-xl font-semibold text-primary"
                value={homePriceInput}
                onChange={(e) => handleHomePriceInputChange(e.target.value)}
                onBlur={handleHomePriceInputBlur}
                style={{ width: `${(homePriceInput.length || 1) + 0.5}ch` }}
              />
            </div>
          </div>
          <RangeSlider
            min={100000}
            max={3000000}
            step={5000}
            value={homePrice}
            onChange={handleHomePriceChange}
          />
        </div>

        {/* Down Payment & Loan Amount */}
        <div className="mb-4">
          <div className="flex gap-3.5 items-start relative">
            {/* Down Payment Column - only show for purchase */}
            {purpose === 'purchase' && (
              <div className="flex-1 min-w-0 pr-3">
                <div className="flex justify-between items-baseline mb-1">
                  <div className="text-[13px] font-semibold text-foreground">Down Payment</div>
                </div>
                <div className="flex items-baseline gap-2 text-xl font-semibold text-primary w-full justify-between">
                  <div className="flex items-baseline gap-1 min-w-0">
                    <span className="text-[0.8em] opacity-90">$</span>
                    <input
                      type="text"
                      className="value-input text-xl font-semibold text-primary"
                      value={downAmtInput}
                      onChange={(e) => setDownAmtInput(e.target.value)}
                      onBlur={handleDownAmtInputBlur}
                      style={{ width: `${(downAmtInput.length || 1) + 0.5}ch` }}
                    />
                  </div>
                  <div className="flex items-baseline gap-0.5 whitespace-nowrap mr-1">
                    <input
                      type="text"
                      className="value-input text-[15px] font-semibold text-primary text-right"
                      value={downPctInput}
                      onChange={(e) => setDownPctInput(e.target.value)}
                      onBlur={handleDownPctInputBlur}
                      style={{ width: '3.2ch' }}
                    />
                    <span className="text-[15px] ml-0.5">%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Vertical divider - only show for purchase */}
            {purpose === 'purchase' && <div className="w-px bg-border self-stretch my-1" />}

            {/* Loan Amount Column */}
            <div className={purpose === 'refi' ? 'flex-1' : 'flex-1 min-w-0 pl-1'}>
              {purpose === 'refi' ? (
                /* Refinance layout: side by side with LTV aligned to right column */
                <div className="flex gap-3.5 items-start relative">
                  {/* Loan Amount side */}
                  <div className="flex-1 pr-3">
                    <div className="text-[13px] font-semibold text-foreground mb-1">Loan Amount</div>
                    <div className="flex items-baseline gap-1 text-xl font-semibold text-primary">
                      <span className="text-[0.8em] opacity-90">$</span>
                      <input
                        type="text"
                        className="value-input text-xl font-semibold text-primary"
                        value={loanAmtInput}
                        onChange={(e) => setLoanAmtInput(e.target.value)}
                        onBlur={handleLoanAmtInputBlur}
                        style={{ width: `${(loanAmtInput.length || 1) + 0.5}ch` }}
                      />
                    </div>
                  </div>
                  {/* Vertical divider for refi - aligned with divider below */}
                  <div className="w-px bg-border self-stretch my-1" />
                  {/* LTV side - aligned with Loan Term */}
                  <div className="flex-1 pl-1">
                    <div className="text-[13px] font-semibold text-foreground mb-1">LTV</div>
                    <div className="text-xl font-semibold text-primary">
                      {ltv.toFixed(1).replace(/\.0$/, '')}%
                    </div>
                  </div>
                </div>
              ) : (
              /* Purchase layout */
                <>
                  <div className="flex justify-between items-baseline mb-1">
                    <div className="text-[13px] font-semibold text-foreground">Loan Amount</div>
                    <span 
                      className="text-[11px] whitespace-nowrap"
                      style={{ color: miRequired ? 'hsl(var(--color-red))' : 'hsl(var(--color-green))' }}
                    >
                      {miRequired ? 'MI req.' : 'No MI'}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 text-xl font-semibold text-primary w-full justify-between">
                    <div className="flex items-baseline gap-1 min-w-0">
                      <span className="text-[0.8em] opacity-90">$</span>
                      <input
                        type="text"
                        className="value-input text-xl font-semibold text-primary"
                        value={loanAmtInput}
                        onChange={(e) => setLoanAmtInput(e.target.value)}
                        onBlur={handleLoanAmtInputBlur}
                        style={{ width: `${(loanAmtInput.length || 1) + 0.5}ch` }}
                      />
                    </div>
                    <div className="flex items-baseline gap-0.5 whitespace-nowrap ml-auto">
                      <input
                        type="text"
                        className="value-input text-[15px] font-semibold text-primary text-right"
                        value={loanPctInput}
                        onChange={(e) => setLoanPctInput(e.target.value)}
                        onBlur={handleLoanPctInputBlur}
                        style={{ width: '3.2ch' }}
                      />
                      <span className="text-[15px] ml-0.5">%</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="mt-2">
            <RangeSlider
              min={0}
              max={100}
              step={0.5}
              value={purpose === 'refi' ? loanPercent : downPercent}
              onChange={(val) => {
                if (purpose === 'refi') {
                  setDownPercent(100 - snapPercent(val));
                } else {
                  handleDownPercentChange(val);
                }
              }}
            />
          </div>
        </div>

        {/* Interest Rate */}
        <div className="mb-4">
          <div className="text-[13px] font-semibold text-foreground mb-0.5">Interest Rate</div>
          <div className="flex items-baseline gap-1 text-xl font-semibold text-primary mb-1.5">
            <span>{interestRate.toFixed(3)}</span>
            <span className="text-[0.8em] opacity-90">%</span>
          </div>
          <RangeSlider
            min={4}
            max={10}
            step={0.125}
            value={interestRate}
            onChange={setInterestRate}
          />
        </div>

        {/* Loan Term */}
        <div>
          <div className="text-[13px] font-semibold text-foreground mb-0.5">Loan Term</div>
          <div className="flex items-baseline gap-1 text-xl font-semibold text-primary mb-1.5">
            <span>{loanTerm}</span>
            <span className="text-[0.8em] opacity-90">years</span>
          </div>
          <RangeSlider
            min={10}
            max={40}
            step={5}
            value={loanTerm}
            onChange={setLoanTerm}
          />
        </div>
      </div>

      {/* Advanced Settings */}
      <AdvancedSettings
        taxRate={taxRate}
        onTaxRateChange={setTaxRate}
        insuranceAnnual={insuranceAnnual}
        onInsuranceChange={setInsuranceAnnual}
        hoaMonthly={hoaMonthly}
        onHoaChange={setHoaMonthly}
      />

      {/* CTA Buttons */}
      <div className="flex gap-2.5 mt-3.5">
        <button
          type="button"
          className="flex-1 py-3 px-4 rounded-full border border-white/20 bg-transparent text-muted-foreground text-[13px] font-semibold transition-all hover:bg-white/5"
        >
          Ask Sophia bot
        </button>
        <button
          type="button"
          className="flex-1 py-3 px-4 rounded-full bronze-gradient text-white text-[13px] font-semibold shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all hover:opacity-90"
        >
          Get Pre-Approved →
        </button>
      </div>
    </div>
  );
}
