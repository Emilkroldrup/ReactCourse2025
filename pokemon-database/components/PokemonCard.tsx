"use client";

import Link from "next/link";

interface PokemonCardProps {
  name: string;
  url: string;
}

export default function PokemonCard({ name, url }: PokemonCardProps) {
  const pokemonId = url.split("/").filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col items-center 
      transform hover:scale-105 transition-transform duration-200"
    >
      <img src={imageUrl} alt={name} className="w-24 h-24 object-contain" />
      <p className="mt-2 text-lg font-semibold capitalize text-black">{name}</p>

      {/* "Vis mere info"-knap */}
      <Link href={`/pokemon/${pokemonId}`}>
        <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Vis mere info
        </button>
      </Link>
    </div>
  );
}
