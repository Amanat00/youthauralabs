"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Filter,
  Loader2,
  LogOut,
  Search,
  ShieldCheck,
  Users,
  XCircle,
} from "lucide-react";

type Status =
  | "Pending"
  | "Reviewed"
  | "Accepted"
  | "Rejected";

type AdminTab =
  | "applications"
  | "consultations";

interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  university: string;
  tracks: string[];
  resumeName: string;
  status: Status;
  submittedAt: string;
}

const seed: Application[] = [
  {
    id: "app_1",
    fullName: "Ayesha Malik",
    email: "ayesha.malik@fast.edu.pk",
    phone: "+92 301 5551234",
    city: "Lahore",
    university: "FAST NUCES",
    tracks: [
      "AI Automation",
      "Applied AI Across Industries",
    ],
    resumeName: "Ayesha_Malik_Resume.pdf",
    status: "Pending",
    submittedAt: "2026-09-18T10:30:00Z",
  },
  {
    id: "app_2",
    fullName: "Bilal Hassan",
    email: "bilal.hassan@lums.edu.pk",
    phone: "+92 321 4447890",
    city: "Lahore",
    university: "LUMS",
    tracks: [
      "Freelancing",
      "Business Development",
    ],
    resumeName: "Bilal_CV.docx",
    status: "Accepted",
    submittedAt: "2026-09-17T14:15:00Z",
  },
  {
    id: "app_3",
    fullName: "Zainab Tariq",
    email: "zainab.tariq@nust.edu.pk",
    phone: "+92 333 9991122",
    city: "Islamabad",
    university: "NUST",
    tracks: [
      "Graphic Designing",
      "Social Media Handling",
    ],
    resumeName:
      "Zainab_Portfolio_Resume.pdf",
    status: "Reviewed",
    submittedAt: "2026-09-16T09:00:00Z",
  },
  {
    id: "app_4",
    fullName: "Hamza Farooq",
    email: "hamza.farooq@pu.edu.pk",
    phone: "+92 300 8887766",
    city: "Lahore",
    university: "Punjab University",
    tracks: [
      "E-commerce",
      "Digital Marketing",
    ],
    resumeName: "Hamza_Resume.pdf",
    status: "Pending",
    submittedAt: "2026-09-15T16:45:00Z",
  },
];

