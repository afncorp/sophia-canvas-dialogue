import { cn } from '@/lib/utils';

interface SegmentControlProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function SegmentControl<T extends string>({ options, value, onChange, className }: SegmentControlProps<T>) {
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
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
