"use client";

import { Input } from "@/components/ui/Input";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
}

/** Numeric input that emits a clean number (never NaN) and supports prefix/suffix. */
export function NumberInput({
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  placeholder,
  prefix,
  suffix,
}: NumberInputProps) {
  const handle = (raw: string) => {
    if (raw === "") return onChange(0);
    const n = Number(raw);
    onChange(Number.isFinite(n) ? n : 0);
  };

  return (
    <div className="relative">
      {prefix ? (
        <span className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-sm text-muted">
          {prefix}
        </span>
      ) : null}
      <Input
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        value={value === 0 ? "" : value}
        onChange={(e) => handle(e.target.value)}
        placeholder={placeholder ?? "0"}
        className={prefix ? "ps-7" : suffix ? "pe-10" : undefined}
      />
      {suffix ? (
        <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-sm text-muted">
          {suffix}
        </span>
      ) : null}
    </div>
  );
}
