import { NextResponse } from "next/server";
import { env } from "@/env.js"; // Import the validated env object

// Read validated & typed env variables
const BACKEND_URL = env.BACKEND_URL;
const API_KEY = env.BACKEND_API_KEY;
// Use a default if the optional version isn't set
const API_VERSION = env.BACKEND_API_VERSION || "1.0.0";

export async function GET() {
	// No need for manual checks here, t3-env handles it

	try {
		const response = await fetch(`${BACKEND_URL}/stories/sagas`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": API_KEY, // Use validated API_KEY
				"accept-version": API_VERSION, // Use validated/defaulted API_VERSION
			},
			cache: "no-store",
		});

		if (!response.ok) {
			let errorBody: unknown;
			try {
				errorBody = await response.json();
			} catch (parseError) {
				try {
					errorBody = { message: await response.text() };
				} catch (textError) {
					errorBody = { message: "Could not read error response body." };
				}
			}

			console.error(
				`Error fetching sagas from backend: ${response.status} ${response.statusText}`,
				errorBody,
			);

			const errorMessage =
				typeof errorBody === "object" &&
				errorBody !== null &&
				"message" in errorBody &&
				typeof errorBody.message === "string"
					? errorBody.message
					: response.statusText || "Unknown backend error";

			throw new Error(
				`Failed to fetch sagas from backend (${response.status}): ${errorMessage}`,
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("API Route Error fetching sagas:", error);
		const message =
			error instanceof Error ? error.message : "An unexpected error occurred";
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
