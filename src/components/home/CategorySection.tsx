"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Product } from "@/src/types/catalog";
import CategoryCard from "../shared/CategoryCard";
import { useCategorySection } from "@/src/hooks/useCategorySection";
import { CategoryHeader } from "./CategorySection/CategoryHeader";
import { ProductSlider } from "./CategorySection/ProductSlider";
import { cn } from "@/src/lib/utils";

interface CategorySectionProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  bgImage?: string;
  className?: string;
}

export default function CategorySection({
  products,
  title,
  subtitle,
  bgImage = "/images/category_section_bg.png",
  className,
}: CategorySectionProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === "ar";

  const { activeTab, productsRef, filteredProducts, handleScroll } =
    useCategorySection({ products });

  const displayTitle = title || t("home.categorySection.title");
  const displaySubtitle = subtitle || t("home.categorySection.subtitle");

  return (
    <section
      className={cn(
        "relative py-10 xl:pb-[140px] mx-auto md:mx-12 xl:mx-auto xl:px-[122px] px-5",
        className,
      )}
    >
      <CategoryHeader title={displayTitle} />

      <div className="relative xl:h-[491px] flex flex-col items-center overflow-visible">
        <Image
          src={bgImage}
          alt="section background"
          fill
          className="object-fill absolute inset-0 z-0"
          priority
        />

        <div className="relative z-10 pt-[62px] pb-10 w-full flex flex-col items-center">
          <p className="text-2xl md:text-3xl text-white font-bold mb-6">
            {displaySubtitle}
          </p>

          <div className="max-w-[878px] w-full mx-auto mb-[47px]">
            <CategoryCard />
          </div>

          <ProductSlider
            products={filteredProducts.slice(0, 5)}
            isRtl={isRtl}
            onScroll={handleScroll}
            productsRef={productsRef}
          />
        </div>
      </div>
    </section>
  );
}
