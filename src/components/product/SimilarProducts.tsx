"use client";

import { useLocale, useTranslations } from "next-intl";
import { Card } from "@/src/components/ui/card";
import {
  ShoppingCart,
  Star,
  Bookmark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { Product } from "@/src/types/catalog";

export default function SimilarProducts() {
  const t = useTranslations("productPage");
  const tc = useTranslations("home.categorySection");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const products: (Product & { tag?: string })[] = [
    {
      id: 1,
      category: "mouses",
      name: "Apple Mouse",
      titleKey: "home.categorySection.products.appleKeyboard", // Placeholder or matching
      status: "available",
      rating: 4.8,
      price: 200,
      image: "/images/mouse.png",
      bgColor: "from-purple-500/10 to-purple-900/10",
      tag: tc("status.available"),
    },
    {
      id: 2,
      category: "headphones",
      name: "Gaming Headset",
      titleKey: "home.categorySection.products.gamingHeadphones",
      status: "available",
      rating: 4.7,
      price: 205,
      image: "/images/headphones.png",
      bgColor: "from-blue-500/10 to-blue-900/10",
      tag: tc("status.available"),
    },
    {
      id: 3,
      category: "controllers",
      name: "PS5 Controller",
      titleKey: "home.categorySection.products.playStationController",
      status: "soldOut",
      rating: 4.5,
      price: 230,
      image: "/images/playStation.png",
      bgColor: "from-orange-500/10 to-orange-900/10",
      tag: "مثالي", // Example tag from image
    },
    {
      id: 4,
      category: "electronics",
      name: "Camera Control",
      titleKey: "home.categorySection.products.professionalCamera",
      status: "available",
      rating: 4.9,
      price: 935,
      image: "/images/keyboardIOS.png",
      bgColor: "from-stone-500/10 to-stone-900/10",
      tag: "مثالي",
    },
    {
      id: 5,
      category: "earphones",
      name: "Earbuds Pro",
      titleKey: "home.categorySection.products.wirelessEarphones",
      status: "soldOut",
      rating: 4.1,
      price: 180,
      image: "/images/earphonebg.png",
      bgColor: "from-rose-500/10 to-rose-900/10",
      tag: tc("status.soldOut"),
    },
  ];

  return (
    <section className="container mx-auto px-4 lg:px-20 py-16 bg-black">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl lg:text-3xl font-black text-white">
          {t("similarProducts")}
        </h2>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors">
            {isRtl ? <ChevronRight /> : <ChevronLeft />}
          </button>
          <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors">
            {isRtl ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="group relative flex flex-col transition-all duration-300 hover:-translate-y-2 border-none rounded-[20px] overflow-hidden bg-white h-full"
          >
            {/* Top Image Section */}
            <div
              className={`relative h-[220px] bg-gradient-to-br ${product.bgColor} p-6 flex items-center justify-center`}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Status Badge */}
              {product.tag && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00FF85]" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                    {product.tag}
                  </span>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col gap-3">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-bold text-black mb-0.5 line-clamp-1 ${isRtl ? "text-lg" : "text-base"}`}
                  >
                    {product.titleKey
                      ? tc(`products.${product.titleKey.split(".").pop()}`)
                      : product.name}
                  </h3>
                  <p className="text-xs text-[#9D9D9D] font-bold">#24562</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-[4px] bg-[#F4F4F4]">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-[10px] font-bold text-black">
                      {product.rating}
                    </span>
                  </div>
                  <button className="bg-[#9DC0C8]/20 p-1.5 rounded-[4px] text-[#308DA2] hover:bg-[#308DA2] hover:text-white transition-colors">
                    <Bookmark className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-xl font-black text-black">
                    {product.price}$
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <button className="bg-white border border-black/10 p-2 rounded-[8px] hover:bg-black hover:text-white transition-colors group/btn">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                  <button className="bg-black text-white px-4 py-2 rounded-[8px] text-[10px] font-bold hover:bg-zinc-800 transition-colors uppercase tracking-widest leading-none flex items-center h-[34px]">
                    {tc("buyNow")}
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
