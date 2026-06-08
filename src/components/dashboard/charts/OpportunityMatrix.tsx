"use client";

import { useRouter } from "next/navigation";
import {
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
  Cell,
} from "recharts";
import { matrixPoints } from "@/lib/dashboard";
import { scoreColor } from "@/lib/score-style";
import type { Opportunity } from "@/lib/types";

export function OpportunityMatrix({ opps }: { opps: Opportunity[] }) {
  const router = useRouter();
  const data = matrixPoints(opps);

  return (
    <div>
      <ResponsiveContainer width="100%" height={320}>
        <ScatterChart margin={{ top: 16, right: 16, bottom: 24, left: 0 }}>
          <CartesianGrid stroke="#eef0f3" />
          <XAxis
            type="number"
            dataKey="x"
            name="Ease of build"
            domain={[0, 10]}
            tickCount={6}
            fontSize={11}
            stroke="#64748b"
            label={{ value: "קלות בנייה", position: "insideBottom", offset: -12, fontSize: 11, fill: "#64748b" }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Market pull"
            domain={[0, 10]}
            tickCount={6}
            fontSize={11}
            stroke="#64748b"
            label={{ value: "משיכת שוק", angle: -90, position: "insideLeft", offset: 16, fontSize: 11, fill: "#64748b" }}
          />
          <ZAxis type="number" dataKey="z" range={[60, 520]} />
          <ReferenceLine x={5} stroke="#cbd5e1" strokeDasharray="4 4" />
          <ReferenceLine y={5} stroke="#cbd5e1" strokeDasharray="4 4" />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={({ payload }) => {
              if (!payload || !payload.length) return null;
              const p = payload[0].payload as (typeof data)[number];
              return (
                <div className="rounded-xl border border-border bg-surface px-3 py-2 text-xs shadow-pop">
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-muted">ציון {p.score} · קלות {p.x} · משיכה {p.y}</p>
                </div>
              );
            }}
          />
          <Scatter
            data={data}
            onClick={(node) => {
              const p = node as unknown as { id?: string; payload?: { id?: string } };
              const id = p.id ?? p.payload?.id;
              if (id) router.push(`/opportunities/${id}`);
            }}
            cursor="pointer"
          >
            {data.map((d) => (
              <Cell key={d.id} fill={scoreColor(d.score)} fillOpacity={0.7} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      <p className="mt-2 text-center text-xs text-muted">
        הרבע הימני־עליון = משיכת שוק גבוהה ובנייה קלה (ההימורים הטובים ביותר). גודל הבועה = ציון סופי.
      </p>
    </div>
  );
}
