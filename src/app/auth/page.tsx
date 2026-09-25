"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError(null);
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("youthaura_admin_token", "active_session");
      router.push("/admin");
    }, 500);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f4ed] px-5 py-10 text-ink md:px-8 md:py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,90,18,.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(18,58,146,.08),transparent_24%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-2rem)] max-w-[1280px] overflow-hidden rounded-[36px] border border-black/[.07] bg-white shadow-[0_25px_90px_rgba(8,20,47,.08)] lg:grid-cols-[1.05fr_.95fr]">
        <div className="relative hidden overflow-hidden bg-ink p-10 text-white lg:block lg:p-12">
          <div className="dark-grid absolute inset-0 opacity-25" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white">
                  <Image src="/logo.png" alt="YouthAura Labs" width={64} height={64} className="h-14 w-14 object-cover object-left" />
                </span>
                <div>
                  <p className="font-display text-2xl font-bold">YouthAura Labs</p>
                  <p className="text-xs uppercase tracking-[.2em] text-white/45">Admin portal</p>
                </div>
              </div>

              <h1 className="mt-16 max-w-lg text-[54px] font-bold leading-[0.96] tracking-[-0.05em]">
                Review applications with a cleaner workflow.
              </h1>
              <p className="mt-6 max-w-md text-[17px] leading-8 text-white/55">
                Sign in to access the demo portal for cohort applications and lightweight candidate management.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [ShieldCheck, "Restricted access", "Visible only to team users."],
                [Sparkles, "Demo-ready", "Safe local flow for UI review."],
              ].map(([Icon, title, text]) => {
                const I = Icon as typeof ShieldCheck;
                return (
                  <div key={String(title)} className="rounded-[24px] border border-white/10 bg-white/[.05] p-5">
                    <I className="size-5 text-primary" />
                    <h3 className="mt-5 font-bold">{String(title)}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/50">{String(text)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 md:p-10 lg:p-12">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-between lg:hidden">
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                <ArrowLeft className="size-4" />
                Back to site
              </Link>
              <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[.18em] text-primary">
                Restricted
              </span>
            </div>

            <div className="mt-8 lg:mt-0">
              <span className="eyebrow">Portal access</span>
              <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] text-ink">
                {mode === "signin" ? "Admin sign in" : "Create admin account"}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Demo authentication for the application-management portal.
              </p>
            </div>

            <form onSubmit={submit} className="mt-8 space-y-5 rounded-[30px] border border-black/[.06] bg-[#fbfaf7] p-6 md:p-7">
              <label className="block text-sm font-bold text-ink">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@youthauralabs.com"
                  className="mt-2 h-12 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-ink outline-none placeholder:text-slate-400 focus:border-primary"
                />
              </label>
              <label className="block text-sm font-bold text-ink">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-2 h-12 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-ink outline-none placeholder:text-slate-400 focus:border-primary"
                />
              </label>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button disabled={loading} className="btn-primary w-full !min-h-13">
                {loading ? <Loader2 className="size-4 animate-spin" /> : <LockKeyhole className="size-4" />}
                {mode === "signin" ? "Sign in" : "Sign up"}
              </button>
            </form>

            <button
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setError(null);
              }}
              className="mt-5 w-full text-center text-sm text-slate-500 hover:text-ink"
            >
              {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </button>

            <div className="mt-8 hidden border-t border-black/10 pt-5 lg:block">
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-ink">
                <ArrowLeft className="size-4" />
                Back to site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
