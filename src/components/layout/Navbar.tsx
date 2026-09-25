"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  if (pathname.startsWith("/admin") || pathname.startsWith("/auth")) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className={`site-shell !px-0 transition-all duration-300 ${scrolled ? "" : ""}`}>
        <nav className={`flex items-center justify-between rounded-2xl border px-3 py-2 transition-all ${scrolled ? "border-black/10 bg-[#fffdf8]/95 shadow-[0_12px_40px_rgba(8,20,47,.08)] backdrop-blur-xl" : "border-white/60 bg-white/80 backdrop-blur-xl"}`}>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-white">
              <Image src="/logo.png" alt="YouthAura Labs" width={64} height={64} className="h-14 w-14 object-cover object-left" priority />
            </span>
            <span className="font-display text-[17px] font-bold tracking-[-0.04em] text-ink">YouthAura <span className="text-primary">Labs</span></span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return <Link key={link.href} href={link.href} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${active ? "bg-ink text-white" : "text-ink/65 hover:bg-black/[0.04] hover:text-ink"}`}>{link.label}</Link>;
            })}
          </div>

          <div className="hidden lg:block">
            <Link href="/apply" className="btn-primary !min-h-10 !px-5">Apply for cohort <ArrowUpRight className="size-4" /></Link>
          </div>

          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 text-ink lg:hidden">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        {open && (
          <div className="mt-2 rounded-2xl border border-black/10 bg-white p-4 shadow-2xl lg:hidden">
            <div className="flex flex-col gap-1">
              {links.map((link) => <Link key={link.href} href={link.href} className="rounded-xl px-4 py-3 text-sm font-semibold text-ink/75 hover:bg-secondary">{link.label}</Link>)}
              <Link href="/apply" className="btn-primary mt-3 w-full">Apply for cohort <ArrowUpRight className="size-4" /></Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
