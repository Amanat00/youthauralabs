"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Instagram, Linkedin, Mail, MapPin, MessageCircle, Youtube } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/auth")) return null;

  return (
    <footer className="bg-ink text-white">
      <div className="site-shell py-16">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center">
  <span className="flex h-[74px] w-[170px] items-center justify-center overflow-hidden rounded-2xl bg-white px-3">
    <Image
      src="/logo.png"
      alt="YouthAura Labs"
      width={280}
      height={130}
      className="h-[82px] w-auto max-w-none scale-[1.25] object-contain"
    />
  </span>
</Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/55">A career-readiness academy helping university students and early-career talent turn potential into practical skills, proof of work and confidence.</p>
            <Link href="/apply" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">Apply for the next cohort <ArrowUpRight className="size-4" /></Link>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-white/35">Explore</p>
            <div className="mt-5 space-y-3 text-sm text-white/65">
              <Link className="block hover:text-white" href="/programs">Programs</Link>
              <Link className="block hover:text-white" href="/community">Community</Link>
              <Link className="block hover:text-white" href="/about">About</Link>
              <Link className="block hover:text-white" href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-white/35">Reach us</p>
            <div className="mt-5 space-y-4 text-sm text-white/65">
              <a
  href="mailto:youthauralabs@gmail.com"
  className="flex items-start gap-2 hover:text-white"
>
  <Mail className="mt-0.5 size-4 text-primary" />
  youthauralabs@gmail.com
</a>
              <p className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 text-primary" />Okara, Pakistan · online nationwide</p>
              <a href="https://chat.whatsapp.com/FYnPFPS9lYi9FDV7txhSnN" className="flex items-start gap-2 hover:text-white"><MessageCircle className="mt-0.5 size-4 text-primary" />WhatsApp community</a>
            </div>
            <div className="mt-5 flex gap-2">
              {[Instagram, Youtube, Linkedin].map((Icon, i) => <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-primary hover:text-primary"><Icon className="size-4" /></a>)}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 py-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 YouthAura Labs. All rights reserved.</p><Link href="/auth" className="hover:text-white">Admin portal</Link></div>
      </div>
    </footer>
  );
}
