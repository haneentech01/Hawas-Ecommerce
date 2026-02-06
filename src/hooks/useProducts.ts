"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  CATALOG_PAGE_SIZE,
  CATEGORY_FILTERS,
  PRODUCT_CARD_VARIANTS,
} from "@/src/constants/catalog";
import { Product, ProductBadgeTone } from "@/src/types/catalog";

const badgeSequence: ProductBadgeTone[] = ["new", "hot", "sale"];

export function useProducts() {
  const t = useTranslations("catalog");
  const locale = useLocale();
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: t("currency"),
        maximumFractionDigits: 0,
      }),
    [locale, t],
  );

  const products = useMemo<Product[]>(() => {
    const categoryIds = CATEGORY_FILTERS.filter(
      (category) => category.id !== "all",
    ).map((category) => category.id);

    return Array.from({ length: CATALOG_PAGE_SIZE }, (_, index) => {
      const variant = PRODUCT_CARD_VARIANTS[index % PRODUCT_CARD_VARIANTS.length];
      const categoryId = categoryIds[index % categoryIds.length];
      const rating = 4 + ((index * 7) % 10) / 10;
      const price = 320 + index * 12;
      const badgeTone = badgeSequence[index % badgeSequence.length];

      return {
        id: `product-${index + 1}`,
        name: t("productName", { index: index + 1 }),
        categoryId,
        price,
        currency: t("currency"),
        priceLabel: formatter.format(price),
        rating,
        reviews: 120 + index * 6,
        badge: {
          label: t(`badges.${badgeTone}`),
          tone: badgeTone,
        },
        availabilityLabel: t("availability"),
        variant,
      };
    });
  }, [formatter, t]);

  const refresh = async () => {
    // TODO: Replace with API call once endpoints are available.
  };

  return {
    products,
    isLoading,
    error,
    refresh,
  };
}
