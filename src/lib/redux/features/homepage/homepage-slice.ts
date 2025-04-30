// biome-ignore lint/style/useImportType: <explanation>
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// Assuming HomepageSection type is accessible from this new path
// If not, you might need to adjust the import path or move the type definition
import type { HomepageSection } from "@/lib/data/homepage";

interface HomepageState {
	currentImage: string;
	logoAnimationComplete: boolean;
	sections: HomepageSection[];
}

const initialState: HomepageState = {
	currentImage: "/image/image/homepage/tourii-background.png",
	logoAnimationComplete: false,
	sections: [],
};

const homepageSlice = createSlice({
	name: "homepage",
	initialState,
	reducers: {
		setCurrentImage: (state, action: PayloadAction<string>) => {
			state.currentImage = action.payload;
		},
		setLogoAnimationComplete: (state, action: PayloadAction<boolean>) => {
			state.logoAnimationComplete = action.payload;
		},
		setSections: (state, action: PayloadAction<HomepageSection[]>) => {
			state.sections = action.payload;
		},
	},
});

export const { setCurrentImage, setLogoAnimationComplete, setSections } =
	homepageSlice.actions;
export default homepageSlice.reducer;
