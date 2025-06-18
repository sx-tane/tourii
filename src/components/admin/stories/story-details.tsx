import React from "react";
import type { StoryResponseDto } from "@/api/generated";

interface StoryDetailsProps {
	story: StoryResponseDto;
}

export function StoryDetails({ story }: StoryDetailsProps) {
	return (
		<div className="mb-6 rounded-lg bg-gray-50 p-4">
			<h3 className="text-lg font-semibold text-charcoal mb-4">
				📊 Complete Story Data
			</h3>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div className="space-y-2">
					<h4 className="font-medium text-charcoal">🆔 Identifiers</h4>
					<div className="text-sm space-y-1">
						<div>
							<span className="font-medium">Story ID:</span> {story.storyId}
						</div>
						<div>
							<span className="font-medium">Order:</span> {story.order || 0}
						</div>
						<div>
							<span className="font-medium">Is Selected:</span>{" "}
							{story.isSelected ? "✅ Yes" : "❌ No"}
						</div>
						<div>
							<span className="font-medium">Is Prologue:</span>{" "}
							{story.isPrologue ? "✅ Yes" : "❌ No"}
						</div>
					</div>
				</div>
				<div className="space-y-2">
					<h4 className="font-medium text-charcoal">📅 Timestamps</h4>
					<div className="text-sm space-y-1">
						{story.insDateTime && (
							<div>
								<span className="font-medium">Created:</span>{" "}
								{story.insDateTime &&
								!Number.isNaN(Date.parse(story.insDateTime))
									? new Date(story.insDateTime).toLocaleString()
									: story.insDateTime || "N/A"}
							</div>
						)}
						{story.updDateTime && (
							<div>
								<span className="font-medium">Updated:</span>{" "}
								{story.updDateTime &&
								!Number.isNaN(Date.parse(story.updDateTime))
									? new Date(story.updDateTime).toLocaleString()
									: story.updDateTime || "N/A"}
							</div>
						)}
						{story.insUserId && (
							<div>
								<span className="font-medium">Created By:</span>{" "}
								{story.insUserId}
							</div>
						)}
						{story.updUserId && (
							<div>
								<span className="font-medium">Updated By:</span>{" "}
								{story.updUserId}
							</div>
						)}
					</div>
				</div>
				<div className="space-y-2">
					<h4 className="font-medium text-charcoal">🖼️ Media URLs</h4>
					<div className="text-sm space-y-1">
						{story.backgroundMedia && (
							<div>
								<span className="font-medium">Background:</span>
								<div className="truncate text-blue-600">
									{story.backgroundMedia}
								</div>
							</div>
						)}
						{story.mapImage && (
							<div>
								<span className="font-medium">Map Image:</span>
								<div className="truncate text-green-600">{story.mapImage}</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Chapters List */}
			{story.chapterList && story.chapterList.length > 0 && (
				<div className="mt-4">
					<h4 className="font-medium text-charcoal mb-2">
						📚 Chapters ({story.chapterList.length})
					</h4>
					<div className="max-h-40 overflow-y-auto bg-white rounded border p-3">
						{story.chapterList.map((chapter, idx) => (
							<div
								key={`modal-chapter-${story.storyId}-${
									chapter.storyChapterId || idx
								}`}
								className="flex justify-between py-1 border-b last:border-b-0"
							>
								<span className="text-sm">
									{chapter.chapterNumber}: {chapter.chapterTitle}
								</span>
								<span className="text-xs text-gray-500">
									ID: {chapter.storyChapterId}
								</span>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Raw JSON Data */}
			<details className="mt-4">
				<summary className="font-medium text-purple-600 cursor-pointer">
					🔍 Raw JSON Data
				</summary>
				<pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-60 border">
					{JSON.stringify(story, null, 2)}
				</pre>
			</details>
		</div>
	);
}