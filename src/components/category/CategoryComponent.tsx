"use client";

import ProductCard from "../shared/ProductCard";
import { Product } from "@/src/types/catalog";

const categoryProducts: Product[] = [
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

interface CategoryComponentProps {
  filters: {
    date: string;
    price: string;
    alphabetical: string;
  };
}

function CategoryComponent({ filters }: CategoryComponentProps) {
  const COLUMNS = 5;
  const ROWS = 5;

  const requiredItems = COLUMNS * ROWS;

  // Real logic: Sort and filter products
  const getFilteredProducts = () => {
    const products = [...categoryProducts];

    // Alphabetical Sorting
    if (filters.alphabetical === "a_z") {
      products.sort((a, b) => a.name.localeCompare(b.name, "ar"));
    } else if (filters.alphabetical === "z_a") {
      products.sort((a, b) => b.name.localeCompare(a.name, "ar"));
    }

    // Price Sorting
    if (filters.price === "low_high") {
      products.sort((a, b) => a.price - b.price);
    } else if (filters.price === "high_low") {
      products.sort((a, b) => b.price - a.price);
    }

    // Date Sorting (Simulated since we don't have real dates)
    if (filters.date === "oldest") {
      products.reverse();
    }

    return products;
  };

  const filtered = getFilteredProducts();

  const repeatedProducts = Array.from(
    { length: requiredItems },
    (_, index) => filtered[index % filtered.length],
  );

  return (
    <div>
      {/* Products grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6 mt-8">
        {repeatedProducts.map((product, index) => (
          <ProductCard key={`${product.id}-${index}`} product={product} />
        ))}
      </div>
    </div>
  );
}

export default CategoryComponent;
