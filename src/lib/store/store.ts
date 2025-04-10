import { configureStore } from "@reduxjs/toolkit";
import homepageReducer from "./slices/homepage-slice";
import characterReducer from "./slices/character-slice";
import passportReducer from "./slices/passport-slice";
import chapterReducer from "./slices/chapter-slice";

export const store = configureStore({
	reducer: {
		homepage: homepageReducer,
		character: characterReducer,
		passport: passportReducer,
		chapter: chapterReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
