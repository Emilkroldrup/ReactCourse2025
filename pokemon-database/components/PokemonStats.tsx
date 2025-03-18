"use client";

interface PokemonStatsProps {
  stats: { base_stat: number; stat: { name: string } }[];
}

export default function PokemonStats({ stats }: PokemonStatsProps) {
  return (
    <div className="mt-6 w-full">
      <h2 className="text-2xl font-semibold text-center">Base Stats</h2>
      <div className="mt-2 space-y-2">
        {stats.map((s) => (
          <div
            key={s.stat.name}
            className="flex justify-between bg-gray-200 px-4 py-2 rounded-lg"
          >
            <span className="capitalize">{s.stat.name}</span>
            <span className="font-semibold">{s.base_stat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
