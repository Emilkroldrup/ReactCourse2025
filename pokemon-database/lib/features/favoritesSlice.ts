import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
  favorites: { id: number; name: string; image: string }[];
}

const initialState: FavoriteState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<{ id: number; name: string; image: string }>) => {
      if (!state.favorites.find((p) => p.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
