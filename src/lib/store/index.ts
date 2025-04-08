import { configureStore } from '@reduxjs/toolkit';
import homepageReducer from './slices/homepage-slice';
import characterReducer from './slices/character-slice';

export const store = configureStore({
  reducer: {
    homepage: homepageReducer,
    character: characterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 