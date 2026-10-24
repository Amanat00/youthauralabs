"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  Eye,
  FileText,
  Filter,
  Loader2,
  LogOut,
  MessageSquare,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
  X,
  XCircle,
} from "lucide-react";

type ApplicationStatus = "Pending" | "Reviewed" | "Accepted" | "Rejected";
type ConsultationStatus = "Pending" | "Approved" | "Rejected";
type ContactStatus = "New" | "Reviewed" | "Closed";
type AdminTab = "applications" | "consultations" | "contacts";

type Application = {
  id: string;
  submittedAt: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  age: string;
  university: string;
  education: string;
  graduationYear: string;
  linkedinUrl: string;
  skills: string;
  tracks: string[];
  motivation: string;
  portfolioUrl: string;
  resumeUrl: string;
  transcriptUrl: string;
  agreed: string;
  status: ApplicationStatus;
  reviewedAt: string;
  adminNotes: string;
};

type Consultation = {
  id: string;
  submittedAt: string;
  fullName: string;
  email: string;
  whatsapp: string;
  discussion: string;
  requestedStartTimeUtc: string;
  requestedDate: string;
  requestedTime: string;
  duration: string;
  fee: string;
  paymentProofUrl: string;
  status: ConsultationStatus;
  calendlyEventUri: string;
  decisionAt: string;
  adminNotes: string;
  fields?: Record<string, string>;
};

type ContactSubmission = {
  id: string;
  submittedAt: string;
  status: ContactStatus;
  reviewedAt: string;
  adminNotes: string;
  fields: Record<string, string>;
};

type DetailState =
  | { kind: "application"; data: Application }
  | { kind: "consultation"; data: Consultation }
  | { kind: "contact"; data: ContactSubmission }
  | null;

const TRACKS = [
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

function text(value: unknown) {
  return value === undefined || value === null ? "" : String(value);
}

function normalizeApplication(input: Record<string, unknown>): Application {
  const rawTracks = input.tracks;

  return {
    id: text(input.id),
    submittedAt: text(input.submittedAt),
    fullName: text(input.fullName),
    email: text(input.email),
    phone: text(input.phone),
    city: text(input.city),
    age: text(input.age),
    university: text(input.university),
    education: text(input.education),
    graduationYear: text(input.graduationYear),
    linkedinUrl: text(input.linkedinUrl),
    skills: text(input.skills),
    tracks: Array.isArray(rawTracks)
      ? rawTracks.map(String).map((item) => item.trim()).filter(Boolean)
      : text(rawTracks)
          .split("|")
          .map((item) => item.trim())
          .filter(Boolean),
    motivation: text(input.motivation),
    portfolioUrl: text(input.portfolioUrl),
    resumeUrl: text(input.resumeUrl),
    transcriptUrl: text(input.transcriptUrl),
    agreed: text(input.agreed),
    status: (text(input.status) || "Pending") as ApplicationStatus,
    reviewedAt: text(input.reviewedAt),
    adminNotes: text(input.adminNotes),
  };
}

function normalizeConsultation(input: Record<string, unknown>): Consultation {
  return {
    id: text(input.id),
    submittedAt: text(input.submittedAt),
    fullName: text(input.fullName),
    email: text(input.email),
    whatsapp: text(input.whatsapp),
    discussion: text(input.discussion),
    requestedStartTimeUtc: text(input.requestedStartTimeUtc),
    requestedDate: text(input.requestedDate),
    requestedTime: text(input.requestedTime),
    duration: text(input.duration),
    fee: text(input.fee),
    paymentProofUrl: text(input.paymentProofUrl),
    status: (text(input.status) || "Pending") as ConsultationStatus,
    calendlyEventUri: text(input.calendlyEventUri),
    decisionAt: text(input.decisionAt),
    adminNotes: text(input.adminNotes),
    fields:
      input.fields && typeof input.fields === "object" && !Array.isArray(input.fields)
        ? Object.fromEntries(
            Object.entries(input.fields as Record<string, unknown>).map(([key, value]) => [
              key,
              text(value),
            ])
          )
        : {},
  };
}

function normalizeContact(input: Record<string, unknown>): ContactSubmission {
  const fields =
    input.fields && typeof input.fields === "object" && !Array.isArray(input.fields)
      ? Object.fromEntries(
          Object.entries(input.fields as Record<string, unknown>).map(([key, value]) => [
            key,
            text(value),
          ])
        )
      : {};

  return {
    id: text(input.id) || text(fields.ID),
    submittedAt: text(input.submittedAt) || text(fields["Submitted At"]),
    status: (text(input.status) || text(fields.Status) || "New") as ContactStatus,
    reviewedAt: text(input.reviewedAt) || text(fields["Reviewed At"]),
    adminNotes: text(input.adminNotes) || text(fields["Admin Notes"]),
    fields,
  };
}

function formatDate(value: string) {
  if (!value) return "—";

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toLocaleString();
  }

  return value;
}

