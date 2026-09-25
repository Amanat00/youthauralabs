import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Compass,
  Eye,
  Flame,
  HeartHandshake,
  Lightbulb,
  MoveRight,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import FinalCTA from "@/components/ui/FinalCTA";

export const metadata = {
  title: "About YouthAura Labs — Mission, Story & Values",
  description:
    "Why YouthAura Labs exists and how it helps young people bridge the gap between education and the market.",
};

const principles = [
  {
    title: "Proof over promises",
    text: "We care about what a learner can show, explain and improve — not how many slides they watched.",
    icon: BadgeCheck,
  },
  {
    title: "Access over exclusivity",
    text: "Talent exists everywhere. Opportunity and guidance should not be limited to a small circle.",
    icon: HeartHandshake,
  },
  {
    title: "Honesty over comfort",
    text: "Useful feedback is direct, respectful and specific enough to act on.",
    icon: ShieldCheck,
  },
  {
    title: "Momentum over perfection",
    text: "Ship the draft, get feedback, iterate and keep moving.",
    icon: MoveRight,
  },
  {
    title: "Community over cohort",
    text: "The formal program can end without the network disappearing.",
    icon: Users,
  },
  {
    title: "Discipline over hype",
    text: "Career growth comes from habits, practice and consistency — not temporary motivation.",
    icon: Flame,
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[#fff8f1] pb-20 pt-32 md:pb-24 md:pt-36">
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top_left,rgba(255,90,18,.09),transparent_32%),radial-gradient(circle_at_top_right,rgba(18,58,146,.08),transparent_28%)]" />
        <div className="site-shell relative grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <span className="eyebrow">About YouthAura Labs</span>
            <h1 className="hero-title mt-7 max-w-4xl text-ink">
              A degree can open a door.
              <span className="block text-primary">Readiness helps you walk through it.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-[18px] leading-8 text-slate-600">
              YouthAura Labs exists for ambitious students and early-career talent who need more than theory — they need exposure, practical work, stronger communication and a clearer path into the market.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/apply" className="btn-primary">
                Apply for the next cohort
                <ArrowRight className="size-4" />
              </Link>
              <Link href="/programs" className="btn-outline">
                Explore programs
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[32px] bg-ink p-7 text-white sm:col-span-2 md:p-8">
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.18em] text-primary">
                <Lightbulb className="size-4" />
                The core idea
              </div>
              <p className="mt-5 max-w-xl text-[26px] font-bold leading-tight tracking-[-0.04em]">
                Capable young people are often underprepared not because they lack talent — but because they lack guided practice.
              </p>
            </div>
            <div className="rounded-[28px] bg-white p-6 shadow-[0_15px_50px_rgba(8,20,47,.06)]">
              <span className="text-[11px] font-bold uppercase tracking-[.18em] text-slate-400">
                Vision
              </span>
              <p className="mt-4 text-lg font-bold text-ink">
                A future where potential is easier to convert into opportunity.
              </p>
            </div>
            <div className="rounded-[28px] bg-[#ffe7da] p-6">
              <span className="text-[11px] font-bold uppercase tracking-[.18em] text-primary">
                Mission
              </span>
              <p className="mt-4 text-lg font-bold text-ink">
                Build career confidence through practical learning, mentorship and proof of work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space site-shell">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <span className="eyebrow">Our story</span>
            <h2 className="section-title mt-5">The gap was never intelligence. It was exposure.</h2>
          </div>
          <div className="grid gap-4">
            {[
              [
                "01",
                "What we kept seeing",
                "Talented students reached graduation with knowledge and ambition, but without enough practice presenting themselves, building market-ready work or navigating real hiring conversations.",
              ],
              [
                "02",
                "What YouthAura Labs adds",
                "A focused cohort experience: career fundamentals everyone needs, a specialization chosen by the learner, direct feedback and a community that keeps progress visible.",
              ],
              [
                "03",
                "What success looks like",
                "Learners move from “I think I can do this” to “here is the work that proves I can.”",
              ],
            ].map(([n, t, d]) => (
              <article
                key={n}
                className="grid gap-4 rounded-[28px] border border-black/[0.07] bg-white p-7 shadow-[0_14px_40px_rgba(8,20,47,.05)] md:grid-cols-[76px_1fr]"
              >
                <span className="font-display text-lg font-bold text-primary">{n}</span>
                <div>
                  <h3 className="text-2xl font-bold text-ink">{t}</h3>
                  <p className="mt-3 leading-7 text-slate-500">{d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-ink text-white">
        <div className="site-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <span className="eyebrow !text-[#ff9b68]">Belief system</span>
            <h2 className="section-title mt-5">The principles behind the experience.</h2>
            <p className="mt-5 max-w-md text-[17px] leading-8 text-white/55">
              These values shape how the cohort is taught, how feedback is given and what kind of progress we care about.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {principles.map(({ title, text, icon: Icon }) => (
              <article
                key={title}
                className="rounded-[24px] border border-white/10 bg-white/[.04] p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[.08] text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/50">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space site-shell">
        <div className="rounded-[36px] bg-[#eef2f8] p-7 md:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <span className="eyebrow">How the model works</span>
              <h2 className="section-title mt-5">A lab, not a lecture hall.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [Compass, "Career core", "Resume, LinkedIn, interview preparation and communication."],
                [Target, "Specialization", "A focused track aligned with the learner’s direction."],
                [Sparkles, "Practical output", "Work that can be discussed, demonstrated or added to a portfolio."],
                [Users, "Feedback loops", "Mentors and peers make improvement visible and actionable."],
              ].map(([Icon, title, text]) => {
                const I = Icon as typeof Compass;
                return (
                  <div key={String(title)} className="rounded-[24px] bg-white p-6 shadow-[0_14px_35px_rgba(8,20,47,.04)]">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary">
                      <I className="size-5" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-ink">{String(title)}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-500">{String(text)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <span className="eyebrow">Who it is for</span>
            <h2 className="section-title mt-5">Ambitious people still building their edge.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [Flame, "University students", "You want clarity, practical exposure and a stronger transition into the market."],
              [ShieldCheck, "Fresh graduates", "You have the degree and need to strengthen positioning, proof and confidence."],
              [Target, "Early-career talent", "You want better communication, more focused skills or a stronger professional direction."],
              [HeartHandshake, "Mentors & partners", "You want to contribute expertise, opportunities or industry exposure to emerging talent."],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof Flame;
              return (
                <article key={String(title)} className="surface-card p-6">
                  <I className="size-5 text-primary" />
                  <h3 className="mt-5 text-lg font-bold text-ink">{String(title)}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-500">{String(text)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space site-shell">
        <div className="overflow-hidden rounded-[38px] bg-[#fff0e7] p-8 md:p-12 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-[.6fr_1.4fr]">
            <div>
              <div className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-ink font-display text-2xl font-bold text-primary">
                YA
              </div>
            </div>
            <div>
              <span className="eyebrow">Founder story</span>
              <h2 className="mt-4 text-3xl font-bold text-ink">This block is ready for the real founder story.</h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                Replace this copy with the founder’s real name, photo, background and why YouthAura Labs was started. The layout is intentionally launch-ready while keeping the content clearly marked as a genuine-content placeholder.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn-dark">
                  Partner with YouthAura Labs
                  <ArrowRight className="size-4" />
                </Link>
                <Link href="/community" className="btn-outline">
                  Explore the community
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA title="Build a stronger start to your career." />
    </div>
  );
}
