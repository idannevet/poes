import { Card } from "@/components/ui/Card";

interface SectionCardProps {
  step: number;
  title: string;
  goal?: string;
  children: React.ReactNode;
}

export function SectionCard({ step, title, goal, children }: SectionCardProps) {
  return (
    <Card id={`section-${step}`} className="scroll-mt-24">
      <div className="flex items-start gap-3 border-b border-border px-5 py-4">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent">
          {step}
        </span>
        <div>
          <h2 className="text-base font-semibold tracking-tight">{title}</h2>
          {goal ? <p className="mt-0.5 text-sm text-muted">{goal}</p> : null}
        </div>
      </div>
      <div className="space-y-5 p-5">{children}</div>
    </Card>
  );
}

/** Two-column responsive grid for fields. */
export function FieldGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
}
