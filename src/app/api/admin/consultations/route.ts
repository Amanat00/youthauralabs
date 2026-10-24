import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE =
  10 * 1024 * 1024;

const ALLOWED_PAYMENT_PROOF_TYPES =
  new Set([
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
  ]);

type PaymentProofPayload = {
  name?: string;
  mimeType?: string;
  base64?: string;
};

type ConsultationRequestBody = {
  fullName?: string;
  email?: string;
  whatsapp?: string;
  discussion?: string;
  startTime?: string;
  paymentProof?: PaymentProofPayload;
};

function clean(value: unknown) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function isValidEmail(
  value: string
) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value
  );
}

function validatePaymentProof(
  value: PaymentProofPayload | undefined
) {
  const name =
    clean(value?.name);

  const mimeType =
    clean(value?.mimeType);

  const base64 =
    clean(value?.base64);

  if (
    !name ||
    !mimeType ||
    !base64
  ) {
    throw new Error(
      "Payment proof is required."
    );
  }

  if (
    !ALLOWED_PAYMENT_PROOF_TYPES.has(
      mimeType
    )
  ) {
    throw new Error(
      "Payment proof must be a PDF, JPG, PNG or WEBP file."
    );
  }

  let buffer: Buffer;

  try {
    buffer = Buffer.from(
      base64,
      "base64"
    );
  } catch {
    throw new Error(
      "Payment proof could not be read."
    );
  }

  if (buffer.length <= 0) {
    throw new Error(
      "Payment proof is empty."
    );
  }

  if (
    buffer.length >
    MAX_FILE_SIZE
  ) {
    throw new Error(
      "Payment proof must be 10 MB or smaller."
    );
  }

  return {
    name,
    mimeType,
    base64,
  };
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
            "Consultation service is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    let body:
      ConsultationRequestBody;

    try {
      body =
        await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid consultation request.",
        },
        {
          status: 400,
        }
      );
    }

    const fullName =
      clean(body.fullName);

    const email =
      clean(body.email);

    const whatsapp =
      clean(body.whatsapp);

    const discussion =
      clean(body.discussion);

    const startTime =
      clean(body.startTime);

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
            "Please complete all required consultation fields.",
        },
        {
          status: 400,
        }
      );
    }

    if (!isValidEmail(email)) {
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

    const requestedStart =
      new Date(startTime);

    if (
      Number.isNaN(
        requestedStart.getTime()
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "The selected consultation time is invalid.",
        },
        {
          status: 400,
        }
      );
    }

    let paymentProof:
      PaymentProofPayload;

    try {
      paymentProof =
        validatePaymentProof(
          body.paymentProof
        );
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Invalid payment proof.",
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
              requestedStart.toISOString(),
            paymentProof,
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
        "Apps Script returned invalid consultation response:",
        raw.slice(0, 500)
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Consultation service returned an invalid response.",
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

    return NextResponse.json(
      {
        success: true,
        id: data.id,
        status:
          data.status ||
          "Pending",
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
      "Consultation submission error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to submit consultation request.",
      },
      {
        status: 500,
      }
    );
  }
}
