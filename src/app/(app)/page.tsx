import { AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { listOpportunities } from "@/lib/data/opportunities";
import { Dashboard } from "@/components/dashboard/Dashboard";
import type { Opportunity } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createClient();
  let opportunities: Opportunity[] = [];
  let loadError: string | null = null;

  try {
    opportunities = await listOpportunities(supabase);
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Failed to load opportunities.";
  }

  if (loadError) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <div className="mb-2 flex items-center gap-2 text-amber-700">
            <AlertTriangle className="h-5 w-5" />
            <h2 className="font-semibold">טעינת הנתונים נכשלה</h2>
          </div>
          <p className="text-sm text-amber-800">{loadError}</p>
          <p className="mt-3 text-sm text-amber-800">
            ודא שהרצת את <code className="rounded bg-amber-100 px-1">supabase/schema.sql</code> בפרויקט
            ה-Supabase שלך והגדרת את משתני הסביבה בקובץ{" "}
            <code className="rounded bg-amber-100 px-1">.env.local</code>.
          </p>
        </div>
      </div>
    );
  }

  return <Dashboard opportunities={opportunities} />;
}
