"use client";

import TouriiError from "@/app/error";
import Loading from "@/app/loading";
import StoryComponent from "@/components/story/story-page/story-component";
import StorySelectionList from "@/components/story/story-page/story-selection/story-selection-list";
import { getSagas } from "@/hooks/stories/getSagas";
import { ApiError } from "@/lib/errors";
import {
	selectStories,
	setSelectedStory,
	setStories,
} from "@/lib/redux/features/stories/stories-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { logger } from "@/utils/logger";
import type { NextPage } from "next";
import { useEffect, useRef } from "react";

const Touriiverse: NextPage = () => {
	const dispatch = useAppDispatch();
	const { selectedStory, selectionData } = useAppSelector(selectStories);
	const initializedRef = useRef(false);
	const sagasProcessedRef = useRef<string[]>([]);

	const { sagas, isLoadingSagas, isErrorSagas, mutateSagas } = getSagas();

	useEffect(() => {
		if (sagas !== undefined) {
			// Create a key for this saga set to avoid reprocessing the same data
			const sagasKey = sagas.map((s) => s.storyId).join(",");

			if (!sagasProcessedRef.current.includes(sagasKey)) {
				dispatch(setStories(sagas));
				sagasProcessedRef.current.push(sagasKey);

				if (sagas.length > 0 && !initializedRef.current) {
					const firstStory = sagas[0];
					if (firstStory) {
						dispatch(setSelectedStory(firstStory.storyId));
						initializedRef.current = true;
					}
				}
			}
		}
	}, [sagas, dispatch]);

	const handleSelectStory = (selectedStoryId: string) => {
		dispatch(setSelectedStory(selectedStoryId));
	};

	if (isLoadingSagas) {
		return <Loading />;
	}

	if (isErrorSagas) {
		let errorMessage = "An unexpected error occurred while loading stories.";
		let errorStatus: number | undefined = undefined;

		if (isErrorSagas instanceof ApiError) {
			errorMessage = isErrorSagas.message;
			errorStatus = isErrorSagas.status;
			logger.error("API Error loading sagas:", {
				status: isErrorSagas.status,
				message: isErrorSagas.message,
				context: isErrorSagas.context,
			});
		} else if (isErrorSagas instanceof Error) {
			errorMessage = isErrorSagas.message;
			logger.error("Generic Error loading sagas:", {
				message: isErrorSagas.message,
				stack: isErrorSagas.stack,
			});
		} else {
			logger.error("Unknown Error loading sagas:", { isErrorSagas });
		}

		return (
			<TouriiError
				errorMessage={errorMessage}
				status={errorStatus}
				onRetry={mutateSagas}
				textColor="text-warmGrey"
				titleTextColor="text-warmGrey"
			/>
		);
	}

	if (!isLoadingSagas && sagas && sagas.length === 0) {
		return (
			<TouriiError
				errorMessage="No stories are currently available."
				isEmpty={true}
				textColor="text-warmGrey"
				titleTextColor="text-warmGrey"
			/>
		);
	}

	if (!selectedStory && !isLoadingSagas && sagas && sagas.length > 0) {
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
