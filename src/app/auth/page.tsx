"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function AuthPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  async function submit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        "/api/admin/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response
        .json()
        .catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error ||
            "Unable to sign in. Please try again."
        );
      }

      /*
       * Authentication is now stored in a secure
       * HttpOnly cookie by the server.
       *
       * Nothing is saved to localStorage.
       */
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f4ed] px-5 py-10 text-ink md:px-8 md:py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,90,18,.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(18,58,146,.08),transparent_24%)]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-2rem)] max-w-[1280px] overflow-hidden rounded-[36px] border border-black/[.07] bg-white shadow-[0_25px_90px_rgba(8,20,47,.08)] lg:grid-cols-[1.05fr_.95fr]">
        {/* Left Side */}
        <div className="relative hidden overflow-hidden bg-ink p-10 text-white lg:block lg:p-12">
          <div className="dark-grid absolute inset-0 opacity-25" />

          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white">
                  <Image
                    src="/logo.png"
                    alt="YouthAura Labs"
                    width={64}
                    height={64}
                    className="h-14 w-14 object-cover object-left"
                  />
                </span>

                <div>
                  <p className="font-display text-2xl font-bold">
                    YouthAura Labs
                  </p>

                  <p className="text-xs uppercase tracking-[.2em] text-white/45">
                    Admin portal
                  </p>
                </div>
              </div>

              <h1 className="mt-16 max-w-lg text-[54px] font-bold leading-[0.96] tracking-[-0.05em]">
                Review applications with a cleaner
                workflow.
              </h1>

              <p className="mt-6 max-w-md text-[17px] leading-8 text-white/55">
                Securely review applications,
                consultation requests and payment
                submissions from one management portal.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [
                  ShieldCheck,
                  "Restricted access",
                  "Accessible only to authorized administrators.",
                ],
                [
                  Sparkles,
                  "Secure management",
                  "Review and manage submissions from one place.",
                ],
              ].map(([Icon, title, text]) => {
                const I = Icon as typeof ShieldCheck;

                return (
                  <div
                    key={String(title)}
                    className="rounded-[24px] border border-white/10 bg-white/[.05] p-5"
                  >
                    <I className="size-5 text-primary" />

                    <h3 className="mt-5 font-bold">
                      {String(title)}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/50">
                      {String(text)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Login */}
        <div className="flex items-center justify-center p-6 md:p-10 lg:p-12">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-between lg:hidden">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500"
              >
                <ArrowLeft className="size-4" />
                Back to site
              </Link>

              <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[.18em] text-primary">
                Restricted
              </span>
            </div>

            <div className="mt-8 lg:mt-0">
              <span className="eyebrow">
                Portal access
              </span>

              <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] text-ink">
                Admin sign in
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Sign in with your authorized YouthAura
                Labs administrator account.
              </p>
            </div>

            <form
              onSubmit={submit}
              className="mt-8 space-y-5 rounded-[30px] border border-black/[.06] bg-[#fbfaf7] p-6 md:p-7"
            >
              {/* Email */}
              <label className="block text-sm font-bold text-ink">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter admin email"
                  autoComplete="email"
                  required
                  disabled={loading}
                  className="mt-2 h-12 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-ink outline-none placeholder:text-slate-400 focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
                />
              </label>

              {/* Password */}
              <label className="block text-sm font-bold text-ink">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  disabled={loading}
                  className="mt-2 h-12 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-ink outline-none placeholder:text-slate-400 focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
                />
              </label>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm text-red-600">
                    {error}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full !min-h-13 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <LockKeyhole className="size-4" />
                )}

                {loading
                  ? "Signing in..."
                  : "Sign in"}
              </button>
            </form>

            <p className="mt-5 text-center text-xs leading-5 text-slate-400">
              Access is restricted to authorized
              YouthAura Labs administrators.
            </p>

            <div className="mt-8 hidden border-t border-black/10 pt-5 lg:block">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-ink"
              >
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