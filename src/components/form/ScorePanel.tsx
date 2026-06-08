"use client";

import { ScoreRing } from "@/components/ui/ScoreRing";
import { toneStyle } from "@/lib/score-style";
import { cn } from "@/lib/format";
import type { ScoreResult } from "@/lib/types";

export function ScorePanel({ result }: { result: ScoreResult }) {
  const tone = toneStyle(result.decision.tone);

  return (
    <div className="space-y-4">
      <div className={cn("rounded-2xl border p-5 text-center", tone.bg, tone.border)}>
        <ScoreRing score={result.finalScore} size={132} className="mx-auto" />
        <p className={cn("mt-3 text-sm font-semibold", tone.text)}>{result.decision.tier}</p>
        <p className="text-xs text-muted">{result.decision.action}</p>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <h3 className="mb-3 text-sm font-semibold">פירוט הציון</h3>
        <div className="space-y-3">
          {result.breakdown.map((b) => (
            <div key={b.key}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-muted">{b.label}</span>
                <span className="tabular-nums font-medium">
                  {b.score.toFixed(1)}<span className="text-muted">/10 · {b.weightPct}%</span>
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full bg-accent transition-all"
                  style={{ width: `${(b.score / 10) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
