"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/src/types/catalog";
import ProductCard from "@/src/components/shared/ProductCard";

export default function SimilarProducts() {
  const t = useTranslations("productPage");
  const tc = useTranslations("home.categorySection");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const productsRef = useRef<HTMLDivElement | null>(null);

  const handleScrollProducts = (direction: "next" | "prev") => {
    if (!productsRef.current) return;
    const amount = 280;
    const isRtlLayout = isRtl;
    let value = amount;

    if (isRtlLayout) {
      value = direction === "next" ? -amount : amount;
    } else {
      value = direction === "next" ? amount : -amount;
    }

    productsRef.current.scrollBy({
      left: value,
      behavior: "smooth",
    });
  };

  const products: (Product & { tag?: string })[] = [
    {
      id: 1,
      category: "mouses",
      name: "Apple Mouse",
      titleKey: "home.categorySection.products.appleKeyboard",
      status: "available",
      rating: 4.8,
      price: 200,
      currency: "$",
      image: "/images/mouse.png",
      bgColor: "from-purple-500/10 to-purple-900/10",
      tag: tc("status.available"),
      code: "#24562",
      colors: ["#5F2287", "#308DA2", "#EC2D3C"],
    },
    {
      id: 2,
      category: "headphones",
      name: "Gaming Headset",
      titleKey: "home.categorySection.products.gamingHeadphones",
      status: "available",
      rating: 4.7,
      price: 205,
      currency: "$",
      image: "/images/headphones.png",
      bgColor: "from-blue-500/10 to-blue-900/10",
      tag: tc("status.available"),
      code: "#55214",
      colors: ["#3F269B", "#14072D", "#00FF85"],
    },
    {
      id: 3,
      category: "controllers",
      name: "PS5 Controller",
      titleKey: "home.categorySection.products.playStationController",
      status: "soldOut",
      rating: 4.5,
      price: 230,
      currency: "$",
      image: "/images/playStation.png",
      bgColor: "from-orange-500/10 to-orange-900/10",
      tag: "مثالي",
      code: "#87415",
      colors: ["#FF5B37", "#C61F0D", "#FF9A00"],
    },
    {
      id: 4,
      category: "electronics",
      name: "Camera Control",
      titleKey: "home.categorySection.products.professionalCamera",
      status: "available",
      rating: 4.9,
      price: 935,
      currency: "$",
      image: "/images/keyboardIOS.png",
      bgColor: "from-stone-500/10 to-stone-900/10",
      tag: "مثالي",
      code: "#93652",
      colors: ["#E9B77A", "#A66328", "#FBC02D"],
    },
    {
      id: 5,
      category: "earphones",
      name: "Earbuds Pro",
      titleKey: "home.categorySection.products.wirelessEarphones",
      status: "soldOut",
      rating: 4.1,
      price: 180,
      currency: "$",
      image: "/images/earphonebg.png",
      bgColor: "from-rose-500/10 to-rose-900/10",
      tag: tc("status.soldOut"),
      code: "#17735",
      colors: ["#FF4D4D", "#C80F0F", "#FFFFFF"],
    },
  ];

  return (
    <section className="container mx-auto px-4 lg:px-20 py-16">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl lg:text-3xl font-black text-white">
          {t("similarProducts")}
        </h2>
      </div>

      <div className="relative">
        {/* Navigation Button - Prev (Left-ish) */}
        <button
          type="button"
          onClick={() => handleScrollProducts("prev")}
          className={`
            absolute top-1/2 -translate-y-1/2 z-20
            ${isRtl ? "right-0 xl:-right-11 rotate-180" : "left-0 xl:-left-11"}
            bg-[#1C1A1B] text-white flex items-center justify-center
            hover:bg-black/90 w-[26px] h-[26px] border border-[#1C1A1B] rounded-[5px]
          `}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Navigation Button - Next (Right-ish) */}
        <button
          type="button"
          onClick={() => handleScrollProducts("next")}
          className={`
            absolute top-1/2 -translate-y-1/2 z-20
            ${isRtl ? "left-0 xl:-left-9 rotate-180" : "right-0 xl:-right-9"}
            bg-[#1C1A1B] text-white flex items-center justify-center
            hover:bg-black/90 w-[26px] h-[26px] border border-[#1C1A1B] rounded-[5px]
          `}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Product Carousel Container */}
        <div
          ref={productsRef}
          className="flex gap-4 overflow-x-auto scroll-smooth hide-scrollbar px-1 py-4 no-scrollbar"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="w-[280px] md:w-[calc(33.333%-12px)] lg:w-[calc(25%-12px)] flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
