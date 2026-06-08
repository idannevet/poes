"use client";

import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { scoreDistribution } from "@/lib/dashboard";
import type { Opportunity } from "@/lib/types";

export function ScoreDistributionChart({ opps }: { opps: Opportunity[] }) {
  const data = scoreDistribution(opps);

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} stroke="#64748b" />
        <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={12} stroke="#64748b" />
        <Tooltip
          cursor={{ fill: "rgba(79,70,229,0.06)" }}
          contentStyle={{ borderRadius: 12, border: "1px solid #e6e8ec", fontSize: 12 }}
          formatter={(v: number) => [`${v} הזדמנויות`, "כמות"]}
        />
        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
          {data.map((d) => (
            <Cell key={d.label} fill={d.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
