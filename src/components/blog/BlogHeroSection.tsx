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
    // Row 1
    {
      id: 1,
      titleKey: "blackFriday",
      subtitleKey: "Interesting",
      image: "/images/BlackFriday.png",
      bgColor: "bg-gradient-to-b from-[#4A3280] to-[#2B1D4A]",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-3",
      type: "small",
      textColor: "text-white",
      subtitleColor: "#9370DB",
      discount: "15%",
    },
    {
      id: 2,
      titleKey: "appleMouse",
      subtitleKey: "pureSound",
      image: "/images/mouse.png",
      bgColor: "bg-gradient-to-b from-[#E5E7EB] to-[#D1D5DB]",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-3",
      type: "small",
      textColor: "text-black",
      subtitleColor: "#9CA3AF",
    },
    {
      id: 3,
      titleKey: "keyboardRgp",
      subtitleKey: "pureSound",
      descriptionKey: "uniqueExperience",
      image: "/images/hero_keyboard.png",
      bgColor: "bg-[#EC2D3C]",
      colSpan: "col-span-12 lg:col-span-6",
      type: "large",
      textColor: "text-white",
      subtitleColor: "#000000",
    },
    // Row 2: Banner
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
    // Row 3: 3 Medium Cards
    {
      id: 5,
      titleKey: "smallCharacters",
      descriptionKey: "smallCharactersDesc",
      image: "/images/man.png",
      bgColor: "bg-gradient-to-b from-[#236726] to-[#46CD4C]",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
      type: "medium",
      textColor: "text-white",
      subtitleColor: "#6BAB64",
    },
    {
      id: 6,
      titleKey: "luxuryWatches",
      subtitleKey: "Interesting",
      image: "/images/luxuryWatches.png",
      bgColor: "bg-gradient-to-b from-[#FFED63] to-[#CFC789]",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
      type: "medium",
      textColor: "text-white",
      subtitleColor: "#CFBB1F",
    },
    {
      id: 7,
      titleKey: "professionalMouse",
      subtitleKey: "Interesting",
      image: "/images/mouseSocialPost.png",
      bgColor: "bg-gradient-to-b from-[#6366FF] to-[#3C3D99]",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
      type: "medium",
      textColor: "text-white",
      subtitleColor: "#2526A2",
    },
    // Row 4: Banner Repeat
    {
      id: 8,
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
    // Row 5: 2 Vertical + 1 Large
    {
      id: 9,
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
      id: 10,
      titleKey: "cameras",
      subtitleKey: "precisionAndPerformance",
      image: "/images/camera.png",
      bgColor: "bg-[#DF8831]",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-2",
      type: "vertical",
      textColor: "text-white",
      subtitleColor: "#006C5A",
    },
    {
      id: 11,
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
          const isSpecialLarge = card.id === 3 || card.id === 11;
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
                      ? "items-end text-right justify-center px-12 lg:px-24"
                      : "items-start",
                  )}
                >
                  {/* PlayStation Logo */}
                  {card.logo && (
                    <div className="absolute top-0 right-10 -translate-y-1/2 w-24 h-24 lg:w-48 lg:h-32">
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

                  <h3
                    className={cn(
                      "font-black tracking-tight leading-tight",
                      isBanner
                        ? "text-2xl md:text-4xl lg:text-5xl"
                        : isSpecialLarge
                          ? "text-xl md:text-3xl lg:text-4xl max-w-[280px]"
                          : "text-lg lg:text-xl",
                    )}
                  >
                    {t(card.titleKey)}
                  </h3>

                  {card.subtitleKey && (
                    <p
                      className={cn(
                        "font-bold italic mt-1",
                        isBanner
                          ? "text-lg md:text-2xl"
                          : "text-base lg:text-lg",
                      )}
                      style={{ color: card.subtitleColor }}
                    >
                      {t(card.subtitleKey)}
                    </p>
                  )}

                  {card.descriptionKey && (
                    <p
                      className={cn(
                        "text-sm mt-3 opacity-90 max-w-[500px]",
                        isBanner && "self-end",
                      )}
                    >
                      {t(card.descriptionKey)}
                    </p>
                  )}

                  {/* Buttons */}
                  <div
                    className={cn(
                      "mt-auto",
                      isBanner ? "self-start rotate-6" : "self-start -rotate-6",
                    )}
                  >
                    <Link href="/product">
                      <Button
                        variant="white"
                        size="sm"
                        className="rounded-full px-6 py-2 font-bold text-sm lg:text-base border-none shadow-lg"
                        style={{ color: card.subtitleColor || "#000" }}
                      >
                        {t("orderNow")}
                        {isRtl ? (
                          <ArrowLeft className="mr-2 h-4 w-4" />
                        ) : (
                          <ArrowRight className="ml-2 h-4 w-4" />
                        )}
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Images */}
                <div className="absolute inset-0 pointer-events-none z-10">
                  {isBanner ? (
                    <>
                      <div className="absolute left-0 top-0 bottom-0 w-[40%] h-full">
                        <Image
                          src={card.image}
                          alt=""
                          fill
                          className="object-cover opacity-80"
                        />
                      </div>
                      <div className="absolute right-0 top-0 bottom-0 w-1/2 h-full">
                        <Image
                          src={card.secondImage || ""}
                          alt=""
                          fill
                          className="object-contain scale-110 lg:scale-125 translate-x-12 translate-y-4"
                        />
                      </div>
                    </>
                  ) : (
                    <div
                      className={cn(
                        "absolute",
                        card.id === 3
                          ? "bottom-0 -right-4 w-[250px] md:w-[400px] h-[70%]"
                          : card.id === 1
                            ? "bottom-0 right-0 w-[150px] h-[150px]"
                            : card.id === 2
                              ? "bottom-0 right-0 w-[180px] h-[180px]"
                              : card.id === 5
                                ? "bottom-0 right-0 w-full h-[80%]"
                                : card.id === 11
                                  ? "right-0 bottom-0 w-[200px] md:w-[350px] lg:w-[450px] h-full"
                                  : "bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%]",
                      )}
                    >
                      <Image
                        src={card.image}
                        alt=""
                        fill
                        className={cn(
                          "object-contain object-bottom",
                          card.id === 5 && "scale-125 translate-y-10",
                          card.id === 3 && "lg:scale-150 lg:-translate-y-4",
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
