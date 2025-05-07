// biome-ignore lint/style/useImportType: <explanation>
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CharacterProps } from "@/app/v2/(stories)/types";

interface CharacterState {
	characters: CharacterProps[];
	selectedCharacter: CharacterProps | null;
	isLoading: boolean;
	error: string | null;
	filters: {
		searchQuery: string;
		realm: string;
	};
}

const initialState: CharacterState = {
	characters: [],
	selectedCharacter: null,
	isLoading: false,
	error: null,
	filters: {
		searchQuery: "",
		realm: "all",
	},
};

const characterSlice = createSlice({
	name: "character",
	initialState,
	reducers: {
		setCharacters: (state, action: PayloadAction<CharacterProps[]>) => {
			state.characters = action.payload;
		},
		setSelectedCharacter: (
			state,
			action: PayloadAction<CharacterProps | null>,
		) => {
			state.selectedCharacter = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
		setSearchQuery: (state, action: PayloadAction<string>) => {
			state.filters.searchQuery = action.payload;
		},
		setRealmFilter: (state, action: PayloadAction<string>) => {
			state.filters.realm = action.payload;
		},
		resetFilters: (state) => {
			state.filters = initialState.filters;
		},
	},
});

export const {
	setCharacters,
	setSelectedCharacter,
	setLoading,
	setError,
	setSearchQuery,
	setRealmFilter,
	resetFilters,
} = characterSlice.actions;

export default characterSlice.reducer;
