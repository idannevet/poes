"use client";

import { Field } from "@/components/ui/Field";
import { Textarea } from "@/components/ui/Input";
import { NumberInput } from "../controls";
import { FieldGrid } from "../SectionCard";
import type { DemandSection } from "@/lib/types";

interface Props {
  value: DemandSection;
  set: (patch: Partial<DemandSection>) => void;
}

export function DemandFields({ value, set }: Props) {
  return (
    <>
      <FieldGrid>
        <Field label="הדגמות שבוצעו">
          <NumberInput value={value.demosPresented} onChange={(demosPresented) => set({ demosPresented })} />
        </Field>
        <Field label="ביקשו פיילוט">
          <NumberInput value={value.requestingPilot} onChange={(requestingPilot) => set({ requestingPilot })} />
        </Field>
        <Field label="ביקשו הצעה">
          <NumberInput value={value.requestingProposal} onChange={(requestingProposal) => set({ requestingProposal })} />
        </Field>
        <Field label="רוצים גישה מוקדמת">
          <NumberInput value={value.wantingEarlyAccess} onChange={(wantingEarlyAccess) => set({ wantingEarlyAccess })} />
        </Field>
        <Field label={`אמרו "הייתי קונה את זה"`}>
          <NumberInput value={value.wouldBuy} onChange={(wouldBuy) => set({ wouldBuy })} />
        </Field>
        <Field label="מוכנים להשתתף בבטא">
          <NumberInput value={value.willingBeta} onChange={(willingBeta) => set({ willingBeta })} />
        </Field>
        <Field label="מוכנים למכירה מוקדמת">
          <NumberInput value={value.readyPreSale} onChange={(readyPreSale) => set({ readyPreSale })} />
        </Field>
      </FieldGrid>

      <Field label="משוב מההדגמות">
        <Textarea rows={4} value={value.feedback} onChange={(e) => set({ feedback: e.target.value })} />
      </Field>
    </>
  );
}
