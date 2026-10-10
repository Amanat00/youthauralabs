import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = process.env.CALENDLY_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: "CALENDLY_ACCESS_TOKEN is missing.",
        },
        { status: 500 }
      );
    }

    // First get current Calendly user
    const meResponse = await fetch(
      "https://api.calendly.com/users/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const meData = await meResponse.json();

    if (!meResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Unable to retrieve Calendly user.",
          details: meData,
        },
        { status: meResponse.status }
      );
    }

    const userUri = meData.resource.uri;

    // Fetch active event types for this user
    const eventTypesResponse = await fetch(
      `https://api.calendly.com/event_types?user=${encodeURIComponent(
        userUri
      )}&active=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const eventTypesData = await eventTypesResponse.json();

    if (!eventTypesResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Unable to retrieve Calendly event types.",
          details: eventTypesData,
        },
        { status: eventTypesResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      eventTypes: eventTypesData.collection.map(
        (eventType: {
          uri: string;
          name: string;
          duration: number;
          active: boolean;
          scheduling_url?: string;
        }) => ({
          uri: eventType.uri,
          name: eventType.name,
          duration: eventType.duration,
          active: eventType.active,
          schedulingUrl: eventType.scheduling_url,
        })
      ),
    });
  } catch (error) {
    console.error("Calendly event types error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to retrieve Calendly event types.",
      },
      { status: 500 }
    );
  }
}