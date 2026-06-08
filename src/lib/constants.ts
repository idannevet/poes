import type {
  CategoryScores,
  FrequencyUnit,
  OpportunityForm,
  OpportunityStatus,
  PocResult,
  PricingModel,
} from "./types";

export const INDUSTRIES = [
  "ביטוח",
  "משפטים",
  "בריאות",
  "נדל\"ן",
  "גיוס",
  "פיננסים",
  "קמעונאות",
  "ייצור",
  "לוגיסטיקה",
  "שיווק",
  "אחר",
] as const;

export const PRODUCT_CATEGORIES = [
  "סוכן AI",
  "SaaS",
  "אוטומציה",
  "הרחבת CRM",
  "פלטפורמת אנליטיקה",
  "כלי תהליכי עבודה",
  "זירת מסחר",
  "כלי פנימי",
  "אחר",
] as const;

export const TARGET_USERS = [
  "בעל עסק",
  "מנהל תפעול",
  "צוות מכירות",
  "שירות לקוחות",
  "צוות כספים",
  "צוות משאבי אנוש",
  "הנהלה בכירה",
] as const;

export const CONSEQUENCES = [
  "אובדן הכנסות",
  "עלות תפעולית",
  "טעויות אנוש",
  "סיכון רגולטורי",
  "חוויית לקוח",
  "צמיחה איטית",
  "שחיקת עובדים",
  "חיסרון תחרותי",
] as const;

export const FREQUENCY_UNITS: { value: FrequencyUnit; label: string }[] = [
  { value: "per_day", label: "ליום" },
  { value: "per_week", label: "לשבוע" },
  { value: "per_month", label: "לחודש" },
];

export const PRICING_MODELS: { value: PricingModel; label: string }[] = [
  { value: "monthly_subscription", label: "מנוי חודשי" },
  { value: "annual_subscription", label: "מנוי שנתי" },
  { value: "one_time", label: "רכישה חד-פעמית" },
  { value: "usage_based", label: "מבוסס שימוש" },
];

export const POC_RESULTS: { value: PocResult; label: string }[] = [
  { value: "success", label: "הצלחה" },
  { value: "partial", label: "הצלחה חלקית" },
  { value: "failed", label: "נכשל" },
];

export const STATUSES: { value: OpportunityStatus; label: string }[] = [
  { value: "draft", label: "טיוטה" },
  { value: "in_validation", label: "באימות" },
  { value: "reviewed", label: "נבדק" },
  { value: "approved", label: "אושר" },
  { value: "rejected", label: "נדחה" },
  { value: "archived", label: "בארכיון" },
];

// Final scoring weights (must sum to 100).
export const CATEGORY_WEIGHTS: { key: keyof CategoryScores; label: string; weightPct: number }[] = [
  { key: "pain", label: "ניתוח כאב", weightPct: 20 },
  { key: "market", label: "אימות שוק", weightPct: 20 },
  { key: "economics", label: "מודל עסקי וכלכלה", weightPct: 15 },
  { key: "competitor", label: "ניתוח מתחרים", weightPct: 10 },
  { key: "technical", label: "היתכנות טכנית", weightPct: 10 },
  { key: "poc", label: "תוצאות POC", weightPct: 10 },
  { key: "demand", label: "אימות ביקוש", weightPct: 10 },
  { key: "strategic", label: "התאמה אסטרטגית", weightPct: 5 },
];

export const SUGGESTED_POC_HOURS = [20, 40, 80];

export function createEmptyForm(): OpportunityForm {
  return {
    overview: {
      name: "",
      industry: "",
      productCategory: "",
      shortDescription: "",
      targetUsers: [],
      whyNow: "",
      whyNowScore: 0,
    },
    pain: {
      problemStatement: "",
      currentProcess: "",
      frequency: 0,
      frequencyUnit: "per_month",
      timePerOccurrenceMin: 0,
      employeesInvolved: 0,
      monthlyLaborCost: 0,
      monthlyFinancialImpact: 0,
      consequences: [],
      painSeverity: 0,
      painQuantificationQuality: 0,
    },
    market: {
      interviewsConducted: 0,
      confirmingProblemExists: 0,
      confirmingSignificant: 0,
      activelyLooking: 0,
      wantItIfWorks: 0,
      interestedInPilot: 0,
      strongQuotes: "",
    },
    competitor: {
      directCompetitors: 0,
      competitors: [],
      solutionSimilarity: 0,
      differentiation: 0,
      gapConfidence: 0,
      gapDescription: "",
    },
    economics: {
      monthlyCustomerSavings: 0,
      annualCustomerSavings: 0,
      pricingModel: "monthly_subscription",
      priceAmount: 0,
      cac: 0,
      ltv: 0,
      grossMarginPct: 0,
      paybackMonths: 0,
      tam: 0,
      sam: 0,
      som: 0,
      canExpandInternationally: false,
    },
    technical: {
      complexity: 0,
      aiDependency: 0,
      infraComplexity: 0,
      devTimeHours: 0,
      devBudget: 0,
      risks: "",
    },
    poc: {
      goal: "",
      successCriteria: "",
      maxDevHours: 40,
      cost: 0,
      startDate: "",
      endDate: "",
      result: "",
      measuredResults: "",
      score: 0,
    },
    demand: {
      demosPresented: 0,
      requestingPilot: 0,
      requestingProposal: 0,
      wantingEarlyAccess: 0,
      wouldBuy: 0,
      willingBeta: 0,
      readyPreSale: 0,
      feedback: "",
    },
    strategic: {
      alignsWithExpertise: 0,
      existingCustomersCanBuy: 0,
      existingTeamCanBuild: 0,
      salesTeamCanSell: 0,
      strengthensPositioning: 0,
    },
  };
}
