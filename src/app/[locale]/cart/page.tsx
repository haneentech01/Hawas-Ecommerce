"use client";

import { useTranslations, useLocale } from "next-intl";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import SearchBar from "@/src/components/layout/SearchBar";
import { useState } from "react";
import { cn } from "@/src/lib/utils";
import ProductCard from "@/src/components/shared/ProductCard";
import { useCart } from "@/src/hooks/useCart";

// Mock products data based on design
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "ماوس أبل أصلي",
    category: "ماوس",
    price: 200,
    currency: "$",
    rating: 4.5,
    image: "/images/mouse.png",
    bgColor: "#E5D1FA",
    status: "available" as const,
    code: "33123",
  },
  {
    id: 2,
    name: "سماعات جيمنج",
    category: "سماعات",
    price: 200,
    currency: "$",
    rating: 4.5,
    image: "/images/headphones.png",
    bgColor: "#D1FAD1",
    status: "available" as const,
    code: "33124",
  },
  {
    id: 3,
    name: "ايدي بلايستيشن أصلية",
    category: "تحكم",
    price: 200,
    currency: "$",
    rating: 4.5,
    image: "/images/playstation.png",
    bgColor: "#FAD1D1",
    status: "available" as const,
    code: "33125",
  },
  {
    id: 4,
    name: "كاميرا احترافية",
    category: "كاميرات",
    price: 200,
    currency: "$",
    rating: 4.5,
    image: "/images/camera.png",
    bgColor: "#FFF4D1",
    status: "available" as const,
    code: "33126",
  },
  {
    id: 5,
    name: "سماعات لاسلكية",
    category: "سماعات",
    price: 200,
    currency: "$",
    rating: 4.5,
    image: "/images/earbuds.png",
    bgColor: "#D1F3FA",
    status: "available" as const,
    code: "33127",
  },
];

// Repeat to fill the grid as in the image (10 cards)
const CART_PRODUCTS = [...MOCK_PRODUCTS, ...MOCK_PRODUCTS];

export default function CartPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === "ar";
  const { totalPrice } = useCart();
  const [activeTab, setActiveTab] = useState<"cart" | "orders">("cart");

  return (
    <div
      className="min-h-screen bg-black text-white flex flex-col font-sans overflow-x-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 lg:py-12 max-w-[1440px]">
        {/* Search Section */}
        <div className="max-w-[1244px] mx-auto mb-12">
          <SearchBar showFilter={true} />
        </div>

        {/* Tabs Section */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-[#1C1A1B] p-2 rounded-[15px] gap-2">
            <button
              onClick={() => setActiveTab("cart")}
              className={cn(
                "px-8 py-3 rounded-[12px] font-bold text-xl lg:text-[22px] transition-all",
                activeTab === "cart"
                  ? "bg-white text-black shadow-lg"
                  : "bg-transparent text-white/70 hover:text-white",
              )}
            >
              {t("navigation.cart")}
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={cn(
                "px-8 py-3 rounded-[12px] font-bold text-xl lg:text-[22px] transition-all",
                activeTab === "orders"
                  ? "bg-white text-black shadow-lg"
                  : "bg-transparent text-white/70 hover:text-white",
              )}
            >
              {t("navigation.track_orders")}
            </button>
          </div>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-10 mb-32">
          {CART_PRODUCTS.map((product, index) => (
            <ProductCard key={`${product.id}-${index}`} product={product} />
          ))}
        </div>

        {/* Floating Summary Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-8 pointer-events-none">
          <div className="container mx-auto max-w-[1440px] pointer-events-auto">
            <div className="bg-black/95 backdrop-blur-md border border-white/5 rounded-[25px] overflow-hidden shadow-2xl">
              <div className="flex flex-col lg:flex-row items-center justify-between px-10 py-8 gap-8">
                {/* Breakdown */}
                <div className="flex flex-wrap lg:flex-nowrap items-center gap-x-12 gap-y-4 text-center lg:text-start">
                  <div className="flex flex-col gap-1">
                    <span className="text-[#9D9D9D] text-lg font-bold">
                      {t("cart.items_price")}
                    </span>
                    <span className="text-white text-2xl font-black">
                      18.00 $
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#9D9D9D] text-lg font-bold">
                      {t("cart.delivery_price")}
                    </span>
                    <span className="text-white text-2xl font-black">10 $</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#9D9D9D] text-lg font-bold">
                      {t("cart.discount")}
                    </span>
                    <span className="text-white text-2xl font-black">2 $</span>
                  </div>
                </div>

                {/* Total and Button */}
                <div className="flex items-center gap-12">
                  <div className="flex flex-col gap-1 text-center lg:text-start">
                    <span className="text-[#9D9D9D] text-lg font-bold">
                      {t("cart.total")}
                    </span>
                    <span className="text-[#00FF85] text-4xl font-black">
                      195 $
                    </span>
                  </div>
                  <button className="bg-white text-black px-12 py-5 rounded-full text-2xl font-black hover:bg-white/90 transition-all transform hover:scale-105 active:scale-95 shadow-xl">
                    {t("cart.pay_now")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
