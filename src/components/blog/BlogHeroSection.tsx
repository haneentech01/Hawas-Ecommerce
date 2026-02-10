import { useTranslations } from "next-intl";
import SmallPromoCard from "./cards/SmallPromoCard";
import MediumPromoCard from "./cards/MediumPromoCard";
import BannerPromoCard from "./cards/BannerPromoCard";
import VerticalPromoCard from "./cards/VerticalPromoCard";
import LargePromoCard from "./cards/LargePromoCard";

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
  const promoCards: HeroCard[] = [
    // Row 1: Mouse (3), Watches (3), Green Man (6)
    {
      id: 1,
      titleKey: "professionalMouse",
      subtitleKey: "Interesting",
      image: "/images/mouseSocialPost.png",
      bgColor: "bg-gradient-to-b from-[#6366FF] to-[#3C3D99]",
      colSpan: "col-span-6 lg:col-span-3",
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
      colSpan: "col-span-6 lg:col-span-3",
      type: "small",
      textColor: "text-white",
      subtitleColor: "#CFBB1F",
    },
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

    // Row 3: Large Red (8), Vertical Orange (2), Vertical Cyan (2)
    {
      id: 7,
      titleKey: "wirelessHeadphones",
      descriptionKey: "uniqueExperience",
      subtitleKey: "pureSound",
      image: "/images/earphonebg.png",
      bgColor: "bg-[#EC2D3C]",
      colSpan: "col-span-12 lg:col-span-8 lg:order-1",
      type: "large",
      textColor: "text-white",
      subtitleColor: "#000000",
    },
    {
      id: 6,
      titleKey: "cameras",
      subtitleKey: "precisionAndPerformance",
      image: "/images/camera.png",
      bgColor: "bg-[#DF8831]",
      colSpan: "col-span-6 lg:col-span-2 lg:order-2",
      type: "vertical",
      textColor: "text-white",
      subtitleColor: "#006C5A",
    },
    {
      id: 5,
      titleKey: "digitalWatches",
      subtitleKey: "Interesting",
      image: "/images/digitalwatchBlog.png",
      bgColor: "bg-[#2DD4BF]",
      colSpan: "col-span-6 lg:col-span-2 lg:order-3",
      type: "vertical",
      textColor: "text-white",
      subtitleColor: "#006C5A",
    },
  ];

  return (
    <section className="mt-6">
      <div className="grid grid-cols-12 gap-3 lg:gap-6">
        {promoCards.map((card) => {
          switch (card.type) {
            case "small":
              return (
                <SmallPromoCard
                  key={card.id}
                  titleKey={card.titleKey}
                  subtitleKey={card.subtitleKey || ""}
                  image={card.image}
                  bgColor={card.bgColor}
                  subtitleColor={card.subtitleColor || ""}
                  colSpan={card.colSpan || ""}
                />
              );
            case "medium":
              return (
                <MediumPromoCard
                  key={card.id}
                  titleKey={card.titleKey}
                  subtitleKey={card.subtitleKey || ""}
                  descriptionKey={card.descriptionKey || ""}
                  image={card.image}
                  bgColor={card.bgColor}
                  subtitleColor={card.subtitleColor || ""}
                  colSpan={card.colSpan || ""}
                />
              );
            case "banner":
              return (
                <BannerPromoCard
                  key={card.id}
                  titleKey={card.titleKey}
                  subtitleKey={card.subtitleKey || ""}
                  descriptionKey={card.descriptionKey || ""}
                  image={card.image}
                  secondImage={card.secondImage || ""}
                  logo={card.logo || ""}
                  bgColor={card.bgColor}
                  subtitleColor={card.subtitleColor || ""}
                  colSpan={card.colSpan || ""}
                />
              );
            case "vertical":
              return (
                <VerticalPromoCard
                  key={card.id}
                  titleKey={card.titleKey}
                  subtitleKey={card.subtitleKey || ""}
                  image={card.image}
                  bgColor={card.bgColor}
                  subtitleColor={card.subtitleColor || ""}
                  colSpan={card.colSpan || ""}
                />
              );
            case "large":
              return (
                <LargePromoCard
                  key={card.id}
                  titleKey={card.titleKey}
                  subtitleKey={card.subtitleKey || ""}
                  descriptionKey={card.descriptionKey || ""}
                  image={card.image}
                  bgColor={card.bgColor}
                  subtitleColor={card.subtitleColor || ""}
                  colSpan={card.colSpan || ""}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </section>
  );
}
