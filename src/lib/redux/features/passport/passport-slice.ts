// biome-ignore lint/style/useImportType: <explanation>
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PassportState {
	passportType: "BONJIN" | "AMATSUKAMI" | "KUNITSUKAMI" | "YOKAI";
	userAvatar: string;
	chineseCharacters: string[];
	isUnlocked: boolean;
	level: string;
	totalPoints: number;
	unlockedPerks: string[];
	travelHistory: {
		location: string;
		date: string;
		verified: boolean;
	}[];
}

const initialState: PassportState = {
	passportType: "BONJIN",
	userAvatar: "/image/profile/nft/19.png",
	chineseCharacters: ["天", "津", "神"],
	isUnlocked: false,
	level: "E",
	totalPoints: 0,
	unlockedPerks: [],
	travelHistory: [],
};

const passportSlice = createSlice({
	name: "passport",
	initialState,
	reducers: {
		setPassportType: (
			state,
			action: PayloadAction<PassportState["passportType"]>,
		) => {
			state.passportType = action.payload;
		},
		setUserAvatar: (state, action: PayloadAction<string>) => {
			state.userAvatar = action.payload;
		},
		setChineseCharacters: (state, action: PayloadAction<string[]>) => {
			state.chineseCharacters = action.payload;
		},
		unlockPassport: (state) => {
			state.isUnlocked = true;
		},
		setLevel: (state, action: PayloadAction<string>) => {
			state.level = action.payload;
		},
		addPoints: (state, action: PayloadAction<number>) => {
			state.totalPoints += action.payload;
		},
		unlockPerk: (state, action: PayloadAction<string>) => {
			if (!state.unlockedPerks.includes(action.payload)) {
				state.unlockedPerks.push(action.payload);
			}
		},
		addTravelHistory: (
			state,
			action: PayloadAction<PassportState["travelHistory"][0]>,
		) => {
			state.travelHistory.push(action.payload);
		},
	},
});

export const {
	setPassportType,
	setUserAvatar,
	setChineseCharacters,
	unlockPassport,
	setLevel,
	addPoints,
	unlockPerk,
	addTravelHistory,
} = passportSlice.actions;

export default passportSlice.reducer;
