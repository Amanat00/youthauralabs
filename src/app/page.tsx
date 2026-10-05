import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Bot,
  CirclePlay,
  Code2,
  GraduationCap,
  Sparkles,
  Users,
} from "lucide-react";

import Accordion from "@/components/ui/Accordion";
import FinalCTA from "@/components/ui/FinalCTA";

const faqs = [
  {
    question: "Who can apply to YouthAura Labs?",
    answer:
      "University students, fresh graduates, and early-career professionals who want practical, market-ready skills and stronger career fundamentals.",
  },
  {
    question: "How long is the cohort?",
    answer:
      "The core program runs for 12 focused weeks, combining career readiness, specialization training, mentorship and practical projects.",
  },
  {
    question: "Is it online or in person?",
    answer:
      "The program is online for participants across Pakistan, with onsite sessions available in Okara.",
  },
  {
    question: "Do I need prior professional experience?",
    answer:
      "No. The program is designed for learners who are building their skills and experience. A laptop and stable internet connection are recommended.",
  },
  {
    question: "What tracks can I choose from?",
    answer:
      "Participants can choose from tracks including Freelancing, E-commerce, Digital Marketing, Social Media Handling, Graphic Designing, AI Automation, Applied AI, Project Management, Web Development Awareness and Business Development.",
  },
  {
    question: "What will I gain from the program?",
    answer:
      "You will work on practical projects, develop track-specific skills, build portfolio-ready work and gain guidance for applying your skills to real career opportunities.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Yes. Participants will receive a certificate from YouthAura Labs upon completion of the program.",
  },
  {
    question: "Will I receive mentorship?",
    answer:
      "Yes. Participants will receive guidance and feedback from mentors throughout the program and their practical projects.",
  },
  {
    question: "What happens after completing the program?",
    answer:
      "You will have practical project work, stronger career readiness and a clearer direction for applying your skills to freelance, employment or business opportunities.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden pb-20 pt-32 md:pb-24 md:pt-36">
        <div className="absolute -left-40 top-24 h-80 w-80 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-royal/10 blur-[110px]" />

        <div className="site-shell relative grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <span className="eyebrow">
              12-week career readiness accelerator
            </span>

            <h1 className="hero-title mt-7 max-w-3xl text-ink">
              Build the proof{" "}
              <span className="text-primary">
                your degree can’t show.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-[18px] leading-8 text-slate-600">
              Turn your potential into practical skills, real work and career
              confidence through mentor-led learning, specialization tracks
              and hands-on projects.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/apply" className="btn-primary">
                Apply for next cohort
                <ArrowUpRight className="size-4" />
              </Link>

              <Link href="/programs" className="btn-outline">
                Explore programs
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-ink/55">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Okara onsite
              </span>

              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Online across Pakistan
              </span>

              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Small cohorts
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[590px]">
            <div className="absolute -left-5 top-16 z-20 hidden rounded-2xl bg-ink px-5 py-4 text-white shadow-2xl sm:block">
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-white/45">
                The goal
              </p>

              <p className="mt-1 font-display text-lg font-bold">
                Built, not just learned.
              </p>
            </div>

            <div className="hero-front-card relative overflow-hidden rounded-[34px] border border-black/[.06] bg-ink p-3 shadow-[0_32px_90px_rgba(8,20,47,.15)]">
              <div className="relative h-[560px] overflow-hidden rounded-[26px]">
                <Image
                  src="/Diverse-Teamwork.webp"
                  alt="YouthAura Labs career energy"
                  fill
                  priority
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <p className="text-xs font-bold uppercase tracking-[.18em] text-primary">
                    Career readiness
                  </p>

                  <p className="mt-3 max-w-md font-display text-[25px] font-bold leading-tight">
                    Practical work. Direct feedback. Skills you can explain and
                    demonstrate.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 right-3 z-20 grid grid-cols-2 gap-6 rounded-2xl bg-white px-6 py-5 shadow-[0_20px_55px_rgba(8,20,47,.14)] sm:right-[-18px]">
              <div>
                <p className="font-display text-3xl font-bold text-ink">
                  12
                </p>
                <p className="text-xs font-semibold text-slate-500">
                  Weeks
                </p>
              </div>

              <div className="border-l border-black/10 pl-6">
                <p className="font-display text-3xl font-bold text-ink">
                  10
                </p>
                <p className="text-xs font-semibold text-slate-500">
                  Tracks
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="site-shell pb-20">
        <div className="grid overflow-hidden rounded-[28px] border border-black/[.07] bg-white md:grid-cols-4">
          {[
            ["12 weeks", "Focused cohort"],
            ["10 tracks", "Specializations"],
            ["25–30", "Seats per cohort"],
            ["Core + track", "Career and digital skills"],
          ].map(([a, b], i) => (
            <div
              key={a}
              className={`px-7 py-7 ${
                i < 3
                  ? "border-b border-black/[.07] md:border-b-0 md:border-r"
                  : ""
              }`}
            >
              <p className="font-display text-2xl font-bold text-ink">
                {a}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {b}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* THE GAP */}
      <section className="section-space site-shell grid gap-14 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <span className="eyebrow">
            The gap
          </span>

          <h2 className="section-title mt-5 max-w-2xl">
            You don’t need another certificate.{" "}
            <span className="text-slate-400">
              You need something to show.
            </span>
          </h2>

          <p className="body-large mt-6 max-w-xl">
            University can give you knowledge. The market still expects you
            to communicate it, apply it, prove it and perform when an
            opportunity arrives.
          </p>
        </div>

        <div className="space-y-4">
          {[
            [
              "01",
              "Present yourself",
              "Build a stronger resume, LinkedIn presence and professional communication.",
            ],
            [
              "02",
              "Build something",
              "Create practical work you can discuss, demonstrate and improve.",
            ],
            [
              "03",
              "Perform with confidence",
              "Practice interviews, pitching, collaboration and real-world execution.",
            ],
          ].map(([n, t, d]) => (
            <article
              key={n}
              className="surface-card grid gap-4 p-7 transition hover:-translate-y-1 md:grid-cols-[64px_1fr]"
            >
              <span className="font-display text-lg font-bold text-primary">
                {n}
              </span>

              <div>
                <h3 className="text-2xl font-bold text-ink">
                  {t}
                </h3>

                <p className="mt-2 leading-7 text-slate-500">
                  {d}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* WHY YOUTHAURA LABS */}
      <section className="section-space bg-ink text-white">
        <div className="site-shell">
          <span className="eyebrow !text-[#ff9b68]">
            Why YouthAura Labs
          </span>

          <div className="mt-5 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <h2 className="section-title max-w-3xl">
              From “I know this” to{" "}
              <span className="text-primary">
                “here’s what I’ve built.”
              </span>
            </h2>

            <p className="max-w-md leading-7 text-white/50">
              A 12-week career readiness experience designed to help young
              professionals build practical skills, build real projects,
              strengthen their professional pressure and take their next
              career step with confidence.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              [
                BadgeCheck,
                "Proof over certificates",
                "Build practical artifacts instead of collecting passive credentials.",
              ],
              [
                Users,
                "Small cohorts",
                "Feedback, accountability and participation matter in every group.",
              ],
              [
                Bot,
                "AI-era readiness",
                "Modern tools and workflows are part of the learning experience.",
              ],
              [
                GraduationCap,
                "Career fundamentals",
                "Resume, LinkedIn, interviews, communication and professional habits.",
              ],
            ].map(([Icon, t, d], i) => {
              const I = Icon as typeof BadgeCheck;

              return (
                <article
                  key={String(t)}
                  className="min-h-[300px] rounded-[26px] border border-white/10 bg-white/[.04] p-7"
                >
                  <I className="size-6 text-primary" />

                  <div className="mt-24">
                    <p className="text-[11px] font-bold tracking-[.18em] text-white/35">
                      0{i + 1}
                    </p>

                    <h3 className="mt-2 text-xl font-bold">
                      {String(t)}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-white/48">
                      {String(d)}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROGRAM STRUCTURE */}
      <section className="section-space site-shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">
            Program structure
          </span>

          <h2 className="section-title mt-5">
            One career foundation.{" "}
            <span className="text-primary">
              Your direction on top.
            </span>
          </h2>

          <p className="body-large mx-auto mt-5 max-w-2xl">
            Every learner strengthens the fundamentals first, then goes
            deeper into a specialization aligned with their goals.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-[32px] bg-[#ffe7da] p-5 md:p-8">
          <div className="rounded-[24px] bg-white p-7 text-center">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-primary">
              Everyone starts here
            </p>

            <h3 className="mt-3 text-3xl font-bold text-ink">
              Career Readiness Core
            </h3>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {[
                "Resume",
                "LinkedIn",
                "Interview prep",
                "Communication",
                "Professional skills",
              ].map((x) => (
                <span
                  key={x}
                  className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-ink/70"
                >
                  {x}
                </span>
              ))}
            </div>
          </div>

          <div className="py-4 text-center text-2xl text-primary">
            ↓
          </div>

          <div className="rounded-[24px] bg-ink p-7 text-center text-white">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-white/45">
              Then choose your direction
            </p>

            <p className="mt-2 text-2xl font-bold">
              Specialization Track
            </p>
          </div>
        </div>
      </section>

      {/* PROGRAMS - CONSOLIDATED */}
      <section className="pb-24 md:pb-28">
        <div className="site-shell">
          <div className="surface-card px-7 py-10 md:px-10 md:py-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="eyebrow">
                  Specializations
                </span>

                <h2 className="section-title mt-5 max-w-2xl">
                  Build skills the market can use.
                </h2>

                <p className="body-large mt-5 max-w-2xl">
                  Explore all 10 specialization tracks and choose the
                  direction that best matches your goals.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/programs"
                  className="btn-primary"
                >
                  View all 10 tracks
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-space bg-[#eaeff7]">
        <div className="site-shell">
          <span className="eyebrow">
            How it works
          </span>

          <h2 className="section-title mt-5 max-w-3xl">
            A clear path from application to proof.
          </h2>

          <div className="mt-12 grid overflow-hidden rounded-[30px] border border-black/[.07] bg-black/[.07] lg:grid-cols-5">
            {[
              [
                "01",
                "Apply",
                "Tell us where you are and what you want to build.",
              ],
              [
                "02",
                "Get selected",
                "Applications are reviewed for cohort fit.",
              ],
              [
                "03",
                "Build your core",
                "Strengthen the career fundamentals every role needs.",
              ],
              [
                "04",
                "Go deeper",
                "Work through your specialization and practical assignments.",
              ],
              [
                "05",
                "Finish with proof",
                "Leave with work you can discuss and demonstrate.",
              ],
            ].map(([n, t, d]) => (
              <article
                key={n}
                className="min-h-[290px] bg-[#fbfcfe] p-7"
              >
                <span className="font-display text-sm font-bold text-primary">
                  {n}
                </span>

                <div className="mt-20">
                  <h3 className="text-xl font-bold text-ink">
                    {t}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {d}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LEARNING EXPERIENCE */}
      <section className="section-space site-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <span className="eyebrow">
            Learning experience
          </span>

          <h2 className="section-title mt-5">
            This isn’t{" "}
            <span className="text-primary">
              watch-and-forget
            </span>{" "}
            learning.
          </h2>

          <p className="body-large mt-5 max-w-md">
            Participation, feedback, practical work and accountability are
            designed into the experience.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            [
              Users,
              "Mentor feedback",
              "Get practical guidance from people familiar with the work you want to enter.",
            ],
            [
              Code2,
              "Hands-on workshops",
              "Work directly on your resume, portfolio, tools and professional profiles.",
            ],
            [
              CirclePlay,
              "Mock interviews",
              "Practice before the real opportunity arrives.",
            ],
            [
              Sparkles,
              "Peer accountability",
              "Learn with a focused cohort moving forward alongside you.",
            ],
          ].map(([Icon, t, d]) => {
            const I = Icon as typeof Users;

            return (
              <article
                key={String(t)}
                className="surface-card p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-royal">
                  <I className="size-5" />
                </span>

                <h3 className="mt-6 text-xl font-bold text-ink">
                  {String(t)}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {String(d)}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* YOUR OUTPUT */}
      <section className="site-shell pb-24 md:pb-28">
        <div className="overflow-hidden rounded-[34px] bg-royal px-7 py-14 text-white md:px-12">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-white/45">
                Your output
              </p>

              <h2 className="section-title mt-4">
                Don’t leave with only notes.
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Career-ready resume",
                "Stronger LinkedIn presence",
                "Interview practice",
                "Track-specific project",
                "Portfolio proof",
                "Professional network",
              ].map((x, i) => (
                <div
                  key={x}
                  className="flex items-center rounded-2xl border border-white/15 bg-white/[.06] px-5 py-5"
                >
                  <span className="mr-4 text-xs font-bold text-white/35">
                    0{i + 1}
                  </span>

                  <span className="font-semibold">
                    {x}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY - CONSOLIDATED */}
      <section className="section-space bg-ink text-white">
        <div className="site-shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow !text-[#ff9b68]">
              Beyond the cohort
            </span>

            <h2 className="section-title mt-5">
              The cohort ends.{" "}
              <span className="text-primary">
                Your network shouldn’t.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-8 text-white/55">
              Stay connected to peers, mentors, opportunities, events and
              continued learning through the YouthAura community.
            </p>

            <Link
              href="/community"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-ink"
            >
              Explore community
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-space bg-white">
        <div className="site-shell grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <span className="eyebrow">
              FAQ
            </span>

            <h2 className="section-title mt-5">
              Before you{" "}
              <span className="text-primary">
                apply.
              </span>
            </h2>
          </div>

          <Accordion items={faqs} />
        </div>
      </section>

      {/* FINAL CTA */}
      <div className="bg-white pt-20">
        <FinalCTA />
      </div>
    </div>
  );
}