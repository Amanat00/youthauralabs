import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_STATUSES = new Set([
  "New",
  "Reviewed",
  "Closed",
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
     * 2. Get contact submission ID.
     */
    const { id } =
      await context.params;

    const contactId =
      String(id || "").trim();

    if (!contactId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Contact submission ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * 3. Read status + optional notes.
     */
    let body: {
      status?: string;
      adminNotes?: string;
    };

    try {
      body =
        await request.json();
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
            "Invalid contact status.",
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
            "Admin contact service is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * 5. Update Contact Submissions sheet.
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
            "admin-contact-status",

          id:
            contactId,

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
      reviewedAt?: string;
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
            "Invalid response from contact backend.",
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
            "Unable to update contact status.",
        },
        {
          status: 502,
        }
      );
    }

    /*
     * 6. Return updated values.
     */
    return NextResponse.json(
      {
        success: true,

        id:
          data.id ||
          contactId,

        status:
          data.status ||
          status,

        reviewedAt:
          data.reviewedAt ||
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
      "Contact status PATCH error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to update contact status.",
      },
      {
        status: 500,
      }
    );
  }
}