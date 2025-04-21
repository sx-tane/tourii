import {
	createSlice,
	createAsyncThunk,
	createSelector,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
	Story,
	StorySelection,
	BackendStoryChapter,
} from "@/app/v2/(stories)/types";
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

export const fetchStories = createAsyncThunk<Story[]>(
	"stories/fetchStories",
	async () => {
		const response = await fetch("/api/stories/sagas");
		if (!response.ok) {
			throw new Error(`Failed to fetch stories: ${response.statusText}`);
		}
		const data = await response.json();
		return data as Story[];
	},
);

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
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchStories.pending, (state) => {
				state.status = "loading";
			})
			.addCase(
				fetchStories.fulfilled,
				(state, action: PayloadAction<Story[] | undefined>) => {
					state.status = "succeeded";
					const storiesPayload = Array.isArray(action.payload)
						? action.payload
						: [];
					state.stories = storiesPayload;

					state.selectedStory =
						storiesPayload.find((story) => story.isSelected) ||
						storiesPayload[1] ||
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
					title: story.sagaName,
					selectedStoryId: story.storyId,
					isSelected: story.isSelected ?? false,
					isPrologue: story.isPrologue ?? false,
					chapterNumber: story.chapterList?.length,
				}) satisfies StorySelection,
		),
	}),
);

export default storiesSlice.reducer;
