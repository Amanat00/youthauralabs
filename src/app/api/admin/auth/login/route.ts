import { NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  adminSessionCookieOptions,
  createAdminSessionToken,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email =
      typeof body?.email === "string"
        ? body.email
        : "";

    const password =
      typeof body?.password === "string"
        ? body.password
        : "";

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Email and password are required.",
        },
        { status: 400 }
      );
    }

    if (!verifyAdminCredentials(email, password)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set(
      ADMIN_SESSION_COOKIE,
      createAdminSessionToken(),
      adminSessionCookieOptions
    );

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to sign in right now.",
      },
      { status: 500 }
    );
  }
}   