"use client";

import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Input";
import { Toggle } from "@/components/ui/Toggle";
import { NumberInput } from "../controls";
import { FieldGrid } from "../SectionCard";
import { PRICING_MODELS } from "@/lib/constants";
import type { EconomicsSection } from "@/lib/types";

interface Props {
  value: EconomicsSection;
  set: (patch: Partial<EconomicsSection>) => void;
}

export function EconomicsFields({ value, set }: Props) {
  return (
    <>
      <FieldGrid>
        <Field label="חיסכון חודשי משוער ללקוח">
          <NumberInput value={value.monthlyCustomerSavings} onChange={(monthlyCustomerSavings) => set({ monthlyCustomerSavings })} prefix="$" />
        </Field>
        <Field label="חיסכון שנתי משוער ללקוח">
          <NumberInput value={value.annualCustomerSavings} onChange={(annualCustomerSavings) => set({ annualCustomerSavings })} prefix="$" />
        </Field>
        <Field label="מודל תמחור">
          <Select
            value={value.pricingModel}
            onChange={(e) => set({ pricingModel: e.target.value as EconomicsSection["pricingModel"] })}
          >
            {PRICING_MODELS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="סכום מחיר">
          <NumberInput value={value.priceAmount} onChange={(priceAmount) => set({ priceAmount })} prefix="$" />
        </Field>
        <Field label="עלות רכישת לקוח (CAC)">
          <NumberInput value={value.cac} onChange={(cac) => set({ cac })} prefix="$" />
        </Field>
        <Field label="ערך חיי לקוח (LTV)">
          <NumberInput value={value.ltv} onChange={(ltv) => set({ ltv })} prefix="$" />
        </Field>
        <Field label="רווח גולמי צפוי">
          <NumberInput value={value.grossMarginPct} onChange={(grossMarginPct) => set({ grossMarginPct })} max={100} suffix="%" />
        </Field>
        <Field label="תקופת החזר משוערת">
          <NumberInput value={value.paybackMonths} onChange={(paybackMonths) => set({ paybackMonths })} suffix="חודשים" />
        </Field>
        <Field label="שוק כולל בר-מיעון (TAM)" hint="מספר חברות בעולם.">
          <NumberInput value={value.tam} onChange={(tam) => set({ tam })} />
        </Field>
        <Field label="שוק בר-שירות (SAM)">
          <NumberInput value={value.sam} onChange={(sam) => set({ sam })} />
        </Field>
        <Field label="שוק בר-השגה (SOM)">
          <NumberInput value={value.som} onChange={(som) => set({ som })} />
        </Field>
      </FieldGrid>

      <Field label="האם ניתן להתרחב בינלאומית?">
        <Toggle value={value.canExpandInternationally} onChange={(canExpandInternationally) => set({ canExpandInternationally })} />
      </Field>
    </>
  );
}
