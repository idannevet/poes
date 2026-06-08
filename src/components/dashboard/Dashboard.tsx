"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatCards } from "./StatCards";
import { Filters } from "./Filters";
import { RankingTable } from "./RankingTable";
import { ScoreDistributionChart } from "./charts/ScoreDistributionChart";
import { ValidationFunnelChart } from "./charts/ValidationFunnelChart";
import { CategoryRadarChart } from "./charts/CategoryRadarChart";
import { OpportunityMatrix } from "./charts/OpportunityMatrix";
import { applyFilters, computeStats, type Filters as FilterState } from "@/lib/dashboard";
import { STATUSES } from "@/lib/constants";
import type { Opportunity } from "@/lib/types";

const INITIAL_FILTERS: FilterState = { industry: "", status: "", category: "", minScore: 0 };

export function Dashboard({ opportunities }: { opportunities: Opportunity[] }) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const filtered = useMemo(() => applyFilters(opportunities, filters), [opportunities, filters]);
  const stats = useMemo(() => computeStats(filtered), [filtered]);

  const patch = (p: Partial<FilterState>) => setFilters((prev) => ({ ...prev, ...p }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">לוח בקרת הזדמנויות</h1>
          <p className="text-sm text-muted">הערכת מיזמים אובייקטיבית ומבוססת נתונים עבור Archi-Tech.</p>
        </div>
        <Link href="/opportunities/new">
          <Button>
            <Plus className="h-4 w-4" /> הזדמנות חדשה
          </Button>
        </Link>
      </div>

      <StatCards stats={stats} />

      <div className="my-5">
        <Filters value={filters} onChange={patch} />
      </div>

      {/* Charts */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>מטריצת הזדמנויות שוק</CardTitle>
          </CardHeader>
          <CardBody>
            <OpportunityMatrix opps={filtered} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>משפך אימות</CardTitle>
          </CardHeader>
          <CardBody>
            <ValidationFunnelChart opps={filtered} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>התפלגות ציונים</CardTitle>
          </CardHeader>
          <CardBody>
            <ScoreDistributionChart opps={filtered} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ציון ממוצע לפי קטגוריה</CardTitle>
          </CardHeader>
          <CardBody>
            <CategoryRadarChart opps={filtered} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>צנרת לפי סטטוס</CardTitle>
          </CardHeader>
          <CardBody>
            <PipelineSummary opps={filtered} />
          </CardBody>
        </Card>
      </div>

      {/* Leaderboard / ranking */}
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>טבלת דירוג הזדמנויות</CardTitle>
        </CardHeader>
        <CardBody>
          <RankingTable opps={filtered} />
        </CardBody>
      </Card>
    </div>
  );
}

function PipelineSummary({ opps }: { opps: Opportunity[] }) {
  const counts = opps.reduce<Record<string, number>>((acc, o) => {
    acc[o.status] = (acc[o.status] ?? 0) + 1;
    return acc;
  }, {});
  const entries = Object.entries(counts);

  if (entries.length === 0) {
    return <p className="py-8 text-center text-sm text-muted">אין נתונים עדיין.</p>;
  }

  return (
    <ul className="space-y-2 py-1">
      {entries.map(([status, count]) => (
        <li key={status} className="flex items-center justify-between text-sm">
          <span className="text-muted">
            {STATUSES.find((s) => s.value === status)?.label ?? status}
          </span>
          <span className="font-semibold tabular-nums">{count}</span>
        </li>
      ))}
    </ul>
  );
}
