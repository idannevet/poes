"use client";

import { Field } from "@/components/ui/Field";
import { Textarea } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { NumberInput } from "../controls";
import { FieldGrid } from "../SectionCard";
import type { TechnicalSection } from "@/lib/types";

interface Props {
  value: TechnicalSection;
  set: (patch: Partial<TechnicalSection>) => void;
}

export function TechnicalFields({ value, set }: Props) {
  return (
    <>
      <FieldGrid>
        <Field label="מורכבות טכנית (1-10)" hint="10 = קשה במיוחד, 1 = פשוט מאוד.">
          <Slider value={value.complexity} onChange={(complexity) => set({ complexity })} />
        </Field>
        <Field label="תלות ב-AI (1-10)" hint="עד כמה ההצלחה תלויה בביצועי ה-AI?">
          <Slider value={value.aiDependency} onChange={(aiDependency) => set({ aiDependency })} />
        </Field>
        <Field label="מורכבות תשתית (1-10)">
          <Slider value={value.infraComplexity} onChange={(infraComplexity) => set({ infraComplexity })} />
        </Field>
      </FieldGrid>

      <FieldGrid>
        <Field label="הערכת זמן פיתוח">
          <NumberInput value={value.devTimeHours} onChange={(devTimeHours) => set({ devTimeHours })} suffix="שע'" />
        </Field>
        <Field label="הערכת תקציב פיתוח">
          <NumberInput value={value.devBudget} onChange={(devBudget) => set({ devBudget })} prefix="$" />
        </Field>
      </FieldGrid>

      <Field label="סיכונים טכניים">
        <Textarea value={value.risks} onChange={(e) => set({ risks: e.target.value })} />
      </Field>
    </>
  );
}
