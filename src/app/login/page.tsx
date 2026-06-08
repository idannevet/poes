"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Gauge, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Field } from "@/components/ui/Field";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setLoading(true);
    const supabase = createClient();
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setNotice("החשבון נוצר. אם אישור אימייל מופעל, בדוק את תיבת הדואר ואז התחבר.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "משהו השתבש.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-fg shadow-pop">
            <Gauge className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">POES</h1>
          <p className="mt-1 text-sm text-muted">
            מערכת הערכת הזדמנויות מוצר
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
          <h2 className="mb-4 text-base font-semibold">
            {mode === "signin" ? "התחברות" : "יצירת חשבון"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="אימייל ארגוני" htmlFor="email">
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@archi-tech.io"
              />
            </Field>
            <Field label="סיסמה" htmlFor="password">
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </Field>

            {error ? <p className="text-sm text-danger">{error}</p> : null}
            {notice ? <p className="text-sm text-success">{notice}</p> : null}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {mode === "signin" ? "התחברות" : "הרשמה"}
            </Button>
          </form>

          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
              setNotice(null);
            }}
            className="mt-4 w-full text-center text-sm text-muted hover:text-text"
          >
            {mode === "signin"
              ? "אין לך חשבון? צור חשבון"
              : "כבר יש לך חשבון? התחבר"}
          </button>
        </div>
      </div>
    </main>
  );
}
