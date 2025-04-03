"use client";

import { configureStore } from "@reduxjs/toolkit";
import { pokemonApi } from "./services/pokemonApi";
import { favoritesApi } from "./services/favoritesApi";
import favoritesReducer from "./features/favoritesSlice";

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware, favoritesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
