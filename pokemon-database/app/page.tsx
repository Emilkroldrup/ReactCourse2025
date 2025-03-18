import PokemonList from "@/components/PokemonList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6">Pokémon Database</h1>
      <PokemonList />
    </main>
  );
}
