"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  MapPin,
  Sparkles,
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

        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
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
                I started in Okara with big dreams and no clear roadmap.
                My own search for practical skills, real-world experience,
                and better opportunities eventually became the foundation
                of YouthAura Labs.
              </p>

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
                Book a consultation
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* RIGHT — Original Founder Story */}
          <div className="rounded-[32px] border border-black/[0.06] bg-white p-6 shadow-[0_18px_50px_rgba(8,20,47,.06)] md:p-8 lg:p-9">
            <div className="space-y-5 text-[15px] leading-7 text-slate-600 md:text-[16px] md:leading-8">
              <p>
                I grew up in Okara, a small city in Pakistan where
                opportunities, especially for young people with ambitions
                beyond the conventional path, can feel limited. For the
                longest time, I believed that if I wanted to build something
                big, I had to leave.
              </p>

              <p>
                I wanted to get out, explore the world, and become someone
                who could create opportunities rather than wait for them.
                That ambition pushed me to work hard for admission to{" "}
                <strong className="font-semibold text-ink">
                  Punjab University in Lahore
                </strong>
                , one of the biggest milestones of my life at the time.
              </p>

              <p>
                I thought getting into a good university would be the
                beginning of everything I&apos;d dreamed of. But as I
                progressed through my degree in{" "}
                <strong className="font-semibold text-ink">
                  Business and Information Technology at IBIT
                </strong>
                , I found myself asking a difficult question: What am I
                actually learning that will prepare me for the real world?
              </p>

              <p>
                I didn&apos;t want to spend four years studying, graduate
                with a degree, and end up searching for a conventional
                corporate job that might not even exist in the city I wanted
                to build my life in. I wanted to create something of my own,
                but I had no roadmap for how to do it.
              </p>

              <p>
                So, during my third semester, I started exploring beyond the
                classroom. I stepped into{" "}
                <strong className="font-semibold text-ink">
                  freelancing
                </strong>
                , learned practical skills, worked with international clients,
                and gradually found my way into{" "}
                <strong className="font-semibold text-ink">
                  business and AI automation
                </strong>
                . I started discovering opportunities I didn&apos;t even know
                existed when I was growing up.
              </p>

              <p>
                And somewhere along the way, my biggest realization came:
                I&apos;d spent years wanting to escape my city because I
                thought it was the limitation. I was beginning to understand
                that the real limitation was believing opportunities had to
                exist around me before I could create them.
              </p>

              <p>
                The internet had opened doors that geography couldn&apos;t
                close. I could work with people across the world while sitting
                in my own city. I could learn skills that weren&apos;t being
                taught in my classrooms. I could build something bigger than
                my surroundings had ever shown me was possible.
              </p>

              <div className="rounded-[22px] bg-[#f7f4ed] px-5 py-5 md:px-6">
                <p className="leading-7 text-slate-600">
                  At 21, being nominated for the{" "}
                  <strong className="font-semibold text-ink">
                    Iconic Women CEO Awards 2026
                  </strong>{" "}
                  in the Tech &amp; Digital category became a meaningful
                  milestone in my journey. More than anything, it reminded me
                  of the distance between the girl who once felt limited by
                  her surroundings and the person she was becoming.
                </p>
              </div>

              <p className="font-semibold text-ink">
                That journey is what inspired me to create YouthAura Labs.
              </p>

              <p>
                I know how confusing it can be to be young today. There&apos;s
                advice coming from everywhere, countless skills to learn, and
                so many career paths that it&apos;s hard to know which
                direction to take. You know you have potential, but figuring
                out where to channel it can be overwhelming.
              </p>

              <p>
                I wanted to create the kind of resource I wish I&apos;d had:
                practical roadmaps built around real experience, helping
                young people discover their strengths, explore opportunities,
                develop valuable skills, and find a direction that feels
                right for them.
              </p>

              <p>
                I started in Okara with big dreams and no clear roadmap.
                I had to find my own way, and now I want to make that journey
                a little easier for others.
              </p>

              <blockquote className="mt-7 border-l-[3px] border-primary pl-5 font-display text-[21px] font-bold leading-[1.45] tracking-[-0.02em] text-ink md:text-[24px]">
                “You don&apos;t need to have your whole life figured out to
                begin. Start where you are, use what you have, and give
                yourself a chance. Your beginnings don&apos;t define how far
                you can go.”
              </blockquote>
            </div>

            <div className="mt-8 border-t border-black/[0.06] pt-6">
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