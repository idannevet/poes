"use client";

import { Field } from "@/components/ui/Field";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { NumberInput } from "../controls";
import { FieldGrid } from "../SectionCard";
import { POC_RESULTS, SUGGESTED_POC_HOURS } from "@/lib/constants";
import type { PocSection } from "@/lib/types";

interface Props {
  value: PocSection;
  set: (patch: Partial<PocSection>) => void;
}

export function PocFields({ value, set }: Props) {
  return (
    <>
      <Field label="מטרת ה-POC" hint="לאמת את ההנחה המרכזית בלבד.">
        <Textarea value={value.goal} onChange={(e) => set({ goal: e.target.value })} />
      </Field>
      <Field label="קריטריוני הצלחה">
        <Textarea value={value.successCriteria} onChange={(e) => set({ successCriteria: e.target.value })} />
      </Field>

      <FieldGrid>
        <Field label="שעות פיתוח מקסימליות" hint={`מומלץ: ${SUGGESTED_POC_HOURS.join(" · ")}`}>
          <NumberInput value={value.maxDevHours} onChange={(maxDevHours) => set({ maxDevHours })} suffix="שע'" />
        </Field>
        <Field label="עלות POC">
          <NumberInput value={value.cost} onChange={(cost) => set({ cost })} prefix="$" />
        </Field>
        <Field label="תאריך התחלת POC">
          <Input type="date" value={value.startDate} onChange={(e) => set({ startDate: e.target.value })} />
        </Field>
        <Field label="תאריך סיום POC">
          <Input type="date" value={value.endDate} onChange={(e) => set({ endDate: e.target.value })} />
        </Field>
        <Field label="תוצאת POC">
          <Select value={value.result} onChange={(e) => set({ result: e.target.value as PocSection["result"] })}>
            <option value="">טרם בוצע…</option>
            {POC_RESULTS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="ציון POC (0-10)" hint="השאר על 0 כדי להיגזר מהתוצאה שלמעלה.">
          <Slider min={0} max={10} value={value.score} onChange={(score) => set({ score })} />
        </Field>
      </FieldGrid>

      <Field label="תוצאות שנמדדו">
        <Textarea value={value.measuredResults} onChange={(e) => set({ measuredResults: e.target.value })} />
      </Field>
    </>
  );
}
