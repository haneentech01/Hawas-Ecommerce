import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/src/i18n/routing";
import Image from "next/image";
import { cn } from "@/src/lib/utils";

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
  textColor?: string;
  subtitleColor?: string;
  type: "large" | "medium" | "small" | "banner" | "vertical";
  discount?: string;
}

export default function BlogHeroSection() {
  const t = useTranslations("home.promotions");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const promoCards: HeroCard[] = [
    // Row 1: Green (6), Yellow (3), Blue (3)
    {
      id: 3,
      titleKey: "smallCharacters",
      descriptionKey: "smallCharactersDesc",
      subtitleKey: "butInteresting",
      image: "/images/man.png",
      bgColor: "bg-gradient-to-br from-[#236726] to-[#46CD4C]",
      colSpan: "col-span-12 lg:col-span-6",
      type: "medium",
      textColor: "text-white",
      subtitleColor: "#6BAB64",
    },
    {
      id: 1,
      titleKey: "luxuryWatches",
      subtitleKey: "Interesting",
      image: "/images/luxuryWatches.png",
      bgColor: "bg-gradient-to-b from-[#FFED63] to-[#CFC789]",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-3",
      type: "small",
      textColor: "text-white",
      subtitleColor: "#CFBB1F",
    },
    {
      id: 2,
      titleKey: "professionalMouse",
      subtitleKey: "Interesting",
      image: "/images/mouseSocialPost.png",
      bgColor: "bg-gradient-to-b from-[#6366FF] to-[#3C3D99]",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-3",
      type: "small",
      textColor: "text-white",
      subtitleColor: "#2526A2",
    },
    // Row 2: Orange Banner (12)
    {
      id: 4,
      titleKey: "playstationController",
      descriptionKey: "playstationDesc",
      subtitleKey: "playstationSub",
      image: "/images/ballsAndPlayStation.png",
      secondImage: "/images/playstationController.png",
      logo: "/images/playStationLogo.png",
      bgColor: "bg-[#DF5731]",
      colSpan: "col-span-12",
      type: "banner",
      textColor: "text-white",
      subtitleColor: "#B02A07",
    },
    // Row 3: Vertical Cyan (2), Vertical Orange (2), Large Red (8)
    {
      id: 5,
      titleKey: "digitalWatches",
      subtitleKey: "Interesting",
      image: "/images/digitalwatchBlog.png",
      bgColor: "bg-[#2DD4BF]",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-2",
      type: "vertical",
      textColor: "text-white",
      subtitleColor: "#006C5A",
    },
    {
      id: 6,
      titleKey: "cameras",
      subtitleKey: "precisionAndPerformance",
      image: "/images/camera.png",
      bgColor: "bg-[#DF8831]",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-2",
      type: "vertical",
      textColor: "text-white",
      subtitleColor: "#8D4E13",
    },
    {
      id: 7,
      titleKey: "wirelessHeadphones",
      descriptionKey: "uniqueExperience",
      subtitleKey: "pureSound",
      image: "/images/earphoneBlog.png",
      bgColor: "bg-[#EC2D3C]",
      colSpan: "col-span-12 lg:col-span-8",
      type: "large",
      textColor: "text-white",
      subtitleColor: "#000000",
    },
  ];

  return (
    <section className="container mx-auto px-4 mt-6">
      <div className="grid grid-cols-12 gap-3 lg:gap-6">
        {promoCards.map((card) => {
          const isSpecialLarge = card.id === 3 || card.id === 7;
          const isBanner = card.type === "banner";

          return (
            <Card
              key={card.id}
              className={cn(
                "border-none relative overflow-hidden flex flex-col min-h-[279px]",
                card.bgColor,
                card.textColor,
                card.colSpan,
                isSpecialLarge && "md:h-[487px]",
                isBanner && "h-[221px] md:h-[279px]",
              )}
            >
              <div className="relative flex flex-col h-full w-full p-4 md:p-6 lg:p-8">
                {/* Content Overlay */}
                <div
                  className={cn(
                    "relative z-20 flex flex-col h-full",
                    isBanner
                      ? "items-center text-center justify-center lg:px-24"
                      : card.id === 3 // Green Man (Text Right, Image Left)
                        ? "items-start text-start justify-start lg:pr-12"
                        : card.id === 7 // Red Earbuds (Text Left, Image Right)
                          ? "items-end text-end justify-center lg:pl-12"
                          : "items-center text-center justify-start",
                  )}
                >
                  {/* PlayStation Logo */}
                  {card.logo && (
                    <div
                      className="absolute top-8 left-0 -translate-y-1/2 
                                w-[108px] h-[58px] lg:w-[208px] lg:h-[117px]"
                    >
                      <Image
                        src={card.logo}
                        alt="Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}

                  {/* Discount Badge */}
                  {card.discount && (
                    <div className="absolute top-0 right-0 p-2">
                      <span className="text-yellow-400 font-bold text-xs lg:text-sm">
                        خصم {card.discount}
                      </span>
                    </div>
                  )}

                  <div
                    className={cn("flex flex-col", isBanner ? "mt-0" : "mt-4")}
                  >
                    <h3
                      className={cn(
                        "font-black tracking-tight leading-[0.9]",
                        isBanner
                          ? "text-4xl md:text-6xl lg:text-[70px]"
                          : card.type === "medium" || card.type === "large"
                            ? "text-4xl md:text-6xl lg:text-[70px]"
                            : "text-xl lg:text-[32px]",
                      )}
                    >
                      {t(card.titleKey)}
                    </h3>

                    {card.subtitleKey && (
                      <p
                        className={cn(
                          "font-black italic mt-1 leading-tight",
                          isBanner
                            ? "text-2xl lg:text-[40px]"
                            : card.type === "medium" || card.type === "large"
                              ? "text-2xl lg:text-[40px]"
                              : "text-sm lg:text-[18px]",
                        )}
                        style={{ color: card.subtitleColor }}
                      >
                        {t(card.subtitleKey)}
                      </p>
                    )}
                  </div>

                  {card.descriptionKey && (
                    <p
                      className={cn(
                        "text-sm mt-4 opacity-90 max-w-[400px] leading-relaxed",
                        isBanner && "mx-auto",
                        card.type === "medium" && "ml-auto",
                      )}
                    >
                      {t(card.descriptionKey)}
                    </p>
                  )}

                  {/* Buttons */}
                  <div
                    className={cn(
                      "mt-auto mb-4",
                      isBanner ||
                        card.type === "small" ||
                        card.type === "vertical"
                        ? "self-center"
                        : card.id === 5
                          ? "self-start"
                          : "self-end",
                    )}
                  >
                    <Link href="/product">
                      <Button
                        variant="white"
                        className="rounded-full px-8 py-4 font-bold text-xs lg:text-sm border-none shadow-xl rotate-6 transform hover:scale-110 transition-transform"
                        style={{ color: card.subtitleColor || "#000" }}
                      >
                        {isRtl && <ArrowLeft className="mr-2 h-4 w-4" />}
                        {t("orderNow")}
                        {!isRtl && <ArrowRight className="ml-2 h-4 w-4" />}
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Images */}
                <div className="absolute inset-0 pointer-events-none z-10">
                  {isBanner ? (
                    <>
                      <div className="absolute left-0 lg:-left-20 top-0 bottom-0 w-[45%] h-full">
                        <Image
                          src={card.image}
                          alt=""
                          fill
                          className="object-contain object-left scale-125 lg:scale-150"
                        />
                      </div>
                      <div className="absolute right-0 lg:right-10 top-0 bottom-0 w-1/2 h-full">
                        <Image
                          src={card.secondImage || ""}
                          alt=""
                          fill
                          className="object-contain object-right scale-110 lg:scale-125"
                        />
                      </div>
                    </>
                  ) : (
                    <div
                      className={cn(
                        "absolute",
                        card.id === 3 // Green Man (Left)
                          ? "left-0 bottom-0 w-[50%] lg:w-[60%] h-[90%]"
                          : card.type === "vertical"
                            ? "bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-[70%]"
                            : card.type === "small"
                              ? "bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-[60%]"
                              : card.id === 7 // Red Earbuds (Right)
                                ? "right-0 bottom-0 w-[50%] lg:w-[60%] h-full"
                                : "bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%]",
                      )}
                    >
                      <Image
                        src={card.image}
                        alt=""
                        fill
                        className={cn(
                          "object-contain",
                          card.id === 3 &&
                            "object-left object-bottom lg:scale-125",
                          card.id === 7 &&
                            "object-right object-bottom lg:scale-125",
                          card.type === "small" && "object-bottom",
                          card.type === "vertical" && "object-bottom",
                        )}
                      />
                    </div>
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
