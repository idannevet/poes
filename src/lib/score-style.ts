import type { DecisionResult } from "./types";

export interface ToneStyle {
  text: string;
  bg: string;
  border: string;
  ring: string; // hex for charts / svg
}

const TONE_STYLES: Record<DecisionResult["tone"], ToneStyle> = {
  exceptional: { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", ring: "#059669" },
  high: { text: "text-green-700", bg: "bg-green-50", border: "border-green-200", ring: "#16a34a" },
  promising: { text: "text-sky-700", bg: "bg-sky-50", border: "border-sky-200", ring: "#0284c7" },
  research: { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", ring: "#d97706" },
  weak: { text: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200", ring: "#ea580c" },
  reject: { text: "text-red-700", bg: "bg-red-50", border: "border-red-200", ring: "#dc2626" },
};

export function toneFromScore(score: number): DecisionResult["tone"] {
  if (score >= 90) return "exceptional";
  if (score >= 80) return "high";
  if (score >= 70) return "promising";
  if (score >= 60) return "research";
  if (score >= 50) return "weak";
  return "reject";
}

export function toneStyle(tone: DecisionResult["tone"]): ToneStyle {
  return TONE_STYLES[tone];
}

export function scoreColor(score: number): string {
  return TONE_STYLES[toneFromScore(score)].ring;
}
