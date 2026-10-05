import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Check,
  Code2,
  GraduationCap,
  Lightbulb,
  Megaphone,
  Palette,
  Rocket,
  ShoppingBag,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import FinalCTA from "@/components/ui/FinalCTA";

export const metadata = {
  title: "Programs — Career Core & Specialization Tracks | YouthAura Labs",
  description:
    "Explore the YouthAura Labs career-readiness core and ten practical specialization tracks.",
};

const tracks = [
  [
    "Freelancing",
    "Shape a market-ready offer, profile and client acquisition approach.",
    BriefcaseBusiness,
    "Career",
    "freelancing",
  ],
  [
    "E-commerce",
    "Understand the building blocks of selling products online.",
    ShoppingBag,
    "Commerce",
    "e-commerce",
  ],
  [
    "Digital Marketing",
    "Learn audience, content, campaign and channel fundamentals.",
    Megaphone,
    "Marketing",
    "digital-marketing",
  ],
  [
    "Social Media Handling",
    "Plan content and manage a brand’s social presence with purpose.",
    Users,
    "Marketing",
    "social-media-handling",
  ],
  [
    "Graphic Designing",
    "Create portfolio-ready visual work and sharpen design fundamentals.",
    Palette,
    "Creative",
    "graphic-designing",
  ],
  [
    "AI Automation",
    "Build useful AI-powered workflows for practical tasks.",
    Workflow,
    "AI",
    "ai-automation",
  ],
  [
    "Applied AI Across Industries",
    "Learn how AI can support work in different professional contexts.",
    Bot,
    "AI",
    "applied-ai-across-industries",
  ],
  [
    "Project Management",
    "Plan, coordinate and communicate a small project with structure.",
    Target,
    "Management",
    "project-management",
  ],
  [
    "Web Development Awareness",
    "Understand modern web workflows well enough to brief, review and improve builds.",
    Code2,
    "Digital",
    "web-development-awareness",
  ],
  [
    "Business Development",
    "Practice outreach, pitching, relationship building and client conversations.",
    Rocket,
    "Business",
    "business-development",
  ],
];

