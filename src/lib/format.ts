import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const currencyFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatCurrency(n: number): string {
  if (!Number.isFinite(n)) return "$0";
  return currencyFmt.format(n);
}

export function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "0";
  return new Intl.NumberFormat("en-US").format(n);
}

export function formatCompact(n: number): string {
  if (!Number.isFinite(n)) return "0";
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

export function formatDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("he-IL", { year: "numeric", month: "short", day: "numeric" });
}
