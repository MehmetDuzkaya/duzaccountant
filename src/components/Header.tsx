import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 rounded-full p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide">Düz Muhasebe</h1>
            <p className="text-slate-400 text-xs">Muhasebe & Mevzuat Takip Sistemi</p>
          </div>
        </div>
        <Link
          href="/admin"
          className="text-sm bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-md"
        >
          Admin Paneli
        </Link>
      </div>
    </header>
  );
}
