"use client";

import { Select } from "@/components/ui/Input";
import { INDUSTRIES, PRODUCT_CATEGORIES, STATUSES } from "@/lib/constants";
import type { Filters as FilterState } from "@/lib/dashboard";

interface Props {
  value: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
}

const SCORE_RANGES = [
  { label: "כל ציון", value: 0 },
  { label: "50+", value: 50 },
  { label: "60+", value: 60 },
  { label: "70+", value: 70 },
  { label: "80+", value: 80 },
  { label: "90+", value: 90 },
];

export function Filters({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select value={value.industry} onChange={(e) => onChange({ industry: e.target.value })} className="h-9 w-auto">
        <option value="">כל הענפים</option>
        {INDUSTRIES.map((i) => (
          <option key={i} value={i}>{i}</option>
        ))}
      </Select>
      <Select value={value.category} onChange={(e) => onChange({ category: e.target.value })} className="h-9 w-auto">
        <option value="">כל הקטגוריות</option>
        {PRODUCT_CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </Select>
      <Select value={value.status} onChange={(e) => onChange({ status: e.target.value })} className="h-9 w-auto">
        <option value="">כל הסטטוסים</option>
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </Select>
      <Select
        value={value.minScore}
        onChange={(e) => onChange({ minScore: Number(e.target.value) })}
        className="h-9 w-auto"
      >
        {SCORE_RANGES.map((r) => (
          <option key={r.value} value={r.value}>{r.label}</option>
        ))}
      </Select>
    </div>
  );
}
