"use client";

import { Field } from "@/components/ui/Field";
import { Select, Textarea } from "@/components/ui/Input";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { Slider } from "@/components/ui/Slider";
import { NumberInput } from "../controls";
import { FieldGrid } from "../SectionCard";
import { CONSEQUENCES, FREQUENCY_UNITS } from "@/lib/constants";
import type { PainSection } from "@/lib/types";

interface Props {
  value: PainSection;
  set: (patch: Partial<PainSection>) => void;
}

export function PainFields({ value, set }: Props) {
  return (
    <>
      <Field label="הגדרת הבעיה" hint="תאר את הבעיה העסקית המדויקת.">
        <Textarea value={value.problemStatement} onChange={(e) => set({ problemStatement: e.target.value })} />
      </Field>
      <Field label="התהליך הנוכחי" hint="כיצד עסקים פותרים כיום את הבעיה?">
        <Textarea value={value.currentProcess} onChange={(e) => set({ currentProcess: e.target.value })} />
      </Field>

      <FieldGrid>
        <Field label="תדירות" hint="כמה פעמים מתרחש התהליך?">
          <NumberInput value={value.frequency} onChange={(frequency) => set({ frequency })} />
        </Field>
        <Field label="יחידת תדירות">
          <Select
            value={value.frequencyUnit}
            onChange={(e) => set({ frequencyUnit: e.target.value as PainSection["frequencyUnit"] })}
          >
            {FREQUENCY_UNITS.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="זמן לכל מופע">
          <NumberInput value={value.timePerOccurrenceMin} onChange={(timePerOccurrenceMin) => set({ timePerOccurrenceMin })} suffix="דק'" />
        </Field>
        <Field label="מספר עובדים מעורבים">
          <NumberInput value={value.employeesInvolved} onChange={(employeesInvolved) => set({ employeesInvolved })} />
        </Field>
        <Field label="עלות עבודה חודשית משוערת">
          <NumberInput value={value.monthlyLaborCost} onChange={(monthlyLaborCost) => set({ monthlyLaborCost })} prefix="$" />
        </Field>
        <Field label="השפעה כספית חודשית משוערת" hint="העלות החודשית הכוללת של הבעיה.">
          <NumberInput value={value.monthlyFinancialImpact} onChange={(monthlyFinancialImpact) => set({ monthlyFinancialImpact })} prefix="$" />
        </Field>
      </FieldGrid>

      <Field label="השלכות אם לא ייפתר">
        <MultiSelect options={CONSEQUENCES} selected={value.consequences} onChange={(consequences) => set({ consequences })} />
      </Field>

      <FieldGrid>
        <Field label="חומרת הכאב (1-10)" hint="עד כמה זה כואב לפי לקוחות שרואיינו?">
          <Slider value={value.painSeverity} onChange={(painSeverity) => set({ painSeverity })} />
        </Field>
        <Field label="איכות כימות הכאב (1-10)" hint="עד כמה אנו בטוחים שהכאב מדיד כספית?">
          <Slider value={value.painQuantificationQuality} onChange={(painQuantificationQuality) => set({ painQuantificationQuality })} />
        </Field>
      </FieldGrid>
    </>
  );
}
