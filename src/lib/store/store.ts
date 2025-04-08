import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './slices/character-slice';

export const store = configureStore({
  reducer: {
    character: characterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 