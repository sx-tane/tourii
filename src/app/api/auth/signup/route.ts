import { NextResponse } from "next/server";
import { env } from "@/env.js";
import { logger } from "@/utils/logger";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, socialProvider, socialId, username } = body;

  if (!env.BACKEND_API_KEY) {
    logger.error("API POST /api/auth/signup: BACKEND_API_KEY is not configured.");
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }

  try {
    const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.BACKEND_API_KEY,
        "x-api-version": env.BACKEND_API_VERSION || "1.0",
      },
      body: JSON.stringify({ email, socialProvider, socialId, username }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    logger.error("API POST /api/auth/signup: Operation failed", error);
    return NextResponse.json({ error: "Signup failed." }, { status: 500 });
  }
}
