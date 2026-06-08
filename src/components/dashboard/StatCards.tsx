import { CheckCircle2, Layers, Trophy, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { DashboardStats } from "@/lib/dashboard";

export function StatCards({ stats }: { stats: DashboardStats }) {
  const items = [
    { label: "סך ההזדמנויות", value: stats.total, icon: Layers, color: "text-accent" },
    { label: "ציון ממוצע", value: stats.avgScore, icon: TrendingUp, color: "text-sky-600" },
    { label: "אושרו", value: stats.approved, icon: CheckCircle2, color: "text-emerald-600" },
    { label: "הציון הגבוה ביותר", value: stats.topScore, icon: Trophy, color: "text-amber-600" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <Card key={it.label} className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-muted">{it.label}</span>
              <Icon className={`h-4 w-4 ${it.color}`} />
            </div>
            <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight">{it.value}</p>
          </Card>
        );
      })}
    </div>
  );
}
