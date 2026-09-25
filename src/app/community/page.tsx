import { BookOpen, BriefcaseBusiness, CalendarDays, MessageCircle, Network, Sparkles, Target, Users } from "lucide-react";
import FinalCTA from "@/components/ui/FinalCTA";

export const metadata = {
  title: "Community — YouthAura Labs",
  description:
    "The YouthAura Labs community for opportunities, resources, events, peers and continued career momentum.",
};

const benefits = [
  [BriefcaseBusiness, "Career opportunities", "Jobs, internships and freelance leads relevant to the community."],
  [BookOpen, "Learning resources", "Templates, recordings, worksheets and useful references from sessions."],
  [CalendarDays, "Events", "Workshops, guest sessions and community activities in one place."],
  [Target, "Accountability", "Regular check-ins that help progress survive beyond a single workshop."],
  [Users, "Networking", "Peers, mentors and alumni across different tracks and interests."],
  [Sparkles, "Announcements", "Cohort openings, deadlines and important community updates."],
];

export default function CommunityPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[#08142f] pb-20 pt-32 text-white md:pb-24 md:pt-36">
        <div className="dark-grid absolute inset-0 opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,90,18,.18),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,.08),transparent_24%)]" />
        <div className="site-shell relative grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <span className="eyebrow !text-[#ff9b68]">Community</span>
            <h1 className="hero-title mt-7 max-w-4xl">
              The cohort is temporary.
              <span className="block text-primary">The network can keep growing.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-[18px] leading-8 text-white/60">
              YouthAura Labs is designed to connect ambitious learners with peers, mentors, resources and opportunities before, during and after the cohort.
            </p>
            <a href="https://chat.whatsapp.com/REPLACE-WITH-YOUR-INVITE-CODE" className="btn-primary mt-8">
              <MessageCircle className="size-4" />
              Join WhatsApp community
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[30px] border border-white/10 bg-white/[.06] p-6 sm:col-span-2">
              <p className="text-[11px] font-bold uppercase tracking-[.18em] text-white/45">Inside the circle</p>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {[
                  ["Peers", "People building in public"],
                  ["Mentors", "Guidance where it matters"],
                  ["Opportunities", "Useful next steps"],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl bg-white/[.06] p-4">
                    <p className="font-bold">{title}</p>
                    <p className="mt-2 text-sm text-white/50">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[.06] p-5">
              <p className="text-3xl font-bold">Useful</p>
              <p className="mt-2 text-sm text-white/50">Resources, updates and accountability</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[.06] p-5">
              <p className="text-3xl font-bold">Ongoing</p>
              <p className="mt-2 text-sm text-white/50">Support beyond the formal cohort</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space site-shell">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <span className="eyebrow">Why community matters</span>
            <h2 className="section-title mt-5">Progress is easier when you are not building alone.</h2>
            <p className="body-large mt-5 max-w-lg">
              The community keeps useful conversations, resources and opportunities visible so momentum does not disappear between sessions.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map(([Icon, title, text]) => {
              const I = Icon as typeof Users;
              return (
                <article key={String(title)} className="surface-card p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary">
                    <I className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink">{String(title)}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-500">{String(text)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#eef2f8]">
        <div className="site-shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">How it works</span>
            <h2 className="section-title mt-5">Useful by design — not another noisy group chat.</h2>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {[
              ["01", "Ask better questions", "Get help on career assets, practical work and next steps without pretending you already know everything."],
              ["02", "Share what you build", "Progress becomes more useful when it is visible and open to feedback."],
              ["03", "Find your people", "Meet learners moving toward similar roles, industries and goals."],
            ].map(([n, title, text]) => (
              <article key={n} className="rounded-[28px] bg-white p-7 shadow-[0_14px_40px_rgba(8,20,47,.05)]">
                <span className="font-display text-sm font-bold text-primary">{n}</span>
                <h3 className="mt-16 text-2xl font-bold text-ink">{title}</h3>
                <p className="mt-3 leading-7 text-slate-500">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space site-shell">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div className="rounded-[34px] bg-[#fff0e7] p-7 md:p-10">
            <span className="eyebrow">What stays active</span>
            <h2 className="section-title mt-5">One place to stay close to the work.</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-8 text-slate-600">
              Join the WhatsApp circle for updates, opportunities and community conversations. Replace the placeholder invite URL before launch.
            </p>
            <a href="https://chat.whatsapp.com/REPLACE-WITH-YOUR-INVITE-CODE" className="btn-dark mt-7">
              <MessageCircle className="size-4" />
              Join WhatsApp community
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [Network, "Peers + mentors", "People to learn from and build with."],
              [BriefcaseBusiness, "Career opportunities", "Relevant internships, jobs and freelance leads."],
              [BookOpen, "Learning resources", "Templates, recordings and useful references."],
              [CalendarDays, "Events + updates", "Guest sessions, launches and important notices."],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof Network;
              return (
                <div key={String(title)} className="rounded-[24px] border border-black/[.07] bg-white p-6 shadow-[0_14px_35px_rgba(8,20,47,.04)]">
                  <I className="size-5 text-primary" />
                  <h3 className="mt-5 text-lg font-bold text-ink">{String(title)}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-500">{String(text)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCTA
        title="Join the cohort. Stay for the network."
        text="Apply for the next YouthAura Labs cohort and become part of a community built around practical progress."
      />
    </div>
  );
}
