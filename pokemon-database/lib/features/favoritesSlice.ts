import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
  favorites: { id: number; name: string; image: string }[];
}

const initialState: FavoriteState = {
  favorites: []
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<{ id: number; name: string; image: string }[]>) => {
      state.favorites = action.payload;
    }
  }
});

export const { setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer; 