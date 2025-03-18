"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function Navbar() {
  const favoriteCount = useSelector(
    (state: RootState) => state.favorites.favorites.length
  );

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        {/* Link til forsiden */}
        <Link href="/">
          <h1 className="text-2xl font-bold cursor-pointer hover:text-gray-200 transition">
            Pokémon Database
          </h1>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <Link href="/" className="hover:text-gray-200 transition">
            📜 Liste
          </Link>
          <Link
            href="/favorites"
            className="hover:text-gray-200 transition relative"
          >
            ⭐ Favoritter
            {favoriteCount > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {favoriteCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
