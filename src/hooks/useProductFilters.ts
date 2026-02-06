"use client";

import { useMemo, useState } from "react";
import { Product } from "@/src/types/catalog";

export function useProductFilters(products: Product[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState("all");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategoryId === "all" || product.categoryId === activeCategoryId;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategoryId, products, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    activeCategoryId,
    setActiveCategoryId,
    filteredProducts,
  };
}
