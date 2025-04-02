import { Pokemon, User, PokemonResponse, UserResponse } from '../types';

const API_URL = 'http://localhost:3001';

export const api = {
  // Pokemon endpoints
  async getPokemon(): Promise<PokemonResponse> {
    const response = await fetch(`${API_URL}/pokemon`);
    return {
      data: await response.json(),
      status: response.status,
      statusText: response.statusText
    };
  },

  async getPokemonById(id: number): Promise<Pokemon> {
    const response = await fetch(`${API_URL}/pokemon/${id}`);
    return response.json();
  },

  async createPokemon(pokemon: Omit<Pokemon, 'id'>): Promise<Pokemon> {
    const response = await fetch(`${API_URL}/pokemon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pokemon),
    });
    return response.json();
  },

  // User endpoints
  async getUsers(): Promise<UserResponse> {
    const response = await fetch(`${API_URL}/users`);
    return {
      data: await response.json(),
      status: response.status,
      statusText: response.statusText
    };
  },

  async getUserById(id: number): Promise<User> {
    const response = await fetch(`${API_URL}/users/${id}`);
    return response.json();
  },

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return response.json();
  }
}; 