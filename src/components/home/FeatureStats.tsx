"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function FeatureStats() {
  const t = useTranslations("home.featuredProducts");

  const stats = [
    {
      title: t("stats.fastDelivery.title"),
      description: t("stats.fastDelivery.description"),
      image: "/images/diliver.png",
    },
    {
      title: t("stats.orderTracking.title"),
      description: t("stats.orderTracking.description"),
      image: "/images/order.png",
    },
    {
      title: t("stats.securePayment.title"),
      description: t("stats.securePayment.description"),
      image: "/images/payment.png",
    },
  ];

  return (
    <section className="relative mx-auto md:mx-12 lg:mx-[122px] px-5">
      {/* خلفية السكشن */}
      <Image
        src="/images/Features_section_bg.png"
        alt="features background"
        fill
        priority
        className="object-cover w-full h-full absolute inset-0 z-10"
      />

      <div className="relative z-20 pt-11">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {t("title")}
          </h2>
        </div>

        <div className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 xl:gap-9 text-start">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-[#D9D9D9] rounded-2xl flex flex-none items-center justify-center mb-0 relative z-10">
                  <Image
                    src={stat.image}
                    alt={stat.title}
                    width={131}
                    height={130}
                    className="max-w-none shrink-0 drop-shadow-xl scale-110 md:scale-150 md:-mr-10"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-white">
                    {stat.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
