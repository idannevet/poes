"use client";

import { Field } from "@/components/ui/Field";
import { Textarea } from "@/components/ui/Input";
import { NumberInput } from "../controls";
import { FieldGrid } from "../SectionCard";
import type { MarketSection } from "@/lib/types";

interface Props {
  value: MarketSection;
  set: (patch: Partial<MarketSection>) => void;
}

export function MarketFields({ value, set }: Props) {
  return (
    <>
      <FieldGrid>
        <Field label="ראיונות שבוצעו">
          <NumberInput value={value.interviewsConducted} onChange={(interviewsConducted) => set({ interviewsConducted })} />
        </Field>
        <Field label="מאשרים שהבעיה קיימת">
          <NumberInput value={value.confirmingProblemExists} onChange={(confirmingProblemExists) => set({ confirmingProblemExists })} />
        </Field>
        <Field label="מאשרים שהבעיה משמעותית">
          <NumberInput value={value.confirmingSignificant} onChange={(confirmingSignificant) => set({ confirmingSignificant })} />
        </Field>
        <Field label="מחפשים פתרון באופן פעיל">
          <NumberInput value={value.activelyLooking} onChange={(activelyLooking) => set({ activelyLooking })} />
        </Field>
        <Field label={`אמרו "אם זה עובד, אני רוצה את זה"`}>
          <NumberInput value={value.wantItIfWorks} onChange={(wantItIfWorks) => set({ wantItIfWorks })} />
        </Field>
        <Field label="מעוניינים בתוכנית פיילוט">
          <NumberInput value={value.interestedInPilot} onChange={(interestedInPilot) => set({ interestedInPilot })} />
        </Field>
      </FieldGrid>

      <Field label="ציטוטי לקוחות חזקים" hint="שמור משוב ישיר מהראיונות.">
        <Textarea rows={4} value={value.strongQuotes} onChange={(e) => set({ strongQuotes: e.target.value })} />
      </Field>
    </>
  );
}
