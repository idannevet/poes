import { cn } from "@/lib/format";
import { STATUSES } from "@/lib/constants";
import type { OpportunityStatus } from "@/lib/types";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        className,
      )}
      {...props}
    />
  );
}

const STATUS_STYLES: Record<OpportunityStatus, string> = {
  draft: "bg-slate-50 text-slate-600 border-slate-200",
  in_validation: "bg-sky-50 text-sky-700 border-sky-200",
  reviewed: "bg-violet-50 text-violet-700 border-violet-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  archived: "bg-slate-100 text-slate-500 border-slate-200",
};

export function StatusBadge({ status }: { status: OpportunityStatus }) {
  const label = STATUSES.find((s) => s.value === status)?.label ?? status;
  return <Badge className={STATUS_STYLES[status]}>{label}</Badge>;
}
