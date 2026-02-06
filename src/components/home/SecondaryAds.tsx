"use client";

import Image from "next/image";
import { Link } from "@/src/i18n/routing";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SpecialOfferBanner() {
  const t = useTranslations("home.secondaryAds"); // تأكد من وجود الترجمة أو استبدل النصوص مباشرة

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="relative w-full h-[287px] rounded-[25px] overflow-hidden shadow-2xl group">
        {/* 1. الخلفية (The Split Background) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/background_split.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute z-10 top-0 -right-4">
          <Image
            src="/images/blur.png"
            alt="blur"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>

        {/* 2. الكرسي الرئيسي (يسار) */}
        <div className="absolute z-20 left-4 top-0 bottom-0 w-[140px] md:w-[280px] lg:w-[434px] h-auto">
          <Image
            src="/images/chair_main.png"
            alt="Gaming Chair"
            width={500}
            height={500}
            className="object-contain drop-shadow-2xl"
          />
        </div>

        {/* 3. الكرسي الصغير (أعلى يمين) */}
        <div className="absolute z-10 right-4 md:right-[34px] top-8 md:top-9 w-[60px] h-[40px] md:w-[120px] lg:w-[300px] lg:h-[300px]">
          <Image
            src="/images/chair_small.png"
            alt="Gaming Chair Small"
            width={150}
            height={200}
            className="object-contain"
          />
        </div>

        {/* 4. المحتوى النصي (الوسط) */}
        <div className="absolute z-20 inset-0 flex flex-col items-center justify-center pt-4 md:pt-0">
          <div className="flex flex-row items-center justify-center gap-6 md:gap-16 lg:gap-24 w-full px-4">
            {/* النص الأيمن: Discount */}
            <div className="flex flex-col items-start leading-none lg:top-20 lg:right-[20%]">
              <Image
                src="/images/discount.png"
                alt="discount"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>

            {/* النص الأيسر: BLACK FRIDAY */}
            <div className="relative flex flex-col items-start leading-tight mt-[-20px] md:mt-0 w-[227px] h-[194px]   ">
              <Image
                src="/images/BlackFriday.png"
                alt="Black Friday"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
          </div>

          {/* الزر (في المنطقة الحمراء) */}
          <div className="">
            <Link
              href="/products"
              className="bg-white text-[#EC2D3C] px-8 md:px-12 py-3 md:py-2 rounded-full font-black text-sm md:text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              {t("orderNow")}
            </Link>
          </div>
        </div>

        {/* الشكل الأيمن (تحت الخصم) */}
        <div className="absolute z-30 bottom-0 right-0 w-[80px] md:w-[140px]">
          <Image
            src="/images/shape_red.png"
            alt="Shape"
            width={140}
            height={140}
            className="object-contain rotate-45"
          />
        </div>
      </div>
    </section>
  );
}
