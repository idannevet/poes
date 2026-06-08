import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getOpportunity } from "@/lib/data/opportunities";
import { OpportunityEditor } from "@/components/form/OpportunityEditor";

export const dynamic = "force-dynamic";

export default async function OpportunityPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const opportunity = await getOpportunity(supabase, params.id);

  if (!opportunity) notFound();

  return (
    <OpportunityEditor
      id={opportunity.id}
      initialForm={opportunity.form}
      initialStatus={opportunity.status}
    />
  );
}
