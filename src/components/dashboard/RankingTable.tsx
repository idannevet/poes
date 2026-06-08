"use client";

import { useRouter } from "next/navigation";
import { StatusBadge } from "@/components/ui/Badge";
import { toneFromScore, toneStyle } from "@/lib/score-style";
import { classify } from "@/lib/scoring";
import { formatDate, cn } from "@/lib/format";
import type { Opportunity } from "@/lib/types";

function ScoreChip({ score }: { score: number }) {
  const tone = toneStyle(toneFromScore(score));
  return (
    <span className={cn("inline-flex h-8 w-10 items-center justify-center rounded-lg text-sm font-bold tabular-nums", tone.bg, tone.text)}>
      {score}
    </span>
  );
}

export function RankingTable({ opps }: { opps: Opportunity[] }) {
  const router = useRouter();

  if (opps.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface-2 px-4 py-12 text-center text-sm text-muted">
        אין הזדמנויות התואמות את הסינון הנוכחי.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full min-w-[760px] text-sm">
        <thead>
          <tr className="border-b border-border text-start text-xs tracking-wide text-muted">
            <th className="px-3 py-2.5 font-medium">#</th>
            <th className="px-3 py-2.5 font-medium">הזדמנות</th>
            <th className="px-3 py-2.5 font-medium">ציון</th>
            <th className="px-3 py-2.5 font-medium">החלטה</th>
            <th className="px-3 py-2.5 font-medium">סטטוס</th>
            <th className="px-3 py-2.5 font-medium">אחראי</th>
            <th className="px-3 py-2.5 font-medium">עודכן</th>
          </tr>
        </thead>
        <tbody>
          {opps.map((o, idx) => {
            const decision = classify(o.finalScore);
            return (
              <tr
                key={o.id}
                onClick={() => router.push(`/opportunities/${o.id}`)}
                className="cursor-pointer border-b border-border/60 transition hover:bg-surface-2"
              >
                <td className="px-3 py-3 font-semibold tabular-nums text-muted">{idx + 1}</td>
                <td className="px-3 py-3">
                  <p className="font-medium text-text">{o.name}</p>
                  <p className="text-xs text-muted">
                    {o.industry} · {o.productCategory}
                  </p>
                </td>
                <td className="px-3 py-3"><ScoreChip score={o.finalScore} /></td>
                <td className="px-3 py-3">
                  <span className={cn("text-xs font-medium", toneStyle(decision.tone).text)}>{decision.tier}</span>
                </td>
                <td className="px-3 py-3"><StatusBadge status={o.status} /></td>
                <td className="px-3 py-3 text-xs text-muted">{o.ownerEmail || "—"}</td>
                <td className="px-3 py-3 text-xs text-muted">{formatDate(o.updatedAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
