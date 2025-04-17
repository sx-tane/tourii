import { NextResponse } from "next/server";
import { storyData } from "@/lib/data/touriiverse/story-data";

export async function GET() {
	try {
		// For now, return mock data directly
		// Later this will be replaced with actual backend API call
		return NextResponse.json({
			stories: storyData,
		});

		// Uncomment this when ready to use real backend
		// const response = await fetch(`${process.env.BACKEND_URL}/stories/sagas`, {
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// });

		// if (!response.ok) {
		// 	throw new Error("Failed to fetch sagas");
		// }

		// const data = await response.json();
		// return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching sagas:", error);
		return NextResponse.json(
			{ error: "Failed to fetch sagas" },
			{ status: 500 },
		);
	}
}
