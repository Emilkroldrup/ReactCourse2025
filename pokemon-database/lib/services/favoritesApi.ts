import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const favoritesApi = createApi({
  reducerPath: "favoritesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  tagTypes: ['Favorites'],
  endpoints: (builder) => ({
    getFavorites: builder.query<number[], void>({
      query: () => 'users/1',
      transformResponse: (response: { favorite_pokemon: number[] }) => response.favorite_pokemon || [],
      providesTags: ['Favorites']
    }),

    addFavorite: builder.mutation<void, number>({
      query: (pokemonId) => ({
        url: 'users/1',
        method: 'PATCH',
        body: { favorite_pokemon: [pokemonId] }
      }),
      invalidatesTags: ['Favorites']
    }),

    removeFavorite: builder.mutation<void, number>({
      query: (pokemonId) => ({
        url: 'users/1',
        method: 'PATCH',
        body: { favorite_pokemon: [pokemonId] }
      }),
      invalidatesTags: ['Favorites']
    }),

    // User management endpoints
    getUsers: builder.query<User[], void>({
      query: () => 'users',
      providesTags: ['Favorites']
    }),

    getUserById: builder.query<User, number>({
      query: (id) => `users/${id}`,
      providesTags: ['Favorites']
    }),

    createUser: builder.mutation<User, Omit<User, 'id'>>({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: user
      }),
      invalidatesTags: ['Favorites']
    })
  })
});

export const { 
  useGetFavoritesQuery, 
  useAddFavoriteMutation, 
  useRemoveFavoriteMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation
} = favoritesApi;

// Types
interface User {
  id: number;
  username: string;
  favorite_pokemon: number[];
} 