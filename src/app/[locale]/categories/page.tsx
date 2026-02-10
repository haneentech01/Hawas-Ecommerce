"use client";
import React, { useState } from "react";

import { useTranslations } from "next-intl";
import { useCategories } from "@/src/hooks/useCategories";
import CategoryCard from "@/src/components/shared/CategoryCard";
import SearchBar from "@/src/components/layout/SearchBar";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import CategoryComponent from "@/src/components/category/CategoryComponent";

export default function CategoriesPage() {
  useTranslations("catalog");
  useCategories();
  const [filters, setFilters] = useState({
    date: "newest",
    price: "none",
    alphabetical: "none",
  });

  return (
    <div className="min-h-screen bg-[#1C1A1B] text-white font-sans">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <SearchBar showFilter={true} onApplyFilters={(f) => setFilters(f)} />
        <CategoryCard />
        <CategoryComponent filters={filters} />
      </main>

      <Footer />
    </div>
  );
}
