import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    /*
     * 1. Verify secure admin session.
     */
    const cookieStore = await cookies();

    const sessionToken =
      cookieStore.get(
        ADMIN_SESSION_COOKIE
      )?.value || "";

    if (
      !sessionToken ||
      !verifyAdminSessionToken(
        sessionToken
      )
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
     * 2. Server-side backend configuration.
     */
    const appsScriptUrl =
      process.env
        .YOUTHAURA_APPS_SCRIPT_URL;

    const apiSecret =
      process.env
        .YOUTHAURA_APPS_SCRIPT_SECRET;

    if (
      !appsScriptUrl ||
      !apiSecret
    ) {
      console.error(
        "YouthAura Apps Script configuration is missing."
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Admin consultation service is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * 3. Request consultation records
     * from Apps Script.
     */
    const response = await fetch(
      appsScriptUrl,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          apiSecret,
          type: "admin-consultations",
        }),

        cache: "no-store",
        redirect: "follow",
      }
    );

    const responseText =
      await response.text();

    let data: {
      success?: boolean;
      consultations?: unknown[];
      error?: string;
    };

    try {
      data = JSON.parse(
        responseText
      );
    } catch {
      console.error(
        "Invalid Apps Script consultation response:",
        responseText
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid response from consultation backend.",
        },
        {
          status: 502,
        }
      );
    }

    /*
     * 4. Handle Apps Script errors.
     */
    if (
      !response.ok ||
      !data.success
    ) {
      console.error(
        "Admin consultations backend error:",
        data
      );

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

    /*
     * 5. Return records to the
     * authenticated admin dashboard.
     */
    return NextResponse.json(
      {
        success: true,

        consultations:
          Array.isArray(
            data.consultations
          )
            ? data.consultations
            : [],
      },
      {
        headers: {
          "Cache-Control":
            "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error(
      "Admin consultations GET error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to load consultation bookings.",
      },
      {
        status: 500,
      }
    );
  }
}