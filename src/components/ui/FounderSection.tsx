"use client";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function FounderSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7f4ed] px-5 py-20 md:px-8 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,90,18,.10),transparent_28%)]" />

      <div className="relative mx-auto max-w-[1180px]">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.18em] text-primary">
              <Sparkles className="size-4" />
              Founder story
            </p>

            <h2 className="mt-4 max-w-lg font-display text-[38px] font-bold leading-[1.03] tracking-[-0.04em] text-ink md:text-[52px]">
              From Okara to building opportunities for the next generation.
            </h2>

            <p className="mt-5 max-w-xl text-[16px] leading-8 text-slate-600">
              YouthAura Labs grew from Laiba Hashmi&apos;s own experience of
              trying to find practical direction, real-world skills, and
              opportunities beyond the conventional path.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-[22px] border border-black/[.06] bg-white p-5 shadow-[0_12px_30px_rgba(8,20,47,.05)]">
                <MapPin className="size-5 text-primary" />
                <p className="mt-4 text-xs font-bold uppercase tracking-[.12em] text-slate-400">
                  Began in
                </p>
                <p className="mt-1 font-display text-xl font-bold text-ink">
                  Okara, Pakistan
                </p>
              </div>

              <div className="rounded-[22px] border border-black/[.06] bg-white p-5 shadow-[0_12px_30px_rgba(8,20,47,.05)]">
                <BriefcaseBusiness className="size-5 text-primary" />
                <p className="mt-4 text-xs font-bold uppercase tracking-[.12em] text-slate-400">
                  Built through
                </p>
                <p className="mt-1 font-display text-xl font-bold text-ink">
                  Skills, clients &amp; AI
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-black/[.06] bg-white p-6 shadow-[0_20px_55px_rgba(8,20,47,.07)] md:p-9">
            <div className="border-b border-black/[.06] pb-7">
              <p className="text-xs font-bold uppercase tracking-[.14em] text-primary">
                Laiba Hashmi
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-ink">
                Founder, YouthAura Labs
              </p>
            </div>

            <div className="space-y-6 pt-7 text-[16px] leading-8 text-slate-600">
              <p>
                Growing up in Okara, Laiba once believed that building
                something meaningful meant leaving her city behind. Earning
                admission to Punjab University in Lahore felt like the first
                major step toward the future she imagined.
              </p>

              <p>
                While studying Business and Information Technology at IBIT,
                she began questioning how much of what she was learning would
                prepare her for the real world. During her third semester, she
                started exploring beyond the classroom through freelancing,
                practical skills, international client work, business, and AI
                automation.
              </p>

              <p>
                That journey changed her perspective. The internet showed her
                that geography did not have to define opportunity. Skills
                could be learned from anywhere, meaningful work could be done
                with people around the world, and opportunities could be
                created rather than simply waited for.
              </p>

              <div className="rounded-[24px] bg-ink p-6 text-white md:p-7">
                <p className="text-[11px] font-bold uppercase tracking-[.16em] text-[#ff9b68]">
                  A meaningful milestone
                </p>
                <p className="mt-3 text-[16px] leading-7 text-white/70">
                  At 21, Laiba was nominated for the Iconic Women CEO Awards
                  2026 in the Tech &amp; Digital category — a milestone that
                  reflected how far her journey had come.
                </p>
              </div>

              <p>
                YouthAura Labs was created from that experience: to give young
                people the kind of practical roadmaps Laiba wished she had
                earlier — helping them discover their strengths, explore
                opportunities, build valuable skills, and find a direction
                that feels right for them.
              </p>

              <blockquote className="border-l-4 border-primary pl-5 font-display text-[24px] font-bold leading-[1.35] tracking-[-0.02em] text-ink md:text-[28px]">
                “Start where you are, use what you have, and give yourself a
                chance. Your beginnings don&apos;t define how far you can go.”
              </blockquote>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-black/[.06] pt-6">
              <a
                href="/programs"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-white transition hover:opacity-90"
              >
                Explore the roadmaps
                <ArrowUpRight className="size-4" />
              </a>

              <a
                href="/book-laiba"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-black/10 px-5 text-sm font-bold text-ink transition hover:border-primary hover:text-primary"
              >
                Book a consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
