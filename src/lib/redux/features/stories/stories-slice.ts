import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { StorySelection } from "@/app/v2/(stories)/types";
import type { RootState } from "../../store";
import { StoryResponseDto } from "@/api/generated";

interface StoriesState {
	stories: StoryResponseDto[];
	selectedStory: StoryResponseDto | null;
}

const initialState: StoriesState = {
	stories: [],
	selectedStory: null,
};

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
			state.stories = action.payload;
			const currentSelectedId = state.selectedStory?.storyId;
			state.selectedStory =
				state.stories.find((s) => s.storyId === currentSelectedId) ||
				state.stories[1] ||
				null;

			state.stories = state.stories.map((story) => ({
				...story,
				isSelected: story.storyId === state.selectedStory?.storyId,
			}));
		},
	},
});

export const { setSelectedStory, setStories } = storiesSlice.actions;

const selectStoriesState = (state: RootState) => state.stories;

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
