"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "@/lib/services/favoritesApi";
import PokemonStats from "./PokemonStats";
import PokemonTypes from "./PokemonTypes";

interface PokemonDetailsProps {
  pokemon: {
    id: number;
    name: string;
    sprites: { other: { "official-artwork": { front_default: string } } };
    types: { type: { name: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
  };
  typeColors: Record<string, string>;
  onBack: () => void;
}

export default function PokemonDetails({
  pokemon,
  typeColors,
  onBack,
}: PokemonDetailsProps) {
  const dispatch = useDispatch();
  const { data: favoriteIds = [], isLoading } = useGetFavoritesQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const isFavorite = favoriteIds.includes(pokemon.id);

  const handleFavorite = async () => {
    if (isFavorite) {
      await removeFavorite(pokemon.id);
    } else {
      await addFavorite(pokemon.id);
    }
  };

  const primaryType = pokemon.types?.[0]?.type.name || "normal";
  const bgColor = typeColors[primaryType] || "bg-gray-400";

  return (
    <div
      className={`min-h-screen flex flex-col items-center ${bgColor} text-white`}
    >
      {/* Tilbage-knap */}
      <button
        onClick={onBack}
        className="mt-6 px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition-colors"
      >
        ← Tilbage
      </button>

      {/* Pokémon kort */}
      <div className="bg-white text-black rounded-lg shadow-xl p-6 w-full max-w-md flex flex-col items-center mt-10">
        <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>

        {pokemon.sprites?.other?.["official-artwork"]?.front_default && (
          <Image
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            width={200}
            height={200}
            className="mt-4"
            priority
          />
        )}

        <button
          onClick={handleFavorite}
          disabled={isLoading}
          className={`mt-4 px-4 py-2 rounded-lg text-white transition-colors ${
            isFavorite
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isLoading
            ? "Loading..."
            : isFavorite
            ? "❌ Fjern fra favoritter"
            : "⭐ Tilføj til favoritter"}
        </button>

        <PokemonTypes types={pokemon.types} typeColors={typeColors} />
        <PokemonStats stats={pokemon.stats} />
      </div>
    </div>
  );
}
