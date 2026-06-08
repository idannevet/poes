"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  createOpportunity,
  deleteOpportunity,
  updateOpportunity,
} from "@/lib/data/opportunities";
import type { OpportunityForm, OpportunityStatus } from "@/lib/types";

async function requireUserEmail() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return { supabase, email: user.email ?? "" };
}

export async function createOpportunityAction(
  form: OpportunityForm,
  status: OpportunityStatus,
) {
  const { supabase, email } = await requireUserEmail();
  const opp = await createOpportunity(supabase, form, status, email);
  revalidatePath("/");
  redirect(`/opportunities/${opp.id}`);
}

export async function updateOpportunityAction(
  id: string,
  form: OpportunityForm,
  status: OpportunityStatus,
) {
  const { supabase, email } = await requireUserEmail();
  await updateOpportunity(supabase, id, form, status, email);
  revalidatePath("/");
  revalidatePath(`/opportunities/${id}`);
}

export async function deleteOpportunityAction(id: string) {
  const { supabase } = await requireUserEmail();
  await deleteOpportunity(supabase, id);
  revalidatePath("/");
  redirect("/");
}
