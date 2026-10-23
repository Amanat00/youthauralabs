import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type BookingRequest = {
  consultationId?: string;
  startTime?: string;
  fullName?: string;
  email?: string;
  whatsapp?: string;
  discussion?: string;
};

export async function POST(request: Request) {
  try {
    /*
     * INTERNAL-ONLY ROUTE
     * Only Apps Script can call this endpoint.
     */
    const expectedSecret =
      process.env.YOUTHAURA_APPS_SCRIPT_SECRET;

    const suppliedSecret =
      request.headers.get(
        "x-youthaura-api-secret"
      );

    if (
      !expectedSecret ||
      !suppliedSecret ||
      suppliedSecret !== expectedSecret
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const token =
      process.env.CALENDLY_ACCESS_TOKEN;

    const eventTypeUri =
      process.env.CALENDLY_30_MIN_EVENT_URI;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Calendly access token is missing.",
        },
        {
          status: 500,
        }
      );
    }

    if (!eventTypeUri) {
      return NextResponse.json(
        {
          success: false,
          error:
            "30-minute Calendly event type is missing.",
        },
        {
          status: 500,
        }
      );
    }

    const body: BookingRequest =
      await request.json();

    const {
      consultationId,
      startTime,
      fullName,
      email,
      whatsapp,
      discussion,
    } = body;

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
          error:
            "Consultation data is incomplete.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Re-check slot at approval time.
     */
    const selectedStart =
      new Date(startTime);

    if (
      Number.isNaN(
        selectedStart.getTime()
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid selected consultation time.",
        },
        {
          status: 400,
        }
      );
    }

    const selectedIso =
      selectedStart.toISOString();

    const availabilityEnd =
      new Date(
        selectedStart.getTime() +
          35 * 60 * 1000
      );

    const availabilityParams =
      new URLSearchParams({
        event_type:
          eventTypeUri,

        start_time:
          selectedIso,

        end_time:
          availabilityEnd.toISOString(),
      });

    const availabilityResponse =
      await fetch(
        `https://api.calendly.com/event_type_available_times?${availabilityParams.toString()}`,
        {
          method: "GET",

          headers: {
            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "application/json",
          },

          cache: "no-store",
        }
      );

    const availabilityData =
      await availabilityResponse.json();

    if (
      !availabilityResponse.ok
    ) {
      console.error(
        "Calendly availability verification failed:",
        availabilityData
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to verify the selected Calendly slot.",
        },
        {
          status:
            availabilityResponse.status,
        }
      );
    }

    const slotStillAvailable =
      availabilityData.collection?.some(
        (slot: {
          start_time?: string;
          status?: string;
          invitees_remaining?: number;
        }) =>
          Boolean(
            slot.start_time &&
              new Date(
                slot.start_time
              ).toISOString() ===
                selectedIso &&
              slot.status ===
                "available" &&
              (
                slot.invitees_remaining ===
                  undefined ||
                slot.invitees_remaining >
                  0
              )
          )
      );

    if (!slotStillAvailable) {
      return NextResponse.json(
        {
          success: false,
          code: "SLOT_UNAVAILABLE",
          error:
            "The selected consultation slot is no longer available.",
        },
        {
          status: 409,
        }
      );
    }

    /*
     * Retrieve event configuration.
     */
    const eventTypeUuid =
      eventTypeUri
        .split("/")
        .pop();

    if (!eventTypeUuid) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid Calendly event type.",
        },
        {
          status: 500,
        }
      );
    }

    const eventTypeResponse =
      await fetch(
        `https://api.calendly.com/event_types/${eventTypeUuid}`,
        {
          method: "GET",

          headers: {
            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "application/json",
          },

          cache: "no-store",
        }
      );

    const eventTypeData =
      await eventTypeResponse.json();

    if (
      !eventTypeResponse.ok
    ) {
      console.error(
        "Calendly event type fetch failed:",
        eventTypeData
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to retrieve Calendly event configuration.",
        },
        {
          status:
            eventTypeResponse.status,
        }
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
      event_type:
        eventTypeUri,

      start_time:
        selectedIso,

      invitee: {
        name:
          fullName.trim(),

        email:
          email.trim(),

        timezone:
          "Asia/Karachi",
      },
    };

    /*
     * Preserve configured Calendly location.
     */
    const locations =
      eventTypeData.resource
        ?.locations ?? [];

    if (
      locations.length === 1
    ) {
      const eventLocation =
        locations[0];

      if (
        eventLocation.kind ===
          "ask_invitee" ||
        eventLocation.kind ===
          "outbound_call"
      ) {
        bookingPayload.location = {
          kind:
            eventLocation.kind,

          location:
            whatsapp.trim(),
        };
      } else if (
        eventLocation.location
      ) {
        bookingPayload.location = {
          kind:
            eventLocation.kind,

          location:
            eventLocation.location,
        };
      } else {
        bookingPayload.location = {
          kind:
            eventLocation.kind,
        };
      }
    }

    /*
     * Only send answers when matching
     * custom questions exist in Calendly.
     */
    const customQuestions =
      eventTypeData.resource
        ?.custom_questions ?? [];

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
        },
        index: number
      ) => {
        if (
          !question.enabled ||
          !question.name
        ) {
          return;
        }

        const name =
          question.name.toLowerCase();

        if (
          name.includes("phone") ||
          name.includes("whatsapp")
        ) {
          answers.push({
            question:
              question.name,

            answer:
              whatsapp.trim(),

            position:
              question.position ??
              index,
          });
        }

        if (
          name.includes("discuss") ||
          name.includes(
            "discussion"
          )
        ) {
          answers.push({
            question:
              question.name,

            answer:
              discussion.trim(),

            position:
              question.position ??
              index,
          });
        }
      }
    );

    if (
      answers.length > 0
    ) {
      bookingPayload
        .questions_and_answers =
        answers;
    }

    /*
     * Actual Calendly booking.
     */
    const bookingResponse =
      await fetch(
        "https://api.calendly.com/invitees",
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(
              bookingPayload
            ),

          cache: "no-store",
        }
      );

    const bookingData =
      await bookingResponse.json();

    if (
      !bookingResponse.ok
    ) {
      console.error(
        "Calendly booking failed:",
        bookingData
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Calendly could not create the consultation.",
        },
        {
          status:
            bookingResponse.status,
        }
      );
    }

    const eventUri =
      bookingData.resource?.event ??
      null;

    const inviteeUri =
      bookingData.resource?.uri ??
      null;

    return NextResponse.json(
      {
        success: true,

        consultationId:
          consultationId ?? null,

        booking: {
          startTime:
            selectedIso,

          duration: 30,

          eventUri,
          inviteeUri,

          cancelUrl:
            bookingData.resource
              ?.cancel_url ??
            null,

          rescheduleUrl:
            bookingData.resource
              ?.reschedule_url ??
            null,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Internal Calendly booking error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to create the Calendly consultation.",
      },
      {
        status: 500,
      }
    );
  }
}