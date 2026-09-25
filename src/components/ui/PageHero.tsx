import { ReactNode } from "react";

export default function PageHero({ eyebrow, title, accent, description, children }: { eyebrow: string; title: string; accent?: string; description: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-36 text-white md:pb-24 md:pt-40">
      <div className="dark-grid absolute inset-0 opacity-30" />
      <div className="absolute -right-36 -top-32 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[100px]" />
      <div className="absolute -bottom-52 left-1/4 h-[360px] w-[360px] rounded-full bg-[#1f5ccc]/20 blur-[100px]" />
      <div className="site-shell relative">
        <span className="eyebrow !text-[#ff9b68]">{eyebrow}</span>
        <h1 className="hero-title mt-7 max-w-4xl">{title}{accent && <><br/><span className="text-primary">{accent}</span></>}</h1>
        <p className="mt-7 max-w-2xl text-[17px] leading-8 text-white/60">{description}</p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
