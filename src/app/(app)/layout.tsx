import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { listOpportunities } from "@/lib/data/opportunities";
import { AppShell, type SidebarOpportunity } from "@/components/AppShell";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Lightweight list for the sidebar — never block rendering if the DB is down.
  let opportunities: SidebarOpportunity[] = [];
  try {
    const all = await listOpportunities(supabase);
    opportunities = all.map((o) => ({
      id: o.id,
      name: o.name,
      status: o.status,
      finalScore: o.finalScore,
    }));
  } catch {
    opportunities = [];
  }

  return (
    <AppShell email={user.email ?? ""} opportunities={opportunities}>
      {children}
    </AppShell>
  );
}
