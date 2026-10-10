"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  Clock3,
  Download,
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

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [bookingSuccess, setBookingSuccess] =
    useState(false);

  const canSubmit =
    Boolean(selectedSlot) &&
    fullName.trim().length > 0 &&
    email.trim().length > 0 &&
    whatsapp.trim().length > 0 &&
    discussion.trim().length > 0 &&
    paymentProof !== null;

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadAvailability() {
      setLoading(true);
      setError("");
      setSelectedDate("");
      setSelectedSlot(null);
      setSlots([]);
      setSubmitError("");
      setBookingSuccess(false);

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

  async function handleSubmit() {
    if (!selectedSlot || !canSubmit) return;

    try {
      setSubmitting(true);
      setSubmitError("");

      const response = await fetch(
        "/api/calendly/book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            duration,
            startTime: selectedSlot.startTime,
            fullName: fullName.trim(),
            email: email.trim(),
            whatsapp: whatsapp.trim(),
            discussion: discussion.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Unable to book consultation."
        );
      }

      setBookingSuccess(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Unable to book consultation."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function downloadReceipt() {
  if (!selectedSlot || !selectedOption) return;

  const canvas = document.createElement("canvas");

  canvas.width = 1400;
  canvas.height = 1000;

  const context = canvas.getContext("2d");

  if (!context) {
    console.error("Unable to create receipt canvas.");
    return;
  }

  const ctx: CanvasRenderingContext2D = context;

  function drawRoundedRectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    fillColor: string
  ) {
    ctx.beginPath();

    ctx.moveTo(x + radius, y);

    ctx.lineTo(x + width - radius, y);

    ctx.quadraticCurveTo(
      x + width,
      y,
      x + width,
      y + radius
    );

    ctx.lineTo(
      x + width,
      y + height - radius
    );

    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height
    );

    ctx.lineTo(
      x + radius,
      y + height
    );

    ctx.quadraticCurveTo(
      x,
      y + height,
      x,
      y + height - radius
    );

    ctx.lineTo(x, y + radius);

    ctx.quadraticCurveTo(
      x,
      y,
      x + radius,
      y
    );

    ctx.closePath();

    ctx.fillStyle = fillColor;
    ctx.fill();
  }

  // Background
  ctx.fillStyle = "#ecfdf5";

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  // Success Circle
  ctx.beginPath();

  ctx.arc(
    700,
    130,
    58,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = "#16a34a";
  ctx.fill();

  // Check Mark
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();

  ctx.moveTo(670, 130);
  ctx.lineTo(692, 152);
  ctx.lineTo(732, 108);

  ctx.stroke();

  // Heading
  ctx.textAlign = "center";
  ctx.fillStyle = "#08142f";
  ctx.font = "700 48px Arial, sans-serif";

  ctx.fillText(
    "Consultation Booked Successfully",
    700,
    260
  );

  // Description
  ctx.fillStyle = "#374151";
  ctx.font = "28px Arial, sans-serif";

  ctx.fillText(
    "Your consultation with Laiba Hashmi has been booked successfully.",
    700,
    325
  );

  ctx.fillText(
    "Please check your email for the Calendly confirmation and meeting details.",
    700,
    370
  );

  // Booking Details Card
  drawRoundedRectangle(
    130,
    445,
    1140,
    385,
    42,
    "#ffffff"
  );

  ctx.textAlign = "left";

  // Booking Details Label
  ctx.fillStyle = "#ff5a12";
  ctx.font = "700 22px Arial, sans-serif";

  ctx.fillText(
    "BOOKING DETAILS",
    190,
    515
  );

  // Consultation Title
  ctx.fillStyle = "#08142f";
  ctx.font = "700 34px Arial, sans-serif";

  ctx.fillText(
    selectedOption.title,
    190,
    590
  );

  // Date
  ctx.fillStyle = "#374151";
  ctx.font = "28px Arial, sans-serif";

  ctx.fillText(
    formatFullDate(
      selectedSlot.startTime
    ),
    190,
    655
  );

  // Time
  ctx.fillText(
    `${formatTime(
      selectedSlot.startTime
    )} PKT`,
    190,
    710
  );

  // Fee
  ctx.fillStyle = "#ff5a12";
  ctx.font = "700 38px Arial, sans-serif";

  ctx.fillText(
    selectedOption.price,
    190,
    780
  );

  // Footer
  ctx.textAlign = "center";
  ctx.fillStyle = "#6b7280";
  ctx.font = "22px Arial, sans-serif";

  ctx.fillText(
    "YouthAura Labs • Consultation Booking Confirmation",
    700,
    920
  );

  // Download PNG
  const link = document.createElement("a");

  link.download =
    "YouthAura-Consultation-Booking-Receipt.png";

  link.href =
    canvas.toDataURL("image/png");

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}

  /*
   * SUCCESS PAGE
   * Once Calendly confirms the booking,
   * the complete booking system disappears.
   */
  if (
    bookingSuccess &&
    selectedSlot &&
    selectedOption
  ) {
    return (
      <main className="min-h-screen bg-[#fffdf8] pb-24 pt-36">
        <div className="site-shell">
          <div className="mx-auto max-w-3xl">

            <section className="rounded-[36px] border border-green-200 bg-green-50 px-6 py-10 text-center shadow-[0_20px_60px_rgba(8,20,47,.06)] md:px-12 md:py-14">

              {/* Success Icon */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white shadow-[0_12px_35px_rgba(22,163,74,.22)]">
                <Check className="size-8" />
              </div>

              {/* Heading */}
              <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
                Consultation Booked Successfully
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-ink/60 md:text-base">
                Your consultation with Laiba Hashmi has been
                booked successfully. Please check your email
                for the Calendly confirmation and meeting
                details.
              </p>

              {/* Booking Details */}
              <div className="mx-auto mt-8 max-w-xl rounded-[28px] bg-white p-6 text-left shadow-sm md:p-8">

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Booking Details
                </p>

                <h2 className="mt-4 font-display text-xl font-bold text-ink">
                  {selectedOption.title}
                </h2>

                <div className="mt-5 space-y-2">
                  <p className="text-sm text-ink/60">
                    {formatFullDate(
                      selectedSlot.startTime
                    )}
                  </p>

                  <p className="text-sm text-ink/60">
                    {formatTime(
                      selectedSlot.startTime
                    )}{" "}
                    PKT
                  </p>
                </div>

                <p className="mt-5 text-2xl font-bold text-primary">
                  {selectedOption.price}
                </p>
              </div>

              {/* Download Receipt */}
              <button
                type="button"
                onClick={downloadReceipt}
                className="mx-auto mt-8 flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-bold text-white shadow-[0_12px_30px_rgba(255,90,18,.18)] transition hover:-translate-y-0.5 hover:opacity-90"
              >
                <Download className="size-4" />
                Download Receipt
              </button>

              <p className="mx-auto mt-4 max-w-lg text-xs leading-5 text-ink/40">
                This receipt confirms your consultation booking
                with YouthAura Labs.
              </p>

            </section>

          </div>
        </div>
      </main>
    );
  }

  /*
   * BOOKING PAGE
   */
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

              {consultationOptions.map(
                (option) => {
                  const active =
                    duration === option.duration;

                  return (
                    <button
                      key={option.duration}
                      type="button"
                      onClick={() => {
                        setDuration(
                          option.duration
                        );

                        setBookingSuccess(false);
                        setSubmitError("");
                      }}
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
                }
              )}

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

            {/* Loading */}
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

            {/* Availability Error */}
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
                    setReloadKey(
                      (value) => value + 1
                    )
                  }
                  className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                >
                  Try Again
                </button>

              </div>
            )}

            {/* No Availability */}
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

            {/* Dates and Times */}
            {!loading &&
              !error &&
              availableDates.length > 0 && (
                <>
                  {/* Dates */}
                  <div className="mt-8 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

                    <div className="flex min-w-max gap-3">

                      {availableDates.map(
                        (dateKey) => {
                          const firstSlot =
                            groupedSlots[dateKey][0];

                          const active =
                            selectedDate ===
                            dateKey;

                          return (
                            <button
                              key={dateKey}
                              type="button"
                              onClick={() => {
                                setSelectedDate(
                                  dateKey
                                );

                                setSelectedSlot(
                                  null
                                );

                                setBookingSuccess(
                                  false
                                );

                                setSubmitError("");
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
                                  groupedSlots[
                                    dateKey
                                  ].length
                                }{" "}
                                times
                              </span>

                            </button>
                          );
                        }
                      )}

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
                              key={
                                slot.startTime
                              }
                              type="button"
                              onClick={() => {
                                setSelectedSlot(
                                  slot
                                );

                                setBookingSuccess(
                                  false
                                );

                                setSubmitError("");
                              }}
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

          {/* Selected Consultation */}
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
                    us what you would like to discuss during
                    the consultation.
                  </p>

                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2">

                  {/* Full Name */}
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
                        setFullName(
                          e.target.value
                        )
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
                        setEmail(
                          e.target.value
                        )
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
                        setWhatsapp(
                          e.target.value
                        )
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
                        setDiscussion(
                          e.target.value
                        )
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
                          e.target.files?.[0] ??
                            null
                        )
                      }
                      className="hidden"
                    />

                  </div>

                </div>

                {/* Request Summary */}
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
                  onClick={handleSubmit}
                  disabled={
                    !canSubmit ||
                    submitting
                  }
                  className={`mt-6 flex min-h-12 w-full items-center justify-center rounded-full px-6 text-sm font-bold text-white transition ${
                    canSubmit &&
                    !submitting
                      ? "cursor-pointer bg-primary hover:opacity-90"
                      : "cursor-not-allowed bg-primary opacity-50"
                  }`}
                >

                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Booking Consultation...
                    </>
                  ) : (
                    "Submit Consultation Request"
                  )}

                </button>

                {/* Submit Error */}
                {submitError && (
                  <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-700">
                    {submitError}
                  </div>
                )}

                <p className="mx-auto mt-3 max-w-2xl text-center text-xs leading-5 text-ink/45">
                  Your selected appointment will be booked
                  immediately after successful submission.
                </p>

              </section>
            </>
          )}

        </div>
      </div>
    </main>
  );
}