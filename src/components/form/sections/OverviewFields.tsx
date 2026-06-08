"use client";

import { Field } from "@/components/ui/Field";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { Slider } from "@/components/ui/Slider";
import { FieldGrid } from "../SectionCard";
import { INDUSTRIES, PRODUCT_CATEGORIES, TARGET_USERS } from "@/lib/constants";
import type { OverviewSection } from "@/lib/types";

interface Props {
  value: OverviewSection;
  set: (patch: Partial<OverviewSection>) => void;
}

export function OverviewFields({ value, set }: Props) {
  return (
    <>
      <FieldGrid>
        <Field label="שם ההזדמנות" htmlFor="opp-name">
          <Input
            id="opp-name"
            value={value.name}
            onChange={(e) => set({ name: e.target.value })}
            placeholder="לדוגמה: סוכן AI למיון תביעות"
          />
        </Field>
        <Field label="ענף / שוק">
          <Select value={value.industry} onChange={(e) => set({ industry: e.target.value })}>
            <option value="">בחר ענף…</option>
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="קטגוריית מוצר">
          <Select
            value={value.productCategory}
            onChange={(e) => set({ productCategory: e.target.value })}
          >
            <option value="">בחר קטגוריה…</option>
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Field>
      </FieldGrid>

      <Field label="תיאור קצר" hint="תאר את רעיון המוצר ב-2-3 משפטים.">
        <Textarea
          value={value.shortDescription}
          onChange={(e) => set({ shortDescription: e.target.value })}
        />
      </Field>

      <Field label="משתמש יעד">
        <MultiSelect
          options={TARGET_USERS}
          selected={value.targetUsers}
          onChange={(targetUsers) => set({ targetUsers })}
        />
      </Field>

      <Field
        label="למה עכשיו?"
        hint="איזה שינוי בשוק, טכנולוגיה, רגולציה, התקדמות ב-AI או מגמה עסקית הופך את זה לרלוונטי כעת?"
      >
        <Textarea value={value.whyNow} onChange={(e) => set({ whyNow: e.target.value })} />
      </Field>

      <Field label={`עוצמת "למה עכשיו" (0-5)`}>
        <Slider min={0} max={5} value={value.whyNowScore} onChange={(whyNowScore) => set({ whyNowScore })} />
      </Field>
    </>
  );
}
