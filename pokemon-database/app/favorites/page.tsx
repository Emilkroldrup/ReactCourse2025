"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useGetFavoritesQuery } from "@/lib/services/favoritesApi";
import { setFavorites } from "@/lib/features/favoritesSlice";
import Link from "next/link";

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const { data: favoriteIds = [], isLoading, error } = useGetFavoritesQuery();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  useEffect(() => {
    if (favoriteIds.length > 0) {
      // Fetch full Pokemon data for each favorite
      const fetchFavoriteDetails = async () => {
        const favoritePokemon = await Promise.all(
          favoriteIds.map(async (id) => {
            const response = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${id}`
            );
            const pokemon = await response.json();
            return {
              id: pokemon.id,
              name: pokemon.name,
              image: pokemon.sprites.other["official-artwork"].front_default,
            };
          })
        );
        dispatch(setFavorites(favoritePokemon));
      };
      fetchFavoriteDetails();
    }
  }, [favoriteIds, dispatch]);

  if (isLoading) {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          ⭐ Mine Favorit Pokémon
        </h1>
        <p className="text-center text-gray-500">Loading favorites...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          ⭐ Mine Favorit Pokémon
        </h1>
        <p className="text-center text-red-500">Error loading favorites</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        ⭐ Mine Favorit Pokémon
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">
          Ingen favoritter endnu! Gå til en Pokémon og tryk "Tilføj til
          favoritter".
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.map((pokemon) => (
            <Link key={pokemon.id} href={`/pokemon/${pokemon.id}`}>
              <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col items-center">
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="w-24 h-24 object-contain"
                />
                <p className="mt-2 text-lg font-semibold capitalize text-black">
                  {pokemon.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
