import { useTranslations } from "next-intl";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "@/src/i18n/routing";
import Image from "next/image";

interface HeroCard {
  id: number;
  titleKey: string;
  subtitleKey?: string;
  descriptionKey?: string;
  image: string;
  secondImage?: string;
  logo?: string;
  bgColor: string;
  colSpan?: string;
  rowSpan?: string;
  textColor?: string;
  subtitleColor?: string;
  type: "large" | "medium" | "small" | "banner" | "vertical";
  ctaVariant?: "white" | "default";
}

export default function BlogHeroSection() {
  const t = useTranslations("home.promotions");

  const promoCards: HeroCard[] = [
    {
      id: 1,
      titleKey: "professionalMouse",
      subtitleKey: "Interesting",
      image: "/images/mouseSocialPost.png",
      bgColor: "bg-gradient-to-b from-[#6366FF] to-[#3C3D99]",
      colSpan: "col-span-2 md:col-span-1",
      type: "small",
      textColor: "text-white",
      subtitleColor: "#2526A2",
    },
    {
      id: 2,
      titleKey: "luxuryWatches",
      subtitleKey: "Interesting",
      image: "/images/luxuryWatches.png",
      bgColor: "bg-gradient-to-b from-[#FFED63] to-[#CFC789]",
      colSpan: "col-span-2 md:col-span-1",
      type: "small",
      textColor: "text-white",
      subtitleColor: "#CFBB1F",
    },
    {
      id: 3,
      titleKey: "smallCharacters",
      subtitleKey: "Interesting",
      descriptionKey: "smallCharactersDesc",
      image: "/images/man.png",
      bgColor: "bg-gradient-to-b from-[#236726] to-[#46CD4C]",
      colSpan: "col-span-4 md:col-span-2",
      type: "large",
      textColor: "text-white",
      subtitleColor: "#6BAB64",
    },
    {
      id: 4,
      titleKey: "playstationController",
      descriptionKey: "playstationDesc",
      subtitleKey: "playstationSub",
      image: "/images/ballsAndPlayStation.png",
      secondImage: "/images/playstationController.png",
      logo: "/images/playStationLogo.png",
      bgColor: "bg-[#DF5731]",
      colSpan: "col-span-4",
      type: "banner",
      textColor: "text-white",
      subtitleColor: "#B02A07",
    },
    {
      id: 5,
      titleKey: "wirelessHeadphones",
      descriptionKey: "uniqueExperience",
      subtitleKey: "pureSound",
      image: "/images/earphone.png",
      bgColor: "bg-[#EC2D3C]",
      colSpan: "col-span-4 md:col-span-2",
      type: "large",
      textColor: "text-white",
      subtitleColor: "#000",
    },
    {
      id: 6,
      titleKey: "digitalWatches",
      subtitleKey: "Interesting",
      image: "/images/digitalwatchBlog.png",
      bgColor: "bg-[#2DD4BF]",
      colSpan: "col-span-2 md:col-span-1",
      type: "vertical",
      textColor: "text-white",
      subtitleColor: "#006C5A",
    },
    {
      id: 7,
      titleKey: "cameras",
      subtitleKey: "precisionAndPerformance",
      image: "/images/camera.png",
      bgColor: "bg-[#DF8831]",
      colSpan: "col-span-2 md:col-span-1",
      type: "vertical",
      textColor: "text-white",
      subtitleColor: "#006C5A",
    },
  ];

  return (
    <section className="container mx-auto px-4 mt-6">
      <div className="grid grid-cols-4 gap-6">
        {promoCards.map((promoCard) => {
          // ====== كارد 5: Layout خاص يضمن أن النص لا يكون خلف الصورة ======
          if (promoCard.id === 5) {
            return (
              <Card
                key={promoCard.id}
                className={`
                  ${promoCard.bgColor} ${promoCard.textColor} ${promoCard.colSpan || ""}
                  border-none relative overflow-hidden
                 flex items-center
                  h-[279px] md:h-[487px]
                `}
              >
                {/* عمود الصورة – في الجهة اليمنى */}
                <div className="flex-1 flex items-center justify-start z-10">
                  <div className="relative w-[180px] h-[180px] md:w-[150px] md:h-[150px] lg:w-[220px] lg:h-[220px] xl:w-[424px] xl:h-[424px]">
                    <Image
                      src={promoCard.image}
                      alt={promoCard.titleKey}
                      fill
                      className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                    />
                  </div>
                </div>

                {/* عمود النص (يسار في LTR، يمين في RTL بسبب text-right) */}
                <div className="flex-[1.5] flex flex-col justify-center px-2 z-20">
                  <h3 className="text-2xl md:text-2xl lg:text-3xl xl:text-5xl font-bold mb-2">
                    {t(promoCard.titleKey)}
                  </h3>

                  {promoCard.subtitleKey && (
                    <p
                      className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-1"
                      style={{ color: promoCard.subtitleColor }}
                    >
                      {t(promoCard.subtitleKey)}
                    </p>
                  )}

                  {promoCard.descriptionKey && (
                    <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-6 text-white/90">
                      {t(promoCard.descriptionKey)}
                    </p>
                  )}

                  {/* زر اطلب الآن في الأسفل جهة الـ end داخل عمود النص */}
                  <div className="mt-auto bottom-0 self-start">
                    <Link href="/product">
                      <Button
                        variant="white"
                        size="sm"
                        className="rounded-full px-4 md:px-6 xl:px-8 py-2 gap-2 text-sm md:text-base xl:text-xl -rotate-6"
                        style={{ color: promoCard.subtitleColor }}
                      >
                        {t("orderNow")} <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          }

          return (
            <Card
              key={promoCard.id}
              className={`
                ${promoCard.bgColor} ${promoCard.textColor} ${promoCard.colSpan || ""} ${
                  promoCard.rowSpan || ""
                }
                ${promoCard.id === 3 ? "overflow-visible z-30" : "overflow-hidden"}
                 ${
                   [5, 6, 7].includes(promoCard.id)
                     ? "h-[279px] md:h-[487px]"
                     : "h-[279px] md:h-[279px]"
                 }
                border-none relative group px-4 py-4 flex flex-col
              `}
            >
              <div
                className={`relative flex h-full w-full ${
                  promoCard.id === 4
                    ? "flex-col items-center justify-center z-30"
                    : "flex-col items-start z-10"
                }`}
              >
                {/* النص */}
                <div
                  className={`w-full relative z-20 ${
                    promoCard.type === "banner" && promoCard.id === 4
                      ? "flex flex-col items-center text-center"
                      : promoCard.type === "small" ||
                          promoCard.type === "vertical"
                        ? "text-center"
                        : "text-start"
                  }`}
                >
                  {/* لوجو البلايستيشن */}
                  {promoCard.id === 4 && promoCard.logo && (
                    <div className="mb-2">
                      <div
                        className="absolute z-30 top-0 left-10 -translate-x-1/2 -translate-y-1/2 
                      w-[100px] h-[100px] md:top-16 md:left-28 md:w-[208px] md:h-[117px]"
                      >
                        <Image
                          src={promoCard.logo}
                          alt="PlayStation Logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  )}

                  {/* العنوان */}
                  <h3
                    className={`${
                      promoCard.id === 4
                        ? "text-[20px] md:text-[30px] lg:text-[40px]"
                        : promoCard.type === "banner"
                          ? "text-center"
                          : "text-[22px] md:text-[40px] whitespace-nowrap"
                    } font-bold`}
                  >
                    {t(promoCard.titleKey)}
                  </h3>

                  {/* السطر الفرعي */}
                  {promoCard.subtitleKey && (
                    <p
                      className="max-w-[338px] text-2xl md:text-3xl -mt-3 font-bold mb-2"
                      style={{ color: promoCard.subtitleColor }}
                    >
                      {t(promoCard.subtitleKey)}
                    </p>
                  )}

                  {/* الوصف */}
                  {promoCard.descriptionKey && (
                    <p
                      className={`text-lg xl:text-xl mb-4 ${
                        promoCard.id === 4
                          ? "xl:max-w-[207px] mx-auto text-center"
                          : "max-w-[180px] xl:max-w-[195px]"
                      } ${
                        promoCard.type === "banner" && promoCard.id !== 4
                          ? "mx-auto text-center"
                          : ""
                      }`}
                    >
                      {t(promoCard.descriptionKey)}
                    </p>
                  )}
                </div>

                {/* زر اطلب الآن */}
                <div
                  className={`relative z-20 ${
                    promoCard.id === 4
                      ? "mt-0 self-center"
                      : "mt-auto mb-4 " +
                        (["banner", "small", "vertical"].includes(
                          promoCard.type,
                        )
                          ? "self-end"
                          : "self-center")
                  }`}
                >
                  <Link href="/product">
                    <Button
                      variant="white"
                      size="sm"
                      className="rounded-full px-8 py-2 gap-2 text-xl -rotate-6"
                      style={{ color: promoCard.subtitleColor }}
                    >
                      {t("orderNow")} <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                {/* الصور لباقي الكروت كما كانت */}
                <div className="absolute inset-0 pointer-events-none z-0">
                  {/* 1 */}
                  {promoCard.id === 1 && (
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    w-[250px] h-[250px] md:w-[300px] md:h-[300px]"
                    >
                      <Image
                        src={promoCard.image}
                        alt={promoCard.titleKey}
                        fill
                        className="object-contain transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* 2 */}
                  {promoCard.id === 2 && (
                    <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px]">
                      <Image
                        src={promoCard.image}
                        alt={promoCard.titleKey}
                        fill
                        className="object-contain transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* 3 */}
                  {promoCard.id === 3 && (
                    <div className="absolute top-0 bottom-0 left-0 w-full h-full pointer-events-none">
                      <div className="absolute bottom-6 -left-4 xl:bottom-11 xl:left-5 w-[200px] h-[250px] lg:w-[350px] lg:h-[400px] z-20">
                        <Image
                          src={promoCard.image}
                          alt={promoCard.titleKey}
                          fill
                          className="object-contain object-bottom xl:scale-125 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* 4 */}
                  {promoCard.id === 4 && (
                    <>
                      <div
                        className="absolute inset-y-0 z-10 -left-8 md:left-0
                         -top-5 w-[120px] md:w-[250px] h-[300px] xl:w-[227px] xl:h-[279px]"
                      >
                        <Image
                          src={promoCard.image}
                          alt="PlayStation Background"
                          fill
                          className="object-fill"
                        />
                      </div>
                      <div
                        className="absolute z-10 bottom-0 -right-2 -top-5 
                                    md:right-0 w-[150px] md:w-[250px] h-[300px] xl:w-[497px] xl:h-[279px]"
                      >
                        <Image
                          src={
                            promoCard.secondImage ||
                            "/images/playstationController.png"
                          }
                          alt="PlayStation Controller"
                          fill
                          className="object-fill transition-transform duration-500"
                        />
                      </div>
                    </>
                  )}

                  {/* 6 */}
                  {promoCard.id === 6 && (
                    <div className="absolute w-[200px] h-[150px] md:w-[250px] md:h-[200px] lg:w-[350px] lg:h-[300px] top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Image
                        src={promoCard.image}
                        alt={promoCard.titleKey}
                        fill
                        className="object-contain object-bottom transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* 7 */}
                  {promoCard.id === 7 && (
                    <>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[251px] h-[140px]">
                        {promoCard.descriptionKey && (
                          <p className="text-3xl font-bold text-center">
                            {t(promoCard.descriptionKey)}
                          </p>
                        )}
                      </div>
                      <div className="absolute w-[200px] h-[130px] md:w-[250px] md:h-[250px] lg:w-[350px] lg:h-[300px] top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Image
                          src={promoCard.image}
                          alt={promoCard.titleKey}
                          fill
                          className="object-contain transition-transform duration-500"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
