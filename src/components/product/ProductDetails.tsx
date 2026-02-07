"use client";

import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/src/components/ui/button";
import { ShoppingBag, Minus, Plus, Rocket } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProductDetails() {
  const t = useTranslations("productPage");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="bg-[#EC2D3C] text-white overflow-hidden pb-12 lg:pb-20 w-full rounded-[40px] lg:rounded-[60px]">
      <div className="container mx-auto px-4 lg:px-20 pt-10 lg:pt-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-24">
          {/* Column 1: Product Info (Right in Arabic/RTL) */}
          <div
            className={`w-full lg:w-1/2 flex flex-col gap-6 order-2 lg:order-1 items-center ${isRtl ? "lg:items-start text-right" : "lg:items-start text-left"}`}
          >
            {/* Title & Subtitle */}
            <div
              className={`space-y-2 flex flex-col items-center ${isRtl ? "lg:items-start" : "lg:items-start"}`}
            >
              <h1 className="text-3xl lg:text-[45px] font-black leading-tight drop-shadow-md text-center lg:text-start">
                {t("title")}
              </h1>
              <p className="text-xl lg:text-2xl font-bold opacity-90 italic text-center lg:text-start">
                {t("subtitle")}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm lg:text-base font-medium leading-[1.8] max-w-[550px] opacity-80 text-center lg:text-start">
              {t("description")}
            </p>

            {/* Shipping Info Box */}
            <div className="bg-[#FF6B6B]/30 backdrop-blur-md rounded-[20px] p-4 flex flex-row items-center gap-4 max-w-[350px]">
              <div className="bg-white/20 p-2 rounded-full shrink-0">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-black">
                  {t("shipping.title")}
                </span>
                <span className="text-xs font-medium opacity-90">
                  {t("shipping.desc")}
                </span>
              </div>
            </div>

            {/* Price Table */}
            <div className="w-full max-w-[350px] space-y-1.5">
              {[
                {
                  label: t("pricing.originalPrice"),
                  value: "222$",
                  isOld: true,
                },
                { label: t("pricing.quantity"), isQuantity: true },
                { label: t("pricing.deliveryPrice"), value: "15$" },
                {
                  label: t("pricing.discountAmount"),
                  value: "12%",
                  isHighlight: true,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFC9BB] rounded-[10px] px-4 py-2 flex justify-between items-center text-black"
                >
                  <span className="font-bold text-sm lg:text-base">
                    {item.label}
                  </span>
                  {item.isQuantity ? (
                    <div className="flex items-center gap-4 bg-white/20 rounded-full px-2 py-0.5">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="hover:scale-110 transition-transform"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-black text-lg">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="hover:scale-110 transition-transform"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`font-black text-lg ${item.isOld ? "line-through opacity-50" : ""} ${item.isHighlight ? "text-red-600" : ""}`}
                    >
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
              {/* Total Amount Row */}
              <div className="bg-[#1C1A1B] rounded-[10px] px-4 py-3 flex justify-between items-center text-white">
                <span className="font-black text-lg">
                  {t("pricing.totalAmount")}
                </span>
                <span className="font-black text-xl">95.5$</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full lg:w-auto">
              <Button
                variant="outline"
                className="bg-white text-[#EC2D3C] border-none rounded-[15px] h-[60px] px-8 text-xl font-black shadow-lg hover:bg-gray-50 flex items-center justify-center gap-2 w-full sm:w-auto order-1 sm:order-2"
              >
                {t("pricing.buyNow", { price: "95.5$" })}
              </Button>
              <Button className="bg-[#1C1A1B] text-white border-none rounded-[15px] h-[60px] px-6 text-lg font-bold shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2 w-full sm:w-auto order-2 sm:order-1">
                {t("pricing.addToCart")}
                <ShoppingBag className="w-5 h-5 ltr:ml-1 rtl:mr-1" />
              </Button>
            </div>
          </div>

          {/* Column 2: Product Image (Left in Arabic/RTL) */}
          <div className="w-full lg:w-1/2 flex justify-center relative order-1 lg:order-2 lg:justify-start">
            <div className="relative w-full max-w-[400px] lg:max-w-[750px] aspect-[4/3] lg:aspect-[1.5/1]">
              <Image
                src="/images/keyboard.png"
                alt="Gaming Keyboard"
                fill
                className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] scale-110 lg:scale-125 transition-transform duration-700"
                priority
              />
              {/* Pagination Dots (as seen in image) */}
              <div className="absolute bottom-[-10px] lg:bottom-[-20px] left-0 lg:left-0 flex lg:flex-col gap-2">
                <div className="w-2 h-2 rounded-full bg-white opacity-100" />
                <div className="w-2 h-2 rounded-full bg-white opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
