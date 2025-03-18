"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useGetPokemonListQuery,
  useGetAllPokemonQuery,
} from "@/lib/services/pokemonApi";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";

export default function PokemonList() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState(""); // 🚀 Søge-state
  const limit = 20;
  const offset = page * limit;
  const router = useRouter();

  // 🚀 Hent ALLE Pokémon-navne (kun én gang)
  const { data: allPokemon } = useGetAllPokemonQuery();
  const { data, error, isLoading } = useGetPokemonListQuery(offset);

  // Dynamisk filtrering: Hvis der søges, brug ALLE Pokémon, ellers brug den nuværende side
  const pokemonList = search
    ? allPokemon?.results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      )
    : data?.results;

  const getRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    router.push(`/pokemon/${randomId}`);
  };

  if (isLoading)
    return <p className="text-center text-xl">Indlæser Pokémon...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">Fejl ved hentning af Pokémon.</p>
    );

  return (
    <div key={page} className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Pokémon Liste</h1>

      {/* Søgefelt + Random Knappen */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="🔍 Søg Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={getRandomPokemon}
          className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          🎲 Tilfældig Pokémon
        </button>
      </div>

      {/* Pokémon Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {pokemonList?.length ? (
          pokemonList.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              url={pokemon.url}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Ingen Pokémon fundet 😢
          </p>
        )}
      </div>

      {/* Pagination Component - skjules, hvis der søges */}
      {!search && <Pagination page={page} setPage={setPage} />}
    </div>
  );
}
