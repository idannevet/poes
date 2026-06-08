"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { averageCategoryScores } from "@/lib/dashboard";
import type { Opportunity } from "@/lib/types";

// Compact labels so the radar stays readable.
const SHORT: Record<string, string> = {
  pain: "כאב",
  market: "שוק",
  economics: "כלכלה",
  competitor: "תחרות",
  technical: "טכני",
  poc: "POC",
  demand: "ביקוש",
  strategic: "אסטרטגי",
};

export function CategoryRadarChart({ opps }: { opps: Opportunity[] }) {
  const data = averageCategoryScores(opps).map((d) => ({ ...d, short: SHORT[d.key] ?? d.label }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={data} outerRadius="72%">
        <PolarGrid stroke="#e6e8ec" />
        <PolarAngleAxis dataKey="short" fontSize={11} stroke="#64748b" />
        <PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false} />
        <Radar dataKey="value" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.25} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: "1px solid #e6e8ec", fontSize: 12 }}
          formatter={(v: number) => [`${v} / 10`, "ציון ממוצע"]}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
