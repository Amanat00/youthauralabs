import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ConsultationRequest = {
  fullName?: string;
  email?: string;
  whatsapp?: string;
  discussion?: string;
  startTime?: string;

  paymentProof?: {
    name?: string;
    mimeType?: string;
    base64?: string;
  };
};

const MAX_FILE_SIZE =
  3 * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];

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
      return NextResponse.json(
        {
          success: false,
          error:
            "Consultation service is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const body: ConsultationRequest =
      await request.json();

    const fullName =
      body.fullName?.trim() ?? "";

    const email =
      body.email?.trim() ?? "";

    const whatsapp =
      body.whatsapp?.trim() ?? "";

    const discussion =
      body.discussion?.trim() ?? "";

    const startTime =
      body.startTime?.trim() ?? "";

    const paymentProof =
      body.paymentProof;

    if (
      !fullName ||
      !email ||
      !whatsapp ||
      !discussion ||
      !startTime
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

    const selectedDate =
      new Date(startTime);

    if (
      Number.isNaN(
        selectedDate.getTime()
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid consultation time.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !paymentProof?.name ||
      !paymentProof?.mimeType ||
      !paymentProof?.base64
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Payment proof is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !ALLOWED_FILE_TYPES.includes(
        paymentProof.mimeType
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Payment proof must be a PDF, JPG, PNG or WEBP file.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Base64 is roughly 4/3 the
     * size of the original file.
     */
    const estimatedSize =
      Math.floor(
        paymentProof.base64.length *
          0.75
      );

    if (
      estimatedSize >
      MAX_FILE_SIZE
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Payment proof must be 3 MB or smaller.",
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

            type:
              "consultation",

            fullName,
            email,
            whatsapp,
            discussion,

            startTime:
              selectedDate.toISOString(),

            paymentProof: {
              name:
                paymentProof.name,

              mimeType:
                paymentProof.mimeType,

              base64:
                paymentProof.base64,
            },
          }),

          cache: "no-store",
          redirect: "follow",
        }
      );

    const responseText =
      await response.text();

    let data: {
      success?: boolean;
      id?: string;
      status?: string;
      error?: string;
    };

    try {
      data =
        JSON.parse(
          responseText
        );
    } catch {
      console.error(
        "Invalid Apps Script consultation response:",
        responseText.slice(
          0,
          500
        )
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Consultation backend returned an invalid response.",
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
            "Unable to submit consultation request.",
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
        "Pending",
    });
  } catch (error) {
    console.error(
      "Consultation submission error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to submit consultation request.",
      },
      {
        status: 500,
      }
    );
  }
}