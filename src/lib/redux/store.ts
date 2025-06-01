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
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these action types
				ignoredActions: [
					// Allow non-serializable values in specific actions if needed
				],
				// Ignore these field paths in all actions
				ignoredActionsPaths: [
					// Ignore non-serializable values in specific payload paths
				],
				// Ignore these paths in the state
				ignoredPaths: [
					// Ignore non-serializable values in specific state paths
				],
				// Warn instead of throwing errors for debugging
				warnAfter: 128,
			},
		}),
	// Enable Redux DevTools extension support
	devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
