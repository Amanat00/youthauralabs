import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";

type AppsScriptConsultationsResponse = {
  success?: boolean;
  error?: string;
  consultations?: unknown[];
};

export async function GET() {
  try {
    /*
     * Verify admin session
     */
    const cookieStore = await cookies();

    const sessionToken =
      cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

    if (
      !sessionToken ||
      !verifyAdminSessionToken(sessionToken)
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

    /*
     * Read backend environment variables
     */
    const appsScriptUrl =
      process.env.YOUTHAURA_APPS_SCRIPT_URL?.trim();

    const apiSecret =
      process.env.YOUTHAURA_APPS_SCRIPT_SECRET?.trim();

    if (!appsScriptUrl) {
      return NextResponse.json(
        {
          success: false,
          error:
            "YOUTHAURA_APPS_SCRIPT_URL is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    if (!apiSecret) {
      return NextResponse.json(
        {
          success: false,
          error:
            "YOUTHAURA_APPS_SCRIPT_SECRET is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * Ask Apps Script for consultation records
     */
    const response = await fetch(appsScriptUrl, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        apiSecret,
        type: "admin-consultations",
      }),

      cache: "no-store",
    });

    /*
     * Read raw text first so an empty/non-JSON response
     * does not cause:
     *
     * Unexpected end of JSON input
     */
    const rawResponse =
      await response.text();

    if (!rawResponse.trim()) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Apps Script returned an empty response.",
        },
        {
          status: 502,
        }
      );
    }

    let data: AppsScriptConsultationsResponse;

    try {
      data = JSON.parse(
        rawResponse
      ) as AppsScriptConsultationsResponse;
    } catch {
      return NextResponse.json(
        {
          success: false,
          error:
            "Apps Script returned an invalid JSON response.",
        },
        {
          status: 502,
        }
      );
    }

    if (
      !response.ok ||
      data.success !== true
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            data.error ||
            "Unable to load consultation bookings.",
        },
        {
          status: 502,
        }
      );
    }

    return NextResponse.json({
      success: true,

      consultations:
        Array.isArray(
          data.consultations
        )
          ? data.consultations
          : [],
    });
  } catch (error) {
    console.error(
      "Admin consultations error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to load consultation bookings.",
      },
      {
        status: 500,
      }
    );
  }
}