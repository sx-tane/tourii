import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

/**
 * ✅ PROPER REDUX USAGE: Only store UI state, not server data
 *
 * This slice only manages:
 * - Selected story ID (UI state)
 *
 * Server data (stories/sagas) comes from SWR hooks, not Redux!
 */
interface StoriesUIState {
	selectedStoryId: string | null;
}

const initialState: StoriesUIState = {
	selectedStoryId: null,
};

const storiesSlice = createSlice({
	name: "stories",
	initialState,
	reducers: {
		setSelectedStory: (state, action: PayloadAction<string>) => {
			state.selectedStoryId = action.payload;
		},
		clearStorySelection: (state) => {
			state.selectedStoryId = null;
		},
	},
});

export const { setSelectedStory, clearStorySelection } = storiesSlice.actions;

// Simple selectors for UI state only
export const selectSelectedStoryId = (state: RootState) =>
	state.stories.selectedStoryId;

// Legacy selector for backward compatibility (but returns computed data from SWR)
export const selectStories = (state: RootState) => ({
	selectedStoryId: state.stories.selectedStoryId,
});

export default storiesSlice.reducer;
