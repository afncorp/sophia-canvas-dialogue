import { useState, useEffect } from 'react';
import { RangeSlider } from './RangeSlider';
import { formatCurrencyWhole } from './utils';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdvancedSettingsProps {
  taxRate: number;
  onTaxRateChange: (value: number) => void;
  insuranceAnnual: number;
  onInsuranceChange: (value: number) => void;
  hoaMonthly: number;
  onHoaChange: (value: number) => void;
  affordMode?: boolean;
  grossMonthlyIncome?: number;
  onGrossMonthlyIncomeChange?: (value: number) => void;
  monthlyDebt?: number;
  onMonthlyDebtChange?: (value: number) => void;
}

export function AdvancedSettings({
  taxRate,
  onTaxRateChange,
  insuranceAnnual,
  onInsuranceChange,
  hoaMonthly,
  onHoaChange,
  affordMode = false,
  grossMonthlyIncome = 10000,
  onGrossMonthlyIncomeChange,
  monthlyDebt = 500,
  onMonthlyDebtChange,
}: AdvancedSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-expand when affordMode turns on, collapse when it turns off
  useEffect(() => {
    setIsOpen(affordMode);
  }, [affordMode]);

  const taxRateDisplay = (taxRate / 100).toFixed(2);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-sm text-muted-foreground mx-0.5 mt-1 cursor-pointer"
      >
        <span>Advanced Settings</span>
        <ChevronRight 
          className={cn(
            'w-4 h-4 transition-transform duration-300',
            isOpen && 'rotate-90'
          )} 
        />
      </button>

      <div
        className={cn(
          'calculator-card mt-2 overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-[800px] p-3' : 'max-h-0 p-0 border-0'
        )}
      >
        {/* Property Tax Rate */}
        <div className="mb-3.5">
          <div className="text-xs font-semibold text-foreground">Property Tax Rate</div>
          <div className="text-sm font-medium text-primary mb-1.5">
            <span>{taxRateDisplay}</span>
            <span className="mx-0.5">%</span>
            <span>annually</span>
          </div>
          <RangeSlider
            min={0}
            max={300}
            step={5}
            value={taxRate}
            onChange={onTaxRateChange}
          />
        </div>

        {/* Homeowners Insurance */}
        <div className="mb-3.5">
          <div className="text-xs font-semibold text-foreground">Homeowners Insurance</div>
          <div className="text-sm font-medium text-primary mb-1.5">
            <span>$</span>
            <span>{formatCurrencyWhole(insuranceAnnual)}</span>
            <span>/year</span>
          </div>
          <RangeSlider
            min={0}
            max={20000}
            step={50}
            value={insuranceAnnual}
            onChange={onInsuranceChange}
          />
        </div>

        {/* HOA Dues */}
        <div className={affordMode ? 'mb-3.5' : ''}>
          <div className="text-xs font-semibold text-foreground">HOA Dues</div>
          <div className="text-sm font-medium text-primary mb-1.5">
            <span>$</span>
            <span>{formatCurrencyWhole(hoaMonthly)}</span>
            <span>/mo</span>
          </div>
          <RangeSlider
            min={0}
            max={1000}
            step={10}
            value={hoaMonthly}
            onChange={onHoaChange}
          />
        </div>

        {/* Afford Mode Fields */}
        {affordMode && (
          <>
            {/* Gross Monthly Income */}
            <div className="mb-3.5">
              <div className="text-xs font-semibold text-foreground">Gross Monthly Income</div>
              <div className="text-sm font-medium text-primary mb-1.5">
                <span>$</span>
                <span>{formatCurrencyWhole(grossMonthlyIncome)}</span>
                <span>/mo</span>
              </div>
              <RangeSlider
                min={1000}
                max={50000}
                step={100}
                value={grossMonthlyIncome}
                onChange={onGrossMonthlyIncomeChange || (() => {})}
              />
            </div>

            {/* Monthly Debt */}
            <div>
              <div className="text-xs font-semibold text-foreground">Monthly Debt</div>
              <div className="text-sm font-medium text-primary mb-1.5">
                <span>$</span>
                <span>{formatCurrencyWhole(monthlyDebt)}</span>
                <span>/mo</span>
              </div>
              <RangeSlider
                min={0}
                max={10000}
                step={50}
                value={monthlyDebt}
                onChange={onMonthlyDebtChange || (() => {})}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
