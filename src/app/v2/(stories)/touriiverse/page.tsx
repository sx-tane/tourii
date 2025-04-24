"use client";

import TouriiError from "@/app/error";
import Loading from "@/app/loading";
import StoryComponent from "@/components/story/story-page/story-component";
import StorySelectionList from "@/components/story/story-page/story-selection/story-selection-list";
import { useSagas } from "@/hooks/stories/useSagas";
import { ApiError } from "@/lib/errors";
import {
	selectStories,
	setSelectedStory,
	setStories,
} from "@/lib/redux/features/stories/stories-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { logger } from "@/utils/logger";
import type { NextPage } from "next";
import { useEffect } from "react";

const Touriiverse: NextPage = () => {
	const dispatch = useAppDispatch();
	const { selectedStory, selectionData } = useAppSelector(selectStories);

	const { sagas, isLoading, isError: error, mutateSagas } = useSagas();

	useEffect(() => {
		if (sagas) {
			dispatch(setStories(sagas));
		}
	}, [sagas, dispatch]);

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
				onRetry={mutateSagas}
			/>
		);
	}

	if (!isLoading && sagas && sagas.length === 0) {
		return (
			<TouriiError
				errorMessage="No stories are currently available."
				isEmpty={true}
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

	return (
		<div className="h-[90vh] w-full z-20">
			<div className="flex flex-col items-center justify-center h-full">
				<StoryComponent key={selectedStory.storyId} story={selectedStory} />
				<StorySelectionList
					selectionData={selectionData}
					onSelect={handleSelectStory}
				/>
			</div>
		</div>
	);
};

export default Touriiverse;
