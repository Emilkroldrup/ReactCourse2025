"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Link from "next/link";

export default function FavoritesPage() {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

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
