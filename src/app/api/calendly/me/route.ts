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

    const response = await fetch(
      "https://api.calendly.com/users/me",
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
          error: "Calendly API request failed.",
          details: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      user: data.resource,
    });
  } catch (error) {
    console.error("Calendly connection error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to connect to Calendly.",
      },
      { status: 500 }
    );
  }
}