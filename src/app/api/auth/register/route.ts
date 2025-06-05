// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { env } from "@/env.js";
import { AuthService } from "@/api/generated"; // Assuming SDK service name
import { logger } from "@/utils/logger";

// Assuming the SDK expects specific types for the request body.
// These would ideally be imported from "@/api/generated/models" or similar if they exist.
interface RegisterRequest {
  email?: string;
  username?: string;
  address?: string;
  signature?: string;
}

interface VerifySignatureRequest {
  address?: string;
  signature?: string;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { email, username, address, signature } = body;

  const apiVersion = env.BACKEND_API_VERSION || "1.0";
  const apiKey = env.BACKEND_API_KEY;

  if (!apiKey) {
    logger.error("API POST /api/auth/register: BACKEND_API_KEY is not configured.");
    // Consider using touriiErrorResponse if you have it standardized
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }

  try {
    const registerPayload: RegisterRequest = { email, username, address, signature };
    // Call Tourii backend to register user via SDK
    // Assumes AuthService.touriiBackendControllerRegister(payload, apiVersion, apiKey)
    // This method should throw an error on failure (e.g., non-2xx response)
    await AuthService.touriiBackendControllerRegister(
      registerPayload,
      apiVersion,
      apiKey
    );

    // If registration is successful (no error thrown), proceed to verify signature
    // This simulates a login to establish a session via NextAuth's mechanisms,
    // assuming the wallet provider in NextAuth handles this post-verification.
    const verifyPayload: VerifySignatureRequest = { address, signature };
    // Assumes AuthService.touriiBackendControllerVerifySignature(payload, apiVersion, apiKey)
    await AuthService.touriiBackendControllerVerifySignature(
      verifyPayload,
      apiVersion,
      apiKey
    );

    // If both SDK calls are successful
    return NextResponse.json({ ok: true });

  } catch (error: any) {
    logger.error("API POST /api/auth/register: Operation failed", {
      message: error.message,
      status: error.status, // If SDK error includes status
      errorBody: error.body // If SDK error includes parsed body
    });

    // Construct a user-friendly error response
    // This depends on the structure of errors thrown by your SDK
    let errorMessage = "Registration or verification failed.";
    let statusCode = 400; // Default to 400 for client-side type errors

    if (error.body && typeof error.body.message === 'string') {
      errorMessage = error.body.message;
      statusCode = typeof error.status === 'number' ? error.status : 400;
    } else if (typeof error.message === 'string' && error.message) {
      errorMessage = error.message;
      // Attempt to use status from error if available, otherwise check if it's a known error type
      if (typeof error.status === 'number') {
        statusCode = error.status;
      }
    }
    
    // If the error status suggests a server-side issue not originating from backend's controlled error response
    if (statusCode >= 500 && statusCode !== error.status) {
        errorMessage = "An unexpected server error occurred.";
    }


    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