export default function AdminPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] =
    useState<AdminTab>("applications");

  const [apps, setApps] =
    useState<Application[]>(seed);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [track, setTrack] = useState("all");

  const [loggingOut, setLoggingOut] =
    useState(false);

  const [logoutError, setLogoutError] =
    useState("");

  /*
   * Temporary application storage.
   *
   * This will later be replaced with the
   * backend / Google Sheets integration.
   */
  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem(
          "youthaura_applications"
        ) || "[]"
      );

      if (
        Array.isArray(stored) &&
        stored.length
      ) {
        setApps([
          ...stored,
          ...seed,
        ]);
      }
    } catch {
      // Ignore malformed local demo data.
    }
  }, []);

  const filtered = useMemo(
    () =>
      apps.filter((app) => {
        const q =
          search.trim().toLowerCase();

        const matchesSearch =
          !q ||
          [
            app.fullName,
            app.email,
            app.university,
            app.city,
          ].some((value) =>
            value
              .toLowerCase()
              .includes(q)
          );

        const matchesStatus =
          status === "all" ||
          app.status === status;

        const matchesTrack =
          track === "all" ||
          app.tracks.includes(track);

        return (
          matchesSearch &&
          matchesStatus &&
          matchesTrack
        );
      }),
    [
      apps,
      search,
      status,
      track,
    ]
  );

  function change(
    id: string,
    newStatus: Status
  ) {
    setApps((previous) =>
      previous.map((app) =>
        app.id === id
          ? {
              ...app,
              status: newStatus,
            }
          : app
      )
    );
  }

  const counts = {
    total: apps.length,

    pending: apps.filter(
      (app) =>
        app.status === "Pending"
    ).length,

    reviewed: apps.filter(
      (app) =>
        app.status === "Reviewed"
    ).length,

    accepted: apps.filter(
      (app) =>
        app.status === "Accepted"
    ).length,
  };

  async function logout() {
    if (loggingOut) return;

    try {
      setLoggingOut(true);
      setLogoutError("");

      const response = await fetch(
        "/api/admin/auth/logout",
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to log out."
        );
      }

      /*
       * Session is removed server-side.
       * No localStorage authentication
       * is used anymore.
       */
      router.replace("/auth");
      router.refresh();
    } catch (error) {
      console.error(
        "Admin logout error:",
        error
      );

      setLogoutError(
        "Unable to log out. Please try again."
      );
    } finally {
      setLoggingOut(false);
    }
  }

  const tracks = [
    "Freelancing",
    "E-commerce",
    "Digital Marketing",
    "Social Media Handling",
    "Graphic Designing",
    "AI Automation",
    "Applied AI Across Industries",
    "Project Management",
    "Web Development Awareness",
    "Business Development",
  ];

  return (
    <main className="min-h-screen bg-[#f7f4ed] pb-16 text-ink">
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink px-5 pb-14 pt-10 text-white md:px-8 md:pt-12">
        <div className="dark-grid absolute inset-0 opacity-25" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,90,18,.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,.08),transparent_24%)]" />

        <div className="relative mx-auto max-w-[1380px]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#ff9b68]">
                <ShieldCheck className="size-3.5" />
                Management portal
              </p>

              <h1 className="mt-3 font-display text-[42px] font-bold leading-[1.02] tracking-[-0.04em] md:text-[56px]">
                YouthAura management dashboard
              </h1>

              <p className="mt-4 max-w-2xl text-[16px] leading-7 text-white/55">
                Review applicant submissions
                and consultation booking
                requests from one secure
                management portal.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/"
                className="btn-outline !min-h-10 !border-white/15 !bg-white/[.06] !px-4 !text-white hover:!bg-white/[.1]"
              >
                <ArrowLeft className="size-4" />
                Site
              </Link>

              <button
                type="button"
                onClick={logout}
                disabled={loggingOut}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-red-300/20 bg-red-400/10 px-4 text-xs font-bold text-red-100 transition hover:bg-red-400/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loggingOut ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <LogOut className="size-4" />
                )}

                {loggingOut
                  ? "Logging out..."
                  : "Log out"}
              </button>
            </div>
          </div>

          {logoutError && (
            <div className="mt-4 rounded-xl border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
              {logoutError}
            </div>
          )}

          {/* Application Summary */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              [
                Users,
                "Total",
                counts.total,
                "text-white",
              ],
              [
                Clock3,
                "Pending",
                counts.pending,
                "text-amber-300",
              ],
              [
                Filter,
                "Reviewed",
                counts.reviewed,
                "text-sky-300",
              ],
              [
                CheckCircle2,
                "Accepted",
                counts.accepted,
                "text-emerald-300",
              ],
            ].map(
              ([
                Icon,
                label,
                value,
                color,
              ]) => {
                const I =
                  Icon as typeof Users;

                return (
                  <div
                    key={String(label)}
                    className="rounded-[24px] border border-white/10 bg-white/[.05] p-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-[.12em] text-white/45">
                        {String(label)}
                      </span>

                      <I
                        className={`size-5 ${String(
                          color
                        )}`}
                      />
                    </div>

                    <p
                      className={`mt-5 font-display text-4xl font-bold ${String(
                        color
                      )}`}
                    >
                      {String(value)}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1380px] px-5 py-8 md:px-8">
        {/* Main Tabs */}
        <div className="flex flex-col gap-3 rounded-[28px] border border-black/[.06] bg-white p-3 shadow-[0_14px_40px_rgba(8,20,47,.05)] sm:flex-row">
          <button
            type="button"
            onClick={() =>
              setActiveTab("applications")
            }
            className={`flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-bold transition ${
              activeTab ===
              "applications"
                ? "bg-ink text-white shadow-md"
                : "text-slate-500 hover:bg-[#f7f4ed] hover:text-ink"
            }`}
          >
            <Users className="size-4" />
            Applications
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveTab(
                "consultations"
              )
            }
            className={`flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-bold transition ${
              activeTab ===
              "consultations"
                ? "bg-ink text-white shadow-md"
                : "text-slate-500 hover:bg-[#f7f4ed] hover:text-ink"
            }`}
          >
            <CalendarDays className="size-4" />
            Consultation Bookings
          </button>
        </div>

        {/* Applications Tab */}
        {activeTab ===
          "applications" && (
          <>
            {/* Filters */}
            <div className="mt-5 rounded-[28px] border border-black/[.06] bg-white p-4 shadow-[0_14px_40px_rgba(8,20,47,.05)]">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <div className="relative flex-1 xl:max-w-lg">
                  <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                    placeholder="Search name, email, university or city..."
                    className="h-11 w-full rounded-xl border border-black/10 bg-[#fafbfc] pl-11 pr-4 text-sm outline-none focus:border-primary"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(
                        e.target.value
                      )
                    }
                    className="h-11 rounded-xl border border-black/10 bg-[#fafbfc] px-4 text-sm outline-none"
                  >
                    <option value="all">
                      All statuses
                    </option>
                    <option>
                      Pending
                    </option>
                    <option>
                      Reviewed
                    </option>
                    <option>
                      Accepted
                    </option>
                    <option>
                      Rejected
                    </option>
                  </select>

                  <select
                    value={track}
                    onChange={(e) =>
                      setTrack(
                        e.target.value
                      )
                    }
                    className="h-11 max-w-[220px] rounded-xl border border-black/10 bg-[#fafbfc] px-4 text-sm outline-none"
                  >
                    <option value="all">
                      All tracks
                    </option>

                    {tracks.map(
                      (item) => (
                        <option
                          key={item}
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* Applications Table */}
            <div className="mt-5 overflow-hidden rounded-[28px] border border-black/[.06] bg-white shadow-[0_14px_40px_rgba(8,20,47,.05)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1050px] text-left text-sm">
                  <thead className="border-b border-black/[.06] bg-[#fafbfc] text-[11px] font-bold uppercase tracking-[.1em] text-slate-400">
                    <tr>
                      <th className="px-5 py-4">
                        Applicant
                      </th>

                      <th className="px-5 py-4">
                        University / city
                      </th>

                      <th className="px-5 py-4">
                        Tracks
                      </th>

                      <th className="px-5 py-4">
                        Resume
                      </th>

                      <th className="px-5 py-4">
                        Submitted
                      </th>

                      <th className="px-5 py-4">
                        Status
                      </th>

                      <th className="px-5 py-4">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filtered.map(
                      (app) => (
                        <tr
                          key={
                            app.id
                          }
                          className="border-b border-black/[.05] last:border-b-0"
                        >
                          <td className="px-5 py-5 align-top">
                            <p className="font-bold text-ink">
                              {
                                app.fullName
                              }
                            </p>

                            <p className="mt-1 text-slate-500">
                              {
                                app.email
                              }
                            </p>

                            <p className="text-slate-400">
                              {
                                app.phone
                              }
                            </p>
                          </td>

                          <td className="px-5 py-5 align-top">
                            <p className="font-semibold text-ink">
                              {
                                app.university
                              }
                            </p>

                            <p className="mt-1 text-slate-500">
                              {
                                app.city
                              }
                            </p>
                          </td>

                          <td className="px-5 py-5 align-top">
                            <div className="flex max-w-[250px] flex-wrap gap-2">
                              {app.tracks.map(
                                (
                                  item
                                ) => (
                                  <span
                                    key={
                                      item
                                    }
                                    className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-primary"
                                  >
                                    {
                                      item
                                    }
                                  </span>
                                )
                              )}
                            </div>
                          </td>

                          <td className="px-5 py-5 align-top">
                            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-2 text-xs font-bold text-ink">
                              <FileText className="size-4" />

                              {
                                app.resumeName
                              }
                            </div>
                          </td>

                          <td className="px-5 py-5 align-top text-slate-500">
                            {new Date(
                              app.submittedAt
                            ).toLocaleDateString()}
                          </td>

                          <td className="px-5 py-5 align-top">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                                app.status ===
                                "Pending"
                                  ? "bg-amber-100 text-amber-700"
                                  : app.status ===
                                    "Reviewed"
                                  ? "bg-sky-100 text-sky-700"
                                  : app.status ===
                                    "Accepted"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-rose-100 text-rose-700"
                              }`}
                            >
                              {
                                app.status
                              }
                            </span>
                          </td>

                          <td className="px-5 py-5 align-top">
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  change(
                                    app.id,
                                    "Reviewed"
                                  )
                                }
                                className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-bold text-ink hover:border-primary hover:text-primary"
                              >
                                Review
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  change(
                                    app.id,
                                    "Accepted"
                                  )
                                }
                                className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
                              >
                                Accept
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  change(
                                    app.id,
                                    "Rejected"
                                  )
                                }
                                className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-rose-700"
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {!filtered.length && (
                <div className="flex flex-col items-center justify-center gap-3 px-5 py-14 text-center text-slate-500">
                  <XCircle className="size-8 text-slate-300" />

                  <p className="font-semibold text-ink">
                    No applications
                    match the current
                    filters.
                  </p>

                  <p className="max-w-md text-sm leading-6">
                    Try adjusting the
                    search term or filter
                    selections to see
                    more results.
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Consultation Booking Tab */}
        {activeTab ===
          "consultations" && (
          <div className="mt-5 rounded-[28px] border border-black/[.06] bg-white px-6 py-16 text-center shadow-[0_14px_40px_rgba(8,20,47,.05)] md:px-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <CalendarDays className="size-6" />
            </div>

            <h2 className="mt-5 font-display text-2xl font-bold text-ink">
              Consultation Bookings
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
              Consultation requests
              will appear here after we
              connect the booking form
              to the backend and Google
              Sheets. Admins will be
              able to review payment
              proof and approve or
              reject each request from
              this section.
            </p>

            <span className="mt-6 inline-flex rounded-full bg-amber-100 px-4 py-2 text-xs font-bold text-amber-700">
              Backend connection next
            </span>
          </div>
        )}
      </div>
    </main>
  );
}