function extractDriveFileId(url: string) {
  if (!url) return "";

  const dMatch = url.match(/\/d\/([^/]+)/);
  if (dMatch?.[1]) return dMatch[1];

  const idMatch = url.match(/[?&]id=([^&]+)/);
  if (idMatch?.[1]) return idMatch[1];

  return "";
}

function statusClass(status: string) {
  switch (status.toLowerCase()) {
    case "pending":
    case "new":
      return "bg-amber-100 text-amber-700";
    case "reviewed":
      return "bg-sky-100 text-sky-700";
    case "accepted":
    case "approved":
      return "bg-emerald-100 text-emerald-700";
    case "rejected":
      return "bg-rose-100 text-rose-700";
    case "closed":
      return "bg-slate-200 text-slate-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

export default function AdminPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<AdminTab>("applications");
  const [apps, setApps] = useState<Application[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);

  const [appsLoaded, setAppsLoaded] = useState(false);
  const [consultationsLoaded, setConsultationsLoaded] = useState(false);
  const [contactsLoaded, setContactsLoaded] = useState(false);

  const [loading, setLoading] = useState(false);
  const [dataError, setDataError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [track, setTrack] = useState("all");
  const [detail, setDetail] = useState<DetailState>(null);
  const [statusUpdatingId, setStatusUpdatingId] = useState("");

  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  async function loadApplications(force = false) {
    if (appsLoaded && !force) return;

    try {
      setLoading(true);
      setDataError("");

      const response = await fetch("/api/admin/applications", {
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to load applications.");
      }

      setApps(
        (Array.isArray(data.applications) ? data.applications : []).map(
          (item: Record<string, unknown>) => normalizeApplication(item)
        )
      );
      setAppsLoaded(true);
    } catch (error) {
      setDataError(error instanceof Error ? error.message : "Unable to load applications.");
    } finally {
      setLoading(false);
    }
  }

  async function loadConsultations(force = false) {
    if (consultationsLoaded && !force) return;

    try {
      setLoading(true);
      setDataError("");

      const response = await fetch("/api/admin/consultations", {
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to load consultation bookings.");
      }

      setConsultations(
        (Array.isArray(data.consultations) ? data.consultations : []).map(
          (item: Record<string, unknown>) => normalizeConsultation(item)
        )
      );
      setConsultationsLoaded(true);
    } catch (error) {
      setDataError(
        error instanceof Error ? error.message : "Unable to load consultation bookings."
      );
    } finally {
      setLoading(false);
    }
  }

  async function loadContacts(force = false) {
    if (contactsLoaded && !force) return;

    try {
      setLoading(true);
      setDataError("");

      const response = await fetch("/api/admin/contacts", {
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to load contact submissions.");
      }

      setContacts(
        (Array.isArray(data.contacts) ? data.contacts : []).map(
          (item: Record<string, unknown>) => normalizeContact(item)
        )
      );
      setContactsLoaded(true);
    } catch (error) {
      setDataError(
        error instanceof Error ? error.message : "Unable to load contact submissions."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDataError("");
    setSearch("");
    setStatus("all");
    setTrack("all");

    if (activeTab === "applications") void loadApplications();
    if (activeTab === "consultations") void loadConsultations();
    if (activeTab === "contacts") void loadContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const filteredApplications = useMemo(() => {
    const q = search.trim().toLowerCase();

    return apps.filter((app) => {
      const searchable = [
        app.id,
        app.fullName,
        app.email,
        app.phone,
        app.city,
        app.age,
        app.university,
        app.education,
        app.graduationYear,
        app.linkedinUrl,
        app.skills,
        app.motivation,
        app.portfolioUrl,
        ...app.tracks,
      ];

      return (
        (!q || searchable.some((value) => value.toLowerCase().includes(q))) &&
        (status === "all" || app.status === status) &&
        (track === "all" || app.tracks.includes(track))
      );
    });
  }, [apps, search, status, track]);

  const filteredConsultations = useMemo(() => {
    const q = search.trim().toLowerCase();

    return consultations.filter((item) => {
      const searchable = [
        item.id,
        item.fullName,
        item.email,
        item.whatsapp,
        item.discussion,
        item.requestedDate,
        item.requestedTime,
        item.duration,
        item.fee,
        item.status,
      ];

      return (
        (!q || searchable.some((value) => value.toLowerCase().includes(q))) &&
        (status === "all" || item.status === status)
      );
    });
  }, [consultations, search, status]);

  const filteredContacts = useMemo(() => {
    const q = search.trim().toLowerCase();

    return contacts.filter((item) => {
      const values = Object.values(item.fields).map((value) => value.toLowerCase());
      return (
        (!q || values.some((value) => value.includes(q))) &&
        (status === "all" || item.status === status)
      );
    });
  }, [contacts, search, status]);

  async function updateApplicationStatus(id: string, newStatus: ApplicationStatus) {
    try {
      setStatusUpdatingId(id);
      setDataError("");

      const response = await fetch(`/api/admin/applications/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to update application status.");
      }

      setApps((previous) =>
        previous.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );

      setDetail((previous) => {
        if (previous?.kind !== "application" || previous.data.id !== id) return previous;
        return {
          kind: "application",
          data: { ...previous.data, status: newStatus },
        };
      });
    } catch (error) {
      setDataError(
        error instanceof Error ? error.message : "Unable to update application status."
      );
    } finally {
      setStatusUpdatingId("");
    }
  }

  async function updateConsultationStatus(
    id: string,
    newStatus: ConsultationStatus
  ) {
    try {
      setStatusUpdatingId(id);
      setDataError("");

      const response = await fetch(
        `/api/admin/consultations/${encodeURIComponent(id)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to update consultation status."
        );
      }

      setConsultations((previous) =>
        previous.map((item) =>
          item.id === id
            ? {
                ...item,
                status: newStatus,
                decisionAt: data.decisionAt || item.decisionAt,
                adminNotes: data.adminNotes ?? item.adminNotes,
              }
            : item
        )
      );

      setDetail((previous) => {
        if (
          previous?.kind !== "consultation" ||
          previous.data.id !== id
        ) {
          return previous;
        }

        return {
          kind: "consultation",
          data: {
            ...previous.data,
            status: newStatus,
            decisionAt:
              data.decisionAt || previous.data.decisionAt,
            adminNotes:
              data.adminNotes ?? previous.data.adminNotes,
          },
        };
      });
    } catch (error) {
      setDataError(
        error instanceof Error
          ? error.message
          : "Unable to update consultation status."
      );
    } finally {
      setStatusUpdatingId("");
    }
  }

  async function updateContactStatus(
    id: string,
    newStatus: ContactStatus
  ) {
    try {
      setStatusUpdatingId(id);
      setDataError("");

      const response = await fetch(
        `/api/admin/contacts/${encodeURIComponent(id)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to update contact status."
        );
      }

      setContacts((previous) =>
        previous.map((item) =>
          item.id === id
            ? {
                ...item,
                status: newStatus,
                reviewedAt: data.reviewedAt || item.reviewedAt,
                adminNotes: data.adminNotes ?? item.adminNotes,
              }
            : item
        )
      );

      setDetail((previous) => {
        if (
          previous?.kind !== "contact" ||
          previous.data.id !== id
        ) {
          return previous;
        }

        return {
          kind: "contact",
          data: {
            ...previous.data,
            status: newStatus,
            reviewedAt:
              data.reviewedAt || previous.data.reviewedAt,
            adminNotes:
              data.adminNotes ?? previous.data.adminNotes,
          },
        };
      });
    } catch (error) {
      setDataError(
        error instanceof Error
          ? error.message
          : "Unable to update contact status."
      );
    } finally {
      setStatusUpdatingId("");
    }
  }

  async function logout() {
    if (loggingOut) return;

    try {
      setLoggingOut(true);
      setLogoutError("");

      const response = await fetch("/api/admin/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Unable to log out.");
      }

      router.replace("/auth");
      router.refresh();
    } catch (error) {
      console.error("Admin logout error:", error);
      setLogoutError("Unable to log out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  function refreshCurrentTab() {
    if (activeTab === "applications") void loadApplications(true);
    if (activeTab === "consultations") void loadConsultations(true);
    if (activeTab === "contacts") void loadContacts(true);
  }

  const summaryCards = useMemo(() => {
    if (activeTab === "consultations") {
      return [
        [CalendarDays, "Total", consultations.length, "text-white"],
        [Clock3, "Pending", consultations.filter((item) => item.status === "Pending").length, "text-amber-300"],
        [CheckCircle2, "Approved", consultations.filter((item) => item.status === "Approved").length, "text-emerald-300"],
        [XCircle, "Rejected", consultations.filter((item) => item.status === "Rejected").length, "text-rose-300"],
      ] as const;
    }

    if (activeTab === "contacts") {
      return [
        [MessageSquare, "Total", contacts.length, "text-white"],
        [Clock3, "New", contacts.filter((item) => item.status === "New").length, "text-amber-300"],
        [Filter, "Reviewed", contacts.filter((item) => item.status === "Reviewed").length, "text-sky-300"],
        [CheckCircle2, "Closed", contacts.filter((item) => item.status === "Closed").length, "text-emerald-300"],
      ] as const;
    }

    return [
      [Users, "Total", apps.length, "text-white"],
      [Clock3, "Pending", apps.filter((app) => app.status === "Pending").length, "text-amber-300"],
      [Filter, "Reviewed", apps.filter((app) => app.status === "Reviewed").length, "text-sky-300"],
      [CheckCircle2, "Accepted", apps.filter((app) => app.status === "Accepted").length, "text-emerald-300"],
    ] as const;
  }, [activeTab, apps, consultations, contacts]);

  return (
    <main className="min-h-screen bg-[#f7f4ed] pb-16 text-ink">
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
                Review applications, consultation booking requests and contact submissions from one secure management portal.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={refreshCurrentTab}
                disabled={loading}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 bg-white/[.06] px-4 text-xs font-bold text-white hover:bg-white/[.1] disabled:opacity-50"
              >
                <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>

              <Link
                href="/"
                className="btn-outline !min-h-10 !border-white/15 !bg-white/[.06] !px-4 !text-white hover:!bg-white/[.1]"
              >
                <ArrowLeft className="size-4" /> Site
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
                {loggingOut ? "Logging out..." : "Log out"}
              </button>
            </div>
          </div>

          {logoutError && (
            <div className="mt-4 rounded-xl border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
              {logoutError}
            </div>
          )}

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map(([Icon, label, value, color]) => {
              const I = Icon as typeof Users;
              return (
                <div
                  key={String(label)}
                  className="rounded-[24px] border border-white/10 bg-white/[.05] p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-[.12em] text-white/45">
                      {label}
                    </span>
                    <I className={`size-5 ${color}`} />
                  </div>
                  <p className={`mt-5 font-display text-4xl font-bold ${color}`}>
                    {value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1380px] px-5 py-8 md:px-8">
        <div className="grid gap-3 rounded-[28px] border border-black/[.06] bg-white p-3 shadow-[0_14px_40px_rgba(8,20,47,.05)] md:grid-cols-3">
          <TabButton
            active={activeTab === "applications"}
            onClick={() => setActiveTab("applications")}
            icon={<Users className="size-4" />}
            label="Applications"
          />
          <TabButton
            active={activeTab === "consultations"}
            onClick={() => setActiveTab("consultations")}
            icon={<CalendarDays className="size-4" />}
            label="Consultation Bookings"
          />
          <TabButton
            active={activeTab === "contacts"}
            onClick={() => setActiveTab("contacts")}
            icon={<MessageSquare className="size-4" />}
            label="Contact Submissions"
          />
        </div>

        <div className="mt-5 rounded-[28px] border border-black/[.06] bg-white p-4 shadow-[0_14px_40px_rgba(8,20,47,.05)]">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative flex-1 xl:max-w-xl">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={
                  activeTab === "applications"
                    ? "Search any applicant field..."
                    : activeTab === "consultations"
                    ? "Search booking details..."
                    : "Search any contact submission field..."
                }
                className="h-11 w-full rounded-xl border border-black/10 bg-[#fafbfc] pl-11 pr-4 text-sm outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="h-11 rounded-xl border border-black/10 bg-[#fafbfc] px-4 text-sm outline-none"
              >
                <option value="all">All statuses</option>
                {activeTab === "applications" && (
                  <>
                    <option>Pending</option>
                    <option>Reviewed</option>
                    <option>Accepted</option>
                    <option>Rejected</option>
                  </>
                )}
                {activeTab === "consultations" && (
                  <>
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </>
                )}
                {activeTab === "contacts" && (
                  <>
                    <option>New</option>
                    <option>Reviewed</option>
                    <option>Closed</option>
                  </>
                )}
              </select>

              {activeTab === "applications" && (
                <select
                  value={track}
                  onChange={(event) => setTrack(event.target.value)}
                  className="h-11 max-w-[240px] rounded-xl border border-black/10 bg-[#fafbfc] px-4 text-sm outline-none"
                >
                  <option value="all">All tracks</option>
                  {TRACKS.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>

        {dataError && (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {dataError}
          </div>
        )}

        {loading && (
          <div className="mt-5 flex items-center justify-center gap-3 rounded-[28px] border border-black/[.06] bg-white px-6 py-14 text-sm text-slate-500 shadow-[0_14px_40px_rgba(8,20,47,.05)]">
            <Loader2 className="size-5 animate-spin text-primary" />
            Loading {activeTab === "applications" ? "applications" : activeTab === "consultations" ? "consultation bookings" : "contact submissions"}...
          </div>
        )}

        {!loading && activeTab === "applications" && (
          <ApplicationsTable
            applications={filteredApplications}
            onView={(app) => setDetail({ kind: "application", data: app })}
            onStatus={updateApplicationStatus}
            updatingId={statusUpdatingId}
          />
        )}

        {!loading && activeTab === "consultations" && (
          <ConsultationsTable
            consultations={filteredConsultations}
            onView={(item) => setDetail({ kind: "consultation", data: item })}
            onStatus={updateConsultationStatus}
            updatingId={statusUpdatingId}
          />
        )}

        {!loading && activeTab === "contacts" && (
          <ContactsTable
            contacts={filteredContacts}
            onView={(item) => setDetail({ kind: "contact", data: item })}
            onStatus={updateContactStatus}
            updatingId={statusUpdatingId}
          />
        )}
      </div>

      {detail && <DetailModal detail={detail} onClose={() => setDetail(null)} />}
    </main>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-bold transition ${
        active ? "bg-ink text-white shadow-md" : "text-slate-500 hover:bg-[#f7f4ed] hover:text-ink"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function ApplicationsTable({
  applications,
  onView,
  onStatus,
  updatingId,
}: {
  applications: Application[];
  onView: (app: Application) => void;
  onStatus: (id: string, status: ApplicationStatus) => void;
  updatingId: string;
}) {
  return (
    <div className="mt-5 overflow-hidden rounded-[28px] border border-black/[.06] bg-white shadow-[0_14px_40px_rgba(8,20,47,.05)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] text-left text-sm">
          <thead className="border-b border-black/[.06] bg-[#fafbfc] text-[11px] font-bold uppercase tracking-[.1em] text-slate-400">
            <tr>
              <th className="px-5 py-4">Applicant</th>
              <th className="px-5 py-4">Education</th>
              <th className="px-5 py-4">Tracks</th>
              <th className="px-5 py-4">Documents</th>
              <th className="px-5 py-4">Submitted</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b border-black/[.05] last:border-b-0">
                <td className="px-5 py-5 align-top">
                  <p className="font-bold text-ink">{app.fullName || "—"}</p>
                  <p className="mt-1 text-slate-500">{app.email || "—"}</p>
                  <p className="text-slate-400">{app.phone || "—"}</p>
                  <p className="mt-1 text-xs text-slate-400">ID: {app.id || "—"}</p>
                </td>
                <td className="px-5 py-5 align-top">
                  <p className="font-semibold text-ink">{app.university || "—"}</p>
                  <p className="mt-1 text-slate-500">{app.education || "—"}</p>
                  <p className="text-slate-400">{app.city || "—"}</p>
                </td>
                <td className="px-5 py-5 align-top">
                  <div className="flex max-w-[280px] flex-wrap gap-2">
                    {app.tracks.length ? (
                      app.tracks.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-primary"
                        >
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-5 align-top">
                  <div className="flex flex-col gap-2">
                    <DocumentQuickLink label="Resume" url={app.resumeUrl} />
                    <DocumentQuickLink label="Transcript" url={app.transcriptUrl} />
                  </div>
                </td>
                <td className="px-5 py-5 align-top text-slate-500">
                  {formatDate(app.submittedAt)}
                </td>
                <td className="px-5 py-5 align-top">
                  <StatusBadge status={app.status} />
                </td>
                <td className="px-5 py-5 align-top">
                  <div className="flex max-w-[240px] flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onView(app)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-xs font-bold text-ink hover:border-primary hover:text-primary"
                    >
                      <Eye className="size-3.5" /> View details
                    </button>
                    {(["Reviewed", "Accepted", "Rejected"] as ApplicationStatus[]).map(
                      (nextStatus) => (
                        <button
                          key={nextStatus}
                          type="button"
                          disabled={updatingId === app.id || app.status === nextStatus}
                          onClick={() => onStatus(app.id, nextStatus)}
                          className={`rounded-full px-3 py-1.5 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-40 ${
                            nextStatus === "Accepted"
                              ? "bg-emerald-600 text-white hover:bg-emerald-700"
                              : nextStatus === "Rejected"
                              ? "bg-rose-600 text-white hover:bg-rose-700"
                              : "border border-black/10 text-ink hover:border-primary hover:text-primary"
                          }`}
                        >
                          {updatingId === app.id ? "Saving..." : nextStatus}
                        </button>
                      )
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EmptyState visible={!applications.length} label="No applications match the current filters." />
    </div>
  );
}

function ConsultationsTable({
  consultations,
  onView,
  onStatus,
  updatingId,
}: {
  consultations: Consultation[];
  onView: (item: Consultation) => void;
  onStatus: (id: string, status: ConsultationStatus) => void;
  updatingId: string;
}) {
  return (
    <div className="mt-5 overflow-hidden rounded-[28px] border border-black/[.06] bg-white shadow-[0_14px_40px_rgba(8,20,47,.05)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1150px] text-left text-sm">
          <thead className="border-b border-black/[.06] bg-[#fafbfc] text-[11px] font-bold uppercase tracking-[.1em] text-slate-400">
            <tr>
              <th className="px-5 py-4">Applicant</th>
              <th className="px-5 py-4">Requested slot</th>
              <th className="px-5 py-4">Duration / fee</th>
              <th className="px-5 py-4">Payment proof</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {consultations.map((item) => (
              <tr
                key={item.id}
                className="border-b border-black/[.05] last:border-b-0"
              >
                <td className="px-5 py-5 align-top">
                  <p className="font-bold text-ink">
                    {item.fullName || "—"}
                  </p>
                  <p className="mt-1 text-slate-500">
                    {item.email || "—"}
                  </p>
                  <p className="text-slate-400">
                    {item.whatsapp || "—"}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    ID: {item.id || "—"}
                  </p>
                </td>

                <td className="px-5 py-5 align-top">
                  <p className="font-semibold text-ink">
                    {item.requestedDate || "—"}
                  </p>
                  <p className="mt-1 text-slate-500">
                    {item.requestedTime || "—"}
                  </p>
                </td>

                <td className="px-5 py-5 align-top">
                  <p className="font-semibold text-ink">
                    {item.duration || "—"}
                  </p>
                  <p className="mt-1 text-slate-500">
                    {item.fee || "—"}
                  </p>
                </td>

                <td className="px-5 py-5 align-top">
                  <DocumentQuickLink
                    label="Payment proof"
                    url={item.paymentProofUrl}
                  />
                </td>

                <td className="px-5 py-5 align-top">
                  <StatusBadge status={item.status} />
                </td>

                <td className="px-5 py-5 align-top">
                  <div className="flex max-w-[280px] flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onView(item)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-xs font-bold text-ink hover:border-primary hover:text-primary"
                    >
                      <Eye className="size-3.5" />
                      View details
                    </button>

                    {(
                      [
                        "Pending",
                        "Approved",
                        "Rejected",
                      ] as ConsultationStatus[]
                    ).map((nextStatus) => (
                      <button
                        key={nextStatus}
                        type="button"
                        disabled={
                          updatingId === item.id ||
                          item.status === nextStatus
                        }
                        onClick={() =>
                          onStatus(item.id, nextStatus)
                        }
                        className={`rounded-full px-3 py-1.5 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                          nextStatus === "Approved"
                            ? "bg-emerald-600 text-white hover:bg-emerald-700"
                            : nextStatus === "Rejected"
                            ? "bg-rose-600 text-white hover:bg-rose-700"
                            : "border border-black/10 text-ink hover:border-primary hover:text-primary"
                        }`}
                      >
                        {updatingId === item.id
                          ? "Saving..."
                          : nextStatus}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EmptyState
        visible={!consultations.length}
        label="No consultation bookings found."
      />
    </div>
  );
}

function ContactsTable({
  contacts,
  onView,
  onStatus,
  updatingId,
}: {
  contacts: ContactSubmission[];
  onView: (item: ContactSubmission) => void;
  onStatus: (id: string, status: ContactStatus) => void;
  updatingId: string;
}) {
  function field(
    fields: Record<string, string>,
    name: string
  ) {
    const entry = Object.entries(fields).find(
      ([key]) => key.toLowerCase() === name.toLowerCase()
    );

    return entry?.[1] || "";
  }

  return (
    <div className="mt-5 overflow-hidden rounded-[28px] border border-black/[.06] bg-white shadow-[0_14px_40px_rgba(8,20,47,.05)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] text-left text-sm">
          <thead className="border-b border-black/[.06] bg-[#fafbfc] text-[11px] font-bold uppercase tracking-[.1em] text-slate-400">
            <tr>
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Subject</th>
              <th className="px-5 py-4">Message</th>
              <th className="px-5 py-4">Submitted</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((item) => {
              const name = field(item.fields, "Name");
              const email = field(item.fields, "Email");
              const subject = field(item.fields, "Subject");
              const message = field(item.fields, "Message");

              return (
                <tr
                  key={item.id || item.submittedAt}
                  className="border-b border-black/[.05] last:border-b-0"
                >
                  <td className="px-5 py-5 align-top">
                    <p className="font-bold text-ink">
                      {name || "—"}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      ID: {item.id || "—"}
                    </p>
                  </td>

                  <td className="px-5 py-5 align-top">
                    {email ? (
                      <a
                        href={`mailto:${email}`}
                        className="font-semibold text-primary hover:underline"
                      >
                        {email}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>

                  <td className="px-5 py-5 align-top">
                    <p className="max-w-[220px] font-semibold text-ink">
                      {subject || "—"}
                    </p>
                  </td>

                  <td className="px-5 py-5 align-top">
                    <p className="line-clamp-3 max-w-[320px] leading-6 text-slate-500">
                      {message || "—"}
                    </p>
                  </td>

                  <td className="px-5 py-5 align-top text-slate-500">
                    {formatDate(item.submittedAt)}
                  </td>

                  <td className="px-5 py-5 align-top">
                    <StatusBadge status={item.status || "New"} />
                  </td>

                  <td className="px-5 py-5 align-top">
                    <div className="flex max-w-[260px] flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => onView(item)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-xs font-bold text-ink hover:border-primary hover:text-primary"
                      >
                        <Eye className="size-3.5" />
                        View details
                      </button>

                      {(
                        [
                          "New",
                          "Reviewed",
                          "Closed",
                        ] as ContactStatus[]
                      ).map((nextStatus) => (
                        <button
                          key={nextStatus}
                          type="button"
                          disabled={
                            updatingId === item.id ||
                            item.status === nextStatus
                          }
                          onClick={() =>
                            onStatus(item.id, nextStatus)
                          }
                          className={`rounded-full px-3 py-1.5 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                            nextStatus === "Closed"
                              ? "bg-ink text-white hover:bg-primary"
                              : nextStatus === "Reviewed"
                              ? "bg-sky-600 text-white hover:bg-sky-700"
                              : "border border-black/10 text-ink hover:border-primary hover:text-primary"
                          }`}
                        >
                          {updatingId === item.id
                            ? "Saving..."
                            : nextStatus}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <EmptyState
        visible={!contacts.length}
        label="No contact submissions found."
      />
    </div>
  );
}

function DocumentQuickLink({ label, url }: { label: string; url: string }) {
  const fileId = extractDriveFileId(url);

  if (!fileId) {
    return <span className="text-xs text-slate-400">No {label.toLowerCase()}</span>;
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      <a
        href={`/api/admin/files/${encodeURIComponent(fileId)}?mode=preview`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-2 text-xs font-bold text-ink hover:text-primary"
      >
        <Eye className="size-3.5" /> {label}
      </a>
      <a
        href={`/api/admin/files/${encodeURIComponent(fileId)}?mode=download`}
        className="inline-flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-2 text-xs font-bold text-ink hover:border-primary hover:text-primary"
      >
        <Download className="size-3.5" />
      </a>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusClass(status)}`}>
      {status || "—"}
    </span>
  );
}

function EmptyState({ visible, label }: { visible: boolean; label: string }) {
  if (!visible) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-3 px-5 py-14 text-center text-slate-500">
      <XCircle className="size-8 text-slate-300" />
      <p className="font-semibold text-ink">{label}</p>
    </div>
  );
}

function DetailModal({ detail, onClose }: { detail: Exclude<DetailState, null>; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/55 p-4 backdrop-blur-sm md:p-8">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[30px] bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/[.07] bg-white px-5 py-4 md:px-7">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-primary">
              {detail.kind === "application"
                ? "Application details"
                : detail.kind === "consultation"
                ? "Consultation booking details"
                : "Contact submission details"}
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-ink">
              {detail.kind === "application"
                ? detail.data.fullName || detail.data.id
                : detail.kind === "consultation"
                ? detail.data.fullName || detail.data.id
                : detail.data.id || "Contact submission"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-slate-500 hover:bg-slate-50 hover:text-ink"
            aria-label="Close details"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="p-5 md:p-7">
          {detail.kind === "application" && <ApplicationDetails app={detail.data} />}
          {detail.kind === "consultation" && <ConsultationDetails item={detail.data} />}
          {detail.kind === "contact" && <ContactDetails item={detail.data} />}
        </div>
      </div>
    </div>
  );
}

function ApplicationDetails({ app }: { app: Application }) {
  return (
    <div className="space-y-8">
      <DetailSection title="Applicant information">
        <Info label="Application ID" value={app.id} />
        <Info label="Submitted At" value={formatDate(app.submittedAt)} />
        <Info label="Full Name" value={app.fullName} />
        <Info label="Email" value={app.email} href={app.email ? `mailto:${app.email}` : ""} />
        <Info label="Phone" value={app.phone} />
        <Info label="City" value={app.city} />
        <Info label="Age" value={app.age} />
        <Info label="Agreement Confirmed" value={app.agreed} />
      </DetailSection>

      <DetailSection title="Education">
        <Info label="University / Institute" value={app.university} />
        <Info label="Current Education" value={app.education} />
        <Info label="Graduation Year" value={app.graduationYear} />
        <Info label="LinkedIn URL" value={app.linkedinUrl} href={app.linkedinUrl} />
      </DetailSection>

      <DetailSection title="Direction and motivation">
        <Info label="Skills" value={app.skills} wide />
        <Info label="Areas of Interest / Tracks" value={app.tracks.join(" | ")} wide />
        <Info label="Motivation" value={app.motivation} wide />
        <Info label="Portfolio URL" value={app.portfolioUrl} href={app.portfolioUrl} wide />
      </DetailSection>

      <DetailSection title="Review status">
        <Info label="Status" value={app.status} />
        <Info label="Reviewed At" value={app.reviewedAt || "—"} />
        <Info label="Admin Notes" value={app.adminNotes || "—"} wide />
      </DetailSection>

      <div>
        <h3 className="font-display text-xl font-bold text-ink">Documents</h3>
        <div className="mt-4 grid gap-5 lg:grid-cols-2">
          <SecureFileCard label="Resume" url={app.resumeUrl} />
          <SecureFileCard label="Transcript / Certificate" url={app.transcriptUrl} />
        </div>
      </div>
    </div>
  );
}

function ConsultationDetails({ item }: { item: Consultation }) {
  return (
    <div className="space-y-8">
      <DetailSection title="Applicant and request">
        <Info label="Booking ID" value={item.id} />
        <Info label="Submitted At" value={formatDate(item.submittedAt)} />
        <Info label="Full Name" value={item.fullName} />
        <Info label="Email" value={item.email} href={item.email ? `mailto:${item.email}` : ""} />
        <Info label="WhatsApp" value={item.whatsapp} />
        <Info label="Discussion" value={item.discussion} wide />
      </DetailSection>

      <DetailSection title="Requested consultation">
        <Info label="Requested Start Time UTC" value={item.requestedStartTimeUtc} />
        <Info label="Requested Date" value={item.requestedDate} />
        <Info label="Requested Time" value={item.requestedTime} />
        <Info label="Duration" value={item.duration} />
        <Info label="Fee" value={item.fee} />
        <Info label="Status" value={item.status} />
        <Info label="Calendly Event URI" value={item.calendlyEventUri || "—"} href={item.calendlyEventUri} wide />
        <Info label="Decision At" value={item.decisionAt || "—"} />
        <Info label="Admin Notes" value={item.adminNotes || "—"} wide />
      </DetailSection>

      <div>
        <h3 className="font-display text-xl font-bold text-ink">Payment proof</h3>
        <div className="mt-4">
          <SecureFileCard label="Payment Proof" url={item.paymentProofUrl} />
        </div>
      </div>
    </div>
  );
}

function ContactDetails({ item }: { item: ContactSubmission }) {
  const entries = Object.entries(item.fields);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={item.status || "New"} />
          {item.submittedAt && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {formatDate(item.submittedAt)}
            </span>
          )}
        </div>
      </div>

      <DetailSection title="All captured contact form fields">
        {entries.length ? (
          entries.map(([key, value]) => (
            <Info
              key={key}
              label={key}
              value={value || "—"}
              wide={key.toLowerCase().includes("message") || key.toLowerCase().includes("description")}
            />
          ))
        ) : (
          <div className="col-span-full rounded-2xl bg-slate-50 p-5 text-sm text-slate-500">
            No fields were returned for this submission.
          </div>
        )}
      </DetailSection>
    </div>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Info({
  label,
  value,
  href,
  wide,
}: {
  label: string;
  value: string;
  href?: string;
  wide?: boolean;
}) {
  return (
    <div className={`rounded-2xl border border-black/[.06] bg-[#fbfaf7] p-4 ${wide ? "md:col-span-2" : ""}`}>
      <p className="text-[10px] font-bold uppercase tracking-[.12em] text-slate-400">{label}</p>
      {href && href !== "—" ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          className="mt-2 block break-words text-sm font-semibold leading-6 text-primary hover:underline"
        >
          {value || "—"}
        </a>
      ) : (
        <p className="mt-2 whitespace-pre-wrap break-words text-sm font-semibold leading-6 text-ink">
          {value || "—"}
        </p>
      )}
    </div>
  );
}

function SecureFileCard({ label, url }: { label: string; url: string }) {
  const fileId = extractDriveFileId(url);

  if (!fileId) {
    return (
      <div className="rounded-2xl border border-dashed border-black/10 bg-[#fbfaf7] p-6 text-sm text-slate-400">
        No {label.toLowerCase()} uploaded.
      </div>
    );
  }

  const previewUrl = `/api/admin/files/${encodeURIComponent(fileId)}?mode=preview`;
  const downloadUrl = `/api/admin/files/${encodeURIComponent(fileId)}?mode=download`;

  return (
    <div className="overflow-hidden rounded-2xl border border-black/[.07] bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[.06] px-4 py-3">
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-primary" />
          <span className="text-sm font-bold text-ink">{label}</span>
        </div>
        <div className="flex gap-2">
          <a
            href={previewUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-xs font-bold text-ink hover:border-primary hover:text-primary"
          >
            <Eye className="size-3.5" /> Open
          </a>
          <a
            href={downloadUrl}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-white hover:bg-primary"
          >
            <Download className="size-3.5" /> Download
          </a>
        </div>
      </div>
      <iframe
        src={previewUrl}
        title={`${label} preview`}
        className="h-[420px] w-full bg-slate-50"
      />
      <p className="border-t border-black/[.06] px-4 py-3 text-xs leading-5 text-slate-400">
        PDF and image files preview directly. Some Office document formats may open/download instead, depending on browser support.
      </p>
    </div>
  );
}
