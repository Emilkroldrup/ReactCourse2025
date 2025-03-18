"use client";

interface PokemonTypesProps {
  types: { type: { name: string } }[];
  typeColors: Record<string, string>;
}

export default function PokemonTypes({ types, typeColors }: PokemonTypesProps) {
  return (
    <div className="flex gap-3 mt-4">
      {types.map((t) => (
        <span
          key={t.type.name}
          className={`px-4 py-1 rounded-full text-white text-sm ${
            typeColors[t.type.name] || "bg-gray-500"
          }`}
        >
          {t.type.name}
        </span>
      ))}
    </div>
  );
}
