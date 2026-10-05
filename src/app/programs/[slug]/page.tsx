import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Target,
} from "lucide-react";

import { programRoadmaps } from "@/data/programRoadmaps";
import FinalCTA from "@/components/ui/FinalCTA";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return programRoadmaps.map((roadmap) => ({
    slug: roadmap.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const roadmap = programRoadmaps.find(
    (item) => item.slug === slug
  );

  if (!roadmap) {
    return {
      title: "Program Roadmap | YouthAura Labs",
    };
  }

  return {
    title: `${roadmap.title} Roadmap | YouthAura Labs`,
    description: roadmap.goal,
  };
}

export default async function ProgramRoadmapPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const roadmap = programRoadmaps.find(
    (item) => item.slug === slug
  );

  if (!roadmap) {
    notFound();
  }

  return (
    <div>
      {/* =========================
          HERO
      ========================== */}
      <section className="relative overflow-hidden bg-ink pb-20 pt-32 text-white md:pb-24 md:pt-36">
        <div className="dark-grid absolute inset-0 opacity-25" />

        <div className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[110px]" />

        <div className="absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-[#1f5ccc]/25 blur-[110px]" />

        <div className="site-shell relative">
          <Link
            href="/programs#tracks"
            className="inline-flex items-center gap-2 text-sm font-bold text-white/60 transition hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to all tracks
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-4xl">
              <span className="eyebrow !text-[#ff9b68]">
                Practical Track Roadmap
              </span>

              <h1 className="hero-title mt-6">
                {roadmap.title}
              </h1>

              <p className="mt-7 max-w-3xl text-[18px] leading-8 text-white/60">
                {roadmap.intro}
              </p>
            </div>

            {/* ROADMAP SUMMARY */}
            <div className="grid w-fit grid-cols-2 overflow-hidden rounded-[24px] border border-white/10 bg-white/[.05]">
              <div className="px-6 py-5">
                <p className="font-display text-3xl font-bold">
                  {roadmap.steps.length}
                </p>

                <p className="mt-1 text-xs font-semibold text-white/45">
                  Practical steps
                </p>
              </div>

              <div className="border-l border-white/10 px-6 py-5">
                <p className="font-display text-3xl font-bold">
                  {roadmap.outcomes.length}
                </p>

                <p className="mt-1 text-xs font-semibold text-white/45">
                  Outcomes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          GOAL
      ========================== */}
      <section className="site-shell relative z-10 -mt-10">
        <div className="rounded-[32px] border border-black/[.07] bg-white p-7 shadow-[0_24px_70px_rgba(8,20,47,.12)] md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
              <Target className="size-6" />
            </span>

            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-primary">
                Goal
              </p>

              <h2 className="mt-3 max-w-4xl text-2xl font-bold leading-snug text-ink md:text-3xl">
                {roadmap.goal}
              </h2>

              {roadmap.startingPoint && (
                <div className="mt-6 rounded-2xl bg-secondary px-5 py-4">
                  <p className="text-sm leading-7 text-slate-600">
                    <span className="font-bold text-ink">
                      Starting point:
                    </span>{" "}
                    {roadmap.startingPoint}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          ROADMAP HEADER
      ========================== */}
      <section className="section-space site-shell pb-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">
            Your roadmap
          </span>

          <h2 className="section-title mt-5">
            From foundation to{" "}
            <span className="text-primary">
              practical output.
            </span>
          </h2>

          <p className="body-large mx-auto mt-5 max-w-2xl">
            Follow each stage in sequence. Every step builds on the
            previous one and moves you closer to practical,
            demonstrable work.
          </p>
        </div>
      </section>

      {/* =========================
          CONNECTED TIMELINE
      ========================== */}
      <section className="site-shell pb-28 pt-10 md:pb-32">
        <div className="relative mx-auto max-w-6xl">

          {/* MAIN VERTICAL LINE */}
<div className="pointer-events-none absolute bottom-6 left-[23px] top-6 z-[1] w-[3px] rounded-full bg-[#ff5a12] shadow-[0_0_12px_rgba(255,90,18,.22)] md:left-1/2 md:-translate-x-1/2" />
          <div className="space-y-8 md:space-y-10">
            {roadmap.steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              const number = String(index + 1).padStart(2, "0");

              return (
                <div
                  key={step.title}
                  className={`relative flex ${
                    isLeft
                      ? "md:justify-start"
                      : "md:justify-end"
                  }`}
                >
                  {/* =====================
                      HORIZONTAL CONNECTOR
                      DESKTOP ONLY
                  ====================== */}
                  <div
  className="pointer-events-none absolute top-[49px] z-[2] hidden h-[3px] w-[34px] rounded-full bg-[#ff5a12] md:block"
  style={
    isLeft
      ? {
          left: "calc(50% - 58px)",
        }
      : {
          left: "calc(50% + 24px)",
        }
  }
/>
                  {/* TIMELINE NODE */}
<div className="absolute left-0 top-7 z-20 flex h-12 w-12 items-center justify-center rounded-full border-[4px] border-white bg-[#ff5a12] font-display text-xs font-bold text-white shadow-[0_8px_28px_rgba(255,90,18,.35)] md:left-1/2 md:-translate-x-1/2">                    {number}
                  </div>

                  {/* STEP CARD */}
                  <article className="surface-card relative ml-16 w-[calc(100%-4rem)] overflow-hidden p-6 md:ml-0 md:w-[calc(50%-3.5rem)] md:p-7">

                    {/* subtle orange top line */}
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-primary/35" />

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[.18em] text-primary">
                          Step {number}
                        </p>

                        <h3 className="mt-3 text-xl font-bold leading-snug text-ink md:text-2xl">
                          {step.title}
                        </h3>
                      </div>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-primary">
                        {number}
                      </span>
                    </div>

                    {/* ALL STEP DETAILS */}
                    <div className="mt-5 space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <div
                          key={`${detailIndex}-${detail}`}
                          className="flex items-start gap-3"
                        >
                          <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />

                          <p className="text-sm leading-7 text-slate-500">
                            {detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          {/* =========================
              TIMELINE END
          ========================== */}
          <div className="relative mt-10 flex items-center md:justify-center">
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#f8f5ef] bg-ink text-white shadow-[0_8px_25px_rgba(8,20,47,.20)]">
              <Check className="size-5" />
            </div>

            <p className="ml-4 text-[10px] font-bold uppercase tracking-[.18em] text-primary md:absolute md:left-[calc(50%+38px)]">
              Roadmap complete
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          OUTCOMES
      ========================== */}
      <section className="section-space bg-ink text-white">
        <div className="site-shell">
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <span className="eyebrow !text-[#ff9b68]">
                Outcomes
              </span>

              <h2 className="section-title mt-5">
                What you’ll{" "}
                <span className="text-primary">
                  develop and produce.
                </span>
              </h2>

              <p className="mt-5 max-w-md leading-7 text-white/50">
                By completing this roadmap, you’ll finish with practical
                work, clearer capability and stronger evidence of what
                you can do.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {roadmap.outcomes.map((outcome, index) => (
                <div
                  key={`${index}-${outcome}`}
                  className="flex min-h-[130px] items-start gap-4 rounded-[22px] border border-white/10 bg-white/[.05] p-5 transition duration-300 hover:border-primary/30 hover:bg-white/[.07]"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <Check className="size-4" />
                  </span>

                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[.16em] text-white/25">
                      Outcome {String(index + 1).padStart(2, "0")}
                    </p>

                    <p className="text-sm leading-7 text-white/65">
                      {outcome}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-9 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/programs#tracks"
              className="inline-flex items-center gap-2 text-sm font-bold text-white/60 transition hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Explore other tracks
            </Link>

            <Link href="/apply" className="btn-primary">
              Apply for next cohort
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================
          SPACE BEFORE FINAL CTA
      ========================== */}
      <div className="bg-[#f8f5ef] pt-20 md:pt-28">
        <FinalCTA />
      </div>
    </div>
  );
}