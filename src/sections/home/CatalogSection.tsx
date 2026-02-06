"use client";

import { useTranslations } from "next-intl";
import CatalogSearchBar from "@/src/components/catalog/CatalogSearchBar";
import CategoryFilterList from "@/src/components/catalog/CategoryFilterList";
import ProductGrid from "@/src/components/catalog/ProductGrid";
import { useCategories } from "@/src/hooks/useCategories";
import { useProductFilters } from "@/src/hooks/useProductFilters";
import { useProducts } from "@/src/hooks/useProducts";

export default function CatalogSection() {
  const t = useTranslations("catalog");
  const { products } = useProducts();
  const { categories } = useCategories();
  const {
    searchQuery,
    setSearchQuery,
    activeCategoryId,
    setActiveCategoryId,
    filteredProducts,
  } = useProductFilters(products);

  return (
    <section className="container mx-auto px-4 pb-16 pt-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
              {t("subtitle")}
            </p>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              {t("title")}
            </h2>
          </div>

          <div className="rounded-full border border-white/10 bg-[#141214] px-4 py-2 text-xs text-white/70">
            {t("results", { count: filteredProducts.length })}
          </div>
        </div>

        <CatalogSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t("searchPlaceholder")}
          buttonLabel={t("searchButton")}
        />

        <CategoryFilterList
          categories={categories}
          activeId={activeCategoryId}
          onSelect={setActiveCategoryId}
        />

        <ProductGrid products={filteredProducts} />
      </div>
    </section>
  );
}
