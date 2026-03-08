"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/src/i18n/routing";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/src/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/src/components/ui/carousel";

const slides = [
  {
    id: "headphones",
    image: "/images/hero_headphones.png",
    color: "bg-gradient-to-b from-[#5F2287] to-[#170821]",
    accentColor: "text-[#D3FD00]",
    btnTextColor: "text-[#5F2287]",
    href: "/product",
  },
  {
    id: "mouse",
    image: "/images/hero_mouse.png",
    color: "bg-gradient-to-b from-[#D68CED] to-[#7A5087]",
    accentColor: "text-white",
    btnTextColor: "text-[#D68CED]",
    href: "/product",
  },
  {
    id: "keyboard",
    image: "/images/hero_keyboard.png",
    color: "bg-[#EC2D3C]",
    accentColor: "text-white",
    btnTextColor: "text-[#EC2D3C]",
    href: "/product",
  },
];

interface AccordionHeroProps {
  mode?: "interactive" | "static";
}

export default function AccordionHero({
  mode = "interactive",
}: AccordionHeroProps) {
  const t = useTranslations("home.accordionHero");
  const isStatic = mode === "static";

  // --- [Modified]: Keyboard is now the default open slide ---
  const [activeId, setActiveId] = useState("keyboard");

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const locale = useLocale();
  const isRtl = locale === "ar";

  useEffect(() => {
    // --- [Modified]: Disable slider logic in static mode except for initial jump ---
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    queueMicrotask(() => {
      if (!api) return;
      // In static mode, jump to keyboard slide (index 2) immediately
      if (isStatic) {
        api.scrollTo(2, true);
      }
      setCurrent(api.selectedScrollSnap());
    });

    if (isStatic) return;

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, isStatic]);

  return (
    <section className="container mx-auto px-4 lg:px-10 xl:px-[122px] py-8">
      {/* ==================== عرض الموبايل (Shadcn Carousel) ==================== */}
      <div className="block xl:hidden">
        <Carousel
          setApi={setApi}
          className="w-full"
          // --- [Modified]: Disable interaction & loop in static mode ---
          opts={{
            loop: !isStatic,
            direction: isRtl ? "rtl" : "ltr",
            watchDrag: !isStatic,
          }}
        >
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="basis-full">
                <div
                  className={`
                    relative overflow-hidden rounded-[25px] shadow-lg 
                    w-full h-[500px] flex flex-col justify-between p-6
                    ${slide.color}
                  `}
                >
                  {/* زخارف الخلفية */}
                  <div className="absolute -top-10 -right-10">
                    <Image
                      src="/images/lightning.png"
                      alt="lightning"
                      width={48}
                      height={48}
                      className="object-contain drop-shadow-2xl opacity-50"
                    />
                  </div>

                  {/* المحتوى النصي */}
                  <div className="relative z-10 text-start mt-4">
                    <h2 className="text-4xl font-bold text-white mb-1 leading-tight">
                      {t(`${slide.id}.title`)}
                    </h2>
                    <h3 className="text-2xl font-bold text-black mb-3 opacity-90">
                      {t(`${slide.id}.subtitle`)}
                    </h3>
                    <p className="text-sm text-white font-medium opacity-90 max-w-[80%]">
                      {t(`${slide.id}.description`)}
                    </p>
                  </div>

                  {/* الصورة */}
                  <div
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none ${slide.id === "keyboard" ? "w-[360px] h-[360px]" : "w-[280px] h-[280px]"}`}
                  >
                    <Image
                      src={slide.image}
                      alt={t(`${slide.id}.title`)}
                      fill
                      className={`object-contain drop-shadow-2xl ${slide.id === "keyboard" ? "-rotate-90 scale-110" : ""}`}
                      priority
                    />
                  </div>

                  {/* العناصر السفلية (زر + خصم) */}
                  <div className="flex items-end justify-between w-full z-10 mt-auto">
                    <Link
                      href={slide.href}
                      className={`bg-white ${slide.btnTextColor} px-6 py-2 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-xl flex items-center gap-2`}
                    >
                      {t(`${slide.id}.btnText`)}
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <div className="text-3xl font-bold text-white">
                      {t(`${slide.id}.discount`)}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* --- [Modified]: Conditional Dots for Mobile --- */}
        {!isStatic && (
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                className={`h-3 rounded-full transition-all duration-300 ${
                  current === index ? "w-8 bg-[#5F2287]" : "w-3 bg-gray-300"
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ==================== عرض الديسكتوب (Accordion Slider) ==================== */}
      <div className="hidden xl:flex flex-row-reverse gap-4 rounded-3xl h-[484px]">
        {slides.map((slide) => {
          const isActive = activeId === slide.id;

          return (
            <div
              key={slide.id}
              // --- [Modified]: Disable click and change cursor in static mode ---
              onClick={() => !isStatic && setActiveId(slide.id)}
              className={`
                relative ${!isStatic ? "cursor-pointer" : "cursor-default"} overflow-hidden rounded-[25px] shadow-lg 
                transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                ${slide.color}
                ${isActive ? "flex-[4]" : "flex-1"} 
              `}
            >
              {/* زخارف الخلفية (البرق) */}
              <div className="absolute -top-14 -right-14">
                <Image
                  src="/images/lightningDown.png"
                  alt="lightningDown"
                  fill
                  className="object-fill drop-shadow-2xl h-12 w-12 hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              {isActive && (
                <div className="absolute bottom-10 left-10 opacity-80 z-0">
                  <Image
                    src="/images/lightningDown.png"
                    alt="lightningDown"
                    fill
                    className="w-20 h-20 bg-[#FFD700] rounded-lg rotate-45 transform translate-y-10 -translate-x-10"
                  />
                </div>
              )}

              {/* ==================== محتوى الشريحة ==================== */}
              <div className="absolute inset-0 w-full h-full">
                {/* ---------------- الحالة غير النشطة (مغلقة) ---------------- */}
                <div
                  className={`
                    absolute inset-0 flex flex-col items-center py-9 text-center overflow-hidden transition-opacity duration-500
                    ${isActive ? "opacity-0 pointer-events-none" : "opacity-100 delay-300"}
                  `}
                >
                  <div className="flex flex-col items-center justify-center w-full px-1 z-20">
                    <div
                      className={`font-black uppercase leading-none flex flex-col items-center justify-center w-full ${
                        slide.accentColor === "text-white"
                          ? "text-white"
                          : "text-[#B5E632]"
                      }`}
                    >
                      {/* Headphones Slide */}
                      {slide.id === "headphones" ? (
                        <h2
                          className="text-[24px] lg:text-[28px] xl:text-[34px] 
                        leading-tight text-center"
                        >
                          BLACK
                          <br />
                          FRIDAY
                        </h2>
                      ) : // Keyboard Slide
                      slide.id === "keyboard" ? (
                        <h2
                          className="text-2xl lg:text-3xl xl:text-[40px] 
                        text-center whitespace-nowrap"
                        >
                          {t(`${slide.id}.title`).replace("RGB", "").trim()}
                        </h2>
                      ) : (
                        // Default Slide
                        <h2
                          className="text-xl lg:text-2xl xl:text-3xl
                        text-center w-full"
                        >
                          {t(`${slide.id}.title`)}
                        </h2>
                      )}
                    </div>

                    <p
                      className={`text-base lg:text-lg font-bold tracking-widest mt-1 text-center ${
                        slide.id === "headphones"
                          ? "text-[#B5E632]"
                          : slide.id === "mouse"
                            ? "text-[#7F00A7]"
                            : "text-black"
                      }`}
                    >
                      {t(`${slide.id}.subtitle`)}
                    </p>
                  </div>

                  <div className="relative w-full flex-1 flex items-center justify-center z-10 px-4">
                    <div
                      className={`relative ${slide.id === "keyboard" ? "w-[160%] h-[160%]" : "w-full h-full"}`}
                    >
                      <Image
                        src={slide.image}
                        alt={t(`${slide.id}.title`)}
                        fill
                        className={`object-contain drop-shadow-lg transition-transform duration-500 ${
                          slide.id === "keyboard"
                            ? "-rotate-90 scale-125 translate-x-1"
                            : "scale-100"
                        }`}
                        priority
                      />
                    </div>
                  </div>

                  <div className="mt-auto pb-2 z-20">
                    <div
                      className={`bg-white ${slide.btnTextColor} w-11 h-11 xl:w-auto xl:h-auto xl:px-8 xl:py-2 rounded-full font-bold shadow-xl flex items-center justify-center gap-2 transform -rotate-6`}
                    >
                      <span className="hidden xl:inline text-lg">
                        {t(`${slide.id}.btnText`)}
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* ---------------- الحالة النشطة (مفتوحة) ---------------- */}
                <div
                  className={`
                    absolute inset-0 transition-opacity duration-700 w-full h-full
                    ${isActive ? "opacity-100 delay-200" : "opacity-0 pointer-events-none"}
                  `}
                >
                  {/* حاوية داخلية بعرض مرن لمنع القص على الشاشات الأصغر */}
                  <div className="relative w-full h-full flex flex-col justify-between p-6 lg:p-12">
                    {/* النصوص العلوية */}
                    <div className="flex flex-col items-start text-start z-10 w-full lg:max-w-[45%] xl:pt-5 xl:ps-2">
                      {slide.id === "headphones" ? (
                        <h2 className="text-[50px] xl:text-[70px] font-bold text-white leading-[0.9] mb-2">
                          BLACK
                          <br />
                          FRIDAY
                        </h2>
                      ) : (
                        <h2 className="text-[50px] xl:text-[70px] font-bold text-white whitespace-nowrap text-start">
                          {t(`${slide.id}.title`)}
                        </h2>
                      )}
                      <h3 className="text-[35px] xl:text-[50px] -mt-5 font-bold text-black whitespace-nowrap">
                        {t(`${slide.id}.subtitle`)}
                      </h3>
                      <p className="text-xl text-white font-bold max-w-[450px]">
                        {t(`${slide.id}.description`)}
                      </p>
                    </div>

                    {/* الصورة */}
                    <div
                      className={cn(
                        "absolute bottom-20 w-[400px] xl:w-[538px] h-[300px] z-0 pointer-events-none",
                        isRtl
                          ? slide.id === "keyboard"
                            ? "left-[10px] right-auto"
                            : "left-[39px] right-auto"
                          : "right-10 left-auto",
                      )}
                    >
                      <Image
                        src={slide.image}
                        alt={t(`${slide.id}.title`)}
                        fill
                        className={cn(
                          "object-contain transition-transform duration-500",
                          isRtl ? "object-left" : "object-right",
                        )}
                        priority
                      />
                    </div>

                    {/* العناصر السفلية */}
                    <div className="flex items-end justify-between w-full mt-auto z-10">
                      {/* زر الطلب */}
                      <Link
                        href={slide.href}
                        className={`bg-white ${slide.btnTextColor} px-9 py-1 rounded-full font-bold text-[28px] hover:bg-gray-100 transition-all shadow-xl flex items-center gap-2 transform -rotate-6`}
                      >
                        {t(`${slide.id}.btnText`)}
                        <ArrowRight className="w-5 h-5" />
                      </Link>

                      {/* الخصم */}
                      <div className="text-[50px] font-bold text-white">
                        {t(`${slide.id}.discount`)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- [Modified]: Conditional Dots for Desktop --- */}
      {!isStatic && (
        <div className="hidden xl:flex justify-center gap-2 mt-6">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`h-3 rounded-full transition-all duration-300 ${
                activeId === slide.id ? "w-8 bg-[#5F2287]" : "w-3 bg-gray-300"
              }`}
              onClick={() => setActiveId(slide.id)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
