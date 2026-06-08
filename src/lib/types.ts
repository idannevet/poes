// Domain types for the Product Opportunity Evaluation System (POES).
// The form payload is intentionally a flat-ish structure grouped by section so
// it maps cleanly to the evaluation UI and to the scoring engine.

export type FrequencyUnit = "per_day" | "per_week" | "per_month";

export type PricingModel =
  | "monthly_subscription"
  | "annual_subscription"
  | "one_time"
  | "usage_based";

export type PocResult = "success" | "partial" | "failed";

export type OpportunityStatus =
  | "draft"
  | "in_validation"
  | "reviewed"
  | "approved"
  | "rejected"
  | "archived";

export interface Competitor {
  id: string;
  name: string;
  website: string;
  marketPosition: string;
  pricing: string;
  strengths: string;
  weaknesses: string;
}

// --- Section 1: Overview ---
export interface OverviewSection {
  name: string;
  industry: string;
  productCategory: string;
  shortDescription: string;
  targetUsers: string[];
  whyNow: string;
  whyNowScore: number; // 0-5, contextual (not weighted into final)
}

// --- Section 2: Pain Analysis ---
export interface PainSection {
  problemStatement: string;
  currentProcess: string;
  frequency: number;
  frequencyUnit: FrequencyUnit;
  timePerOccurrenceMin: number;
  employeesInvolved: number;
  monthlyLaborCost: number;
  monthlyFinancialImpact: number;
  consequences: string[];
  painSeverity: number; // 1-10
  painQuantificationQuality: number; // 1-10
}

// --- Section 3: Market Validation ---
export interface MarketSection {
  interviewsConducted: number;
  confirmingProblemExists: number;
  confirmingSignificant: number;
  activelyLooking: number;
  wantItIfWorks: number;
  interestedInPilot: number;
  strongQuotes: string;
}

// --- Section 4: Competitor Analysis ---
export interface CompetitorSection {
  directCompetitors: number;
  competitors: Competitor[];
  solutionSimilarity: number; // 1-10
  differentiation: number; // 1-10
  gapConfidence: number; // 1-10
  gapDescription: string;
}

// --- Section 5: Business Model & Economics ---
export interface EconomicsSection {
  monthlyCustomerSavings: number;
  annualCustomerSavings: number;
  pricingModel: PricingModel;
  priceAmount: number;
  cac: number;
  ltv: number;
  grossMarginPct: number; // 0-100
  paybackMonths: number;
  tam: number; // companies worldwide
  sam: number;
  som: number;
  canExpandInternationally: boolean;
}

// --- Section 6: Technical Feasibility ---
export interface TechnicalSection {
  complexity: number; // 1-10 (10 = hardest)
  aiDependency: number; // 1-10
  infraComplexity: number; // 1-10
  devTimeHours: number;
  devBudget: number;
  risks: string;
}

// --- Section 7: POC ---
export interface PocSection {
  goal: string;
  successCriteria: string;
  maxDevHours: number;
  cost: number;
  startDate: string;
  endDate: string;
  result: PocResult | "";
  measuredResults: string;
  score: number; // 0-10
}

// --- Section 8: Demos & Early Validation ---
export interface DemandSection {
  demosPresented: number;
  requestingPilot: number;
  requestingProposal: number;
  wantingEarlyAccess: number;
  wouldBuy: number;
  willingBeta: number;
  readyPreSale: number;
  feedback: string;
}

// --- Section 9: Strategic Fit ---
export interface StrategicSection {
  alignsWithExpertise: number; // 1-10
  existingCustomersCanBuy: number; // 1-10
  existingTeamCanBuild: number; // 1-10
  salesTeamCanSell: number; // 1-10
  strengthensPositioning: number; // 1-10
}

export interface OpportunityForm {
  overview: OverviewSection;
  pain: PainSection;
  market: MarketSection;
  competitor: CompetitorSection;
  economics: EconomicsSection;
  technical: TechnicalSection;
  poc: PocSection;
  demand: DemandSection;
  strategic: StrategicSection;
}

// --- Computed scoring output ---
export interface CategoryScores {
  pain: number; // each 0-10
  market: number;
  economics: number;
  competitor: number;
  technical: number;
  poc: number;
  demand: number;
  strategic: number;
}

export interface ScoreBreakdownItem {
  key: keyof CategoryScores;
  label: string;
  score: number; // 0-10
  weightPct: number; // 0-100
  contribution: number; // points toward final 0-100
}

export interface DecisionResult {
  tier: string;
  action: string;
  tone: "exceptional" | "high" | "promising" | "research" | "weak" | "reject";
}

export interface ScoreResult {
  categories: CategoryScores;
  breakdown: ScoreBreakdownItem[];
  finalScore: number; // 0-100
  decision: DecisionResult;
}

// --- Persisted record ---
export interface Opportunity {
  id: string;
  name: string;
  industry: string;
  productCategory: string;
  status: OpportunityStatus;
  ownerEmail: string;
  form: OpportunityForm;
  scores: CategoryScores;
  finalScore: number;
  decisionTier: string;
  createdAt: string;
  updatedAt: string;
}
