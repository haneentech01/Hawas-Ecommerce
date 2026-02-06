"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "@/src/i18n/routing";

export default function CategoryGrid() {
  const t = useTranslations("home.promotions");

  return (
    <section className="container mx-auto px-4 mt-6 mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 min-h-[400px]">
        {/* Vertical Card 1: Digital Watches */}
        <Card className="col-span-1 bg-[#2dd4bf] border-none text-white relative overflow-hidden group flex flex-col items-center py-8 min-h-[300px]">
          <h3 className="text-2xl font-bold mb-2 text-center">
            {t("digitalWatches")}
          </h3>
          <p className="text-sm opacity-90 mb-4">{t("digitalWatches")}</p>

          <div className="flex-1 flex items-center justify-center w-full">
            {/* Watch Placeholder */}
            <div className="w-32 h-32 bg-black/20 rounded-xl flex items-center justify-center">
              <span className="text-xs">Watch</span>
            </div>
          </div>

          <Link href="/product">
            <Button
              variant="white"
              size="sm"
              className="rounded-full px-6 gap-2 mt-4"
            >
              {t("orderNow")} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Button>
          </Link>
        </Card>

        {/* Vertical Card 2: Cameras */}
        <Card className="col-span-1 bg-[#fb923c] border-none text-white relative overflow-hidden group flex flex-col items-center py-8 min-h-[300px]">
          <h3 className="text-2xl font-bold mb-2 text-center">
            {t("cameras")}
          </h3>
          <p className="text-sm opacity-90 mb-4">{t("cameras")}</p>

          <div className="flex-1 flex items-center justify-center w-full">
            {/* Camera Placeholder */}
            <div className="w-32 h-32 bg-black/20 rounded-xl flex items-center justify-center">
              <span className="text-xs">Camera</span>
            </div>
          </div>

          <Link href="/product">
            <Button
              variant="white"
              size="sm"
              className="rounded-full px-6 gap-2 mt-4"
            >
              {t("orderNow")} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Button>
          </Link>
        </Card>

        {/* Wide Card: Wireless Headphones */}
        <Card className="col-span-1 sm:col-span-2 md:col-span-2 bg-[#ef4444] border-none text-white relative overflow-hidden flex flex-col md:flex-row items-center px-6 md:px-8 py-8 md:py-0 min-h-[300px]">
          <div className="w-full md:w-1/2 z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              {t("wirelessHeadphones")}
            </h2>
            <p className="text-base md:text-lg opacity-90 mb-6">
              نقاط صوت فائق
            </p>
            <Link href="/product">
              <Button
                variant="white"
                size="lg"
                className="rounded-full px-8 gap-2"
              >
                {t("orderNow")}{" "}
                <ArrowRight className="w-5 h-5 rtl:rotate-180" />
              </Button>
            </Link>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center relative z-10 mt-6 md:mt-0">
            {/* Headphones Placeholder */}
            <div className="w-40 h-40 md:w-48 md:h-48 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
              <span className="text-white">Headphones</span>
            </div>
          </div>

          <div className="absolute right-0 top-0 w-32 h-full bg-linear-to-l from-white/10 to-transparent skew-x-12 transform translate-x-10 hidden md:block"></div>
        </Card>
      </div>
    </section>
  );
}
