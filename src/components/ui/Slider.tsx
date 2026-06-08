"use client";

import { cn } from "@/lib/format";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

/** A 1-10 (or custom range) slider with a live value chip. */
export function Slider({ value, onChange, min = 1, max = 10, step = 1, className }: SliderProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value || min}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1"
      />
      <span className="inline-flex h-8 min-w-[2.5rem] items-center justify-center rounded-lg bg-surface-2 px-2 text-sm font-semibold tabular-nums">
        {value || 0}
      </span>
    </div>
  );
}
