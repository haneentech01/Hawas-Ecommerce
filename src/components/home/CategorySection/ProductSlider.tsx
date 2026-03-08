"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/src/types/catalog";
import ProductCard from "@/src/components/shared/ProductCard";
import { cn } from "@/src/lib/utils";

interface ProductSliderProps {
  products: Product[];
  isRtl: boolean;
  onScroll: (direction: "next" | "prev", isRtl: boolean) => void;
  productsRef: React.RefObject<HTMLDivElement | null>;
}

export const ProductSlider = ({
  products,
  isRtl,
  onScroll,
  productsRef,
}: ProductSliderProps) => {
  return (
    <div className="relative mx-3 md:mx-[68px] flex items-center gap-3">
      {/* سطر الكروت */}
      <div
        ref={productsRef}
        className="flex gap-3 overflow-x-auto xl:overflow-hidden scroll-smooth hide-scrollbar w-full"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            className={cn(
              "w-[calc(50%-6px)] md:w-[calc(33.333%-8px)] lg:w-[calc(25%-9px)]",
              index >= 4 && "xl:hidden",
            )}
          />
        ))}
      </div>

      {/* أزرار تحريك الكروت */}
      <div className="block">
        <button
          type="button"
          onClick={() => onScroll("next", isRtl)}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 z-20",
            "bg-[#1C1A1B] text-white flex items-center justify-center",
            "hover:bg-black/90 w-[26px] h-[26px] border border-[#1C1A1B] rounded-[5px]",
            isRtl ? "left-0 xl:-left-9 rotate-180" : "right-0 xl:-right-9",
          )}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => onScroll("prev", isRtl)}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 z-20",
            "bg-[#1C1A1B] text-white flex items-center justify-center",
            "hover:bg-black/90 w-[26px] h-[26px] border border-[#1C1A1B] rounded-[5px]",
            isRtl ? "right-0 xl:-right-11 rotate-180" : "left-0 xl:-left-11",
          )}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
