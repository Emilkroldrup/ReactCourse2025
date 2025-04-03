import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    
    getPokemonList: builder.query<{ results: { name: string; url: string }[] }, number>({
      query: (offset = 0) => `pokemon?limit=20&offset=${offset}`,
    }),

    getAllPokemon: builder.query<{ results: { name: string; url: string }[] }, void>({
      query: () => `pokemon?limit=10000&offset=0`, // 🚀 Hent ALLE Pokémon-navne
    }),

    getPokemonDetails: builder.query<
      {
        id: number;
        name: string;
        types: { type: { name: string } }[];
        sprites: { other: { "official-artwork": { front_default: string } } };
        stats: { base_stat: number; stat: { name: string } }[];
      },
      string
    >({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetAllPokemonQuery, useGetPokemonDetailsQuery } = pokemonApi;
