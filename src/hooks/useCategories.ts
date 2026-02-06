"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { CATEGORY_FILTERS } from "@/src/constants/catalog";
import { CategoryFilter } from "@/src/types/catalog";

export function useCategories() {
  const t = useTranslations("catalog.categories");

  const categories = useMemo<CategoryFilter[]>(
    () =>
      CATEGORY_FILTERS.map((category) => ({
        id: category.id,
        icon: category.icon,
        label: t(category.labelKey),
      })),
    [t],
  );

  return { categories };
}
