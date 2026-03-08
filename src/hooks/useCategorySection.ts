"use client";

import { useRef, useState, useMemo } from "react";
import { Product } from "@/src/types/catalog";

interface UseCategorySectionProps {
  products: Product[];
  initialCategory?: string;
}

export const useCategorySection = ({
  products,
  initialCategory = "all",
}: UseCategorySectionProps) => {
  const [activeTab, setActiveTab] = useState(initialCategory);
  const productsRef = useRef<HTMLDivElement | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) => p.category === activeTab || activeTab === "all",
    );
  }, [products, activeTab]);

  const handleScroll = (direction: "next" | "prev", isRtl: boolean) => {
    if (!productsRef.current) return;

    const amount = 300; // Adjusted for better scroll experience
    let value = amount;

    if (isRtl) {
      value = direction === "next" ? -amount : amount;
    } else {
      value = direction === "next" ? amount : -amount;
    }

    productsRef.current.scrollBy({
      left: value,
      behavior: "smooth",
    });
  };

  return {
    activeTab,
    setActiveTab,
    productsRef,
    filteredProducts,
    handleScroll,
  };
};
