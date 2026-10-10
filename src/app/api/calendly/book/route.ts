import { NextResponse } from "next/server";

type BookingRequest = {
  duration?: number;
  startTime?: string;
  fullName?: string;
  email?: string;
  whatsapp?: string;
  discussion?: string;
};

export async function POST(request: Request) {
  try {
    const token = process.env.CALENDLY_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: "Calendly access token is missing.",
        },
        { status: 500 }
      );
    }

    const body: BookingRequest = await request.json();

    const {
      duration,
      startTime,
      fullName,
      email,
      whatsapp,
      discussion,
    } = body;

    if (duration !== 30 && duration !== 60) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid consultation duration.",
        },
        { status: 400 }
      );
    }

    if (
      !startTime ||
      !fullName?.trim() ||
      !email?.trim() ||
      !whatsapp?.trim() ||
      !discussion?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    const eventTypeUri =
      duration === 30
        ? process.env.CALENDLY_30_MIN_EVENT_URI
        : process.env.CALENDLY_60_MIN_EVENT_URI;

    if (!eventTypeUri) {
      return NextResponse.json(
        {
          success: false,
          error: `${duration}-minute Calendly event type is missing.`,
        },
        { status: 500 }
      );
    }

    /*
     * Re-check selected slot before booking.
     */
    const selectedStart = new Date(startTime);

    if (Number.isNaN(selectedStart.getTime())) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid selected time.",
        },
        { status: 400 }
      );
    }

    const availabilityEnd = new Date(
      selectedStart.getTime() +
        (duration + 5) * 60 * 1000
    );

    const availabilityParams = new URLSearchParams({
      event_type: eventTypeUri,
      start_time: selectedStart.toISOString(),
      end_time: availabilityEnd.toISOString(),
    });

    const availabilityResponse = await fetch(
      `https://api.calendly.com/event_type_available_times?${availabilityParams.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const availabilityData =
      await availabilityResponse.json();

    if (!availabilityResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to verify the selected Calendly slot.",
          details: availabilityData,
        },
        { status: availabilityResponse.status }
      );
    }

    const selectedIso = selectedStart.toISOString();

    const slotStillAvailable =
      availabilityData.collection?.some(
        (slot: {
          start_time?: string;
          status?: string;
          invitees_remaining?: number;
        }) =>
          slot.start_time &&
          new Date(slot.start_time).toISOString() ===
            selectedIso &&
          slot.status === "available" &&
          (slot.invitees_remaining === undefined ||
            slot.invitees_remaining > 0)
      );

    if (!slotStillAvailable) {
      return NextResponse.json(
        {
          success: false,
          code: "SLOT_UNAVAILABLE",
          error:
            "This time slot is no longer available. Please select another time.",
        },
        { status: 409 }
      );
    }

    /*
     * Retrieve Event Type details so we can use
     * the configured Calendly meeting location.
     */
    const eventTypeUuid =
      eventTypeUri.split("/").pop();

    const eventTypeResponse = await fetch(
      `https://api.calendly.com/event_types/${eventTypeUuid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const eventTypeData =
      await eventTypeResponse.json();

    if (!eventTypeResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to retrieve Calendly event configuration.",
          details: eventTypeData,
        },
        { status: eventTypeResponse.status }
      );
    }

    const bookingPayload: {
      event_type: string;
      start_time: string;
      invitee: {
        name: string;
        email: string;
        timezone: string;
      };
      location?: {
        kind: string;
        location?: string;
      };
      questions_and_answers?: {
        question: string;
        answer: string;
        position: number;
      }[];
    } = {
      event_type: eventTypeUri,
      start_time: selectedIso,
      invitee: {
        name: fullName.trim(),
        email: email.trim(),
        timezone: "Asia/Karachi",
      },
    };

    /*
     * Calendly requires matching location data
     * when the Event Type has a configured location.
     */
    const locations =
      eventTypeData.resource?.locations ?? [];

    if (locations.length === 1) {
      const eventLocation = locations[0];

      if (
        eventLocation.kind === "ask_invitee" ||
        eventLocation.kind === "outbound_call"
      ) {
        bookingPayload.location = {
          kind: eventLocation.kind,
          location: whatsapp.trim(),
        };
      } else if (
        eventLocation.location
      ) {
        bookingPayload.location = {
          kind: eventLocation.kind,
          location: eventLocation.location,
        };
      } else {
        bookingPayload.location = {
          kind: eventLocation.kind,
        };
      }
    }

    /*
     * Send WhatsApp / discussion to Calendly only
     * when matching custom questions exist there.
     */
    const customQuestions =
      eventTypeData.resource?.custom_questions ?? [];

    const answers: {
      question: string;
      answer: string;
      position: number;
    }[] = [];

    customQuestions.forEach(
      (
        question: {
          name?: string;
          position?: number;
          enabled?: boolean;
          type?: string;
        },
        index: number
      ) => {
        if (!question.enabled || !question.name) {
          return;
        }

        const name = question.name.toLowerCase();

        if (
          name.includes("phone") ||
          name.includes("whatsapp")
        ) {
          answers.push({
            question: question.name,
            answer: whatsapp.trim(),
            position:
              question.position ?? index,
          });
        }

        if (
          name.includes("discuss") ||
          name.includes("discussion")
        ) {
          answers.push({
            question: question.name,
            answer: discussion.trim(),
            position:
              question.position ?? index,
          });
        }
      }
    );

    if (answers.length > 0) {
      bookingPayload.questions_and_answers =
        answers;
    }

    /*
     * Create actual Calendly booking.
     */
    const bookingResponse = await fetch(
      "https://api.calendly.com/invitees",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
        cache: "no-store",
      }
    );

    const bookingData =
      await bookingResponse.json();

    if (!bookingResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Calendly could not create the appointment.",
          details: bookingData,
        },
        { status: bookingResponse.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Your consultation has been booked successfully.",
        booking: {
          startTime: selectedIso,
          duration,
          invitee:
            bookingData.resource,
          cancelUrl:
            bookingData.resource?.cancel_url ??
            null,
          rescheduleUrl:
            bookingData.resource?.reschedule_url ??
            null,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Calendly booking error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Something went wrong while booking the consultation.",
      },
      { status: 500 }
    );
  }
}