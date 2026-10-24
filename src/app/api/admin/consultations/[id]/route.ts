import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_STATUSES = new Set([
  "Pending",
  "Approved",
  "Rejected",
]);

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    /*
     * 1. Verify admin session.
     */
    const cookieStore =
      await cookies();

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
     * 2. Get consultation ID.
     */
    const { id } =
      await context.params;

    const consultationId =
      String(id || "").trim();

    if (!consultationId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Consultation ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * 3. Read requested status.
     */
    let body: {
      status?: string;
      adminNotes?: string;
    };

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid request body.",
        },
        {
          status: 400,
        }
      );
    }

    const status =
      String(
        body.status || ""
      ).trim();

    const adminNotes =
      String(
        body.adminNotes || ""
      ).trim();

    if (
      !ALLOWED_STATUSES.has(
        status
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid consultation status.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * 4. Backend configuration.
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
     * 5. Update Consultation Bookings sheet.
     *
     * IMPORTANT:
     * This only updates the sheet status.
     * No Calendly scheduling happens here.
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

          type:
            "admin-consultation-status",

          id:
            consultationId,

          status,

          adminNotes,
        }),

        cache: "no-store",
        redirect: "follow",
      }
    );

    const responseText =
      await response.text();

    let data: {
      success?: boolean;
      error?: string;
      id?: string;
      status?: string;
      decisionAt?: string;
      adminNotes?: string;
    };

    try {
      data = JSON.parse(
        responseText
      );
    } catch {
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

    if (
      !response.ok ||
      !data.success
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            data.error ||
            "Unable to update consultation status.",
        },
        {
          status: 502,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,

        id:
          data.id ||
          consultationId,

        status:
          data.status ||
          status,

        decisionAt:
          data.decisionAt ||
          "",

        adminNotes:
          data.adminNotes ||
          adminNotes,
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
      "Consultation status PATCH error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to update consultation status.",
      },
      {
        status: 500,
      }
    );
  }
}