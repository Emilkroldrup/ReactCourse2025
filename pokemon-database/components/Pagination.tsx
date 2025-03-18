"use client";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({ page, setPage }: PaginationProps) {
  return (
    <div className="mt-6 flex justify-center gap-4">
      <button
        onClick={() => setPage((prev: number) => Math.max(prev - 1, 0))}
        disabled={page === 0}
        className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:bg-gray-300 hover:bg-gray-600 transition-colors"
      >
        ← Forrige
      </button>
      <span className="text-xl font-semibold">Side {page + 1}</span>
      <button
        onClick={() => setPage((prev: number) => prev + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Næste →
      </button>
    </div>
  );
}
