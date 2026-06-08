import type { SupabaseClient } from "@supabase/supabase-js";
import { createEmptyForm } from "../constants";
import { scoreOpportunity } from "../scoring";
import type { Opportunity, OpportunityForm, OpportunityStatus } from "../types";

export const TABLE = "opportunities";

interface Row {
  id: string;
  name: string;
  industry: string;
  product_category: string;
  status: OpportunityStatus;
  owner_email: string;
  form: OpportunityForm;
  scores: Opportunity["scores"];
  final_score: number;
  decision_tier: string;
  created_at: string;
  updated_at: string;
}

function rowToOpportunity(row: Row): Opportunity {
  // Defensive merge so older rows missing fields still load.
  const form: OpportunityForm = { ...createEmptyForm(), ...row.form };
  return {
    id: row.id,
    name: row.name,
    industry: row.industry,
    productCategory: row.product_category,
    status: row.status,
    ownerEmail: row.owner_email,
    form,
    scores: row.scores,
    finalScore: row.final_score,
    decisionTier: row.decision_tier,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/** Build the persisted columns from a form, recomputing all scores. */
export function buildPersistPayload(
  form: OpportunityForm,
  status: OpportunityStatus,
  ownerEmail: string,
) {
  const result = scoreOpportunity(form);
  return {
    name: form.overview.name || "הזדמנות ללא שם",
    industry: form.overview.industry || "אחר",
    product_category: form.overview.productCategory || "אחר",
    status,
    owner_email: ownerEmail,
    form,
    scores: result.categories,
    final_score: result.finalScore,
    decision_tier: result.decision.tier,
    updated_at: new Date().toISOString(),
  };
}

export async function listOpportunities(
  supabase: SupabaseClient,
): Promise<Opportunity[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("final_score", { ascending: false });
  if (error) throw error;
  return (data as Row[]).map(rowToOpportunity);
}

export async function getOpportunity(
  supabase: SupabaseClient,
  id: string,
): Promise<Opportunity | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToOpportunity(data as Row) : null;
}

export async function createOpportunity(
  supabase: SupabaseClient,
  form: OpportunityForm,
  status: OpportunityStatus,
  ownerEmail: string,
): Promise<Opportunity> {
  const payload = buildPersistPayload(form, status, ownerEmail);
  const { data, error } = await supabase
    .from(TABLE)
    .insert(payload)
    .select("*")
    .single();
  if (error) throw error;
  return rowToOpportunity(data as Row);
}

export async function updateOpportunity(
  supabase: SupabaseClient,
  id: string,
  form: OpportunityForm,
  status: OpportunityStatus,
  ownerEmail: string,
): Promise<Opportunity> {
  const payload = buildPersistPayload(form, status, ownerEmail);
  const { data, error } = await supabase
    .from(TABLE)
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return rowToOpportunity(data as Row);
}

export async function deleteOpportunity(
  supabase: SupabaseClient,
  id: string,
): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}
