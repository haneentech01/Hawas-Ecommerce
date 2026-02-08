"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { ShoppingCart, Star, Bookmark } from "lucide-react";
import { Product, ProductStatus } from "@/src/types/catalog";
import { cn } from "@/src/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === "ar";

  const status: ProductStatus = product.status ?? "available";
  const colors =
    product.colors && product.colors.length > 0
      ? product.colors
      : ["#00FF85", "#FFCC00", "#FF4E50"];
  const code = product.code ?? "#00000";

  return (
    <div
      className={cn(
        "group relative bg-white rounded-[12px] overflow-hidden flex-none h-auto pt-2",
        className,
      )}
    >
      {/* Status Badge (Available/Sold Out) */}
      <div className="absolute top-5 right-0 z-20">
        <span
          className={cn(
            "px-5 py-1 text-xs lg:text-sm rounded-tl-lg rounded-bl-lg font-bold",
            status === "available"
              ? "bg-black/80 text-white"
              : "bg-white text-[#EC2D3C]",
          )}
        >
          {status === "available"
            ? t("home.categorySection.status.available")
            : t("home.categorySection.status.soldOut")}
        </span>
      </div>

      {/* Product Image and Color Indicators */}
      <div className="relative mx-[6px] h-[190px] md:h-[200px] lg:h-[260px] rounded-[15px] overflow-hidden">
        {/* Colors (Product Dots) */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {colors.slice(0, 3).map((c, idx) => (
            <span
              key={idx}
              className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        {/* Product Image */}
        <div
          className="absolute inset-0 z-0 flex items-center justify-center 
                      rounded-[15px] transition-transform duration-500 group-hover:scale-110"
        >
          <div className="relative w-full h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-fill"
            />
          </div>
        </div>
      </div>

      {/* Info Section (White) */}
      <div className="px-4 pt-2 pb-[14px] flex flex-col gap-2 text-center lg:text-start">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-2">
          {/* Product Name + Code */}
          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                "font-bold text-black mb-1 line-clamp-1 border-none",
                isRtl ? "text-xl" : "text-lg xl:text-xl",
              )}
            >
              {product.titleKey ? t(product.titleKey) : product.name}
            </h3>
            <p className="text-base text-[#9D9D9D] font-bold">{code}</p>
          </div>

          {/* Product Rating + Bookmark */}
          <div className="flex items-center gap-1 shrink-0">
            <div className="flex items-center gap-1 px-2 py-1 rounded-[5px] bg-[#F4F4F4]">
              <Star className="w-[14px] h-[14px] text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-bold text-black">
                {product.rating.toFixed(1)}
              </span>
            </div>

            <button className="bg-[#9DC0C8] p-1 rounded-[5px] text-[#308DA2] hover:bg-[#308DA2] hover:text-white transition-colors">
              <Bookmark className="w-[14px] h-[14px]" />
            </button>
          </div>
        </div>

        {/* Price + Action Buttons */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-[10px]">
          {/* Price Container */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-1">
            <span className="text-lg font-bold text-black leading-tight">
              {product.price}
              {product.currency}
            </span>
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="text-xs text-gray-400 line-through font-bold">
                {product.oldPrice}
                {product.currency}
              </span>
            )}
          </div>

          {/* Card Actions */}
          <div className="flex items-center gap-1.5">
            <button className="bg-[#BDE1C1] p-2 rounded-[5px] text-[#58935F] hover:bg-[#58935F] hover:text-white transition-colors">
              <ShoppingCart className="w-4 h-4" />
            </button>
            <button className="bg-black text-white px-3 py-2 rounded-[5px] font-bold text-xs lg:text-sm hover:opacity-90 transition-opacity">
              {t("home.categorySection.buyNow")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
