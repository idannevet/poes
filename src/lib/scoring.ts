// POES scoring engine.
//
// Every category produces a normalized 0-10 score. The final score is the
// weighted sum of those category scores mapped onto a 0-100 scale, using the
// weights defined in CATEGORY_WEIGHTS (which sum to 100).
//
// All functions are pure and defensive against missing / zero inputs so the
// engine never throws on a partially-filled form.

import { CATEGORY_WEIGHTS } from "./constants";
import type {
  CategoryScores,
  CompetitorSection,
  DecisionResult,
  DemandSection,
  EconomicsSection,
  MarketSection,
  OpportunityForm,
  PainSection,
  PocSection,
  ScoreBreakdownItem,
  ScoreResult,
  StrategicSection,
  TechnicalSection,
} from "./types";

const clamp = (n: number, min = 0, max = 10): number =>
  Math.max(min, Math.min(max, Number.isFinite(n) ? n : 0));

const round1 = (n: number): number => Math.round(n * 10) / 10;

/** Safe ratio capped to [0,1]. Returns 0 when the denominator is 0. */
const ratio = (num: number, denom: number): number => {
  if (!denom || denom <= 0) return 0;
  return Math.min(1, Math.max(0, num / denom));
};

// --- Section 2: Pain ---
// (Pain Severity x 0.7) + (Pain Quantification Quality x 0.3), each 1-10.
export function painScore(p: PainSection): number {
  return round1(clamp(p.painSeverity * 0.7 + p.painQuantificationQuality * 0.3));
}

// --- Section 3: Market Validation ---
// Weighted interview conversion funnel relative to interviews conducted.
// Deeper intent carries more weight; weights sum to 1.0 so output is 0-10.
export function marketScore(m: MarketSection): number {
  const n = m.interviewsConducted;
  if (!n || n <= 0) return 0;
  const weighted =
    0.1 * ratio(m.confirmingProblemExists, n) +
    0.2 * ratio(m.confirmingSignificant, n) +
    0.25 * ratio(m.activelyLooking, n) +
    0.25 * ratio(m.wantItIfWorks, n) +
    0.2 * ratio(m.interestedInPilot, n);
  return round1(clamp(weighted * 10));
}

// --- Section 4: Competitor ---
// Differentiation x 0.7 + Competitive Gap Confidence x 0.3 (each 1-10).
export function competitorScore(c: CompetitorSection): number {
  return round1(clamp(c.differentiation * 0.7 + c.gapConfidence * 0.3));
}

// --- Section 5: Economics ---
// Average of five sub-scores, each normalized to 0-10.
export function economicsScore(e: EconomicsSection): number {
  // Customer value: annual savings delivered relative to annual price paid.
  const annualPrice =
    e.pricingModel === "one_time" ? e.priceAmount : e.priceAmount * 12;
  const valueRatio =
    annualPrice > 0
      ? e.annualCustomerSavings / annualPrice
      : e.annualCustomerSavings > 0
        ? 10
        : 0;
  const customerValue = clamp(valueRatio); // ratio>=10 caps at 10

  // Margin: gross margin % straight to 0-10.
  const margin = clamp(e.grossMarginPct / 10);

  // LTV/CAC: ratio of 5+ is excellent -> 10.
  const ltvCacRatio = e.cac > 0 ? e.ltv / e.cac : e.ltv > 0 ? 5 : 0;
  const ltvCac = clamp(ltvCacRatio * 2);

  // Market size: log10 of TAM (companies worldwide).
  const marketSize = e.tam > 0 ? clamp(Math.log10(e.tam)) : 0;

  // Scalability: driven by margin, boosted by international reach. Stays 0
  // for an empty form so unfilled sections never inflate the final score.
  const scalability = clamp(
    margin * (e.canExpandInternationally ? 1.5 : 1) + (e.canExpandInternationally ? 2 : 0),
  );

  return round1(
    clamp((customerValue + margin + ltvCac + marketSize + scalability) / 5),
  );
}

