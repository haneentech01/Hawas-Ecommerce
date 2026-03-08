"use client";

import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import ProductCard from "@/src/components/shared/ProductCard";
import { Product } from "@/src/types/catalog";
import SearchBar from "@/src/components/layout/SearchBar";

import { useBookmarks } from "@/src/hooks/useBookmarks";
import { Link } from "@/src/i18n/navigation";

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();

  return (
    <div className="min-h-screen flex flex-col bg-[#1C1A1B]">
      <Header />

      <main className="flex-1 py-6 space-y-6">
        {/* Search bar */}
        <SearchBar showFilter={false} className="px-4 lg:px-10 xl:px-[122px]" />

        {/* Products grid */}
        <div className="px-4 lg:px-10 xl:px-[122px]">
          {bookmarks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
              {bookmarks.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-[#9D9D9D] text-2xl font-bold mb-6">
                No bookmarks yet
              </p>
              <Link
                href="/categories"
                className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors"
              >
                Go Shopping
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
