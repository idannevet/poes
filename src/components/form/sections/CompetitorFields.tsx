"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input, Textarea } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { NumberInput } from "../controls";
import { FieldGrid } from "../SectionCard";
import type { Competitor, CompetitorSection } from "@/lib/types";

interface Props {
  value: CompetitorSection;
  set: (patch: Partial<CompetitorSection>) => void;
}

function emptyCompetitor(): Competitor {
  return {
    id: crypto.randomUUID(),
    name: "",
    website: "",
    marketPosition: "",
    pricing: "",
    strengths: "",
    weaknesses: "",
  };
}

export function CompetitorFields({ value, set }: Props) {
  const updateCompetitor = (id: string, patch: Partial<Competitor>) =>
    set({ competitors: value.competitors.map((c) => (c.id === id ? { ...c, ...patch } : c)) });

  const removeCompetitor = (id: string) =>
    set({ competitors: value.competitors.filter((c) => c.id !== id) });

  return (
    <>
      <Field label="מספר מתחרים ישירים">
        <NumberInput value={value.directCompetitors} onChange={(directCompetitors) => set({ directCompetitors })} />
      </Field>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">מתחרים מובילים</span>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => set({ competitors: [...value.competitors, emptyCompetitor()] })}
          >
            <Plus className="h-4 w-4" /> הוספה
          </Button>
        </div>

        {value.competitors.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border bg-surface-2 px-4 py-6 text-center text-sm text-muted">
            טרם נוספו מתחרים.
          </p>
        ) : (
          value.competitors.map((c, idx) => (
            <div key={c.id} className="rounded-xl border border-border bg-surface-2 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wide text-muted">
                  מתחרה {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeCompetitor(c.id)}
                  className="text-muted transition hover:text-danger"
                  aria-label="הסר מתחרה"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input placeholder="שם" value={c.name} onChange={(e) => updateCompetitor(c.id, { name: e.target.value })} />
                <Input placeholder="אתר" value={c.website} onChange={(e) => updateCompetitor(c.id, { website: e.target.value })} />
                <Input placeholder="מיצוב שוק משוער" value={c.marketPosition} onChange={(e) => updateCompetitor(c.id, { marketPosition: e.target.value })} />
                <Input placeholder="תמחור" value={c.pricing} onChange={(e) => updateCompetitor(c.id, { pricing: e.target.value })} />
                <Textarea placeholder="חוזקות" rows={2} value={c.strengths} onChange={(e) => updateCompetitor(c.id, { strengths: e.target.value })} />
                <Textarea placeholder="חולשות" rows={2} value={c.weaknesses} onChange={(e) => updateCompetitor(c.id, { weaknesses: e.target.value })} />
              </div>
            </div>
          ))
        )}
      </div>

      <FieldGrid>
        <Field label="עד כמה הפתרונות הקיימים דומים? (1-10)" hint="10 = כמעט זהים, 1 = אין חלופות אמיתיות.">
          <Slider value={value.solutionSimilarity} onChange={(solutionSimilarity) => set({ solutionSimilarity })} />
        </Field>
        <Field label="עד כמה הבידול שלנו חזק? (1-10)" hint="AI, עלות נמוכה יותר, הקמה מהירה, UX טוב יותר, התמקדות ענפית…">
          <Slider value={value.differentiation} onChange={(differentiation) => set({ differentiation })} />
        </Field>
        <Field label="ביטחון בפער התחרותי (1-10)" hint="עד כמה אנו בטוחים שהפער אמיתי ובר-הגנה?">
          <Slider value={value.gapConfidence} onChange={(gapConfidence) => set({ gapConfidence })} />
        </Field>
      </FieldGrid>

      <Field label="תיאור הפער התחרותי">
        <Textarea value={value.gapDescription} onChange={(e) => set({ gapDescription: e.target.value })} />
      </Field>
    </>
  );
}
