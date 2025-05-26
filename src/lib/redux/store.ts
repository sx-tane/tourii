import { configureStore } from "@reduxjs/toolkit";
import storiesReducer from "./features/stories/stories-slice";
import homepageReducer from "./features/homepage/homepage-slice";
import characterReducer from "./features/character/character-slice";
import passportReducer from "./features/passport/passport-slice";
import chapterReducer from "./features/chapter/chapter-slice";
import routesReducer from "./features/routes/routes-slice";

export const store = configureStore({
	reducer: {
		stories: storiesReducer,
		homepage: homepageReducer,
		character: characterReducer,
		passport: passportReducer,
		chapter: chapterReducer,
		routes: routesReducer,
	},
	// Consider adding middleware here if needed (e.g., for logging, thunks)
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
	// Enable Redux DevTools extension support
	devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
