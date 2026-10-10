import { NextResponse } from "next/server";

export async function GET(request: Request) {
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

    const { searchParams } = new URL(request.url);

    const duration = searchParams.get("duration");

    if (duration !== "30" && duration !== "60") {
      return NextResponse.json(
        {
          success: false,
          error: "Duration must be 30 or 60.",
        },
        { status: 400 }
      );
    }

    const eventTypeUri =
      duration === "30"
        ? process.env.CALENDLY_30_MIN_EVENT_URI
        : process.env.CALENDLY_60_MIN_EVENT_URI;

    if (!eventTypeUri) {
      return NextResponse.json(
        {
          success: false,
          error: `Calendly ${duration}-minute event type is missing.`,
        },
        { status: 500 }
      );
    }

    // Start slightly ahead of current time
    const startTime = new Date(Date.now() + 60 * 1000);

    // Fetch next 14 days
    const endTime = new Date(
      startTime.getTime() + 14 * 24 * 60 * 60 * 1000
    );

    const params = new URLSearchParams({
      event_type: eventTypeUri,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
    });

    const response = await fetch(
      `https://api.calendly.com/event_type_available_times?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Unable to retrieve Calendly availability.",
          details: data,
        },
        { status: response.status }
      );
    }

    const slots = data.collection.map(
      (slot: {
        start_time: string;
        status: string;
        invitees_remaining?: number;
        scheduling_url?: string;
      }) => ({
        startTime: slot.start_time,
        status: slot.status,
        inviteesRemaining: slot.invitees_remaining,
        schedulingUrl: slot.scheduling_url,
      })
    );

    return NextResponse.json({
      success: true,
      duration: Number(duration),
      eventTypeUri,
      slots,
    });
  } catch (error) {
    console.error("Calendly availability error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to retrieve Calendly availability.",
      },
      { status: 500 }
    );
  }
}