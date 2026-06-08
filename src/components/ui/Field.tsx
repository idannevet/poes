import { cn } from "@/lib/format";

interface FieldProps {
  label: string;
  hint?: string;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}

export function Field({ label, hint, htmlFor, className, children }: FieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-text">
        {label}
      </label>
      {children}
      {hint ? <p className="text-xs text-muted">{hint}</p> : null}
    </div>
  );
}
