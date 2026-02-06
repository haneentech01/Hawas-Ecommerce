"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/src/i18n/routing";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
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

export default function AccordionHero() {
  const t = useTranslations("home.accordionHero");
  const [activeId, setActiveId] = useState("keyboard");

  // --- إعدادات السلايدر للموبايل ---
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="container mx-auto px-4 lg:px-10 xl:px-20 py-8">
      {/* ==================== عرض الموبايل (Shadcn Carousel) ==================== */}
      <div className="block xl:hidden">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{ loop: true, direction: "rtl" }}
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

        {/* نقاط التنقل (Dots) */}
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
      </div>

      {/* ==================== عرض الديسكتوب (Accordion Slider) ==================== */}
      <div className="hidden xl:flex flex-row-reverse gap-4 rounded-3xl h-[484px]">
        {slides.map((slide) => {
          const isActive = activeId === slide.id;

          return (
            <div
              key={slide.id}
              onClick={() => setActiveId(slide.id)}
              className={`
                relative cursor-pointer overflow-hidden rounded-[25px] shadow-lg 
                transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                ${slide.color}
                ${isActive ? "flex-[4]" : "flex-1"} 
              `}
            >
              {/* زخارف الخلفية (البرق) */}
              <div className="absolute -top-14 -right-14">
                <Image
                  src="/images/lightning.png"
                  alt="lightning"
                  fill
                  className="object-fill drop-shadow-2xl h-12 w-12 hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              {isActive && (
                <div className="absolute bottom-10 left-10 opacity-80 z-0">
                  <div className="w-20 h-20 bg-[#FFD700] rounded-lg rotate-45 transform translate-y-10 -translate-x-10" />
                </div>
              )}

              {/* ==================== محتوى الشريحة ==================== */}
              <div className="absolute inset-0 w-full h-full">
                {/* ---------------- الحالة النشطة (مفتوحة) ---------------- */}
                {isActive ? (
                  <div className="relative w-full h-full flex flex-col justify-between p-12">
                    {/* النصوص العلوية */}
                    <div className="flex flex-col items-start text-start z-10 w-full xl:pt-5 xl:ps-2">
                      <h2 className="text-[50px] xl:text-[70px] font-bold text-white">
                        {t(`${slide.id}.title`)}
                      </h2>
                      <h3 className="text-[35px] xl:text-[50px] -mt-5 font-bold text-black">
                        {t(`${slide.id}.subtitle`)}
                      </h3>
                      <p className="text-xl text-white font-bold max-w-[60%]">
                        {t(`${slide.id}.description`)}
                      </p>
                    </div>

                    {/* الصورة */}
                    <div className="absolute bottom-20 left-4 w-[400px] xl:w-[538px] h-[237px] z-0 pointer-events-none">
                      <Image
                        src={slide.image}
                        alt={t(`${slide.id}.title`)}
                        fill
                        className="object-contain transition-transform duration-500"
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
                ) : (
                  /* ---------------- الحالة غير النشطة (مغلقة) ---------------- */
                  <div className="relative flex flex-col items-center h-full py-8 text-center overflow-hidden">
                    {/* حاوية النصوص: نستخدم w-full مع items-center لضمان التمركز الأفقي المطلق */}
                    <div className="flex flex-col items-center justify-center w-full px-1 z-20">
                      <div
                        className={`font-black uppercase leading-none flex flex-col items-center justify-center w-full ${
                          slide.accentColor === "text-white"
                            ? "text-white"
                            : "text-[#B5E632]"
                        }`}
                      >
                        {slide.id === "headphones" ? (
                          <h2 className="text-[24px] lg:text-[28px] xl:text-[34px] leading-tight text-center">
                            BLACK
                            <br />
                            FRIDAY
                          </h2>
                        ) : (
                          <h2
                            className={`
                              text-[24px] lg:text-[28px] xl:text-[34px] text-center
                              ${slide.id === "keyboard" ? "max-w-[80px] leading-[1.1] break-words" : "w-full"}
                            `}
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

                    {/* حاوية الصورة: نستخدم flex-1 لجعلها تأخذ المساحة الوسطى وتدفع الزر للأسفل */}
                    <div className="relative w-full flex-1 flex items-center justify-center z-10 my-4">
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
                              : "scale-90"
                          }`}
                          priority
                        />
                      </div>
                    </div>

                    {/* الزر السفلي: محمي بـ z-index لضمان ظهوره فوق الصورة إذا تداخلوا */}
                    <div className="mt-auto pb-2 z-20">
                      <Link
                        href={slide.href}
                        className={`bg-white ${slide.btnTextColor} w-11 h-11 xl:w-auto xl:h-auto xl:px-8 xl:py-2 rounded-full font-bold hover:bg-gray-100 transition-all shadow-xl flex items-center justify-center gap-2 transform -rotate-6`}
                      >
                        <span className="hidden xl:inline text-lg">
                          {t(`${slide.id}.btnText`)}
                        </span>
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* نقاط التنقل (Dots) للديسك توب */}
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
    </section>
  );
}
