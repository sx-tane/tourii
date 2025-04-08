import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HomepageSection } from '../../data/homepage';

interface HomepageState {
  currentImage: string;
  logoAnimationComplete: boolean;
  sections: HomepageSection[];
}

const initialState: HomepageState = {
  currentImage: "/image/default-image.jpg",
  logoAnimationComplete: false,
  sections: [],
};

const homepageSlice = createSlice({
  name: 'homepage',
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

export const { setCurrentImage, setLogoAnimationComplete, setSections } = homepageSlice.actions;
export default homepageSlice.reducer; 