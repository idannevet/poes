import { forwardRef } from "react";
import { cn } from "@/lib/format";

const base =
  "w-full rounded-lg border border-border bg-surface px-3 text-sm text-text placeholder:text-muted/70 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:border-accent transition";

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(base, "h-10", className)} {...props} />
  ),
);
Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, rows = 3, ...props }, ref) => (
  <textarea ref={ref} rows={rows} className={cn(base, "py-2 resize-y", className)} {...props} />
));
Textarea.displayName = "Textarea";

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select ref={ref} className={cn(base, "h-10 pe-8", className)} {...props}>
    {children}
  </select>
));
Select.displayName = "Select";
