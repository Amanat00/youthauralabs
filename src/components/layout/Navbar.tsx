"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  ChevronDown,
  ClipboardCheck,
  Code2,
  Handshake,
  Megaphone,
  Menu,
  Palette,
  Share2,
  ShoppingCart,
  X,
} from "lucide-react";

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/community",
    label: "Community",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

const roadmaps = [
  {
    href: "/programs/freelancing",
    label: "Freelancing",
    description:
      "Build skills to start working independently.",
    icon: BriefcaseBusiness,
  },
  {
    href: "/programs/project-management",
    label: "Project Management",
    description:
      "Plan, organize and deliver work effectively.",
    icon: ClipboardCheck,
  },
  {
    href: "/programs/ai-automation",
    label: "AI Automation",
    description:
      "Use AI tools to automate modern workflows.",
    icon: Bot,
  },
  {
    href: "/programs/e-commerce",
    label: "E-commerce",
    description:
      "Learn the foundations of online selling.",
    icon: ShoppingCart,
  },
  {
    href: "/programs/digital-marketing",
    label: "Digital Marketing",
    description:
      "Understand campaigns, growth and promotion.",
    icon: Megaphone,
  },
  {
    href: "/programs/social-media-handling",
    label: "Social Media Handling",
    description:
      "Plan, manage and grow social channels.",
    icon: Share2,
  },
  {
    href: "/programs/graphic-designing",
    label: "Graphic Designing",
    description:
      "Develop practical visual design skills.",
    icon: Palette,
  },
  {
    href: "/programs/applied-ai-across-industries",
    label: "Applied AI Across Industries",
    description:
      "Explore practical AI use across industries.",
    icon: BrainCircuit,
  },
  {
    href: "/programs/web-development-awareness",
    label: "Web Development Awareness",
    description:
      "Understand how modern websites are built.",
    icon: Code2,
  },
  {
    href: "/programs/business-development",
    label: "Business Development",
    description:
      "Learn outreach, growth and client development.",
    icon: Handshake,
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] =
    useState(false);
  const [megaOpen, setMegaOpen] =
    useState(false);

  const [
    mobileProgramsOpen,
    setMobileProgramsOpen,
  ] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 14);
    };

    onScroll();

    window.addEventListener(
      "scroll",
      onScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setMegaOpen(false);
    setMobileProgramsOpen(false);
  }, [pathname]);

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/auth")
  ) {
    return null;
  }

  const programsActive =
    pathname.startsWith("/programs");

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="site-shell !px-0">
        <nav
          className={`flex items-center justify-between rounded-2xl border px-3 py-2 transition-all duration-300 ${
            scrolled
              ? "border-black/10 bg-[#fffdf8]/95 shadow-[0_12px_40px_rgba(8,20,47,.08)] backdrop-blur-xl"
              : "border-white/60 bg-white/80 backdrop-blur-xl"
          }`}
        >
          <Link
            href="/"
            onClick={() => {
              setOpen(false);
              setMegaOpen(false);
              setMobileProgramsOpen(false);
            }}
            className="flex h-[75px] w-[165px] shrink-0 items-center"
          >
            <Image
              src="/youthauralogo.png"
              alt="YouthAura Labs"
              width={360}
              height={180}
              priority
              className="h-[62px] w-auto object-contain object-left"
            />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            <Link
              href="/"
              onClick={() =>
                setMegaOpen(false)
              }
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                pathname === "/"
                  ? "bg-ink text-white"
                  : "text-ink/65 hover:bg-black/[0.04] hover:text-ink"
              }`}
            >
              Home
            </Link>

            <div
              className="relative"
              onMouseEnter={() =>
                setMegaOpen(true)
              }
              onMouseLeave={() =>
                setMegaOpen(false)
              }
            >
              <Link
                href="/programs"
                onClick={() =>
                  setMegaOpen(false)
                }
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  programsActive
                    ? "bg-ink text-white"
                    : "text-ink/65 hover:bg-black/[0.04] hover:text-ink"
                }`}
              >
                Programs

                <ChevronDown
                  className={`size-3.5 transition-transform duration-200 ${
                    megaOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </Link>

              {/* Hover Bridge */}
<div
  className={`absolute left-1/2 top-full -translate-x-[46%] pt-4 ${
    megaOpen
      ? "block"
      : "hidden"
  }`}
>
  {/* Mega Menu */}
  <div className="w-[960px] max-w-[calc(100vw-32px)] overflow-hidden rounded-[28px] border border-black/[.07] bg-white shadow-[0_30px_80px_rgba(8,20,47,.16)]">
    <div className="grid grid-cols-[240px_1fr]">

      {/* Left Overview */}
      <div className="bg-ink p-7 text-white">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff9b68]">
          Programs
        </span>

        <h3 className="mt-4 font-display text-[23px] font-bold leading-tight">
          Explore your
          learning path.
        </h3>

        <p className="mt-4 text-sm leading-6 text-white/55">
          Choose a track and
          explore its structured
          roadmap, skills and
          learning direction.
        </p>

        <Link
          href="/programs"
          onClick={() =>
            setMegaOpen(false)
          }
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold text-ink transition hover:bg-[#fff0e7]"
        >
          View all programs
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* Roadmap Links */}
      <div className="p-6">
        <div className="mb-4 px-2">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
            Track Roadmaps
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Select a roadmap to explore.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-x-3 gap-y-2">
          {roadmaps.map(
            (roadmap) => {
              const Icon =
                roadmap.icon;

              const active =
                pathname ===
                roadmap.href;

              return (
                <Link
                  key={
                    roadmap.href
                  }
                  href={
                    roadmap.href
                  }
                  onClick={() =>
                    setMegaOpen(
                      false
                    )
                  }
                  className={`group/item flex min-w-0 gap-2.5 rounded-2xl p-3 transition ${
                    active
                      ? "bg-primary/[0.08]"
                      : "hover:bg-[#f7f4ed]"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                      active
                        ? "bg-primary text-white"
                        : "bg-[#fff0e7] text-primary group-hover/item:bg-primary group-hover/item:text-white"
                    }`}
                  >
                    <Icon className="size-[17px]" />
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`text-[13px] font-bold leading-[18px] ${
                        active
                          ? "text-primary"
                          : "text-ink"
                      }`}
                    >
                      {
                        roadmap.label
                      }
                    </p>

                    <p className="mt-1 line-clamp-2 text-[10.5px] leading-[16px] text-slate-400">
                      {
                        roadmap.description
                      }
                    </p>
                  </div>
                </Link>
              );
            }
          )}
        </div>
      </div>
    </div>
  </div>
</div>
            </div>

            {links
              .filter(
                (link) =>
                  link.href !== "/"
              )
              .map((link) => {
                const active =
                  pathname ===
                  link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() =>
                      setMegaOpen(false)
                    }
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-ink text-white"
                        : "text-ink/65 hover:bg-black/[0.04] hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
          </div>

          <div className="hidden lg:block">
            <Link
              href="/apply"
              onClick={() =>
                setMegaOpen(false)
              }
              className="btn-primary !min-h-10 !px-5"
            >
              Apply for cohort
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => {
              setOpen(
                (current) => !current
              );

              setMegaOpen(false);
              setMobileProgramsOpen(false);
            }}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 text-ink lg:hidden"
          >
            {open ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </nav>

        {open && (
          <div className="mt-2 max-h-[calc(100vh-120px)] overflow-y-auto rounded-2xl border border-black/10 bg-white p-4 shadow-2xl lg:hidden">
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => {
                  setOpen(false);
                  setMobileProgramsOpen(false);
                }}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-ink/75 transition hover:bg-secondary"
              >
                Home
              </Link>

              <div>
                <button
                  type="button"
                  onClick={() =>
                    setMobileProgramsOpen(
                      (current) =>
                        !current
                    )
                  }
                  aria-expanded={
                    mobileProgramsOpen
                  }
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition ${
                    programsActive
                      ? "bg-secondary text-ink"
                      : "text-ink/75 hover:bg-secondary"
                  }`}
                >
                  <span>
                    Programs
                  </span>

                  <ChevronDown
                    className={`size-4 transition-transform duration-200 ${
                      mobileProgramsOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {mobileProgramsOpen && (
                  <div className="mt-2 rounded-2xl bg-[#faf8f3] p-2">
                    <Link
                      href="/programs"
                      onClick={() => {
                        setMobileProgramsOpen(
                          false
                        );
                        setOpen(false);
                      }}
                      className="mb-1 flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-ink transition hover:bg-white"
                    >
                      View all programs
                      <ArrowRight className="size-4 text-primary" />
                    </Link>

                    <div className="my-2 h-px bg-black/[0.06]" />

                    <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                      Track Roadmaps
                    </p>

                    <div className="grid gap-1 sm:grid-cols-2">
                      {roadmaps.map(
                        (roadmap) => {
                          const Icon =
                            roadmap.icon;

                          const active =
                            pathname ===
                            roadmap.href;

                          return (
                            <Link
                              key={
                                roadmap.href
                              }
                              href={
                                roadmap.href
                              }
                              onClick={() => {
                                setMobileProgramsOpen(
                                  false
                                );
                                setOpen(
                                  false
                                );
                              }}
                              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                                active
                                  ? "bg-white text-primary"
                                  : "text-ink/70 hover:bg-white hover:text-ink"
                              }`}
                            >
                              <span
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                                  active
                                    ? "bg-primary text-white"
                                    : "bg-[#fff0e7] text-primary"
                                }`}
                              >
                                <Icon className="size-4" />
                              </span>

                              <span>
                                {
                                  roadmap.label
                                }
                              </span>
                            </Link>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/community"
                onClick={() => {
                  setOpen(false);
                  setMobileProgramsOpen(false);
                }}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-ink/75 transition hover:bg-secondary"
              >
                Community
              </Link>

              <Link
                href="/about"
                onClick={() => {
                  setOpen(false);
                  setMobileProgramsOpen(false);
                }}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-ink/75 transition hover:bg-secondary"
              >
                About
              </Link>

              <Link
                href="/contact"
                onClick={() => {
                  setOpen(false);
                  setMobileProgramsOpen(false);
                }}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-ink/75 transition hover:bg-secondary"
              >
                Contact
              </Link>

              <Link
                href="/apply"
                onClick={() => {
                  setOpen(false);
                  setMobileProgramsOpen(false);
                }}
                className="btn-primary mt-3 w-full"
              >
                Apply for cohort
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}