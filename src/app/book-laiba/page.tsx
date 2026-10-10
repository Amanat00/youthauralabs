"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  Clock3,
  FileUp,
  Loader2,
} from "lucide-react";

type Duration = 30 | 60;

type CalendlySlot = {
  startTime: string;
  status: string;
  inviteesRemaining?: number;
  schedulingUrl?: string;
};

type AvailabilityResponse = {
  success: boolean;
  duration?: number;
  slots?: CalendlySlot[];
  error?: string;
};

const TIME_ZONE = "Asia/Karachi";

const consultationOptions = [
  {
    duration: 30 as Duration,
    title: "30 Minute Consultation",
    price: "PKR 5,000",
    description:
      "Ideal for focused guidance, quick strategy discussions and specific questions.",
  },
  {
    duration: 60 as Duration,
    title: "60 Minute Consultation",
    price: "PKR 10,000",
    description:
      "Best for detailed discussion, planning and more in-depth guidance.",
  },
];

function getDateKey(iso: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(iso));

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}

function formatFullDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

function formatTime(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(iso));
}

export default function BookLaibaPage() {
  const [duration, setDuration] = useState<Duration>(30);

  const [slots, setSlots] = useState<CalendlySlot[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] =
    useState<CalendlySlot | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [discussion, setDiscussion] = useState("");
  const [paymentProof, setPaymentProof] =
    useState<File | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadAvailability() {
      setLoading(true);
      setError("");
      setSelectedDate("");
      setSelectedSlot(null);
      setSlots([]);

      const timeoutId = window.setTimeout(() => {
        controller.abort();
      }, 20000);

      try {
        const response = await fetch(
          `/api/calendly/availability?duration=${duration}`,
          {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => null);

          throw new Error(
            errorData?.error ||
              `Failed to load availability (${response.status}).`
          );
        }

        const data: AvailabilityResponse =
          await response.json();

        if (!data.success) {
          throw new Error(
            data.error ||
              "Unable to load available consultation times."
          );
        }

        const availableSlots = (data.slots ?? []).filter(
          (slot) =>
            slot.status === "available" &&
            (slot.inviteesRemaining === undefined ||
              slot.inviteesRemaining > 0)
        );

        if (!active) return;

        setSlots(availableSlots);

        if (availableSlots.length > 0) {
          setSelectedDate(
            getDateKey(availableSlots[0].startTime)
          );
        }
      } catch (err) {
        if (!active) return;

        if (
          err instanceof Error &&
          err.name === "AbortError"
        ) {
          setError(
            "Calendly availability took too long to load. Please try again."
          );
        } else {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load consultation availability."
          );
        }
      } finally {
        window.clearTimeout(timeoutId);

        if (active) {
          setLoading(false);
        }
      }
    }

    loadAvailability();

    return () => {
      active = false;
      controller.abort();
    };
  }, [duration, reloadKey]);

  const groupedSlots = useMemo(() => {
    const groups: Record<string, CalendlySlot[]> = {};

    slots.forEach((slot) => {
      const key = getDateKey(slot.startTime);

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(slot);
    });

    return groups;
  }, [slots]);

  const availableDates = Object.keys(groupedSlots);

  const selectedDateSlots = selectedDate
    ? groupedSlots[selectedDate] || []
    : [];

  const selectedOption = consultationOptions.find(
    (option) => option.duration === duration
  );

  return (
    <main className="min-h-screen bg-[#fffdf8] pb-24 pt-32">
      <div className="site-shell">
        <div className="mx-auto max-w-5xl">

          {/* Hero */}
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Consultation Booking
            </span>

            <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
              Book a consultation with Laiba Hashmi
            </h1>

            <p className="mt-5 text-base leading-7 text-ink/60 md:text-lg">
              Choose your consultation duration, select an
              available date and request your preferred time.
            </p>
          </div>

          {/* Consultation Type */}
          <section className="mt-14">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock3 className="size-5" />
              </div>

              <div>
                <p className="font-display text-xl font-bold text-ink">
                  Select consultation
                </p>

                <p className="text-sm text-ink/50">
                  Choose the session that fits your needs.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {consultationOptions.map((option) => {
                const active =
                  duration === option.duration;

                return (
                  <button
                    key={option.duration}
                    type="button"
                    onClick={() =>
                      setDuration(option.duration)
                    }
                    className={`relative rounded-3xl border p-6 text-left transition-all duration-300 ${
                      active
                        ? "border-primary bg-primary/[0.04] shadow-[0_16px_45px_rgba(255,90,18,.10)]"
                        : "border-black/10 bg-white hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                    }`}
                  >
                    {active && (
                      <span className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white">
                        <Check className="size-4" />
                      </span>
                    )}

                    <p className="font-display text-xl font-bold text-ink">
                      {option.title}
                    </p>

                    <p className="mt-2 text-2xl font-bold text-primary">
                      {option.price}
                    </p>

                    <p className="mt-4 max-w-md text-sm leading-6 text-ink/55">
                      {option.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Calendly Availability */}
          <section className="mt-12 rounded-[32px] border border-black/10 bg-white p-5 shadow-[0_20px_60px_rgba(8,20,47,.06)] md:p-8">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CalendarDays className="size-5" />
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-ink">
                  Choose your preferred date & time
                </h2>

                <p className="mt-1 text-sm text-ink/50">
                  All times are shown in Pakistan Standard Time.
                </p>
              </div>
            </div>

            {loading && (
              <div className="flex min-h-[260px] items-center justify-center">
                <div className="text-center">
                  <Loader2 className="mx-auto size-7 animate-spin text-primary" />

                  <p className="mt-3 text-sm text-ink/50">
                    Loading available times...
                  </p>
                </div>
              </div>
            )}

            {!loading && error && (
              <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
                <p className="font-semibold text-red-700">
                  Unable to load available times
                </p>

                <p className="mt-2 text-sm text-red-600">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setReloadKey((value) => value + 1)
                  }
                  className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                >
                  Try Again
                </button>
              </div>
            )}

            {!loading &&
              !error &&
              availableDates.length === 0 && (
                <div className="mt-8 rounded-2xl bg-secondary p-6 text-center">
                  <p className="font-semibold text-ink">
                    No available times found.
                  </p>

                  <p className="mt-1 text-sm text-ink/50">
                    Please try another consultation duration.
                  </p>
                </div>
              )}

            {!loading &&
              !error &&
              availableDates.length > 0 && (
                <>
                  {/* Dates */}
                  <div className="mt-8 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div className="flex min-w-max gap-3">
                      {availableDates.map((dateKey) => {
                        const firstSlot =
                          groupedSlots[dateKey][0];

                        const active =
                          selectedDate === dateKey;

                        return (
                          <button
                            key={dateKey}
                            type="button"
                            onClick={() => {
                              setSelectedDate(dateKey);
                              setSelectedSlot(null);
                            }}
                            className={`min-w-[125px] rounded-2xl border px-4 py-4 text-center transition ${
                              active
                                ? "border-primary bg-primary text-white shadow-lg"
                                : "border-black/10 bg-[#fffdf8] text-ink hover:border-primary/40"
                            }`}
                          >
                            <span
                              className={`block text-sm font-bold ${
                                active
                                  ? "text-white"
                                  : "text-ink"
                              }`}
                            >
                              {formatDate(
                                firstSlot.startTime
                              )}
                            </span>

                            <span
                              className={`mt-1 block text-xs ${
                                active
                                  ? "text-white/75"
                                  : "text-ink/45"
                              }`}
                            >
                              {
                                groupedSlots[dateKey]
                                  .length
                              }{" "}
                              times
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Times */}
                  <div className="mt-8 border-t border-black/10 pt-7">
                    <p className="text-sm font-bold text-ink">
                      Available times
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                      {selectedDateSlots.map(
                        (slot) => {
                          const active =
                            selectedSlot?.startTime ===
                            slot.startTime;

                          return (
                            <button
                              key={slot.startTime}
                              type="button"
                              onClick={() =>
                                setSelectedSlot(slot)
                              }
                              className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
                                active
                                  ? "border-primary bg-primary text-white shadow-md"
                                  : "border-black/10 bg-white text-ink hover:border-primary hover:text-primary"
                              }`}
                            >
                              {formatTime(
                                slot.startTime
                              )}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>
                </>
              )}
          </section>

          {/* Selected Consultation Summary */}
          {selectedSlot && (
            <>
              <section className="mt-6 rounded-3xl bg-ink p-6 text-white md:flex md:items-center md:justify-between md:p-7">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Selected consultation
                  </p>

                  <h3 className="mt-2 font-display text-xl font-bold">
                    {selectedOption?.title}
                  </h3>

                  <p className="mt-2 text-sm text-white/60">
                    {formatFullDate(
                      selectedSlot.startTime
                    )}{" "}
                    ·{" "}
                    {formatTime(
                      selectedSlot.startTime
                    )}{" "}
                    PKT
                  </p>
                </div>

                <div className="mt-5 md:mt-0 md:text-right">
                  <p className="text-sm text-white/45">
                    Consultation fee
                  </p>

                  <p className="mt-1 text-2xl font-bold text-primary">
                    {selectedOption?.price}
                  </p>
                </div>
              </section>

              {/* Personal Details */}
              <section className="mt-8 rounded-[32px] border border-black/10 bg-white p-6 shadow-[0_20px_60px_rgba(8,20,47,.06)] md:p-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Your Details
                  </p>

                  <h2 className="mt-2 font-display text-2xl font-bold text-ink">
                    Complete your consultation request
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/50">
                    Enter your contact details and briefly tell
                    us what you would like to discuss during the
                    consultation.
                  </p>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2">

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-2 block text-sm font-bold text-ink"
                    >
                      Full Name
                    </label>

                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) =>
                        setFullName(e.target.value)
                      }
                      placeholder="Enter your full name"
                      className="w-full rounded-2xl border border-black/10 bg-[#fffdf8] px-4 py-3.5 text-sm text-ink outline-none transition placeholder:text-ink/30 focus:border-primary"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-bold text-ink"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-black/10 bg-[#fffdf8] px-4 py-3.5 text-sm text-ink outline-none transition placeholder:text-ink/30 focus:border-primary"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="whatsapp"
                      className="mb-2 block text-sm font-bold text-ink"
                    >
                      WhatsApp Number
                    </label>

                    <input
                      id="whatsapp"
                      type="tel"
                      value={whatsapp}
                      onChange={(e) =>
                        setWhatsapp(e.target.value)
                      }
                      placeholder="Enter your WhatsApp number"
                      className="w-full rounded-2xl border border-black/10 bg-[#fffdf8] px-4 py-3.5 text-sm text-ink outline-none transition placeholder:text-ink/30 focus:border-primary"
                    />
                  </div>

                  {/* Discussion */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="discussion"
                      className="mb-2 block text-sm font-bold text-ink"
                    >
                      What would you like to discuss?
                    </label>

                    <textarea
                      id="discussion"
                      rows={5}
                      value={discussion}
                      onChange={(e) =>
                        setDiscussion(e.target.value)
                      }
                      placeholder="Briefly describe what you would like guidance on..."
                      className="w-full resize-none rounded-2xl border border-black/10 bg-[#fffdf8] px-4 py-3.5 text-sm leading-6 text-ink outline-none transition placeholder:text-ink/30 focus:border-primary"
                    />
                  </div>
                </div>

                {/* Payment */}
                <div className="mt-10 border-t border-black/10 pt-8">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Payment
                  </p>

                  <h3 className="mt-2 font-display text-xl font-bold text-ink">
                    Bank Transfer
                  </h3>

                  <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/[0.04] p-5 md:flex md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        Consultation Fee
                      </p>

                      <p className="mt-1 text-2xl font-bold text-primary">
                        {selectedOption?.price}
                      </p>
                    </div>

                    <div className="mt-4 max-w-md md:mt-0 md:text-right">
                      <p className="text-sm leading-6 text-ink/55">
                        Official bank account details will be
                        added here once they are provided.
                      </p>
                    </div>
                  </div>

                  {/* Payment Proof */}
                  <div className="mt-7">
                    <label className="mb-2 block text-sm font-bold text-ink">
                      Upload Payment Proof
                    </label>

                    <label
                      htmlFor="paymentProof"
                      className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-black/10 bg-[#fffdf8] px-6 py-9 text-center transition hover:border-primary/50 hover:bg-primary/[0.02]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <FileUp className="size-5" />
                      </div>

                      <span className="mt-4 text-sm font-bold text-ink">
                        {paymentProof
                          ? paymentProof.name
                          : "Choose payment screenshot or receipt"}
                      </span>

                      <span className="mt-2 text-xs text-ink/45">
                        Image or PDF
                      </span>
                    </label>

                    <input
                      id="paymentProof"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) =>
                        setPaymentProof(
                          e.target.files?.[0] ?? null
                        )
                      }
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Final Review */}
                <div className="mt-8 rounded-3xl bg-ink p-6 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Request Summary
                  </p>

                  <div className="mt-4 grid gap-5 md:grid-cols-3">
                    <div>
                      <p className="text-xs text-white/40">
                        Consultation
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {selectedOption?.title}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-white/40">
                        Date & Time
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {formatFullDate(
                          selectedSlot.startTime
                        )}
                      </p>

                      <p className="mt-1 text-xs text-white/55">
                        {formatTime(
                          selectedSlot.startTime
                        )}{" "}
                        PKT
                      </p>
                    </div>

                    <div className="md:text-right">
                      <p className="text-xs text-white/40">
                        Fee
                      </p>

                      <p className="mt-1 text-xl font-bold text-primary">
                        {selectedOption?.price}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="button"
                  disabled
                  className="mt-6 flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-white opacity-50"
                >
                  Submit Consultation Request
                </button>

                <p className="mx-auto mt-3 max-w-2xl text-center text-xs leading-5 text-ink/45">
                  Submitting a request will not automatically
                  confirm the appointment. Payment will first be
                  reviewed by the YouthAura Labs team.
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  );
}