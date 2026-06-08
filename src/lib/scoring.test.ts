import { describe, expect, it } from "vitest";
import { createEmptyForm } from "./constants";
import {
  classify,
  competitorScore,
  demandScore,
  economicsScore,
  marketScore,
  painScore,
  pocScore,
  scoreOpportunity,
  strategicScore,
  technicalScore,
} from "./scoring";
import type { OpportunityForm } from "./types";

describe("painScore", () => {
  it("weights severity 0.7 and quantification 0.3", () => {
    // Arrange / Act
    const score = painScore({ ...createEmptyForm().pain, painSeverity: 10, painQuantificationQuality: 0 });
    // Assert
    expect(score).toBe(7);
  });

  it("returns 10 when both inputs are maxed", () => {
    expect(painScore({ ...createEmptyForm().pain, painSeverity: 10, painQuantificationQuality: 10 })).toBe(10);
  });
});

describe("marketScore", () => {
  it("returns 0 with no interviews", () => {
    expect(marketScore(createEmptyForm().market)).toBe(0);
  });

  it("returns 10 when every interviewee converts at every stage", () => {
    const score = marketScore({
      interviewsConducted: 10,
      confirmingProblemExists: 10,
      confirmingSignificant: 10,
      activelyLooking: 10,
      wantItIfWorks: 10,
      interestedInPilot: 10,
      strongQuotes: "",
    });
    expect(score).toBe(10);
  });

  it("rewards deeper intent more than shallow confirmation", () => {
    const base = { interviewsConducted: 10, strongQuotes: "" };
    const shallow = marketScore({ ...base, confirmingProblemExists: 10, confirmingSignificant: 0, activelyLooking: 0, wantItIfWorks: 0, interestedInPilot: 0 });
    const deep = marketScore({ ...base, confirmingProblemExists: 0, confirmingSignificant: 0, activelyLooking: 10, wantItIfWorks: 10, interestedInPilot: 0 });
    expect(deep).toBeGreaterThan(shallow);
  });
});

describe("competitorScore", () => {
  it("applies differentiation 0.7 + gap confidence 0.3", () => {
    expect(competitorScore({ ...createEmptyForm().competitor, differentiation: 10, gapConfidence: 0 })).toBe(7);
  });
});

describe("technicalScore", () => {
  it("gives a high score to simple builds", () => {
    expect(technicalScore({ ...createEmptyForm().technical, complexity: 1, aiDependency: 1, infraComplexity: 1 })).toBe(10);
  });

  it("gives a low score to very hard builds", () => {
    expect(technicalScore({ ...createEmptyForm().technical, complexity: 10, aiDependency: 10, infraComplexity: 10 })).toBe(1);
  });
});

describe("pocScore", () => {
  it("uses the explicit score when provided", () => {
    expect(pocScore({ ...createEmptyForm().poc, score: 8 })).toBe(8);
  });

  it("derives from result when score is unset", () => {
    expect(pocScore({ ...createEmptyForm().poc, result: "success" })).toBe(9);
    expect(pocScore({ ...createEmptyForm().poc, result: "failed" })).toBe(1);
  });
});

describe("demandScore", () => {
  it("returns 0 with no demos", () => {
    expect(demandScore(createEmptyForm().demand)).toBe(0);
  });

  it("returns 10 at full conversion", () => {
    const score = demandScore({
      demosPresented: 5,
      requestingPilot: 5,
      requestingProposal: 5,
      wantingEarlyAccess: 5,
      wouldBuy: 5,
      willingBeta: 5,
      readyPreSale: 5,
      feedback: "",
    });
    expect(score).toBe(10);
  });
});

describe("strategicScore", () => {
  it("averages the five alignment questions", () => {
    expect(
      strategicScore({
        alignsWithExpertise: 8,
        existingCustomersCanBuy: 8,
        existingTeamCanBuild: 8,
        salesTeamCanSell: 8,
        strengthensPositioning: 8,
      }),
    ).toBe(8);
  });
});

describe("economicsScore", () => {
  it("returns 0 for an empty form", () => {
    expect(economicsScore(createEmptyForm().economics)).toBe(0);
  });

  it("rewards strong margin, LTV/CAC and market size", () => {
    const score = economicsScore({
      ...createEmptyForm().economics,
      annualCustomerSavings: 120000,
      pricingModel: "monthly_subscription",
      priceAmount: 1000,
      cac: 1000,
      ltv: 10000,
      grossMarginPct: 90,
      tam: 1000000,
      canExpandInternationally: true,
    });
    expect(score).toBeGreaterThan(7);
  });
});

describe("classify", () => {
  it.each([
    [95, "הזדמנות יוצאת דופן"],
    [85, "פוטנציאל גבוה"],
    [75, "מבטיח"],
    [65, "דורש מחקר נוסף"],
    [55, "היתכנות עסקית חלשה"],
    [40, "לדחות את ההזדמנות"],
  ])("classifies %i as %s", (score, tier) => {
    expect(classify(score).tier).toBe(tier);
  });
});

describe("scoreOpportunity", () => {
  it("produces 0 / Reject for an empty form", () => {
    const result = scoreOpportunity(createEmptyForm());
    expect(result.finalScore).toBe(0);
    expect(result.decision.tier).toBe("לדחות את ההזדמנות");
  });

  it("produces 100 for a perfect form", () => {
    const form: OpportunityForm = createEmptyForm();
    form.pain = { ...form.pain, painSeverity: 10, painQuantificationQuality: 10 };
    form.market = {
      interviewsConducted: 10,
      confirmingProblemExists: 10,
      confirmingSignificant: 10,
      activelyLooking: 10,
      wantItIfWorks: 10,
      interestedInPilot: 10,
      strongQuotes: "",
    };
    form.economics = {
      ...form.economics,
      annualCustomerSavings: 1000000,
      priceAmount: 1000,
      cac: 1000,
      ltv: 100000,
      grossMarginPct: 100,
      tam: 10000000000,
      canExpandInternationally: true,
    };
    form.competitor = { ...form.competitor, differentiation: 10, gapConfidence: 10 };
    form.technical = { ...form.technical, complexity: 1, aiDependency: 1, infraComplexity: 1 };
    form.poc = { ...form.poc, score: 10 };
    form.demand = {
      demosPresented: 5,
      requestingPilot: 5,
      requestingProposal: 5,
      wantingEarlyAccess: 5,
      wouldBuy: 5,
      willingBeta: 5,
      readyPreSale: 5,
      feedback: "",
    };
    form.strategic = {
      alignsWithExpertise: 10,
      existingCustomersCanBuy: 10,
      existingTeamCanBuild: 10,
      salesTeamCanSell: 10,
      strengthensPositioning: 10,
    };
    const result = scoreOpportunity(form);
    expect(result.finalScore).toBe(100);
    expect(result.decision.tier).toBe("הזדמנות יוצאת דופן");
  });

  it("breakdown contributions sum to the final score", () => {
    const result = scoreOpportunity(createEmptyForm());
    const sum = result.breakdown.reduce((s, b) => s + b.contribution, 0);
    expect(Math.round(sum)).toBe(result.finalScore);
  });
});
