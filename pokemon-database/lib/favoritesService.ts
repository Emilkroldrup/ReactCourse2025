const JSON_SERVER_URL = 'http://localhost:3001';

export interface FavoritePokemon {
  id: number;
  name: string;
  image: string;
}

export const favoritesService = {
  async getFavorites(): Promise<FavoritePokemon[]> {
    const response = await fetch(`${JSON_SERVER_URL}/users/1`);
    const user = await response.json();
    return user.favorite_pokemon || [];
  },

  async addFavorite(pokemon: FavoritePokemon): Promise<void> {
    const response = await fetch(`${JSON_SERVER_URL}/users/1`);
    const user = await response.json();
    
    const updatedFavorites = [...(user.favorite_pokemon || []), pokemon.id];
    
    await fetch(`${JSON_SERVER_URL}/users/1`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ favorite_pokemon: updatedFavorites }),
    });
  },

  async removeFavorite(pokemonId: number): Promise<void> {
    const response = await fetch(`${JSON_SERVER_URL}/users/1`);
    const user = await response.json();
    
    const updatedFavorites = (user.favorite_pokemon || []).filter((id: number) => id !== pokemonId);
    
    await fetch(`${JSON_SERVER_URL}/users/1`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ favorite_pokemon: updatedFavorites }),
    });
  }
}; 