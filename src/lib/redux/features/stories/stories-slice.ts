import {
	createSlice,
	createAsyncThunk,
	createSelector,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Story, StorySelection } from "@/app/v2/(stories)/types";
import type { RootState } from "../../store";

interface StoriesState {
	stories: Story[];
	selectedStory: Story | null;
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
}

const initialState: StoriesState = {
	stories: [],
	selectedStory: null,
	status: "idle",
	error: null,
};

export const fetchStories = createAsyncThunk(
	"stories/fetchStories",
	async () => {
		const response = await fetch("/api/stories/sagas");
		if (!response.ok) {
			throw new Error("Failed to fetch stories");
		}
		const data = await response.json();
		return data.stories;
	},
);

const storiesSlice = createSlice({
	name: "stories",
	initialState,
	reducers: {
		setSelectedStory: (state, action: PayloadAction<string>) => {
			// Update isSelected flag for all stories
			state.stories = state.stories.map((story) => ({
				...story,
				isSelected: story.storyId === action.payload,
			}));
			// Set selected story
			state.selectedStory =
				state.stories.find((story) => story.storyId === action.payload) || null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchStories.pending, (state) => {
				state.status = "loading";
			})
			.addCase(
				fetchStories.fulfilled,
				(state, action: PayloadAction<Story[]>) => {
					state.status = "succeeded";
					state.stories = action.payload;
					// Find the default selected story or use the second story
					state.selectedStory =
						action.payload.find((story) => story.isSelected) ||
						action.payload[1] ||
						null;
				},
			)
			.addCase(fetchStories.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message || "Failed to fetch stories";
			});
	},
});

export const { setSelectedStory } = storiesSlice.actions;

// Selectors
const selectStoriesState = (state: RootState) => state.stories;

export const selectStories = createSelector(
	[selectStoriesState],
	(storiesState) => ({
		stories: storiesState.stories,
		selectedStory: storiesState.selectedStory,
		status: storiesState.status,
		error: storiesState.error,
		// Transform stories array into selection data with required fields
		selectionData: storiesState.stories.map(
			(story) =>
				({
					title: story.title,
					selectedStoryId: story.storyId,
					isSelected: story.isSelected ?? false,
					isPrologue: story.isPrologue ?? false,
					chapterNumber: story.chapterNumber,
				}) satisfies StorySelection,
		),
	}),
);

export default storiesSlice.reducer;
