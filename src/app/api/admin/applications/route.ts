import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 1. Verify admin session
    const cookieStore = await cookies();

    const token =
      cookieStore.get(
        ADMIN_SESSION_COOKIE
      )?.value;

    if (
      !token ||
      !verifyAdminSessionToken(token)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // 2. Server-only environment variables
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
        "YouthAura Apps Script environment variables are missing."
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Backend service is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    // 3. Ask Apps Script for real applications
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
          type: "admin-applications",
        }),

        cache: "no-store",
        redirect: "follow",
      }
    );

    const raw =
      await response.text();

    let data: {
      success?: boolean;
      applications?: unknown[];
      error?: string;
    };

    try {
      data =
        JSON.parse(raw);
    } catch {
      console.error(
        "Apps Script returned invalid JSON:",
        raw.slice(0, 500)
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Backend returned an invalid response.",
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
            "Unable to load applications.",
        },
        {
          status: 502,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        applications:
          data.applications ?? [],
      },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error(
      "Admin applications API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to load applications.",
      },
      {
        status: 500,
      }
    );
  }
}