import { cn } from '@/lib/utils';
import { Purpose, LoanType } from './types';

interface PurposeSegmentControlProps {
  options: { value: Purpose; label: string }[];
  value: Purpose;
  onChange: (value: Purpose) => void;
  className?: string;
}

interface LoanTypeSegmentControlProps {
  options: { value: LoanType; label: string }[];
  value: LoanType;
  onChange: (value: LoanType) => void;
  className?: string;
}

type SegmentControlProps = PurposeSegmentControlProps | LoanTypeSegmentControlProps;

export function SegmentControl(props: SegmentControlProps) {
  const { options, value, onChange, className } = props as PurposeSegmentControlProps & { className?: string };
  
  return (
    <div className={cn("segment-control flex gap-1", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={cn(
            'segment-button',
            value === option.value && 'active'
          )}
          onClick={() => (onChange as (v: string) => void)(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
