import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { StorySelection } from "@/app/v2/(stories)/types";
import type { RootState } from "../../store";
import { StoryResponseDto } from "@/api/generated";

// Create a serializable type that extends the API response
interface SerializableStory extends Omit<StoryResponseDto, 'isSelected'> {
	isSelected?: boolean;
}

interface StoriesState {
	stories: SerializableStory[];
	selectedStory: SerializableStory | null;
}

const initialState: StoriesState = {
	stories: [],
	selectedStory: null,
};

/**
 * Slice for managing stories state.
 */
const storiesSlice = createSlice({
	name: "stories",
	initialState,
	reducers: {
		setSelectedStory: (state, action: PayloadAction<string>) => {
			state.stories = Array.isArray(state.stories)
				? state.stories.map((story) => ({
						...story,
						isSelected: story.storyId === action.payload,
					}))
				: [];
			state.selectedStory = Array.isArray(state.stories)
				? state.stories.find((story) => story.storyId === action.payload) ||
					null
				: null;
		},
		setStories: (state, action: PayloadAction<StoryResponseDto[]>) => {
			// Create serializable copies of the API response objects
			const serializedStories: SerializableStory[] = action.payload.map(story => ({
				...story,
				isSelected: false
			}));
			
			state.stories = serializedStories;
			const currentSelectedId = state.selectedStory?.storyId;
			
			// Find the selected story but don't modify it yet
			const newSelectedStory = state.stories.find((s) => s.storyId === currentSelectedId) ||
				state.stories[1] ||
				null;
			
			// Only update if there's a change to prevent unnecessary re-renders
			if (state.selectedStory?.storyId !== newSelectedStory?.storyId) {
				state.selectedStory = newSelectedStory;
				
				// Update the selected state only if selection changed
				state.stories = state.stories.map((story) => ({
					...story,
					isSelected: story.storyId === newSelectedStory?.storyId,
				}));
			}
		},
	},
});

export const { setSelectedStory, setStories } = storiesSlice.actions;

const selectStoriesState = (state: RootState) => state.stories;

/**
 * Selector to get the stories and selected story data.
 * @param state - The root state.
 * @returns The stories and selected story data.
 */
export const selectStories = createSelector(
	[selectStoriesState],
	(storiesState) => ({
		stories: storiesState.stories,
		selectedStory: storiesState.selectedStory,
		selectionData: Array.isArray(storiesState.stories)
			? storiesState.stories.map(
					(story) =>
						({
							title: story.sagaName,
							selectedStoryId: story.storyId,
							isSelected: story.isSelected ?? false,
							isPrologue: story.isPrologue ?? false,
							chapterNumber: story.chapterList?.length,
						}) satisfies StorySelection,
				)
			: [],
	}),
);

export default storiesSlice.reducer;
