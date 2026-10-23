import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

type EncodedFile = {
  name: string;
  mimeType: string;
  base64: string;
};

async function encodeFile(
  file: File | null
): Promise<EncodedFile | null> {
  if (!file || file.size === 0) {
    return null;
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `${file.name} exceeds the 10 MB upload limit.`
    );
  }

  const buffer = Buffer.from(
    await file.arrayBuffer()
  );

  return {
    name: file.name,
    mimeType:
      file.type ||
      "application/octet-stream",
    base64: buffer.toString("base64"),
  };
}

function getText(
  formData: FormData,
  key: string
) {
  const value = formData.get(key);

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
        "YouthAura backend environment variables are missing."
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Submission service is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const formData =
      await request.formData();

    const fullName =
      getText(
        formData,
        "fullName"
      );

    const email =
      getText(
        formData,
        "email"
      );

    const phone =
      getText(
        formData,
        "phone"
      );

    const city =
      getText(
        formData,
        "city"
      );

    const age =
      getText(
        formData,
        "age"
      );

    const university =
      getText(
        formData,
        "university"
      );

    const education =
      getText(
        formData,
        "education"
      );

    const graduationYear =
      getText(
        formData,
        "graduationYear"
      );

    const linkedinUrl =
      getText(
        formData,
        "linkedinUrl"
      );

    const skills =
      getText(
        formData,
        "skills"
      );

    const motivation =
      getText(
        formData,
        "motivation"
      );

    const portfolioUrl =
      getText(
        formData,
        "portfolioUrl"
      );

    const agreed =
      getText(
        formData,
        "agreed"
      ) === "true";

    let tracks: string[] = [];

    try {
      const rawTracks =
        getText(
          formData,
          "tracks"
        );

      const parsed =
        JSON.parse(rawTracks);

      if (
        Array.isArray(parsed)
      ) {
        tracks = parsed
          .map(String)
          .map(
            (item) =>
              item.trim()
          )
          .filter(Boolean);
      }
    } catch {
      tracks = [];
    }

    if (
      !fullName ||
      !email ||
      !phone ||
      !city ||
      !age ||
      !university ||
      !education ||
      !graduationYear ||
      !skills ||
      !motivation
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please complete all required application fields.",
        },
        {
          status: 400,
        }
      );
    }

    if (!tracks.length) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please select at least one area of interest.",
        },
        {
          status: 400,
        }
      );
    }

    if (!agreed) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please confirm the application information.",
        },
        {
          status: 400,
        }
      );
    }

    const resumeEntry =
      formData.get("resume");

    const transcriptEntry =
      formData.get(
        "transcript"
      );

    const resumeFile =
      resumeEntry instanceof File
        ? resumeEntry
        : null;

    const transcriptFile =
      transcriptEntry instanceof File
        ? transcriptEntry
        : null;

    const resume =
      await encodeFile(
        resumeFile
      );

    const transcript =
      await encodeFile(
        transcriptFile
      );

    const payload = {
      apiSecret,
      type: "application",

      fullName,
      email,
      phone,
      city,
      age,
      university,
      education,
      graduationYear,
      linkedinUrl,
      skills,
      tracks,
      motivation,
      portfolioUrl,
      agreed,

      ...(resume
        ? { resume }
        : {}),

      ...(transcript
        ? { transcript }
        : {}),
    };

    const response =
      await fetch(
        appsScriptUrl,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            payload
          ),

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
        "Apps Script returned non-JSON response:",
        raw.slice(0, 500)
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Submission service returned an invalid response.",
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
            "Unable to submit application.",
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
      "Application submission error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to submit application.",
      },
      {
        status: 500,
      }
    );
  }
}