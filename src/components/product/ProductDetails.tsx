"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/src/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";

export default function ProductDetails() {
  const t = useTranslations("home.hero");

  return (
    <section className="bg-[#EC2D3C] text-white overflow-hidden py-12 lg:py-0 w-full rounded-2xl">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 min-h-[600px]">
          {/* Text Content (Right in RTL, Left in LTR - by default flex order) */}
          <div className="flex-1 w-full lg:max-w-xl space-y-8 z-10">
            <div>
              <div className="flex items-center gap-4 mb-4 text-sm font-medium opacity-90">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  4.9
                </span>
                <span>|</span>
                <span>{t("availableNow")}</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4">
                {t("title")}
              </h1>
              <p className="text-lg lg:text-xl opacity-90 leading-relaxed">
                {t("description")}
              </p>
            </div>

            {/* Specs Table */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="grid grid-cols-2 gap-4 text-sm lg:text-base">
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="opacity-80">{t("specs.connection")}</span>
                    <span className="font-semibold">
                      {t("specValues.wired")}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="opacity-80">{t("specs.language")}</span>
                    <span className="font-semibold">
                      {t("specValues.arEn")}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="opacity-80">{t("specs.switch")}</span>
                    <span className="font-semibold text-white bg-red-900/40 px-2 rounded-md">
                      {t("specValues.red")}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="opacity-80">
                      {t("specs.antiGhosting")}
                    </span>
                    <span className="font-semibold">{t("specValues.yes")}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs lg:text-sm">
                <p className="opacity-90">{t("paymentDesc")}</p>
                <div className="flex gap-2">
                  {/* Payment Icons */}
                  <div className="w-8 h-5 bg-white rounded-sm opacity-80" />
                  <div className="w-8 h-5 bg-white rounded-sm opacity-80" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-black hover:bg-zinc-900 text-white border-none rounded-xl h-14 px-8 text-lg"
              >
                <ShoppingCart className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                {t("addToCart")}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-[#EC2D3C] hover:bg-gray-50 border-none rounded-xl h-14 px-8 text-lg"
              >
                {t("knowMore")}
              </Button>
            </div>
          </div>

          {/* Image Content (Left in RTL, Right in LTR) */}
          <div className="flex-1 w-full flex justify-center lg:justify-end relative">
            {/* Gradient/Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 blur-3xl rounded-full" />

            <div className="relative z-10 w-full max-w-[600px] aspect-[16/9] lg:aspect-square flex items-center justify-center">
              {/* Fallback image if specific one not found, assuming keyboard.png or similar. Using a placeholder div if not. */}
              <div className="relative w-full h-full min-h-[300px] lg:min-h-[400px]">
                <Image
                  src="/images/keyboard.png"
                  alt="Gaming Keyboard"
                  fill
                  className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
