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
     * 1. Verify admin session.
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
     * 2. Backend configuration.
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
            "Admin contact service is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * 3. Request Contact Submissions
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
          type: "admin-contacts",
        }),

        cache: "no-store",
        redirect: "follow",
      }
    );

    const responseText =
      await response.text();

    let data: {
      success?: boolean;
      contacts?: unknown[];
      error?: string;
    };

    try {
      data = JSON.parse(
        responseText
      );
    } catch {
      console.error(
        "Invalid Apps Script contacts response:",
        responseText
      );

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

    /*
     * 4. Handle backend errors.
     */
    if (
      !response.ok ||
      !data.success
    ) {
      console.error(
        "Admin contacts backend error:",
        data
      );

      return NextResponse.json(
        {
          success: false,
          error:
            data.error ||
            "Unable to load contact submissions.",
        },
        {
          status: 502,
        }
      );
    }

    /*
     * 5. Return submissions.
     *
     * Contact fields remain dynamic,
     * so Name / Email / Subject /
     * Message and any future fields
     * can be returned inside fields.
     */
    return NextResponse.json(
      {
        success: true,

        contacts:
          Array.isArray(
            data.contacts
          )
            ? data.contacts
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
      "Admin contacts GET error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to load contact submissions.",
      },
      {
        status: 500,
      }
    );
  }
}