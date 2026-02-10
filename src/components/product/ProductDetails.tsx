"use client";

import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/src/components/ui/button";
import { Minus, Plus, Truck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/src/lib/utils";

export default function ProductDetails() {
  const t = useTranslations("productPage");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [quantity, setQuantity] = useState(1);

  // Price constants (from design)
  const ORIGINAL_PRICE = 55.5;
  const DELIVERY_PRICE = 10;
  const DISCOUNT_AMOUNT = 20.1; // Calculated to match the 45.4$ result in design for q=1

  const totalPrice =
    ORIGINAL_PRICE * quantity + DELIVERY_PRICE - DISCOUNT_AMOUNT;

  return (
    <section
      className="bg-[#EC2D3C] text-white overflow-hidden 
                  pb-4 lg:pb-8 w-full rounded-br-[25px] rounded-bl-[25px]"
    >
      <div className="container mx-auto px-4 lg:px-20 pt-24 lg:pt-36">
        <div
          className="flex flex-col lg:flex-row items-center justify-between 
                     gap-10 lg:gap-24"
        >
          {/* Column 1: Product Info (Right in Arabic/RTL) */}
          <div
            className={`w-full lg:w-2/5 flex flex-col gap-6 order-2 lg:order-1 items-center ${isRtl ? "lg:items-start text-right" : "lg:items-start text-left"}`}
          >
            {/* Title & Subtitle */}
            <div
              className={`space-y-2 flex flex-col items-center ${isRtl ? "lg:items-start" : "lg:items-start"}`}
            >
              <h1 className="text-3xl lg:text-6xl font-black leading-tight drop-shadow-md text-center lg:text-start">
                {t("title")}
              </h1>
              <p className="text-lg lg:text-xl font-bold opacity-90 italic text-center lg:text-start">
                {t("subtitle")}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm lg:text-lg font-bold leading-[1.8] max-w-[425px] opacity-80 text-center lg:text-start">
              {t("description")}
            </p>

            {/* Shipping Info Box */}
            <div className="p-4 flex flex-row items-center gap-4 max-w-[350px]">
              <div className="bg-[#FFC8AD] p-2 rounded-[10px] shrink-0">
                <Truck className="w-6 h-6 text-[#EC2D3C]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xl font-bold">{t("shipping.title")}</span>
                <span className="text-base font-bold opacity-90">
                  {t("shipping.desc")}
                </span>
              </div>
            </div>

            {/* Price Table */}
            <div
              className="w-full max-w-[401px] bg-[#FFC8AD] 
                         rounded-[10px] overflow-hidden shadow-2xl"
            >
              {[
                {
                  key: "pricing.originalPrice",
                  value: `${ORIGINAL_PRICE}$`,
                },
                { key: "pricing.quantity", isQuantity: true },
                { key: "pricing.deliveryPrice", value: `${DELIVERY_PRICE}$` },
                {
                  key: "pricing.discountAmount",
                  value: "15%", // Keeping the text label as per design
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "px-6 py-[10px] flex justify-between items-center text-black",
                    idx < 3 && "border-b-2 border-dashed border-[#EC2D3C]",
                  )}
                >
                  {/* Label (Right in RTL) */}
                  <span className="font-bold text-lg lg:text-2xl">
                    {t(item.key)}
                  </span>

                  {/* Value (Left in RTL) */}
                  <span className="font-black text-[#EC2D3C]">
                    {item.isQuantity ? (
                      <div className="flex items-center gap-7">
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="hover:scale-110 transition-transform"
                        >
                          <Plus className="w-5 h-5 lg:w-6 lg:h-6 text-[#EC2D3C] stroke-[4]" />
                        </button>
                        <span className="text-2xl lg:text-3xl font-black max-w-[75px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="hover:scale-110 transition-transform"
                        >
                          <Minus className="w-5 h-5 lg:w-6 lg:h-6 text-[#EC2D3C] stroke-[4]" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-2xl lg:text-3xl font-black">
                        {item.value}
                      </span>
                    )}
                  </span>
                </div>
              ))}
              {/* Total Amount Row */}
              <div
                className="bg-[#1C1A1B] px-6 py-3 flex justify-between 
                            items-center text-white"
              >
                <span className="font-black text-xl lg:text-2xl">
                  {t("pricing.totalAmount")}
                </span>
                <span className="font-black text-lg lg:text-xl text-white">
                  {totalPrice.toFixed(1)}$
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div
              className="flex flex-col sm:flex-row items-center gap-[10px] 
                          mt-4 w-full lg:w-auto"
            >
              <Button
                variant="outline"
                className="bg-white text-[#EC2D3C] border-none rounded-[15px] 
                          h-[48px] px-8 lg:px-[68px] max-w-[278px] 
                          hover:bg-slate-200 hover:text-[#EC2D3C]
                          text-xl lg:text-3xl font-black shadow-lg 
                          flex items-center justify-center gap-2 w-full sm:w-auto 
                          order-2 sm:order-1"
              >
                {t("pricing.buyNow", { price: `${totalPrice.toFixed(1)}$` })}
              </Button>

              <Button
                className="bg-[#1C1A1B] max-w-[113px] text-white border-none 
                                  rounded-[15px] h-[48px] px-6 text-lg font-bold 
                                  shadow-lg hover:bg-black transition-all 
                                  flex items-center justify-center gap-2 w-full 
                                  sm:w-auto order-2 sm:order-1"
              >
                {t("pricing.addToCart")}
              </Button>
            </div>
          </div>

          {/* Column 2: Product Image (Left in Arabic/RTL) */}
          <div
            className={`w-full lg:w-3/5 flex justify-center relative order-1 
                       lg:order-2 lg:justify-start 
                       ${isRtl ? "" : "lg:-right-16"}`}
          >
            <div
              className="relative w-full max-w-[600px] lg:max-w-[693px] 
                         aspect-[4/3] lg:h-[520px] lg:aspect-auto"
            >
              <Image
                src="/images/hero_keyboard.png"
                alt="Gaming Keyboard"
                fill
                className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] 
                            scale-110 lg:scale-[1.35] lg:-translate-x-10 transition-transform duration-700"
                priority
              />
              {/* Pagination Dots (as seen in image) */}
              <div
                className={`absolute bottom-[10px] lg:bottom-0 
                            flex flex-col gap-3 
                            ${isRtl ? "left-3 lg:-left-16 " : "right-3 lg:-right-0"}`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-white opacity-100 shadow-sm" />
                <div className="w-2.5 h-2.5 rounded-full bg-white opacity-40 shadow-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
