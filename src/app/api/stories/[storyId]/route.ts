import { StoriesService } from "@/api/generated/services/StoriesService";
import { type NextRequest, NextResponse } from "next/server";
import { executeValidatedServiceCall } from "../../lib/route-helper";

export async function DELETE(
	_request: NextRequest,
	{ params }: { params: Promise<{ storyId: string }> },
) {
	const { storyId } = await params;

	if (!storyId) {
		return NextResponse.json({ error: "Missing storyId" }, { status: 400 });
	}

	return executeValidatedServiceCall(
		(apiKey: string, apiVersion: string) =>
			StoriesService.touriiBackendControllerDeleteStory(
				storyId,
				apiVersion,
				apiKey,
			),
		`DELETE /api/stories/${storyId}`,
	);
}
