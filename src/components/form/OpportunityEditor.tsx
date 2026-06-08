"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Loader2, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Input";
import { StatusBadge } from "@/components/ui/Badge";
import { SectionCard } from "./SectionCard";
import { ScorePanel } from "./ScorePanel";
import { OverviewFields } from "./sections/OverviewFields";
import { PainFields } from "./sections/PainFields";
import { MarketFields } from "./sections/MarketFields";
import { CompetitorFields } from "./sections/CompetitorFields";
import { EconomicsFields } from "./sections/EconomicsFields";
import { TechnicalFields } from "./sections/TechnicalFields";
import { PocFields } from "./sections/PocFields";
import { DemandFields } from "./sections/DemandFields";
import { StrategicFields } from "./sections/StrategicFields";
import { scoreOpportunity } from "@/lib/scoring";
import { STATUSES } from "@/lib/constants";
import type { OpportunityForm, OpportunityStatus } from "@/lib/types";
import {
  createOpportunityAction,
  deleteOpportunityAction,
  updateOpportunityAction,
} from "@/app/(app)/opportunities/actions";

interface Props {
  id?: string;
  initialForm: OpportunityForm;
  initialStatus: OpportunityStatus;
}

export function OpportunityEditor({ id, initialForm, initialStatus }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<OpportunityForm>(initialForm);
  const [status, setStatus] = useState<OpportunityStatus>(initialStatus);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [deleting, startDelete] = useTransition();

  const result = useMemo(() => scoreOpportunity(form), [form]);

  // Update a single section slice immutably.
  function patchSection<K extends keyof OpportunityForm>(
    key: K,
    patch: Partial<OpportunityForm[K]>,
  ) {
    setSaved(false);
    setForm((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
  }

  function handleSave() {
    setError(null);
    startTransition(async () => {
      try {
        if (id) {
          await updateOpportunityAction(id, form, status);
          setSaved(true);
          router.refresh();
        } else {
          await createOpportunityAction(form, status);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "השמירה נכשלה.");
      }
    });
  }

  function handleDelete() {
    if (!id) return;
    if (!confirm("למחוק את ההזדמנות? לא ניתן לבטל פעולה זו.")) return;
    startDelete(async () => {
      try {
        await deleteOpportunityAction(id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "המחיקה נכשלה.");
      }
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8">
      {/* Header bar */}
      <div className="sticky top-0 z-10 -mx-4 mb-6 flex flex-wrap items-center gap-3 border-b border-border bg-bg/90 px-4 py-3 backdrop-blur lg:-mx-8 lg:px-8">
        <Link href="/" className="flex items-center gap-1.5 text-sm text-muted hover:text-text">
          <ArrowRight className="h-4 w-4" /> לוח בקרה
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold tracking-tight">
            {form.overview.name || "הזדמנות חדשה"}
          </h1>
        </div>
        <StatusBadge status={status} />
        <Select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as OpportunityStatus);
            setSaved(false);
          }}
          className="h-9 w-auto"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </Select>
        {id ? (
          <Button variant="ghost" size="sm" onClick={handleDelete} disabled={deleting} aria-label="מחיקה">
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
          </Button>
        ) : null}
        <Button onClick={handleSave} disabled={pending}>
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : saved ? (
            <Check className="h-4 w-4" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saved ? "נשמר" : id ? "שמירה" : "יצירה"}
        </Button>
      </div>

      {error ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-danger">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <SectionCard step={1} title="סקירת הזדמנות">
            <OverviewFields value={form.overview} set={(p) => patchSection("overview", p)} />
          </SectionCard>
          <SectionCard step={2} title="ניתוח כאב" goal="לקבוע אם הבעיה אמיתית, מדידה ויקרה.">
            <PainFields value={form.pain} set={(p) => patchSection("pain", p)} />
          </SectionCard>
          <SectionCard step={3} title="אימות שוק" goal="לוודא שלקונים אמיתיים באמת אכפת.">
            <MarketFields value={form.market} set={(p) => patchSection("market", p)} />
          </SectionCard>
          <SectionCard step={4} title="ניתוח מתחרים" goal="להבין את בשלות השוק והמיצוב.">
            <CompetitorFields value={form.competitor} set={(p) => patchSection("competitor", p)} />
          </SectionCard>
          <SectionCard step={5} title="מודל עסקי וכלכלה" goal="לקבוע אם ההזדמנות אטרקטיבית כלכלית.">
            <EconomicsFields value={form.economics} set={(p) => patchSection("economics", p)} />
          </SectionCard>
          <SectionCard step={6} title="היתכנות טכנית" goal="לקבוע אם נוכל באמת לבנות ולתחזק זאת.">
            <TechnicalFields value={form.technical} set={(p) => patchSection("technical", p)} />
          </SectionCard>
          <SectionCard step={7} title="הוכחת היתכנות (POC)" goal="לאמת את ההנחה המרכזית בלבד.">
            <PocFields value={form.poc} set={(p) => patchSection("poc", p)} />
          </SectionCard>
          <SectionCard step={8} title="הדגמות ואימות מוקדם" goal="למדוד כוונת רכישה אמיתית.">
            <DemandFields value={form.demand} set={(p) => patchSection("demand", p)} />
          </SectionCard>
          <SectionCard step={9} title="התאמה אסטרטגית" goal="לקבוע אם זה מתאים ל-Archi-Tech.">
            <StrategicFields value={form.strategic} set={(p) => patchSection("strategic", p)} />
          </SectionCard>
        </div>

        <div className="lg:sticky lg:top-20 lg:h-fit">
          <ScorePanel result={result} />
        </div>
      </div>
    </div>
  );
}