// --- Section 6: Technical Feasibility ---
// Higher = easier/safer. Inputs are difficulty (1-10, 10=hard), so we invert.
export function technicalScore(t: TechnicalSection): number {
  const difficulty = (t.complexity + t.aiDependency + t.infraComplexity) / 3;
  if (difficulty <= 0) return 0;
  return round1(clamp(11 - difficulty));
}

// --- Section 7: POC ---
// Direct 0-10 score; if unset, derive a sensible default from the result.
export function pocScore(p: PocSection): number {
  if (p.score && p.score > 0) return round1(clamp(p.score));
  if (p.result === "success") return 9;
  if (p.result === "partial") return 5;
  if (p.result === "failed") return 1;
  return 0;
}

// --- Section 8: Demand ---
// Weighted demo conversion funnel relative to demos presented.
export function demandScore(d: DemandSection): number {
  const n = d.demosPresented;
  if (!n || n <= 0) return 0;
  const weighted =
    0.15 * ratio(d.requestingProposal, n) +
    0.15 * ratio(d.requestingPilot, n) +
    0.15 * ratio(d.wantingEarlyAccess, n) +
    0.2 * ratio(d.wouldBuy, n) +
    0.15 * ratio(d.willingBeta, n) +
    0.2 * ratio(d.readyPreSale, n);
  return round1(clamp(weighted * 10));
}

// --- Section 9: Strategic Fit ---
// Simple average of the five 1-10 alignment questions.
export function strategicScore(s: StrategicSection): number {
  const avg =
    (s.alignsWithExpertise +
      s.existingCustomersCanBuy +
      s.existingTeamCanBuild +
      s.salesTeamCanSell +
      s.strengthensPositioning) /
    5;
  return round1(clamp(avg));
}

export function computeCategoryScores(form: OpportunityForm): CategoryScores {
  return {
    pain: painScore(form.pain),
    market: marketScore(form.market),
    economics: economicsScore(form.economics),
    competitor: competitorScore(form.competitor),
    technical: technicalScore(form.technical),
    poc: pocScore(form.poc),
    demand: demandScore(form.demand),
    strategic: strategicScore(form.strategic),
  };
}

// --- Section 11: Decision Engine ---
export function classify(finalScore: number): DecisionResult {
  if (finalScore >= 90)
    return { tier: "הזדמנות יוצאת דופן", action: "להתקדם מיד", tone: "exceptional" };
  if (finalScore >= 80)
    return { tier: "פוטנציאל גבוה", action: "לתעדף פיתוח", tone: "high" };
  if (finalScore >= 70)
    return { tier: "מבטיח", action: "להריץ אימות מורחב", tone: "promising" };
  if (finalScore >= 60)
    return { tier: "דורש מחקר נוסף", action: "לאסוף ראיות נוספות", tone: "research" };
  if (finalScore >= 50)
    return { tier: "היתכנות עסקית חלשה", action: "לשקול מחדש או לעבד מחדש", tone: "weak" };
  return { tier: "לדחות את ההזדמנות", action: "לא להתקדם", tone: "reject" };
}

// --- Section 10: Final Scoring Engine ---
export function scoreOpportunity(form: OpportunityForm): ScoreResult {
  const categories = computeCategoryScores(form);
  const breakdown: ScoreBreakdownItem[] = CATEGORY_WEIGHTS.map((w) => {
    const score = categories[w.key];
    return {
      key: w.key,
      label: w.label,
      score,
      weightPct: w.weightPct,
      // (score/10) -> 0..1, times weight -> contribution toward 0..100.
      contribution: round1((score / 10) * w.weightPct),
    };
  });
  const finalScore = Math.round(
    breakdown.reduce((sum, b) => sum + (b.score / 10) * b.weightPct, 0),
  );
  return { categories, breakdown, finalScore, decision: classify(finalScore) };
}
