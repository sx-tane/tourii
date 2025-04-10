import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ChapterState {
	chapterNumber: string;
	storyTitle: string;
	imageUrl: string;
}

const initialState: ChapterState = {
	chapterNumber: "Chapter Three",
	storyTitle: "The Lantern Festival",
	imageUrl: "/image/touriiverse/bungo-ono/chapter3.png",
};

const chapterSlice = createSlice({
	name: "chapter",
	initialState,
	reducers: {
		setChapterDetails: (state, action: PayloadAction<ChapterState>) => {
			state.chapterNumber = action.payload.chapterNumber;
			state.storyTitle = action.payload.storyTitle;
			state.imageUrl = action.payload.imageUrl;
		},
	},
});

export const { setChapterDetails } = chapterSlice.actions;
export default chapterSlice.reducer;
