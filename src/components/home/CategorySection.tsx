"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRef, useState } from "react";
import Image from "next/image";
import {
  ShoppingCart,
  Star,
  Bookmark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Product } from "@/src/types/catalog";
import ProductCard from "@/src/components/shared/ProductCard";

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

const products: Product[] = [
  {
    id: 1,
    category: "keyboards",
    name: "كيبورد ابل اصلي",
    titleKey: "home.categorySection.products.appleKeyboard",
    status: "available",
    rating: 4.5,
    price: 200,
    oldPrice: 250,
    currency: "$",
    image: "/images/keyboard.png",
    bgColor: "from-[#5F2287] to-[#170821]",
    colors: ["#00FF85", "#FFCC00", "#FF4E50"],
    code: "#24562",
  },
  {
    id: 2,
    category: "controllers",
    name: "ايدي بلايستيشن أصلية",
    titleKey: "home.categorySection.products.playStationController",
    status: "soldOut",
    rating: 4.2,
    price: 230,
    oldPrice: 260,
    image: "/images/playStation.png",
    bgColor: "from-[#FF5B37] to-[#C61F0D]",
    colors: ["#FF4E50", "#FF9A00", "#FFD54F"],
    code: "#87415",
  },
  {
    id: 3,
    category: "electronics",
    name: "كاميرا احترافية",
    titleKey: "home.categorySection.products.professionalCamera",
    status: "available",
    rating: 4.8,
    price: 935,
    oldPrice: 1100,
    image: "/images/keyboardIOS.png",
    bgColor: "from-[#E9B77A] to-[#A66328]",
    colors: ["#FBC02D", "#FF8F00", "#6D4C41"],
    code: "#93652",
  },
  {
    id: 4,
    category: "headphones",
    name: "سماعات جيمنج أصلية",
    titleKey: "home.categorySection.products.gamingHeadphones",
    status: "available",
    rating: 4.7,
    price: 205,
    oldPrice: 240,
    image: "/images/headphones.png",
    bgColor: "from-[#3F269B] to-[#14072D]",
    colors: ["#00FF85", "#18FFFF", "#7C4DFF"],
    code: "#55214",
  },
  {
    id: 5,
    category: "earphones",
    name: "سماعات لاسلكية",
    titleKey: "home.categorySection.products.wirelessEarphones",
    status: "soldOut",
    rating: 4.1,
    price: 180,
    oldPrice: 220,
    image: "/images/earphonebg.png",
    bgColor: "from-[#FF4D4D] to-[#C80F0F]",
    colors: ["#FF4E50", "#FF9A00", "#FFFFFF"],
    code: "#17735",
  },
];

export default function CategorySection() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState("all");
  const locale = useLocale();
  const isRtl = locale === "ar";

  // ref على شريط التصنيفات
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const productsRef = useRef<HTMLDivElement | null>(null);

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

  // سكرول كروت المنتجات
  const handleScrollProducts = (direction: "next" | "prev") => {
    if (!productsRef.current) return;

    const dir =
      typeof document !== "undefined" ? document.documentElement.dir : "rtl";

    const amount = 280; // عرض كرت تقريباً + الـ gap
    let value = amount;

    if (dir === "rtl") {
      value = direction === "next" ? -amount : amount;
    } else {
      value = direction === "next" ? amount : -amount;
    }

    productsRef.current.scrollBy({
      left: value,
      behavior: "smooth",
    });
  };

  // فلترة المنتجات حسب التاب النشط (احذف الفلتر لو بدك كل المنتجات)
  const filteredProducts = products.filter(
    (p) => p.category === activeTab || activeTab === "all",
  );

  return (
    <section className="relative py-10 min-h-[600px]">
      <Image
        src="/images/category_section_bg.png"
        alt="category section bg"
        fill
        className="object-cover absolute inset-0 z-0"
        priority
      />

      <div className="relative z-10">
        {/* العنوان الرئيسي */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white -mt-16 mb-6">
            {t("home.categorySection.title")}
          </h2>
        </div>

        <div className="relative container mx-auto text-center text-white">
          <p className="text-2xl md:text-3xl text-white font-bold mb-4">
            {t("home.categorySection.subtitle")}
          </p>

          {/* ================== شريط التصنيفات ================== */}
          <div className="relative mb-6 lg:mb-12 max-w-[878px] mx-auto">
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
                            : "bg-[#1C1A1B] text-[#999898] hover:bg-[#2A2829]"
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
                  w-[26px] h-[26px] border border-black
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
                  w-[26px] h-[26px] border border-black
                   ${isRtl ? "" : "rotate-180"}
                `}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ================== Product Grid ================== */}
          <div className="relative mt-4 mx-3 md:mx-[68px] flex items-center gap-3">
            {/* سطر الكروت */}
            <div
              ref={productsRef}
              className="flex gap-3 overflow-x-auto xl:overflow-hidden scroll-smooth hide-scrollbar px-1 py-4 w-full"
              style={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  className="w-[calc(50%-6px)] md:w-[calc(33.333%-8px)] lg:w-[calc(25%-9px)]"
                />
              ))}
            </div>

            {/* أزرار تحريك الكروت (يمين ويسار) */}
            <div className="block">
              {/* يسار (للرجوع/التالي حسب الاتجاه) */}
              <button
                type="button"
                onClick={() => handleScrollProducts("next")}
                className={`
                       absolute top-1/2 -translate-y-1/2 z-20
                       ${isRtl ? "left-0 xl:-left-9 rotate-180" : "right-0 xl:-right-9"}
                       bg-[#1C1A1B] text-white flex items-center justify-center
                       hover:bg-black/90
                       w-[26px] h-[26px]
                       border border-[#1C1A1B]
                       rounded-[5px]
                       `}
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* يمين (للتقدم/السابق) */}
              <button
                type="button"
                onClick={() => handleScrollProducts("prev")}
                className={`
                 absolute top-1/2 -translate-y-1/2 z-20
                 ${isRtl ? "right-0 xl:-right-11 rotate-180" : "left-0 xl:-left-11"}
                 bg-[#1C1A1B] text-white flex items-center justify-center
                 hover:bg-black/90
                 w-[26px] h-[26px]
                 border border-[#1C1A1B]
                 rounded-[5px]
                `}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
