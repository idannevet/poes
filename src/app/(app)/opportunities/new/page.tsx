import { createEmptyForm } from "@/lib/constants";
import { OpportunityEditor } from "@/components/form/OpportunityEditor";

export const dynamic = "force-dynamic";

export default function NewOpportunityPage() {
  return <OpportunityEditor initialForm={createEmptyForm()} initialStatus="draft" />;
}
