import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  marker?: number;
  markerSnapDistance?: number;
  thumbState?: 'default' | 'success' | 'danger';
}

export function RangeSlider({ 
  min, 
  max, 
  step, 
  value, 
  onChange,
  marker,
  markerSnapDistance = 0,
  thumbState = 'default'
}: RangeSliderProps) {
  const markerPosition = useMemo(() => {
    if (marker === undefined) return null;
    const clampedMarker = Math.min(Math.max(marker, min), max);
    return ((clampedMarker - min) / (max - min)) * 100;
  }, [marker, min, max]);

  const handleChange = (newValue: number) => {
    if (marker !== undefined && markerSnapDistance > 0) {
      if (Math.abs(newValue - marker) <= markerSnapDistance) {
        onChange(marker);
        return;
      }
    }
    onChange(newValue);
  };

  return (
    <div className="relative">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={Math.min(value, max)}
        onChange={(e) => handleChange(parseFloat(e.target.value))}
        className={cn(
          'range-slider',
          thumbState === 'success' && 'range-slider-success',
          thumbState === 'danger' && 'range-slider-danger'
        )}
      />
      {markerPosition !== null && marker !== undefined && marker >= min && marker <= max && (
        <div 
          className="absolute top-0 pointer-events-none"
          style={{ left: `calc(${markerPosition}% - 5px)` }}
        >
          <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[7px] border-l-transparent border-r-transparent border-t-[hsl(var(--color-red))]" />
        </div>
      )}
    </div>
  );
}
