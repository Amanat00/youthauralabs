import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AdminFileResponse = {
  success?: boolean;
  error?: string;

  file?: {
    id?: string;
    name?: string;
    mimeType?: string;
    size?: number;
    base64?: string;
  };
};

function safeFileName(value: string) {
  const cleaned = value
    .replace(/[\r\n"]/g, "")
    .trim();

  return cleaned || "file";
}

export async function GET(
  request: Request,
  context: {
    params: Promise<{
      fileId: string;
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
     * 2. Get requested file ID.
     */
    const { fileId } =
      await context.params;

    const cleanFileId =
      String(fileId || "").trim();

    if (!cleanFileId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "File ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * 3. Determine preview/download mode.
     */
    const requestUrl =
      new URL(request.url);

    const mode =
      requestUrl.searchParams.get(
        "mode"
      ) === "download"
        ? "download"
        : "preview";

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
      console.error(
        "YouthAura Apps Script configuration is missing."
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Admin file service is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * 5. Ask Apps Script for the
     * private Drive file.
     *
     * Apps Script itself verifies
     * that the file belongs to one
     * of the approved YouthAura
     * upload folders.
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
          type: "admin-file",
          fileId: cleanFileId,
        }),

        cache: "no-store",
        redirect: "follow",
      }
    );

    const responseText =
      await response.text();

    let data:
      AdminFileResponse;

    try {
      data = JSON.parse(
        responseText
      );
    } catch {
      console.error(
        "Invalid Apps Script file response:",
        responseText
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid response from file backend.",
        },
        {
          status: 502,
        }
      );
    }

    /*
     * 6. Validate Apps Script response.
     */
    if (
      !response.ok ||
      !data.success ||
      !data.file
    ) {
      console.error(
        "Admin file backend error:",
        data
      );

      return NextResponse.json(
        {
          success: false,
          error:
            data.error ||
            "Unable to load file.",
        },
        {
          status: 502,
        }
      );
    }

    const file =
      data.file;

    const base64 =
      String(
        file.base64 || ""
      );

    if (!base64) {
      return NextResponse.json(
        {
          success: false,
          error:
            "File content was not returned.",
        },
        {
          status: 502,
        }
      );
    }

    const fileName =
      safeFileName(
        String(
          file.name ||
            "document"
        )
      );

    const mimeType =
      String(
        file.mimeType ||
          "application/octet-stream"
      );

    /*
     * 7. Decode private file.
     */
    let fileBuffer: Buffer;

    try {
      fileBuffer =
        Buffer.from(
          base64,
          "base64"
        );
    } catch {
      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to decode file.",
        },
        {
          status: 502,
        }
      );
    }

    if (
      fileBuffer.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "File is empty.",
        },
        {
          status: 502,
        }
      );
    }

    /*
     * 8. Preview:
     * inline
     *
     * Download:
     * attachment
     */
    const disposition =
      mode === "download"
        ? "attachment"
        : "inline";

    const encodedFileName =
      encodeURIComponent(
        fileName
      );

    return new Response(
      new Uint8Array(
        fileBuffer
      ),
      {
        status: 200,

        headers: {
          "Content-Type":
            mimeType,

          "Content-Length":
            String(
              fileBuffer.length
            ),

          "Content-Disposition":
            `${disposition}; filename="${fileName}"; filename*=UTF-8''${encodedFileName}`,

          "Cache-Control":
            "private, no-store, max-age=0",

          "X-Content-Type-Options":
            "nosniff",
        },
      }
    );
  } catch (error) {
    console.error(
      "Admin file GET error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to load file.",
      },
      {
        status: 500,
      }
    );
  }
}