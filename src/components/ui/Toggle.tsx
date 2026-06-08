"use client";

import { cn } from "@/lib/format";

interface ToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
  labels?: [string, string]; // [off, on]
}

export function Toggle({ value, onChange, labels = ["לא", "כן"] }: ToggleProps) {
  return (
    <div className="inline-flex rounded-lg border border-border bg-surface-2 p-0.5">
      {[false, true].map((opt) => (
        <button
          key={String(opt)}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "rounded-md px-4 py-1.5 text-sm font-medium transition",
            value === opt ? "bg-surface text-text shadow-sm" : "text-muted hover:text-text",
          )}
        >
          {opt ? labels[1] : labels[0]}
        </button>
      ))}
    </div>
  );
}
