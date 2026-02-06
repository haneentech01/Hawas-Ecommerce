"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function PromoBanner() {
  const t = useTranslations("home.promotions");

  return (
    <section className="container mx-auto px-4 mt-6">
      <Card className="bg-[#f97316] border-none text-white min-h-[240px] overflow-hidden relative flex items-center justify-center">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center px-4 py-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("playstationController")}
          </h2>
          <p className="text-base md:text-lg opacity-90 mb-6 max-w-lg">
            {/* Additional text matches design roughly */}
            أحصل الآن على أفضل تحكم في عالم الألعاب
          </p>
          <Button variant="white" size="lg" className="rounded-full px-8 gap-2">
            {t("shopNow")} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
          </Button>
        </div>

        {/* Controller Image Placeholder - Positioned Right/Left depending on RTL? Design shows right. */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="w-64 h-40 bg-black/20 rounded flex items-center justify-center">
            <span className="text-white/50">Controller</span>
          </div>
        </div>
        {/* Hanging decor placeholder */}
        <div className="absolute left-10 top-0 h-full hidden lg:block">
          <div className="h-full w-20 bg-white/10 rounded-b-lg"></div>
        </div>
      </Card>
    </section>
  );
}
