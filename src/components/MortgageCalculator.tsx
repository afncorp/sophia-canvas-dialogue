import { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";

type Purpose = 'purchase' | 'refi';
type LoanType = 'conv' | 'fha' | 'va';

export const MortgageCalculator = () => {
  const [purpose, setPurpose] = useState<Purpose>('purchase');
  const [loanType, setLoanType] = useState<LoanType>('conv');
  
  // Core values
  const [homePrice, setHomePrice] = useState(500000);
  const [downPct, setDownPct] = useState(20);
  const [downAmt, setDownAmt] = useState(100000);
  const [loanAmt, setLoanAmt] = useState(400000);
  const [loanPct, setLoanPct] = useState(80);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);
  
  // Advanced settings
  const [taxRate, setTaxRate] = useState(1.2);
  const [insurance, setInsurance] = useState(0);
  const [hoa, setHoa] = useState(0);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  
  // Calculated values
  const [pi, setPi] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [pmi, setPmi] = useState(0);
  const [total, setTotal] = useState(0);
  
  // Track what drove the last change
  const lastDriver = useRef<string>('slider');

  // Calculate recommended insurance (0.35% annually)
  const getRecommendedIns = (price: number) => {
    if (!price) return 0;
    const annual = price * 0.0035;
    const monthly = annual / 12;
    return Math.round(monthly / 5) * 5;
  };

  // Snap percent to 1% steps, preserving 3.5%
  const snapPercent = (p: number) => {
    if (!isFinite(p)) return 0;
    if (Math.abs(p - 3.5) <= 0.5) return 3.5;
    return Math.round(p);
  };

  // Calculate monthly payment
  const calcPayment = (loan: number, r: number, t: number) => {
    const monthlyRate = r / 1200;
    const n = t * 12;
    if (monthlyRate === 0) return loan / n;
    return loan * monthlyRate * Math.pow(1 + monthlyRate, n) / (Math.pow(1 + monthlyRate, n) - 1);
  };

  // Format currency
  const formatCurrency = (n: number) => {
    if (!isFinite(n)) n = 0;
    return Math.round(n).toLocaleString('en-US');
  };

  const formatCurrencyFull = (n: number) => {
    if (!isFinite(n)) n = 0;
    return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  };

  // Initialize insurance on mount
  useEffect(() => {
    setInsurance(getRecommendedIns(homePrice));
  }, []);

  // Update insurance when price changes via slider
  const handlePriceChange = (newPrice: number) => {
    setHomePrice(newPrice);
    setInsurance(getRecommendedIns(newPrice));
  };

  // Recalculate all values
  useEffect(() => {
    const price = homePrice;
    const ltv = loanPct || 0;

    // FHA upfront MIP
    const ufmipRate = 1.75;
    let ufmip = 0;
    let totalLoan = loanAmt;
    if (loanType === 'fha') {
      ufmip = loanAmt * ufmipRate / 100;
      totalLoan += ufmip;
    }

    // PI calculation
    const piVal = calcPayment(totalLoan, rate, term);
    setPi(piVal);

    // Taxes
    const taxVal = price * (taxRate / 100) / 12;
    setTaxes(taxVal);

    // MI / MIP
    let pmiVal = 0;
    if (loanType === 'fha') {
      const annualRate = ltv > 95 ? 0.55 : 0.50;
      pmiVal = totalLoan * (annualRate / 100) / 12;
    } else if (loanType === 'conv' && ltv > 80) {
      const convRate = 0.8;
      pmiVal = totalLoan * (convRate / 100) / 12;
    } else if (loanType === 'va' && downPct < 10) {
      pmiVal = totalLoan * (0.3 / 100) / 12;
    }
    setPmi(pmiVal);

    // Total
    setTotal(piVal + taxVal + insurance + hoa + pmiVal);
  }, [homePrice, loanAmt, loanPct, rate, term, taxRate, insurance, hoa, loanType, downPct]);

  // Sync down payment / loan amount based on driver
  const updateFromSlider = (sliderVal: number) => {
    lastDriver.current = 'slider';
    const snapped = snapPercent(sliderVal);
    
    if (purpose === 'refi') {
      // Slider controls loan %
      setLoanPct(snapped);
      const newLoanAmt = homePrice * snapped / 100;
      setLoanAmt(newLoanAmt);
      setDownAmt(homePrice - newLoanAmt);
      setDownPct(100 - snapped);
    } else {
      // Slider controls down %
      setDownPct(snapped);
      const newDownAmt = homePrice * snapped / 100;
      setDownAmt(newDownAmt);
      const newLoanAmt = homePrice - newDownAmt;
      setLoanAmt(newLoanAmt);
      setLoanPct(homePrice ? (newLoanAmt / homePrice * 100) : 0);
    }
  };

  const updateFromDownAmt = (val: number) => {
    lastDriver.current = 'downAmt';
    let newDownAmt = Math.max(0, Math.min(homePrice, val));
    setDownAmt(newDownAmt);
    const newDownPct = homePrice ? (newDownAmt / homePrice * 100) : 0;
    setDownPct(newDownPct);
    const newLoanAmt = homePrice - newDownAmt;
    setLoanAmt(newLoanAmt);
    setLoanPct(homePrice ? (newLoanAmt / homePrice * 100) : 0);
  };

  const updateFromLoanAmt = (val: number) => {
    lastDriver.current = 'loanAmt';
    let newLoanAmt = Math.max(0, Math.min(homePrice, val));
    setLoanAmt(newLoanAmt);
    const newLoanPct = homePrice ? (newLoanAmt / homePrice * 100) : 0;
    setLoanPct(newLoanPct);
    const newDownAmt = homePrice - newLoanAmt;
    setDownAmt(newDownAmt);
    setDownPct(homePrice ? (newDownAmt / homePrice * 100) : 0);
  };

  const updateFromDownPct = (val: number) => {
    lastDriver.current = 'downPct';
    const newDownPct = Math.max(0, Math.min(100, val));
    setDownPct(newDownPct);
    const newDownAmt = homePrice * newDownPct / 100;
    setDownAmt(newDownAmt);
    const newLoanAmt = homePrice - newDownAmt;
    setLoanAmt(newLoanAmt);
    setLoanPct(homePrice ? (newLoanAmt / homePrice * 100) : 0);
  };

  const updateFromLoanPct = (val: number) => {
    lastDriver.current = 'loanPct';
    const newLoanPct = Math.max(0, Math.min(100, val));
    setLoanPct(newLoanPct);
    const newLoanAmt = homePrice * newLoanPct / 100;
    setLoanAmt(newLoanAmt);
    const newDownAmt = homePrice - newLoanAmt;
    setDownAmt(newDownAmt);
    setDownPct(homePrice ? (newDownAmt / homePrice * 100) : 0);
  };

  // When home price changes, recalc based on last driver
  useEffect(() => {
    if (lastDriver.current === 'slider' || lastDriver.current === 'downPct') {
      const newDownAmt = homePrice * downPct / 100;
      setDownAmt(newDownAmt);
      const newLoanAmt = homePrice - newDownAmt;
      setLoanAmt(newLoanAmt);
      setLoanPct(homePrice ? (newLoanAmt / homePrice * 100) : 0);
    } else if (lastDriver.current === 'downAmt') {
      const newLoanAmt = homePrice - downAmt;
      setLoanAmt(Math.max(0, newLoanAmt));
      setLoanPct(homePrice ? (Math.max(0, newLoanAmt) / homePrice * 100) : 0);
      setDownPct(homePrice ? (downAmt / homePrice * 100) : 0);
    } else if (lastDriver.current === 'loanAmt' || lastDriver.current === 'loanPct') {
      const newLoanPct = homePrice ? (loanAmt / homePrice * 100) : 0;
      setLoanPct(newLoanPct);
      const newDownAmt = homePrice - loanAmt;
      setDownAmt(Math.max(0, newDownAmt));
      setDownPct(homePrice ? (Math.max(0, newDownAmt) / homePrice * 100) : 0);
    }
  }, [homePrice]);

  // Bar segment widths
  const sum = pi + taxes + insurance + hoa + pmi || 1;
  const piWidth = (pi / sum * 100);
  const taxWidth = (taxes / sum * 100);
  const insWidth = (insurance / sum * 100);
  const hoaWidth = (hoa / sum * 100);
  const pmiWidth = (pmi / sum * 100);

  const typeMap: Record<LoanType, string> = { conv: 'Conventional', fha: 'FHA', va: 'VA' };
  const programText = `${typeMap[loanType]} · ${purpose === 'refi' ? 'Refinance' : 'Purchase'}`;
  const miRequired = loanPct > 80;

  return (
    <div className="w-full max-w-[420px] mx-auto bg-gradient-to-br from-[#27211b] to-[#141316] rounded-[32px] p-[22px_18px_24px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/[0.06] overflow-hidden">
      
      {/* Header */}
      <div className="text-left mb-3.5">
        <div className="text-[13px] uppercase tracking-wider text-[#9a9a9d] mb-1">Payment Calculator</div>
        <div className="flex justify-between items-end gap-2.5">
          <div className="text-[32px] font-bold text-primary">${formatCurrency(total)}</div>
          <div className="inline-flex items-center gap-1.5 bg-white/[0.04] px-2.5 py-1.5 rounded-[30px] text-[11px]">
            <div className="w-[7px] h-[7px] rounded-full bg-[#32d74b] shadow-[0_0_12px_rgba(50,215,75,0.6)]"></div>
            <span className="text-[#d0d0d3]">{programText}</span>
          </div>
        </div>
      </div>

      {/* Purpose & Loan Type Segments */}
      <div className="flex gap-2 mb-2.5">
        <div className="flex-1 flex bg-white/[0.04] rounded-[30px] p-1 gap-1">
          <button
            onClick={() => setPurpose('purchase')}
            className={`flex-1 py-2 px-2 rounded-[30px] border-none text-[12px] font-medium transition-all cursor-pointer ${
              purpose === 'purchase'
                ? 'bg-gradient-to-br from-primary to-primary/80 text-white font-semibold'
                : 'bg-transparent text-[#9a9a9d]'
            }`}
          >
            Purchase
          </button>
          <button
            onClick={() => setPurpose('refi')}
            className={`flex-1 py-2 px-2 rounded-[30px] border-none text-[12px] font-medium transition-all cursor-pointer ${
              purpose === 'refi'
                ? 'bg-gradient-to-br from-primary to-primary/80 text-white font-semibold'
                : 'bg-transparent text-[#9a9a9d]'
            }`}
          >
            Refinance
          </button>
        </div>
      </div>
      
      <div className="flex gap-2 mb-3">
        <div className="flex-1 flex bg-white/[0.04] rounded-[30px] p-1 gap-1">
          {(['conv', 'fha', 'va'] as LoanType[]).map((type) => (
            <button
              key={type}
              onClick={() => setLoanType(type)}
              className={`flex-1 py-2 px-2 rounded-[30px] border-none text-[12px] font-medium transition-all cursor-pointer ${
                loanType === type
                  ? 'bg-gradient-to-br from-primary to-primary/80 text-white font-semibold'
                  : 'bg-transparent text-[#9a9a9d]'
              }`}
            >
              {type === 'conv' ? 'Conv' : type.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Breakdown Bar */}
      <div className="bg-[radial-gradient(circle_at_top_left,#302620_0,#181518_60%)] rounded-[22px] border border-white/[0.06] p-[12px_12px_14px] mb-3">
        <div className="bg-black/[0.28] rounded-[10px] h-3.5 overflow-hidden mb-2.5 relative">
          <div className="h-full flex w-full">
            <div 
              className="bg-[#4a9eff] relative flex items-center justify-center"
              style={{ width: `${piWidth}%` }}
              title={`P & I ${formatCurrencyFull(pi)}`}
            >
              {piWidth > 15 && (
                <span className="text-[10px] font-semibold text-white absolute whitespace-nowrap" style={{ textShadow: '0 0 5px rgba(0,0,0,0.8)' }}>
                  {formatCurrencyFull(pi)}
                </span>
              )}
            </div>
            <div 
              className="bg-[#ff6472]" 
              style={{ width: `${taxWidth}%` }}
              title={`Prop Tax ${formatCurrencyFull(taxes)}`}
            />
            <div 
              className="bg-[#32d74b]" 
              style={{ width: `${insWidth}%` }}
              title={`Ins ${formatCurrencyFull(insurance)}`}
            />
            <div 
              className="bg-[#af7bff]" 
              style={{ width: `${hoaWidth}%` }}
              title={`HOA ${formatCurrencyFull(hoa)}`}
            />
            <div 
              className="bg-[#eac456]" 
              style={{ width: `${pmiWidth}%` }}
              title={`MI ${formatCurrencyFull(pmi)}`}
            />
          </div>
        </div>
        <div className="flex justify-between items-center text-[12px] text-[#9a9a9d]">
          <div className="flex-1 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4a9eff]"></span>
            <span>P & I</span>
          </div>
          <div className="flex-1 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ff6472]"></span>
            <span>Prop Tax</span>
          </div>
          <div className="flex-1 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#32d74b]"></span>
            <span>Ins</span>
          </div>
          <div className="flex-1 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#af7bff]"></span>
            <span>HOA</span>
          </div>
          <div className="flex-1 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#eac456]"></span>
            <span>MI</span>
          </div>
        </div>
      </div>

      {/* Core Sliders Card */}
      <div className="bg-[radial-gradient(circle_at_top_left,#302620_0,#181518_60%)] rounded-[22px] border border-white/[0.06] p-[14px_14px_16px] mb-3">
        
        {/* Home Price / Value */}
        <div className="mb-4">
          <div className="text-[13px] font-semibold text-[#f4f4f6]">
            {purpose === 'refi' ? 'Property Value' : 'Home Price'}
          </div>
          <div className="flex justify-start items-end gap-1 mb-2">
            <div className="flex items-baseline gap-1 text-[26px] font-semibold text-primary">
              <span className="text-[0.8em] opacity-90">$</span>
              <input
                type="text"
                value={formatCurrency(homePrice)}
                onChange={(e) => {
                  const val = parseInt(e.target.value.replace(/[^\d]/g, '')) || 0;
                  const clamped = Math.max(100000, Math.min(3000000, val));
                  handlePriceChange(clamped);
                }}
                className="border-none bg-transparent font-inherit text-inherit inline-block text-left p-0 pb-px border-b border-dashed border-white/[0.18] focus:outline-none focus:border-primary"
                style={{ width: `${formatCurrency(homePrice).length + 0.5}ch` }}
              />
            </div>
          </div>
          <input
            type="range"
            min="100000"
            max="3000000"
            step="5000"
            value={homePrice}
            onChange={(e) => handlePriceChange(parseInt(e.target.value))}
            className="w-full h-1.5 rounded bg-white/[0.15] outline-none appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[22px] [&::-webkit-slider-thumb]:h-[22px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-[0_4px_15px_rgba(192,138,74,0.4)] [&::-webkit-slider-thumb]:cursor-grab"
          />
        </div>

        {/* Down Payment & Loan Amount */}
        <div className="mb-4">
          <div className={`flex gap-3.5 items-start mb-2 ${purpose === 'refi' ? 'justify-center' : ''}`}>
            {purpose === 'purchase' && (
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <div className="text-[13px] font-semibold text-[#f4f4f6]">Down Payment</div>
                </div>
                <div className="flex items-baseline gap-2 text-[20px] font-semibold text-primary w-full justify-start">
                  <div className="flex items-baseline gap-1 min-w-0">
                    <span className="text-[0.8em] opacity-90">$</span>
                    <input
                      type="text"
                      value={formatCurrency(downAmt)}
                      onChange={(e) => {
                        const val = parseInt(e.target.value.replace(/[^\d]/g, '')) || 0;
                        updateFromDownAmt(val);
                      }}
                      className="border-none bg-transparent font-inherit text-inherit inline-block text-left p-0 pb-px border-b border-dashed border-white/[0.18] focus:outline-none focus:border-primary"
                      style={{ width: `${formatCurrency(downAmt).length + 0.5}ch` }}
                    />
                  </div>
                  <div className="flex items-baseline gap-0.5 ml-2.5 whitespace-nowrap">
                    <input
                      type="text"
                      value={downPct.toFixed(1).replace(/\.0$/, '')}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value.replace(/[^\d.]/g, '')) || 0;
                        updateFromDownPct(val);
                      }}
                      className="border-none bg-transparent font-inherit text-inherit inline-block text-right p-0 pb-px border-b border-dashed border-white/[0.18] focus:outline-none focus:border-primary text-[15px]"
                      style={{ width: `${(downPct.toFixed(1).replace(/\.0$/, '')).length + 0.5}ch` }}
                    />
                    <span className="text-[15px]">%</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className={purpose === 'refi' ? 'flex-1' : 'flex-1 min-w-0'}>
              <div className="flex justify-between items-baseline mb-1">
                <div className="text-[13px] font-semibold text-[#f4f4f6]">Loan Amount</div>
                <span className={`text-[11px] whitespace-nowrap ${miRequired ? 'text-[#ff6472]' : 'text-[#32d74b]'}`}>
                  {miRequired ? 'MI req.' : 'No MI'}
                </span>
              </div>
              <div className="flex items-baseline gap-2 text-[20px] font-semibold text-primary w-full justify-between">
                <div className="flex items-baseline gap-1 min-w-0">
                  <span className="text-[0.8em] opacity-90">$</span>
                  <input
                    type="text"
                    value={formatCurrency(loanAmt)}
                    onChange={(e) => {
                      const val = parseInt(e.target.value.replace(/[^\d]/g, '')) || 0;
                      updateFromLoanAmt(val);
                    }}
                    className="border-none bg-transparent font-inherit text-inherit inline-block text-left p-0 pb-px border-b border-dashed border-white/[0.18] focus:outline-none focus:border-primary"
                    style={{ width: `${formatCurrency(loanAmt).length + 0.5}ch` }}
                  />
                </div>
                <div className="flex items-baseline gap-0.5 ml-auto whitespace-nowrap">
                  <input
                    type="text"
                    value={loanPct.toFixed(1).replace(/\.0$/, '')}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value.replace(/[^\d.]/g, '')) || 0;
                      updateFromLoanPct(val);
                    }}
                    className="border-none bg-transparent font-inherit text-inherit inline-block text-right p-0 pb-px border-b border-dashed border-white/[0.18] focus:outline-none focus:border-primary text-[15px]"
                    style={{ width: `${(loanPct.toFixed(1).replace(/\.0$/, '')).length + 0.5}ch` }}
                  />
                  <span className="text-[15px]">%</span>
                </div>
              </div>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="0.5"
            value={purpose === 'refi' ? loanPct : downPct}
            onChange={(e) => updateFromSlider(parseFloat(e.target.value))}
            className="w-full h-1.5 rounded bg-white/[0.15] outline-none appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[22px] [&::-webkit-slider-thumb]:h-[22px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-[0_4px_15px_rgba(192,138,74,0.4)] [&::-webkit-slider-thumb]:cursor-grab"
          />
        </div>

        {/* Interest Rate & Term */}
        <div className="flex gap-3.5">
          <div className="flex-1">
            <div className="mb-0.5">
              <span className="text-[13px] font-semibold text-[#f4f4f6]">Interest Rate</span>
            </div>
            <div className="flex items-baseline gap-1 my-0.5 mb-1.5 text-[20px] font-semibold text-primary">
              <span>{rate.toFixed(3)}</span>
              <span className="text-[0.8em] opacity-90">%</span>
            </div>
            <input
              type="range"
              min="4"
              max="10"
              step="0.125"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full h-1.5 rounded bg-white/[0.15] outline-none appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[22px] [&::-webkit-slider-thumb]:h-[22px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-[0_4px_15px_rgba(192,138,74,0.4)] [&::-webkit-slider-thumb]:cursor-grab"
            />
          </div>
          <div className="flex-1">
            <div className="mb-0.5">
              <span className="text-[13px] font-semibold text-[#f4f4f6]">Loan Term</span>
            </div>
            <div className="flex items-baseline gap-1 my-0.5 mb-1.5 text-[20px] font-semibold text-primary">
              <span>{term}</span>
              <span className="text-[0.8em] opacity-90">years</span>
            </div>
            <input
              type="range"
              min="10"
              max="40"
              step="5"
              value={term}
              onChange={(e) => setTerm(parseInt(e.target.value))}
              className="w-full h-1.5 rounded bg-white/[0.15] outline-none appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[22px] [&::-webkit-slider-thumb]:h-[22px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-[0_4px_15px_rgba(192,138,74,0.4)] [&::-webkit-slider-thumb]:cursor-grab"
            />
          </div>
        </div>
      </div>

      {/* Advanced Settings Toggle */}
      <div
        onClick={() => setAdvancedOpen(!advancedOpen)}
        className="flex justify-between items-center cursor-pointer text-[13px] text-[#9a9a9d] mx-0.5 mt-1"
      >
        <span>Advanced Settings</span>
        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${advancedOpen ? 'rotate-90' : ''}`} />
      </div>

      {/* Advanced Panel */}
      <div
        className={`bg-[radial-gradient(circle_at_top_left,#302620_0,#181518_60%)] rounded-[20px] border border-white/[0.06] mt-2 overflow-hidden transition-all duration-300 ${
          advancedOpen ? 'max-h-[600px] p-[12px_14px_14px]' : 'max-h-0 p-0 px-[14px]'
        }`}
      >
        {/* Property Tax Rate */}
        <div className="mb-3.5">
          <div className="text-[12px] font-semibold text-[#f4f4f6]">Property Tax Rate</div>
          <div className="text-[14px] font-medium text-primary mb-1.5">
            <span>{taxRate.toFixed(2).replace(/\.?0+$/, '')}</span>
            <span className="mx-0.5">%</span>
            <span>annually</span>
          </div>
          <input
            type="range"
            min="0"
            max="300"
            step="5"
            value={taxRate * 100}
            onChange={(e) => setTaxRate(parseInt(e.target.value) / 100)}
            className="w-full h-1.5 rounded bg-white/[0.15] outline-none appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[22px] [&::-webkit-slider-thumb]:h-[22px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-[0_4px_15px_rgba(192,138,74,0.4)] [&::-webkit-slider-thumb]:cursor-grab"
          />
        </div>

        {/* Homeowners Insurance */}
        <div className="mb-3.5">
          <div className="text-[12px] font-semibold text-[#f4f4f6]">Homeowners Insurance</div>
          <div className="text-[14px] font-medium text-primary mb-1.5">
            <span>$</span>
            <span>{formatCurrency(insurance)}</span>
            <span>/mo</span>
          </div>
          <input
            type="range"
            min="0"
            max="1500"
            step="5"
            value={insurance}
            onChange={(e) => {
              const price = homePrice;
              const rec = getRecommendedIns(price);
              let cur = parseInt(e.target.value);
              if (Math.abs(cur - rec) <= 5) cur = rec;
              setInsurance(cur);
            }}
            className="w-full h-1.5 rounded bg-white/[0.15] outline-none appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[22px] [&::-webkit-slider-thumb]:h-[22px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-[0_4px_15px_rgba(192,138,74,0.4)] [&::-webkit-slider-thumb]:cursor-grab"
          />
        </div>

        {/* HOA Dues */}
        <div>
          <div className="text-[12px] font-semibold text-[#f4f4f6]">HOA Dues</div>
          <div className="text-[14px] font-medium text-primary mb-1.5">
            <span>$</span>
            <span>{formatCurrency(hoa)}</span>
            <span>/mo</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={hoa}
            onChange={(e) => setHoa(parseInt(e.target.value))}
            className="w-full h-1.5 rounded bg-white/[0.15] outline-none appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[22px] [&::-webkit-slider-thumb]:h-[22px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-[0_4px_15px_rgba(192,138,74,0.4)] [&::-webkit-slider-thumb]:cursor-grab"
          />
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-2.5 mt-3.5">
        <button className="flex-1 py-3 px-3 rounded-[30px] border border-white/20 bg-transparent text-[#9a9a9d] font-semibold text-[13px] cursor-pointer transition-all hover:bg-white/5">
          Ask Sophia bot
        </button>
        <button className="flex-1 py-3 px-3 rounded-[30px] border-none bg-gradient-to-br from-primary to-primary/80 text-white font-semibold text-[13px] cursor-pointer shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          Get Pre-Approved →
        </button>
      </div>
    </div>
  );
};
