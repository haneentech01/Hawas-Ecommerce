"use client";

import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import ProductCard from "@/src/components/shared/ProductCard";
import { Product } from "@/src/types/catalog";
import SearchBar from "@/src/components/layout/SearchBar";

// Sample bookmarked products
const bookmarkedProducts: Product[] = [
  {
    id: 1,
    category: "tech",
    name: "ماوس ابل اصلي",
    code: "32123",
    price: 200,
    rating: 4.5,
    image: "/images/verticalMouse.png",
    status: "available",
    bgColor: "#F4F4F4",
    currency: "$",
  },
  {
    id: 2,
    category: "tech",
    name: "سماعات جيمنج",
    code: "32124",
    price: 200,
    rating: 4.5,
    image: "/images/headphones.png",
    status: "available",
    bgColor: "#F4F4F4",
    currency: "$",
  },
  {
    id: 3,
    category: "tech",
    name: "يد تحكم بلايستيشن",
    code: "32125",
    price: 200,
    oldPrice: 300,
    rating: 4.5,
    image: "/images/playStation.png",
    status: "available",
    bgColor: "#F4F4F4",
    currency: "$",
  },
  {
    id: 4,
    category: "tech",
    name: "ايفون برو",
    code: "32126",
    price: 200,
    rating: 4.5,
    image: "/images/keyboardIOS.png",
    status: "available",
    bgColor: "#F4F4F4",
    currency: "$",
  },
  {
    id: 5,
    category: "tech",
    name: "سماعات ابل",
    code: "32127",
    price: 200,
    oldPrice: 300,
    rating: 4.5,
    image: "/images/earphonebg.png",
    status: "available",
    bgColor: "#F4F4F4",
    currency: "$",
  },
];

export default function BookmarksPage() {
  const COLUMNS = 5;
  const ROWS = 5;

  const requiredItems = COLUMNS * ROWS;

  const repeatedProducts = Array.from(
    { length: requiredItems },
    (_, index) => bookmarkedProducts[index % bookmarkedProducts.length],
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#1C1A1B]">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Search bar */}
        <SearchBar showFilter={false} />

        {/* Products grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
          {repeatedProducts.map((product, index) => (
            <ProductCard key={`${product.id}-${index}`} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
