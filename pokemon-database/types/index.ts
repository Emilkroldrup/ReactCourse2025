export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  base_experience: number;
  height: number;
  weight: number;
  image: string;
}

export interface User {
  id: number;
  username: string;
  favorite_pokemon: number[];
}

export interface PokemonResponse {
  data: Pokemon[];
  status: number;
  statusText: string;
}

export interface UserResponse {
  data: User[];
  status: number;
  statusText: string;
} 