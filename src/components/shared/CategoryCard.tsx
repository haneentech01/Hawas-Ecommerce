"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useTranslations } from "use-intl";

const categories = [
  { id: "all", image: "/images/all_categories.png" },
  { id: "keyboards", image: "/images/keyboards.png" },
  { id: "headphones", image: "/images/smallHeadphones.png" },
  { id: "mouses", image: "/images/mouses.png" },
  { id: "watches", image: "/images/digitalWatches.png" },
  { id: "chairs", image: "/images/gamingChairs.png" },
  { id: "laptops", image: "/images/laptops.png" },
  { id: "phones", image: "/images/phones.png" },
  { id: "electronics", image: "/images/electronics.png" },
];

function CategoryCard() {
  const t = useTranslations();
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const handleScrollTabs = (direction: "next" | "prev") => {
    if (!tabsRef.current) return;

    const dir =
      typeof document !== "undefined" ? document.documentElement.dir : "rtl";

    const amount = 250;
    let value = amount;

    // في RTL: next يعني نتحرك لليسار (سالب)، prev لليمين (موجب)
    if (dir === "rtl") {
      value = direction === "next" ? -amount : amount;
    } else {
      // في LTR نعكس
      value = direction === "next" ? amount : -amount;
    }

    tabsRef.current.scrollBy({
      left: value,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mb-6 lg:mb-12 mx-auto">
      {/* التابات القابلة للسكرول */}
      <div
        ref={tabsRef}
        className="
                  flex flex-nowrap items-center justify-start gap-2 lg:gap-6
                  overflow-x-auto pb-4
                  no-scrollbar mx-2 lg:mx-[17px]
                  cursor-grab active:cursor-grabbing select-none
                "
        onMouseDown={(e) => {
          if (!tabsRef.current) return;
          tabsRef.current.dataset.isDown = "true";
          tabsRef.current.dataset.startX = String(
            e.pageX - tabsRef.current.offsetLeft,
          );
          tabsRef.current.dataset.scrollLeft = String(
            tabsRef.current.scrollLeft,
          );
        }}
        onMouseLeave={() => {
          if (!tabsRef.current) return;
          tabsRef.current.dataset.isDown = "false";
        }}
        onMouseUp={() => {
          if (!tabsRef.current) return;
          tabsRef.current.dataset.isDown = "false";
        }}
        onMouseMove={(e) => {
          if (!tabsRef.current) return;
          if (tabsRef.current.dataset.isDown !== "true") return;
          e.preventDefault();
          const x = e.pageX - tabsRef.current.offsetLeft;
          const walk = (x - Number(tabsRef.current.dataset.startX)) * 2; // scroll-fast
          tabsRef.current.scrollLeft =
            Number(tabsRef.current.dataset.scrollLeft) - walk;
        }}
      >
        {categories.map((cat) => {
          const isActive = activeTab === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`
                        flex items-center justify-start gap-3 px-3 py-3 
                        rounded-[10px] transition-all duration-300
                         h-[44px] w-full
                        ${isRtl ? "max-w-[147px]" : "max-w-48"}
                        ${
                          isActive
                            ? "bg-white text-black"
                            : "bg-black text-[#8C8C8C] hover:bg-[#0c0c0c]"
                        }
                      `}
            >
              <div
                className={`
                        w-[26px] h-[26px] rounded-[4px] flex items-center justify-center transition-all duration-300
                        ${isActive ? "bg-black" : "bg-[#D9D9D9]"}
                      `}
              >
                <Image
                  src={cat.image}
                  alt={cat.id}
                  width={39}
                  height={30}
                  className={`w-12 h-9 object-contain transition-all duration-300 ${
                    isActive ? "" : ""
                  }`}
                />
              </div>
              <span
                className={`font-bold whitespace-nowrap ${isRtl ? "text-2xl" : "text-lg"}`}
              >
                {t(`navigation.categories_list.${cat.id}`)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Buttons */}
      <div
        className="bg-black text-white hidden lg:flex items-center justify-center
                  hover:bg-black/90 z-20 
                  rounded-[25px] "
      >
        {/* Next Button */}
        <button
          type="button"
          onClick={() => handleScrollTabs("prev")}
          className={`
                  absolute top-1/3 -translate-y-1/2
                  -left-[19px] rtl:-right-[19px] rtl:left-auto
                  w-[26px] h-[26px] bg-black border border-black
                  rounded-[5px]
                  ${isRtl ? "" : "rotate-180"} 
                `}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Prev Button */}
        <button
          type="button"
          onClick={() => handleScrollTabs("next")}
          className={`
                  absolute top-1/3 -translate-y-1/2
                  -right-[19px] rtl:-left-[19px] rtl:right-auto
                  w-[26px] h-[26px] bg-black border border-black
                  rounded-[5px]
                   ${isRtl ? "" : "rotate-180"}
                `}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default CategoryCard;
