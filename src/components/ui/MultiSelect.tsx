"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/format";

interface MultiSelectProps {
  options: readonly string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

/** Chip-style multi-select used for target users and consequences. */
export function MultiSelect({ options, selected, onChange }: MultiSelectProps) {
  const toggle = (opt: string) => {
    onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition",
              active
                ? "border-accent bg-accent/10 text-accent font-medium"
                : "border-border bg-surface text-muted hover:border-accent/40 hover:text-text",
            )}
          >
            {active ? <Check className="h-3.5 w-3.5" /> : null}
            {opt}
          </button>
        );
      })}
    </div>
  );
}
