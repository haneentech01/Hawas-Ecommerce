"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import { useLocale } from "next-intl";

export default function ContactSection() {
  const t = useTranslations("home.contact");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <section className="container mx-auto px-4 xl:px-[122px]">
      <div
        className="relative flex flex-col xl:flex-row items-center justify-center 
                      xl:justify-start min-h-[400px] 
                      overflow-visible
                      my-20 w-full"
      >
        <Image
          src="/images/Features_section_bg.png"
          alt="Contact Background"
          fill
          className="object-contain"
        />

        {/* Rocket Image - Popping out */}
        <div
          className={`relative lg:absolute lg:top-1/2 lg:-translate-y-1/2 xl:-translate-y-1/2 w-[280px] 
        h-[280px] md:w-[450px] md:h-[450px] xl:w-[590px] xl:h-[600px] 
        z-20 flex justify-center xl:block
        ${isRtl ? "lg:left-10 xl:left-[-80px]" : "lg:right-10 xl:right-[-50px]"}`}
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/rocketHawas.png"
              alt="Rocket"
              fill
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Text Content */}
        <div
          className={`w-full relative z-10 flex flex-col items-center 
                    lg:items-start text-center lg:text-start mb-5 xl:mb-0
                    ${isRtl ? "ps-0 lg:ps-10 xl:ps-[140px]" : "pe-0 lg:pe-10 xl:pe-[140px]"}`}
        >
          <h2 className="text-3xl md:text-5xl xl:text-6xl font-bold text-white">
            {t("connectWithHaws")}
          </h2>

          <h3 className="text-lg md:text-2xl xl:text-xl font-bold text-white">
            {t("subtitle")}
            {/* Fallback if key missing during dev: "سرعة في الاستجابة" */}
          </h3>

          <p
            className={`text-[#A6A6A6] leading-relaxed text-sm md:text-base xl:text-sm max-w-[424px] 
            ${isRtl ? "xl:ml-auto" : "xl:mr-auto"}`}
          >
            {t("description")}
          </p>

          <Button
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white 
            hover:text-black w-full md:w-auto px-0 md:px-12 lg:px-10 xl:px-[117px] xl:py-[22px] text-xl rounded-[14px] transition-all duration-300"
          >
            {t("contactButton")}
          </Button>
        </div>
      </div>
    </section>
  );
}
