import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/src/i18n/routing";
import Image from "next/image";
import { cn } from "@/src/lib/utils";

interface MediumPromoCardProps {
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  image: string;
  bgColor: string;
  subtitleColor: string;
  colSpan: string;
}

export default function MediumPromoCard({
  titleKey,
  subtitleKey,
  descriptionKey,
  image,
  bgColor,
  subtitleColor,
  colSpan,
}: MediumPromoCardProps) {
  const t = useTranslations("home.promotions");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <Card
      className={cn(
        "border-none relative overflow-hidden flex flex-col h-[230px] lg:h-[292px]",
        bgColor,
        "text-white",
        colSpan,
      )}
    >
      <div className="relative flex flex-col h-full w-full p-4 md:p-6 lg:p-8">
        {/* Content Overlay */}
        <div className="relative z-20 flex flex-col h-full justify-start items-start text-start">
          <div className="flex flex-col mt-0 max-w-[55%] md:max-w-[60%]">
            {/* Title */}
            <h3 className="font-black tracking-tight lg:leading-[0.9] text-2xl md:text-3xl lg:text-[40px] text-start">
              {t(titleKey)}
            </h3>

            {/* Subtitle */}
            <p
              className="font-black italic mt-1 lg:leading-tight text-2xl lg:text-3xl text-start"
              style={{ color: subtitleColor }}
            >
              {t(subtitleKey)}
            </p>

            {/* Description */}
            <p className="font-bold lg:leading-relaxed mt-2 text-sm text-start max-w-[195px]">
              {t(descriptionKey)}
            </p>
          </div>

          {/* Button */}
          <div className="mt-auto mb-0 self-start">
            <Link href="/product">
              <Button
                variant="white"
                className="rounded-full px-8 py-4 font-bold text-base lg:text-lg 
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
        <div
          className={cn(
            "absolute -top-0 w-[50%] lg:w-[60%] h-[90%] pointer-events-none z-10",
            isRtl ? "left-0" : "right-0",
          )}
        >
          <Image
            src={image}
            alt=""
            fill
            className={cn(
              "object-contain object-bottom scale-y-150 lg:scale-y-125",
              isRtl
                ? "scale-x-150 lg:scale-x-125"
                : "-scale-x-150 lg:-scale-x-125",
            )}
          />
        </div>
      </div>
    </Card>
  );
}
