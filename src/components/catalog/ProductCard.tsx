"use client";

import Image from "next/image";
import { Heart, Shuffle, Star } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import IconButton from "@/src/components/shared/IconButton";
import { cn } from "@/src/lib/utils";
import { Product, ProductBadgeTone } from "@/src/types/catalog";

const badgeStyles: Record<ProductBadgeTone, string> = {
  new: "bg-white text-black",
  hot: "bg-[#EC2D3C] text-white",
  sale: "bg-[#10b981] text-black",
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#0F0E10] text-white">
      <div
        className={cn(
          "relative flex h-44 items-center justify-center p-4",
          product.variant.gradient,
          product.variant.glow,
        )}
      >
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          <IconButton size="sm" aria-label="favorite">
            <Heart className="h-4 w-4" />
          </IconButton>
          <IconButton size="sm" aria-label="compare">
            <Shuffle className="h-4 w-4" />
          </IconButton>
        </div>

        {product.badge && (
          <Badge
            className={cn(
              "absolute right-3 top-3 border-0 text-[11px] font-semibold",
              badgeStyles[product.badge.tone],
            )}
          >
            {product.badge.label}
          </Badge>
        )}

        <div className="relative h-28 w-28 drop-shadow-2xl">
          <Image
            src={product.variant.image}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="space-y-3 px-4 pb-4 pt-3">
        <div className="flex items-center gap-2 text-xs text-white/70">
          <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[11px]">
            <Star className="h-3 w-3 text-[#F5C542]" />
            {product.rating.toFixed(1)}
          </span>
          <span className="text-[11px] text-white/40">
            ({product.reviews})
          </span>
        </div>

        <h3 className="text-sm font-semibold text-white">{product.name}</h3>

        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">{product.priceLabel}</span>
          <span className="rounded-full bg-[#10b981]/15 px-2 py-0.5 text-[11px] font-semibold text-[#10b981]">
            {product.availabilityLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
