"use client";

import { Field } from "@/components/ui/Field";
import { Slider } from "@/components/ui/Slider";
import { FieldGrid } from "../SectionCard";
import type { StrategicSection } from "@/lib/types";

interface Props {
  value: StrategicSection;
  set: (patch: Partial<StrategicSection>) => void;
}

export function StrategicFields({ value, set }: Props) {
  return (
    <FieldGrid>
      <Field label="מתאים למומחיות הקיימת? (1-10)">
        <Slider value={value.alignsWithExpertise} onChange={(alignsWithExpertise) => set({ alignsWithExpertise })} />
      </Field>
      <Field label="האם לקוחות קיימים יכולים לקנות? (1-10)">
        <Slider value={value.existingCustomersCanBuy} onChange={(existingCustomersCanBuy) => set({ existingCustomersCanBuy })} />
      </Field>
      <Field label="האם הצוות הקיים יכול לבנות? (1-10)">
        <Slider value={value.existingTeamCanBuild} onChange={(existingTeamCanBuild) => set({ existingTeamCanBuild })} />
      </Field>
      <Field label="האם צוות המכירות הקיים יכול למכור? (1-10)">
        <Slider value={value.salesTeamCanSell} onChange={(salesTeamCanSell) => set({ salesTeamCanSell })} />
      </Field>
      <Field label="האם זה יחזק את מיצוב החברה? (1-10)">
        <Slider value={value.strengthensPositioning} onChange={(strengthensPositioning) => set({ strengthensPositioning })} />
      </Field>
    </FieldGrid>
  );
}
