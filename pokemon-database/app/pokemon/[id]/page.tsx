"use client";

import { useGetPokemonDetailsQuery } from "@/lib/services/pokemonApi";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PokemonDetails from "@/components/PokemonDetails";

export default function PokemonPage() {
  const params = useParams();
  const [pokemonId, setPokemonId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof params.id === "string") {
      setPokemonId(params.id);
    }
  }, [params]);

  const {
    data: pokemon,
    error,
    isLoading,
  } = useGetPokemonDetailsQuery(pokemonId || "", {
    skip: !pokemonId,
  });

  const router = useRouter();

  if (isLoading) return <p className="text-center text-xl">Indlæser data...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">Fejl ved hentning af data.</p>
    );
  if (!pokemon) return null;

  // Baggrundsfarver baseret på type
  const typeColors: Record<string, string> = {
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-500",
    psychic: "bg-pink-500",
    ice: "bg-cyan-500",
    dragon: "bg-purple-600",
    dark: "bg-gray-800",
    fairy: "bg-pink-300",
    normal: "bg-gray-400",
    fighting: "bg-orange-600",
    flying: "bg-indigo-400",
    poison: "bg-purple-500",
    ground: "bg-yellow-700",
    rock: "bg-gray-600",
    bug: "bg-lime-500",
    ghost: "bg-indigo-700",
    steel: "bg-gray-500",
  };

  return (
    <PokemonDetails
      pokemon={pokemon}
      typeColors={typeColors}
      onBack={() => router.back()}
    />
  );
}
