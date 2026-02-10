import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/src/i18n/routing";
import Image from "next/image";
import { cn } from "@/src/lib/utils";

interface BannerPromoCardProps {
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  image: string;
  secondImage: string;
  logo: string;
  bgColor: string;
  subtitleColor: string;
  colSpan: string;
}

export default function BannerPromoCard({
  titleKey,
  subtitleKey,
  descriptionKey,
  image,
  secondImage,
  logo,
  bgColor,
  subtitleColor,
  colSpan,
}: BannerPromoCardProps) {
  const t = useTranslations("home.promotions");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <Card
      className={cn(
        "border-none relative overflow-hidden flex flex-col h-[221px] md:h-[279px]",
        bgColor,
        "text-white",
        colSpan,
      )}
    >
      <div className="relative flex flex-col h-full w-full p-4 md:p-6 lg:p-8">
        {/* Content Overlay */}
        <div className="relative z-20 flex flex-col h-full items-center text-center justify-center lg:px-24">
          {/* PlayStation Logo */}
          <div className="absolute top-8 left-0 -translate-y-1/2 w-[108px] h-[58px] lg:w-[208px] lg:h-[117px]">
            <Image src={logo} alt="Logo" fill className="object-contain" />
          </div>

          <div className="flex flex-col mt-2 z-50">
            <h3 className="font-black tracking-tight lg:leading-[0.9] text-4xl md:text-6xl lg:text-[70px]">
              {t(titleKey)}
            </h3>

            <p
              className="font-black italic mt-1 lg:leading-tight text-2xl lg:text-[40px]"
              style={{ color: subtitleColor }}
            >
              {t(subtitleKey)}
            </p>
          </div>

          {/* Description */}
          <p className="text-xl font-bold lg:leading-relaxed mt-2 mx-auto">
            {t(descriptionKey)}
          </p>

          {/* Button */}
          <div className="mt-auto mb-0 self-center">
            <Link href="/product">
              <Button
                variant="white"
                className="rounded-full px-8 py-4 font-bold text-base lg:text-lg 
                          border-none shadow-xl -rotate-6 transform hover:scale-110 
                          transition-transform"
                style={{ color: subtitleColor }}
              >
                {t("orderNow")}
                {isRtl && <ArrowRight className="ml-2 h-4 w-4" />}
                {!isRtl && <ArrowLeft className="ml-2 h-4 w-4" />}
              </Button>
            </Link>
          </div>
        </div>

        {/* Images */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute left-0 lg:left-28 top-0 bottom-0 w-[45%] h-full">
            <Image
              src={image}
              alt=""
              fill
              className="object-contain object-left lg:scale-150"
            />
          </div>
          <div className="absolute right-0 lg:right-10 top-0 bottom-0 w-1/2 h-full">
            <Image
              src={secondImage}
              alt=""
              fill
              className="object-fill object-right lg:scale-125"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
