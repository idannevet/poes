import { CATEGORY_WEIGHTS } from "./constants";
import type { CategoryScores, Opportunity, OpportunityStatus } from "./types";

export interface DashboardStats {
  total: number;
  avgScore: number;
  approved: number;
  topScore: number;
}

export function computeStats(opps: Opportunity[]): DashboardStats {
  if (opps.length === 0) return { total: 0, avgScore: 0, approved: 0, topScore: 0 };
  const sum = opps.reduce((s, o) => s + o.finalScore, 0);
  return {
    total: opps.length,
    avgScore: Math.round(sum / opps.length),
    approved: opps.filter((o) => o.status === "approved").length,
    topScore: Math.max(...opps.map((o) => o.finalScore)),
  };
}

// Score distribution aligned to the decision-engine bands.
const BANDS: { label: string; min: number; max: number; color: string }[] = [
  { label: "<50", min: 0, max: 49, color: "#dc2626" },
  { label: "50-59", min: 50, max: 59, color: "#ea580c" },
  { label: "60-69", min: 60, max: 69, color: "#d97706" },
  { label: "70-79", min: 70, max: 79, color: "#0284c7" },
  { label: "80-89", min: 80, max: 89, color: "#16a34a" },
  { label: "90-100", min: 90, max: 100, color: "#059669" },
];

export function scoreDistribution(opps: Opportunity[]) {
  return BANDS.map((b) => ({
    label: b.label,
    color: b.color,
    count: opps.filter((o) => o.finalScore >= b.min && o.finalScore <= b.max).length,
  }));
}

// Validation funnel: how far opportunities progress through the lifecycle.
const FUNNEL_STAGES: { label: string; statuses: OpportunityStatus[] }[] = [
  { label: "נוצרו", statuses: ["draft", "in_validation", "reviewed", "approved", "rejected", "archived"] },
  { label: "באימות", statuses: ["in_validation", "reviewed", "approved"] },
  { label: "נבדקו", statuses: ["reviewed", "approved"] },
  { label: "אושרו", statuses: ["approved"] },
];

export function validationFunnel(opps: Opportunity[]) {
  return FUNNEL_STAGES.map((stage) => ({
    label: stage.label,
    count: opps.filter((o) => stage.statuses.includes(o.status)).length,
  }));
}

// Average category scores across the portfolio (for the category radar/bars).
export function averageCategoryScores(opps: Opportunity[]) {
  return CATEGORY_WEIGHTS.map((w) => {
    const key = w.key as keyof CategoryScores;
    const avg =
      opps.length === 0
        ? 0
        : opps.reduce((s, o) => s + (o.scores?.[key] ?? 0), 0) / opps.length;
    return { key, label: w.label, value: Math.round(avg * 10) / 10 };
  });
}

// Market Opportunity Matrix points: ease of build (x) vs. market pull (y).
export interface MatrixPoint {
  id: string;
  name: string;
  x: number; // technical feasibility (ease) 0-10
  y: number; // market pull = avg(market, demand) 0-10
  z: number; // final score (bubble size)
  score: number;
}

export function matrixPoints(opps: Opportunity[]): MatrixPoint[] {
  return opps.map((o) => ({
    id: o.id,
    name: o.name,
    x: o.scores?.technical ?? 0,
    y: Math.round((((o.scores?.market ?? 0) + (o.scores?.demand ?? 0)) / 2) * 10) / 10,
    z: Math.max(4, o.finalScore),
    score: o.finalScore,
  }));
}

export interface Filters {
  industry: string;
  status: string;
  category: string;
  minScore: number;
}

export function applyFilters(opps: Opportunity[], f: Filters): Opportunity[] {
  return opps.filter((o) => {
    if (f.industry && o.industry !== f.industry) return false;
    if (f.status && o.status !== f.status) return false;
    if (f.category && o.productCategory !== f.category) return false;
    if (o.finalScore < f.minScore) return false;
    return true;
  });
}
