import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/src/i18n/routing";
import Image from "next/image";
import { cn } from "@/src/lib/utils";

interface VerticalPromoCardProps {
  titleKey: string;
  subtitleKey: string;
  image: string;
  bgColor: string;
  subtitleColor: string;
  colSpan: string;
}

export default function VerticalPromoCard({
  titleKey,
  subtitleKey,
  image,
  bgColor,
  subtitleColor,
  colSpan,
}: VerticalPromoCardProps) {
  const t = useTranslations("home.promotions");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <Card
      className={cn(
        "border-none relative overflow-hidden flex flex-col h-[230px] lg:h-[487px]",
        bgColor,
        "text-white",
        colSpan,
      )}
    >
      <div className="relative flex flex-col h-full w-full p-4 md:p-6 lg:p-8">
        {/* Content Overlay */}
        <div className="relative z-20 flex flex-col h-full items-center text-center justify-start">
          <div className="flex flex-col mt-0">
            {/* Title */}
            <h3 className="font-black tracking-tight lg:leading-[0.9] text-xl lg:text-[32px]">
              {t(titleKey)}
            </h3>

            {/* Subtitle */}
            <p
              className="font-black italic mt-1 lg:leading-tight text-sm lg:text-xl"
              style={{ color: subtitleColor }}
            >
              {t(subtitleKey)}
            </p>
          </div>

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

        {/* Image */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-[65%] lg:h-[80%] pointer-events-none z-10">
          <Image
            src={image}
            alt=""
            fill
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </Card>
  );
}
