"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Gauge, LayoutDashboard, LogOut, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { StatusBadge } from "@/components/ui/Badge";
import { cn } from "@/lib/format";
import type { OpportunityStatus } from "@/lib/types";

export interface SidebarOpportunity {
  id: string;
  name: string;
  status: OpportunityStatus;
  finalScore: number;
}

const NAV = [
  { href: "/", label: "לוח בקרה", icon: LayoutDashboard },
  { href: "/opportunities/new", label: "הזדמנות חדשה", icon: Plus },
];

interface AppShellProps {
  email: string;
  opportunities: SidebarOpportunity[];
  children: React.ReactNode;
}

export function AppShell({ email, opportunities, children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-e border-border bg-surface px-4 py-5 md:flex">
        <Link href="/" className="mb-8 flex items-center gap-2.5 px-1">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-fg">
            <Gauge className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-bold leading-tight">POES</span>
            <span className="block text-[11px] leading-tight text-muted">Archi-Tech</span>
          </span>
        </Link>

        <nav className="flex flex-col gap-1">
          {NAV.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                  active ? "bg-accent/10 text-accent" : "text-muted hover:bg-surface-2 hover:text-text",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Opportunities list */}
        <div className="mt-6 flex min-h-0 flex-1 flex-col">
          <div className="mb-2 flex items-center justify-between px-3">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">
              הזדמנויות
            </span>
            <span className="text-[11px] tabular-nums text-muted">{opportunities.length}</span>
          </div>

          <div className="-mx-1 flex-1 space-y-1 overflow-y-auto px-1 scrollbar-thin">
            {opportunities.length === 0 ? (
              <p className="px-3 py-2 text-xs text-muted">אין הזדמנויות עדיין.</p>
            ) : (
              opportunities.map((o) => {
                const active = pathname === `/opportunities/${o.id}`;
                return (
                  <Link
                    key={o.id}
                    href={`/opportunities/${o.id}`}
                    className={cn(
                      "block rounded-lg px-3 py-2 transition",
                      active ? "bg-accent/10" : "hover:bg-surface-2",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "truncate text-sm font-medium",
                          active ? "text-accent" : "text-text",
                        )}
                        title={o.name}
                      >
                        {o.name}
                      </span>
                      <span className="shrink-0 text-xs font-semibold tabular-nums text-muted">
                        {o.finalScore}
                      </span>
                    </div>
                    <div className="mt-1">
                      <StatusBadge status={o.status} />
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <p className="truncate px-3 text-xs text-muted" title={email}>
            {email}
          </p>
          <button
            onClick={signOut}
            className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface-2 hover:text-danger"
          >
            <LogOut className="h-4 w-4" />
            התנתקות
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 md:hidden">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-fg">
              <Gauge className="h-4 w-4" />
            </span>
            <span className="text-sm font-bold">POES</span>
          </Link>
          <button onClick={signOut} className="text-muted hover:text-danger">
            <LogOut className="h-5 w-5" />
          </button>
        </header>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
