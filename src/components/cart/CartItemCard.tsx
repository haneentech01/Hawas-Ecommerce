"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Star, Bookmark, Minus, Plus } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface CartItemCardProps {
  item: {
    id: number;
    name: string;
    code: string;
    price: number;
    currency: string;
    rating: number;
    image: string;
    bgColor: string;
    quantity: number;
  };
  onUpdateQuantity: (id: number, delta: number) => void;
}

export default function CartItemCard({
  item,
  onUpdateQuantity,
}: CartItemCardProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <div className="bg-white rounded-[20px] overflow-hidden flex flex-col h-full shadow-md">
      {/* Top Section: Status & Image */}
      <div
        className="relative h-[220px] m-2 rounded-[15px] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: item.bgColor }}
      >
        {/* Status Badge */}
        <div
          className={cn("absolute top-4 z-10", isRtl ? "right-0" : "left-0")}
        >
          <span className="bg-black/80 text-white text-xs font-bold px-4 py-1 rounded-r-full">
            {t("cart.available")}
          </span>
        </div>

        {/* Product Image */}
        <div className="relative w-4/5 h-4/5">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain transition-transform duration-300 hover:scale-110"
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="px-5 py-4 flex flex-col gap-3">
        {/* Rating & Bookmark */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-[#F4F4F4] px-2 py-1 rounded-[6px]">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-black text-black">
              {item.rating.toFixed(1)}
            </span>
          </div>
          <button className="bg-[#9DC0C8] p-1.5 rounded-[6px] text-[#308DA2] hover:bg-[#308DA2] hover:text-white transition-colors">
            <Bookmark className="w-4 h-4" />
          </button>
        </div>

        {/* Title & Code */}
        <div className="text-start">
          <h3 className="text-black font-black text-xl lg:text-[22px] truncate leading-tight">
            {item.name}
          </h3>
          <p className="text-[#9D9D9D] font-bold text-base">#{item.code}</p>
        </div>

        {/* Controls & Price */}
        <div className="flex items-center justify-between pt-2">
          {/* Quantity Selector */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onUpdateQuantity(item.id, -1)}
              className="w-8 h-8 flex items-center justify-center bg-[#F4F4F4] rounded-[6px] text-[#EC2D3C] hover:bg-red-50 transition-colors"
            >
              <Minus className="w-5 h-5 stroke-[3px]" />
            </button>
            <span className="text-black text-xl font-black w-6 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, 1)}
              className="w-8 h-8 flex items-center justify-center bg-[#F4F4F4] rounded-[6px] text-[#EC2D3C] hover:bg-red-50 transition-colors"
            >
              <Plus className="w-5 h-5 stroke-[3px]" />
            </button>
          </div>

          {/* Price */}
          <div className="text-end">
            <span className="text-black text-2xl font-black">
              {item.price}
              {item.currency}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
