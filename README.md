# POES — Product Opportunity Evaluation System

Internal venture-evaluation platform for **Archi-Tech**. It guides employees
through a structured 12-section evaluation, automatically computes a **0–100
opportunity score**, classifies the decision, and surfaces everything on an
executive dashboard so leadership can prioritize before committing dev resources.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (custom executive design tokens)
- **Supabase** (Postgres + Auth, hosted) for shared multi-user data
- **Recharts** for dashboard visuals
- **Vitest** for the scoring-engine test suite

## Features

- Full evaluation form covering all 12 sections (Overview → Strategic Fit)
- **Live scoring** — the final score, decision tier, and per-category breakdown
  update in real time as you fill the form
- Deterministic, fully tested scoring engine (`src/lib/scoring.ts`)
- Decision engine that classifies 90+/80+/70+/60+/50+/<50 bands
- Management dashboard: stat cards, leaderboard/ranking table, filters
  (industry, category, status, score range), score distribution, validation
  funnel, category radar, and an interactive **Market Opportunity Matrix**
- Email/password auth; every authenticated employee shares the same data

## Setup

### 1. Create a Supabase project

At [supabase.com](https://supabase.com) create a project. Then in
**Dashboard → SQL Editor**, run the contents of [`supabase/schema.sql`](./supabase/schema.sql).

In **Authentication → Providers**, ensure **Email** is enabled. For the fastest
internal setup, you can disable "Confirm email" so sign-ups work immediately.

### 2. Configure environment

```bash
cp .env.local.example .env.local
```

Fill in from **Dashboard → Project Settings → API**:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
```

### 3. Install & run

```bash
npm install
npm run dev
```

Open http://localhost:3000, create an account, and start evaluating.

## Scripts

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Start the dev server                 |
| `npm run build`  | Production build                     |
| `npm start`      | Run the production build             |
| `npm test`       | Run the scoring-engine test suite    |
| `npm run lint`   | Lint                                 |

## How the score is calculated

Each category is normalized to a 0–10 score, then weighted into a 0–100 final
score:

| Category               | Weight |
| ---------------------- | ------ |
| Pain Analysis          | 20%    |
| Market Validation      | 20%    |
| Business Model & Economics | 15% |
| Competitor Analysis    | 10%    |
| Technical Feasibility  | 10%    |
| POC Results            | 10%    |
| Demand Validation      | 10%    |
| Strategic Fit          | 5%     |

The exact per-category formulas live in `src/lib/scoring.ts` and are covered by
`src/lib/scoring.test.ts`.

## Project structure

```
src/
  app/
    (app)/                 # authenticated area (dashboard + editor)
      page.tsx             # dashboard
      opportunities/       # new + [id] editor pages, server actions
    login/                 # auth screen
  components/
    ui/                    # design-system primitives
    form/                  # evaluation editor + 9 section components
    dashboard/             # dashboard + charts
  lib/
    scoring.ts             # scoring engine (pure, tested)
    dashboard.ts           # dashboard data prep (pure)
    data/opportunities.ts  # Supabase data access
    supabase/              # browser/server/middleware clients
supabase/schema.sql        # database schema + RLS policies
```

## Security notes

- RLS is enabled; only authenticated users can read/write. The default policies
  let any signed-in employee see all opportunities (intended for an internal
  tool). Tighten them in `supabase/schema.sql` if you need per-owner access.
- The anon key is safe to expose to the browser; never commit a service-role key.
