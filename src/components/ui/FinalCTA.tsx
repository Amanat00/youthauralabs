import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA({ title = "Ready to turn potential into proof?", text = "Join the next YouthAura Labs cohort and start building skills, work and confidence you can take into the market." }: { title?: string; text?: string }) {
  return (
    <section className="site-shell pb-20 md:pb-28">
      <div className="relative overflow-hidden rounded-[36px] bg-primary px-6 py-16 text-center text-white md:px-12 md:py-20">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[52px] border-white/10" />
        <div className="absolute -bottom-32 -left-12 h-72 w-72 rounded-full bg-ink/10 blur-xl" />
        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-[.22em] text-white/60">Next cohort</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-[40px] font-bold leading-[1.02] tracking-[-.05em] sm:text-[56px]">{title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-7 text-white/75">{text}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/apply" className="btn-dark bg-white !text-ink hover:!bg-white/90">Apply for cohort <ArrowRight className="size-4" /></Link><Link href="/programs" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-bold text-white hover:bg-white/10">Explore programs</Link></div>
        </div>
      </div>
    </section>
  );
}
