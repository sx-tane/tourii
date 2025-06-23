import type {
	StoryChapterCreateRequestDto,
	StoryChapterUpdateRequestDto,
	StoryCreateRequestDto,
} from "@/api/generated";
import useSWRMutation from "swr/mutation";

// Story/Saga Mutations
export function useCreateStory(onSuccess?: () => void) {
	return useSWRMutation(
		"/api/stories/create-saga",
		async (url: string, { arg }: { arg: StoryCreateRequestDto }) => {
			const response = await fetch(url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(arg),
			});
			if (!response.ok) throw new Error("Failed to create story");
			return response.json();
		},
		{
			onSuccess: () => {
				onSuccess?.();
			},
			onError: (error) => {
				console.error("Failed to create story:", error);
				alert("Failed to create story. Please try again.");
			},
		},
	);
}

export function useUpdateStory(onSuccess?: () => void) {
	return useSWRMutation(
		"/api/stories/update-saga",
		async (
			url: string,
			{
				arg,
			}: {
				arg: StoryCreateRequestDto & {
					sagaId: string;
					delFlag: boolean;
					updUserId: string;
				};
			},
		) => {
			const response = await fetch(`${url}/${arg.sagaId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(arg),
			});
			if (!response.ok) throw new Error("Failed to update story");
			return response.json();
		},
		{
			onSuccess: () => {
				onSuccess?.();
			},
			onError: (error) => {
				console.error("Failed to update story:", error);
				alert("Failed to update story. Please try again.");
			},
		},
	);
}

export function useDeleteStory(onSuccess?: () => void) {
	return useSWRMutation(
		"/api/stories",
		async (url: string, { arg }: { arg: { storyId: string } }) => {
			const response = await fetch(`${url}/${arg.storyId}`, {
				method: "DELETE",
			});
			if (!response.ok) throw new Error("Failed to delete story");
			return { success: true };
		},
		{
			onSuccess: () => {
				onSuccess?.();
			},
			onError: (error) => {
				console.error("Failed to delete story:", error);
				alert(
					`Failed to delete story: ${error instanceof Error ? error.message : String(error)}`,
				);
			},
		},
	);
}

// Story Chapter Mutations
export function useCreateStoryChapter(storyId: string, onSuccess?: () => void) {
	return useSWRMutation(
		"/api/stories/create-chapter",
		async (url: string, { arg }: { arg: StoryChapterCreateRequestDto }) => {
			const response = await fetch(`${url}/${storyId}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(arg),
			});
			if (!response.ok) throw new Error("Failed to create chapter");
			return response.json();
		},
		{
			onSuccess: () => {
				onSuccess?.();
			},
			onError: (error) => {
				console.error("Failed to create chapter:", error);
				alert("Failed to create chapter. Please try again.");
			},
		},
	);
}

export function useUpdateStoryChapter(onSuccess?: () => void) {
	return useSWRMutation(
		"/api/stories/update-chapter",
		async (
			url: string,
			{
				arg,
			}: { arg: StoryChapterUpdateRequestDto & { storyChapterId: string } },
		) => {
			const response = await fetch(`${url}/${arg.storyChapterId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(arg),
			});
			if (!response.ok) throw new Error("Failed to update chapter");
			return response.json();
		},
		{
			onSuccess: () => {
				onSuccess?.();
			},
			onError: (error) => {
				console.error("Failed to update chapter:", error);
				alert("Failed to update chapter. Please try again.");
			},
		},
	);
}

export function useDeleteStoryChapter(onSuccess?: () => void) {
	return useSWRMutation(
		"/api/stories/delete-chapter",
		async (url: string, { arg }: { arg: { chapterId: string } }) => {
			const response = await fetch(`${url}/${arg.chapterId}`, {
				method: "DELETE",
			});
			if (!response.ok) throw new Error("Failed to delete chapter");
			return { success: true };
		},
		{
			onSuccess: () => {
				onSuccess?.();
			},
			onError: (error) => {
				console.error("Failed to delete chapter:", error);
				alert(
					`Failed to delete chapter: ${error instanceof Error ? error.message : String(error)}`,
				);
			},
		},
	);
}
