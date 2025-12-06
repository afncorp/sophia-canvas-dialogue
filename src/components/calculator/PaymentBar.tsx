import { PaymentBreakdown } from './types';
import { formatCurrency } from './utils';

interface PaymentBarProps {
  breakdown: PaymentBreakdown;
}

export function PaymentBar({ breakdown }: PaymentBarProps) {
  const { principalInterest, propertyTax, insurance, hoa, mortgageInsurance, total } = breakdown;
  
  const sum = total || 1;
  const piPct = (principalInterest / sum) * 100;
  const taxPct = (propertyTax / sum) * 100;
  const insPct = (insurance / sum) * 100;
  const hoaPct = (hoa / sum) * 100;
  const miPct = (mortgageInsurance / sum) * 100;

  return (
    <div className="calculator-card p-3">
      {/* Stacked bar */}
      <div className="bg-black/30 rounded-lg h-5 overflow-hidden mb-2.5">
        <div className="h-full flex w-full">
          <div 
            className="bg-[hsl(var(--color-blue))] relative flex items-center justify-center"
            style={{ width: `${piPct}%` }}
            title={`P & I ${formatCurrency(principalInterest)}`}
          />
          <div 
            className="bg-[hsl(var(--color-red))]"
            style={{ width: `${taxPct}%` }}
            title={`Prop Tax ${formatCurrency(propertyTax)}`}
          />
          <div 
            className="bg-[hsl(var(--color-green))]"
            style={{ width: `${insPct}%` }}
            title={`Ins ${formatCurrency(insurance)}`}
          />
          {hoa > 0.5 && (
            <div 
              className="bg-[hsl(var(--color-purple))]"
              style={{ width: `${hoaPct}%` }}
              title={`HOA ${formatCurrency(hoa)}`}
            />
          )}
          {mortgageInsurance > 0.5 && (
            <div 
              className="bg-[hsl(var(--color-yellow))]"
              style={{ width: `${miPct}%` }}
              title={`MI ${formatCurrency(mortgageInsurance)}`}
            />
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-between items-start gap-2 text-xs text-muted-foreground mt-2">
        <LegendItem color="var(--color-blue)" label="P & I" amount={principalInterest} />
        <LegendItem color="var(--color-red)" label="Prop Tax" amount={propertyTax} />
        <LegendItem color="var(--color-green)" label="Ins" amount={insurance} />
        {hoa > 0.5 && (
          <LegendItem color="var(--color-purple)" label="HOA" amount={hoa} />
        )}
        {mortgageInsurance > 0.5 && (
          <LegendItem color="var(--color-yellow)" label="MI" amount={mortgageInsurance} />
        )}
      </div>
    </div>
  );
}

interface LegendItemProps {
  color: string;
  label: string;
  amount: number;
}

function LegendItem({ color, label, amount }: LegendItemProps) {
  return (
    <div className="flex-1 flex flex-col items-center gap-0.5">
      <div className="flex items-center gap-1">
        <span 
          className="w-2 h-2 rounded-full mt-px"
          style={{ background: `hsl(${color})` }}
        />
        <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
          {label}
        </span>
      </div>
      <span className="text-[13px] font-semibold text-primary whitespace-nowrap">
        {formatCurrency(amount)}
      </span>
    </div>
  );
}
