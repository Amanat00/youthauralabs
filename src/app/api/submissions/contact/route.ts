import { NextResponse } from "next/server";

export const runtime = "nodejs";

function getString(
  value: unknown
) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

export async function POST(
  request: Request
) {
  try {
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
            "Contact service is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const body =
      await request.json();

    const name =
      getString(body.name);

    const email =
      getString(body.email);

    const subject =
      getString(body.subject);

    const message =
      getString(body.message);

    if (
      !name ||
      !email ||
      !message
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please complete all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(email)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    const response =
      await fetch(
        appsScriptUrl,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            apiSecret,
            type: "contact",

            fields: [
              {
                key: "name",
                label: "Name",
                value: name,
              },
              {
                key: "email",
                label: "Email",
                value: email,
              },
              {
                key: "subject",
                label: "Subject",
                value: subject,
              },
              {
                key: "message",
                label: "Message",
                value: message,
              },
            ],
          }),

          cache: "no-store",
          redirect: "follow",
        }
      );

    const raw =
      await response.text();

    let data: {
      success?: boolean;
      id?: string;
      status?: string;
      error?: string;
    };

    try {
      data =
        JSON.parse(raw);
    } catch {
      console.error(
        "Apps Script returned invalid contact response:",
        raw.slice(0, 500)
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Contact service returned an invalid response.",
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
            "Unable to send message.",
        },
        {
          status: 502,
        }
      );
    }

    return NextResponse.json({
      success: true,
      id: data.id,
      status:
        data.status ||
        "New",
    });
  } catch (error) {
    console.error(
      "Contact submission error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to send your message. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}