import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/src/i18n/routing";
import Image from "next/image";
import { cn } from "@/src/lib/utils";

interface LargePromoCardProps {
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  image: string;
  bgColor: string;
  subtitleColor: string;
  colSpan: string;
}

export default function LargePromoCard({
  titleKey,
  subtitleKey,
  descriptionKey,
  image,
  bgColor,
  subtitleColor,
  colSpan,
}: LargePromoCardProps) {
  const t = useTranslations("home.promotions");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <Card
      className={cn(
        "border-none relative overflow-hidden flex flex-col md:h-[487px]",
        bgColor,
        "text-white",
        colSpan,
      )}
    >
      <div className="relative h-full w-full py-4 md:py-6 lg:py-8">
        {/* Content Overlay - Added padding here to keep text away from edges */}
        <div
          className={cn(
            "relative z-20 flex flex-col h-full justify-center px-4 md:px-6 lg:px-8",
            "items-start text-start lg:px-12",
          )}
        >
          <div className="flex flex-col mt-0">
            {/* Title */}
            <h3
              className={`font-black tracking-tight leading-[0.9] 
                            text-4xl md:text-6xl lg:text-[70px] text-start lg:mt-20
                            ${isRtl ? "" : "max-w-[55%]"}`}
            >
              {t(titleKey)}
            </h3>

            {/* Subtitle */}
            <p
              className="font-black italic lg:mt-1 leading-tight text-2xl lg:text-3xl text-start"
              style={{ color: subtitleColor }}
            >
              {t(subtitleKey)}
            </p>

            {/* Description */}
            {descriptionKey && (
              <p className="font-bold leading-relaxed lg:mt-2 text-start text-sm lg:text-xl">
                {t(descriptionKey)}
              </p>
            )}
          </div>

          {/* Button */}
          <div className="mt-auto lg:mb-0 self-start">
            <Link href="/product">
              <Button
                variant="white"
                className="rounded-full px-3 py-0 lg:px-8 lg:py-4 font-bold text-sm lg:text-lg 
                          border-none shadow-xl -rotate-6 transform hover:scale-110 
                          transition-transform"
                style={{ color: subtitleColor }}
              >
                {t("orderNow")}
                {isRtl ? (
                  <ArrowRight className="ml-2 h-4 w-4" />
                ) : (
                  <ArrowLeft className="ml-2 h-4 w-4" />
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="flex items-start justify-start">
          <div
            className={cn(
              "absolute bottom-0 w-[50%] lg:w-[80%] h-full pointer-events-none z-10",
              isRtl ? "left-0 lg:-left-28" : "right-0 lg:-right-28",
            )}
          >
            <Image
              src={image}
              alt=""
              fill
              className={cn(
                "object-contain object-bottom lg:scale-125",
                isRtl ? "" : "-scale-x-125",
              )}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
