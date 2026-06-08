"use client";

import { validationFunnel } from "@/lib/dashboard";
import type { Opportunity } from "@/lib/types";

export function ValidationFunnelChart({ opps }: { opps: Opportunity[] }) {
  const stages = validationFunnel(opps);
  const max = Math.max(1, stages[0]?.count ?? 1);

  return (
    <div className="space-y-3 py-2">
      {stages.map((s, i) => {
        const pct = (s.count / max) * 100;
        const conv = i === 0 || stages[i - 1].count === 0
          ? null
          : Math.round((s.count / stages[i - 1].count) * 100);
        return (
          <div key={s.label}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium text-text">{s.label}</span>
              <span className="text-muted">
                {s.count}
                {conv !== null ? <span className="ms-1.5 text-[11px]">({conv}%)</span> : null}
              </span>
            </div>
            <div className="h-7 w-full overflow-hidden rounded-lg bg-surface-2">
              <div
                className="flex h-full items-center justify-end rounded-lg bg-gradient-to-r from-indigo-500 to-accent px-2 text-xs font-semibold text-white transition-all"
                style={{ width: `${Math.max(pct, s.count > 0 ? 8 : 0)}%` }}
              >
                {s.count > 0 ? s.count : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