export default function ProgramsPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink pb-20 pt-32 text-white md:pb-24 md:pt-36">
        <div className="dark-grid absolute inset-0 opacity-25" />
        <div className="absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[110px]" />
        <div className="absolute -right-28 bottom-0 h-[380px] w-[380px] rounded-full bg-[#1f5ccc]/25 blur-[110px]" />
        <div className="site-shell relative grid items-start gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <span className="eyebrow !text-[#ff9b68]">Programs</span>
            <h1 className="hero-title mt-7 max-w-4xl">
              One career core.
              <span className="block text-primary">Ten ways to go deeper.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-[18px] leading-8 text-white/60">
              YouthAura Labs combines professional fundamentals with a practical specialization so learners build both direction and proof.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/apply" className="btn-primary">
                Apply for the next cohort
                <ArrowRight className="size-4" />
              </Link>
              <a href="#tracks" className="btn-outline !border-white/15 !bg-white/[.06] !text-white hover:!bg-white/[.1]">
                View tracks
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-white/[.05] p-6 sm:col-span-2">
              <p className="text-[11px] font-bold uppercase tracking-[.18em] text-white/45">Program architecture</p>
              <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
                <div className="rounded-2xl bg-white/[.06] p-5">
                  <p className="text-xs font-bold uppercase tracking-[.16em] text-primary">Step 1</p>
                  <h3 className="mt-2 text-xl font-bold">Career readiness core</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">Resume, LinkedIn, interview preparation, communication and professional habits.</p>
                </div>
                <div className="text-center text-2xl text-primary">→</div>
                <div className="rounded-2xl bg-white/[.06] p-5">
                  <p className="text-xs font-bold uppercase tracking-[.16em] text-primary">Step 2</p>
                  <h3 className="mt-2 text-xl font-bold">Specialization track</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">Choose a direction and build practical output you can keep developing.</p>
                </div>
              </div>
            </div>
            {[
              ["12 weeks", "Focused cohort"],
              ["10 tracks", "Specialization options"],
              ["Practical", "Learning by doing"],
              ["Output", "Visible progress"],
            ].map(([big, small]) => (
              <div key={big} className="rounded-[24px] border border-white/10 bg-white/[.05] p-5">
                <p className="text-3xl font-bold">{big}</p>
                <p className="mt-2 text-sm text-white/50">{small}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space site-shell">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <span className="eyebrow">Career core</span>
            <h2 className="section-title mt-5">Everyone starts with the same foundation.</h2>
            <p className="body-large mt-5 max-w-lg">
              Before going deeper into a specialization, every learner strengthens the professional assets and habits that improve readiness across roles.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [GraduationCap, "Resume strategy", "Frame education, experience and skills clearly for recruiters and clients."],
              [Users, "LinkedIn presence", "Build a profile that communicates direction, credibility and value."],
              [Target, "Interview readiness", "Practice behavioral responses, structure, confidence and follow-up."],
              [Lightbulb, "Professional skills", "Communication, ethics, time management and responsible use of modern tools."],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof GraduationCap;
              return (
                <article key={String(title)} className="surface-card p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary">
                    <I className="size-5" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-ink">{String(title)}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{String(text)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#eef2f8]">
        <div className="site-shell">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="eyebrow">How the 12 weeks feel</span>
              <h2 className="section-title mt-5 max-w-3xl">A learning flow built for momentum.</h2>
            </div>
            <p className="max-w-md leading-7 text-slate-500">
              The structure is designed to help learners build clarity first, practice consistently and leave with more visible progress than they started with.
            </p>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-4">
            {[
              ["01", "Orientation", "Set expectations, goals and the direction you want to build toward."],
              ["02", "Career core", "Strengthen the assets and habits every learner needs."],
              ["03", "Track work", "Apply your chosen specialization through practical tasks and feedback."],
              ["04", "Output", "Leave with stronger proof, more confidence and clearer next steps."],
            ].map(([n, t, d]) => (
              <article key={n} className="rounded-[28px] bg-white p-7 shadow-[0_14px_40px_rgba(8,20,47,.05)]">
                <span className="font-display text-sm font-bold text-primary">{n}</span>
                <h3 className="mt-16 text-2xl font-bold text-ink">{t}</h3>
                <p className="mt-3 leading-7 text-slate-500">{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="tracks" className="section-space site-shell">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Specialization tracks</span>
            <h2 className="section-title mt-5 max-w-3xl">Choose the capability you want to build next.</h2>
          </div>
          <p className="max-w-md leading-7 text-slate-500">
            The goal is not mastery in twelve weeks — it is a credible foundation, useful output and a clearer next step.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
  {tracks.map(([title, desc, Icon, tag, slug], i) => {
    const I = Icon as typeof Bot;

    return (
      <Link
        key={String(title)}
        href={`/programs/${String(slug)}`}
        className="group block"
      >
        <article className="surface-card flex min-h-[300px] h-full flex-col justify-between p-7 transition hover:-translate-y-1">
          <div className="flex items-start justify-between gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-royal">
              <I className="size-5" />
            </span>

            <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[.16em] text-primary">
              {String(tag)}
            </span>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-300">
              {String(i + 1).padStart(2, "0")}
            </p>

            <h3 className="mt-2 text-2xl font-bold text-ink">
              {String(title)}
            </h3>

            <p className="mt-3 leading-7 text-slate-500">
              {String(desc)}
            </p>

            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
              View roadmap
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </article>
      </Link>
    );
  })}
</div>
      </section>

      <section className="section-space bg-[#fff8f1]">
        <div className="site-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <span className="eyebrow">What supports the learning</span>
            <h2 className="section-title mt-5">Support is part of the program — not an add-on.</h2>
            <p className="body-large mt-5 max-w-lg">
              Mentorship, workshops and practice sessions sit around the curriculum so learners can apply what they are building.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [Users, "Mentor guidance", "Regular feedback from people familiar with the field or professional context."],
              [Code2, "Hands-on workshops", "Build and improve real career assets, profiles and practical work."],
              [Target, "Mock interviews", "Practice answers, communication and confidence before live opportunities."],
              [BriefcaseBusiness, "Opportunity exposure", "Relevant internships, freelance leads and openings can be shared with the community."],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof Users;
              return (
                <article key={String(title)} className="rounded-[24px] border border-black/[.07] bg-white p-6 shadow-[0_14px_35px_rgba(8,20,47,.04)]">
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
        <div className="rounded-[36px] bg-ink p-7 text-white md:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <span className="eyebrow !text-[#ff9b68]">What you leave with</span>
              <h2 className="section-title mt-5">Output that makes progress visible.</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Career-ready resume",
                "Stronger LinkedIn profile",
                "Interview practice",
                "Specialization project",
                "Portfolio-ready evidence",
                "A network to keep building with",
              ].map((x) => (
                <div key={x} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.05] px-5 py-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white">
                    <Check className="size-4" />
                  </span>
                  <span className="font-semibold">{x}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
