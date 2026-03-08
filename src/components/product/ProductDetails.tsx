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
    <section className="container mx-auto px-4 xl:px-[102px]">
      <div
        className="bg-[#EC2D3C] text-white overflow-hidden 
                    pb-4 lg:pb-8 w-full rounded-b-[25px]
                    h-auto"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="px-10 lg:ps-[90px] pt-10 md:pt-[60px] lg:pt-[120px]">
          <div
            className="flex flex-col lg:flex-row items-start justify-between 
                     gap-10 lg:gap-0"
          >
            {/* Column 1: Product Info (Right in Arabic/RTL) */}
            <div
              className={`w-full flex flex-col gap-2 order-2 
              lg:order-1 items-center lg:items-start 
              ${isRtl ? "text-right" : "text-left"}`}
            >
              {/* Title & Subtitle */}
              <div className={`flex flex-col items-center lg:items-start`}>
                <h1
                  className="text-xl lg:text-2xl xl:text-3xl font-black 
                  drop-shadow-md text-center lg:text-start whitespace-nowrap
                   w-full"
                >
                  {t.rich("title", {
                    text: t("highlight"),
                    white: (chunks) => (
                      <span className="text-white">{chunks}</span>
                    ),
                    rgp: (chunks) => (
                      <span className="relative inline-block text-[35px] lg:text-[45px] text-white mx-2 italic leading-none translate-y-1">
                        {chunks}
                      </span>
                    ),
                    highlight: (chunks) => (
                      <span className="text-black">{chunks}</span>
                    ),
                  })}
                </h1>
                <p
                  className="text-base lg:text-lg font-bold 
                text-center lg:text-start text-white mb-0.5"
                >
                  {t("subtitle")}
                </p>
              </div>

              {/* Description */}
              <p
                className="text-xs lg:text-base font-bold  
              max-w-[340px] text-center lg:text-start text-white leading-tight mb-0.5"
              >
                {t("description")}
              </p>

              {/* Shipping Info Box */}
              <div className="p-1 lg:p-2 flex flex-row items-center gap-4 max-w-[400px] mb-0.5">
                <div className="bg-[#FFC8AD] p-2 rounded-[12px] shrink-0 shadow-lg">
                  <Truck className="w-6 h-6 text-[#EC2D3C]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl lg:text-2xl font-black text-white leading-tight">
                    {t("shipping.title")}
                  </span>
                  <span className="text-sm lg:text-base font-bold text-white leading-tight">
                    {t("shipping.desc")}
                  </span>
                </div>
              </div>

              <div className="w-full max-w-[401px]  max-h-[287px]">
                {/* Price Table */}
                <div
                  className="bg-[#FFC8AD] 
                         rounded-[10px] overflow-hidden shadow-2xl mb-0.5"
                >
                  {[
                    {
                      key: "pricing.originalPrice",
                      value: `${ORIGINAL_PRICE}$`,
                    },
                    { key: "pricing.quantity", isQuantity: true },
                    {
                      key: "pricing.deliveryPrice",
                      value: `${DELIVERY_PRICE}$`,
                    },
                    {
                      key: "pricing.discountAmount",
                      value: "15%", // Keeping the text label as per design
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "px-6 py-[2px] lg:py-[3px] flex justify-between items-center text-black",
                        idx < 3 && "border-b-2 border-dashed border-[#EC2D3C]",
                      )}
                    >
                      {/* Label (Right in RTL) */}
                      <span className="font-bold text-lg lg:text-xl text-black">
                        {t(item.key)}
                      </span>

                      {/* Value (Left in RTL) */}
                      <span className="font-black">
                        {item.isQuantity ? (
                          <div className="flex items-center gap-7">
                            <button
                              onClick={() => setQuantity(quantity + 1)}
                              className="bg-transparent"
                            >
                              <Plus className="w-5 h-5 lg:w-6 lg:h-6 text-[#EC2D3C] stroke-[4]" />
                            </button>
                            <span className="text-2xl lg:text-3xl font-black max-w-[75px] text-center text-[#EC2D3C]">
                              {quantity}
                            </span>
                            <button
                              onClick={() =>
                                setQuantity(Math.max(1, quantity - 1))
                              }
                              className="bg-transparent"
                            >
                              <Minus className="w-5 h-5 lg:w-6 lg:h-6 text-[#EC2D3C] stroke-[4]" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-2xl lg:text-3xl font-black text-[#EC2D3C]">
                            {item.value}
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                  {/* Total Amount Row */}
                  <div
                    className="bg-[#1C1A1B] px-6 py-2 flex justify-between 
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
                  className="flex flex-row items-center gap-[10px] 
                          mt-1 w-full lg:w-auto"
                >
                  <Button
                    variant="outline"
                    className="bg-white text-[#EC2D3C] border-none rounded-[15px] 
                          h-[40px] lg:h-[44px] px-8 lg:px-[68px] flex-1 lg:flex-none
                          hover:bg-slate-200 hover:text-[#EC2D3C]
                          text-lg lg:text-xl font-black shadow-lg 
                          flex items-center justify-center gap-2"
                  >
                    {t("pricing.buyNow", {
                      price: `${totalPrice.toFixed(1)}$`,
                    })}
                  </Button>

                  <Button
                    className="bg-[#1C1A1B] min-w-[113px] text-white border-none 
                                  rounded-[15px] h-[40px] lg:h-[44px] px-6 text-base font-bold 
                                  shadow-lg hover:bg-black transition-all 
                                  flex items-center justify-center gap-2"
                  >
                    {t("pricing.addToCart")}
                  </Button>
                </div>
              </div>
            </div>

            {/* Column 2: Product Image (Left in Arabic/RTL) */}
            <div
              className={`w-full lg:w-3/5 flex justify-center relative order-1 
                       lg:order-2 lg:justify-start`}
            >
              <div
                className="relative w-full max-w-[700px] lg:w-[693px] 
                         aspect-[4/3] lg:h-[521px] lg:aspect-auto"
              >
                <Image
                  src="/images/hero_keyboard.png"
                  alt="Gaming Keyboard"
                  fill
                  className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] 
                           transition-transform 
                            duration-700"
                  priority
                />
                {/* Pagination Dots (as seen in image) */}
                <div
                  className={`absolute bottom-[10px] lg:bottom-10 
                            flex flex-col gap-3 
                            ${isRtl ? "left-3 lg:left-0 " : "right-3 lg:right-0"}`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-white opacity-100 shadow-sm" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white opacity-40 shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
