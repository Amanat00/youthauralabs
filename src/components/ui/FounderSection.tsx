"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  MapPin,
  Sparkles,
  Trophy,
} from "lucide-react";

export default function FounderSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7f4ed] px-5 py-20 md:px-8 md:py-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-[340px] w-[340px] rounded-full bg-primary/[0.07] blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-[320px] w-[320px] rounded-full bg-[#123a92]/[0.05] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1180px]">
        {/* Section Heading */}
        <div className="mb-10 max-w-2xl">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.18em] text-primary">
            <Sparkles className="size-4" />
            Founder story
          </p>

          <h2 className="mt-4 font-display text-[36px] font-bold leading-[1.06] tracking-[-0.04em] text-ink md:text-[48px]">
            A journey that started in Okara.
          </h2>

          <p className="mt-4 text-[16px] leading-7 text-slate-600">
            From searching for direction to creating practical opportunities
            for young people through YouthAura Labs.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          {/* LEFT — Founder Card */}
          <div className="relative overflow-hidden rounded-[32px] bg-ink p-7 text-white md:p-8">
            <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.08] text-primary">
                <Sparkles className="size-5" />
              </div>

              <p className="mt-7 text-[11px] font-bold uppercase tracking-[.18em] text-[#ff9b68]">
                Meet the Founder
              </p>

              <h3 className="mt-2 font-display text-[32px] font-bold leading-tight tracking-[-0.03em]">
                Laiba Hashmi
              </h3>

              <p className="mt-1 text-sm font-medium text-white/50">
                Founder, YouthAura Labs
              </p>

              <p className="mt-6 max-w-sm text-[15px] leading-7 text-white/65">
                Laiba grew up in Okara with big ambitions but no clear roadmap.
                Her own search for practical skills, real-world experience and
                better opportunities eventually became the foundation of
                YouthAura Labs.
              </p>

              {/* Founder details */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-primary">
                    <MapPin className="size-4" />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[.14em] text-white/35">
                      From
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-white">
                      Okara, Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-primary">
                    <GraduationCap className="size-4" />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[.14em] text-white/35">
                      Studied
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-white">
                      Business &amp; Information Technology
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-primary">
                    <BriefcaseBusiness className="size-4" />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[.14em] text-white/35">
                      Built through
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-white">
                      Freelancing, clients &amp; AI
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/book-laiba"
                className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-white transition hover:opacity-90"
              >
                Consult Laiba
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* RIGHT — Story */}
          <div className="rounded-[32px] border border-black/[0.06] bg-white p-6 shadow-[0_18px_50px_rgba(8,20,47,.06)] md:p-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.16em] text-primary">
                Her journey
              </p>

              <h3 className="mt-2 max-w-xl font-display text-[27px] font-bold leading-tight tracking-[-0.03em] text-ink md:text-[32px]">
                Finding her own path before helping others find theirs.
              </h3>
            </div>

            {/* Journey steps */}
            <div className="mt-8 space-y-5">
              <div className="grid gap-4 sm:grid-cols-[46px_1fr]">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0e7] text-sm font-bold text-primary">
                  01
                </div>

                <div>
                  <h4 className="font-bold text-ink">
                    Looking beyond the conventional path
                  </h4>

                  <p className="mt-2 text-sm leading-7 text-slate-500">
                    Growing up in Okara, Laiba believed that building
                    something bigger might mean leaving her city. Getting
                    admission to Punjab University in Lahore felt like an
                    important first step.
                  </p>
                </div>
              </div>

              <div className="border-t border-black/[0.06]" />

              <div className="grid gap-4 sm:grid-cols-[46px_1fr]">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0e7] text-sm font-bold text-primary">
                  02
                </div>

                <div>
                  <h4 className="font-bold text-ink">
                    Exploring beyond the classroom
                  </h4>

                  <p className="mt-2 text-sm leading-7 text-slate-500">
                    During her third semester at IBIT, she started exploring
                    freelancing, practical skills, international client work,
                    business and AI automation — areas that showed her a very
                    different side of what was possible.
                  </p>
                </div>
              </div>

              <div className="border-t border-black/[0.06]" />

              <div className="grid gap-4 sm:grid-cols-[46px_1fr]">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0e7] text-sm font-bold text-primary">
                  03
                </div>

                <div>
                  <h4 className="font-bold text-ink">
                    Turning that experience into YouthAura Labs
                  </h4>

                  <p className="mt-2 text-sm leading-7 text-slate-500">
                    She realized that geography did not have to define
                    opportunity. That experience inspired her to create the
                    kind of practical guidance she wished she had earlier —
                    helping young people explore skills, opportunities and a
                    clearer direction.
                  </p>
                </div>
              </div>
            </div>

            {/* Award */}
            <div className="mt-7 flex gap-4 rounded-[24px] bg-[#f7f4ed] p-5 md:p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ink text-[#ff9b68]">
                <Trophy className="size-5" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.15em] text-primary">
                  A meaningful milestone
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  At 21, Laiba was nominated for the Iconic Women CEO Awards
                  2026 in the Tech &amp; Digital category.
                </p>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="mt-7 border-l-[3px] border-primary pl-5 font-display text-[21px] font-bold leading-[1.45] tracking-[-0.02em] text-ink md:text-[24px]">
              “Start where you are, use what you have, and give yourself a
              chance. Your beginnings don&apos;t define how far you can go.”
            </blockquote>

            <div className="mt-7 border-t border-black/[0.06] pt-6">
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:gap-3"
              >
                Explore the roadmaps
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}