"use client";

import TouriiError from "@/app/error";
import Loading from "@/app/loading";
import StoryComponent from "@/components/story/story-page/story-component";
import StorySelectionList from "@/components/story/story-page/story-selection/story-selection-list";
import { useSagas } from "@/hooks";
import { ApiError } from "@/lib/errors";
import {
	selectStories,
	setSelectedStory,
} from "@/lib/redux/features/stories/stories-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { logger } from "@/utils/logger";
import type { NextPage } from "next";
import { useEffect, useRef, useMemo } from "react";

const Touriiverse: NextPage = () => {
	const dispatch = useAppDispatch();
	const { selectedStoryId } = useAppSelector(selectStories);
	const initializedRef = useRef(false);

	// ✅ Use SWR for server data - don't duplicate in Redux
	const { data: sagas, isLoading, error, mutate } = useSagas();

	// ✅ Compute selection data from server data, store only UI state in Redux
	const selectionData = useMemo(() => {
		if (!sagas) return [];

		return sagas.map((story) => ({
			title: story.sagaName,
			selectedStoryId: story.storyId,
			isSelected: selectedStoryId === story.storyId,
			isPrologue: story.isPrologue ?? false,
			chapterNumber: story.chapterList?.length,
		}));
	}, [sagas, selectedStoryId]);

	const selectedStory = useMemo(() => {
		if (!sagas || !selectedStoryId) return null;
		return sagas.find((story) => story.storyId === selectedStoryId) || null;
	}, [sagas, selectedStoryId]);

	useEffect(() => {
		if (
			sagas &&
			sagas.length > 0 &&
			!selectedStoryId &&
			!initializedRef.current
		) {
			const firstStory = sagas[0];
			if (firstStory) {
				dispatch(setSelectedStory(firstStory.storyId));
				initializedRef.current = true;
			}
		}
	}, [sagas, selectedStoryId, dispatch]);

	const handleSelectStory = (selectedStoryId: string) => {
		dispatch(setSelectedStory(selectedStoryId));
	};

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		let errorMessage = "An unexpected error occurred while loading stories.";
		let errorStatus: number | undefined = undefined;

		if (error instanceof ApiError) {
			errorMessage = error.message;
			errorStatus = error.status;
			logger.error("API Error loading sagas:", {
				status: error.status,
				message: error.message,
				context: error.context,
			});
		} else if (error instanceof Error) {
			errorMessage = error.message;
			logger.error("Generic Error loading sagas:", {
				message: error.message,
				stack: error.stack,
			});
		} else {
			logger.error("Unknown Error loading sagas:", { error });
		}

		return (
			<TouriiError
				errorMessage={errorMessage}
				status={errorStatus}
				onRetry={mutate}
				textColor="text-warmGrey"
				titleTextColor="text-warmGrey"
			/>
		);
	}

	if (!isLoading && sagas && sagas.length === 0) {
		return (
			<TouriiError
				errorMessage="No stories are currently available."
				isEmpty={true}
				textColor="text-warmGrey"
				titleTextColor="text-warmGrey"
			/>
		);
	}

	if (!selectedStory && !isLoading && sagas && sagas.length > 0) {
		return <Loading />;
	}

	if (!selectedStory) {
		logger.warn("Touriiverse rendered without a selected story.");
		return <div>Please select a story.</div>;
	}

	// Ensure selectedStory has the required isSelected property
	const storyWithIsSelected = selectedStory
		? {
				...selectedStory,
				isSelected: selectedStory.isSelected ?? false,
			}
		: undefined;

	return (
		<div className="h-[90vh] w-full z-20">
			<div className="flex flex-col items-center justify-center h-full">
				<StoryComponent
					key={selectedStory.storyId}
					story={storyWithIsSelected}
				/>
				<StorySelectionList
					selectionData={selectionData}
					onSelect={handleSelectStory}
				/>
			</div>
		</div>
	);
};

export default Touriiverse;
