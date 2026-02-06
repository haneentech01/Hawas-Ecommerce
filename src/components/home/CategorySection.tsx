"use client";

import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import Image from "next/image";
import {
  ShoppingCart,
  Star,
  Bookmark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Product, ProductStatus } from "@/src/types/catalog";

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

    const amount = 260; // تقريباً عرض كرت + الـ gap
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
                        max-w-[147px] h-[44px] w-full
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
                    <span className="text-2xl font-bold whitespace-nowrap">
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
                className="
                  absolute top-1/2 -translate-y-1/2
                  -left-[19px] rtl:-right-[19px] rtl:left-auto
                  w-[26px] h-[26px] border border-black
                 
                "
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Prev Button */}
              <button
                type="button"
                onClick={() => handleScrollTabs("next")}
                className="
                  absolute top-1/2 -translate-y-1/2
                  -right-[19px] rtl:-left-[19px] rtl:right-auto
                  w-[26px] h-[26px] border border-black
                  
                "
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
              {filteredProducts.map((product) => {
                const status: ProductStatus = product.status ?? "available"; // قيمة افتراضية
                const colors =
                  product.colors && product.colors.length > 0
                    ? product.colors
                    : ["#00FF85", "#FFCC00", "#FF4E50"]; // ألوان افتراضية
                const code = product.code ?? "#00000";

                return (
                  <div
                    key={product.id}
                    className="
                      group relative bg-white rounded-[12px] overflow-hidden
                      flex-none 
                      w-[calc(50%-6px)] md:w-[calc(33.333%-8px)] lg:w-[calc(25%-9px)]
                      h-auto pt-3
                    "
                  >
                    {/* حالة متوفر/منتهي */}
                    <div className="absolute top-3 right-0 z-20">
                      <span
                        className={`px-3 py-1 text-xs lg:text-sm rounded-tl-lg rounded-bl-lg font-bold ${
                          status === "available"
                            ? "bg-black/80 text-white"
                            : "bg-white text-[#EC2D3C]"
                        }`}
                      >
                        {status === "available"
                          ? t("home.categorySection.status.available")
                          : t("home.categorySection.status.soldOut")}
                      </span>
                    </div>
                    {/* الجزء الملون + النقاط  */}
                    <div className="relative mx-[6px] h-[190px] md:h-[230px] lg:h-[310px] rounded-[15px] overflow-hidden">
                      {/* النقاط (ألوان المنتج) */}
                      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                        {colors.slice(0, 3).map((c, idx) => (
                          <span
                            key={idx}
                            className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>

                      {/* صورة المنتج */}
                      <div
                        className="absolute inset-0 z-0 flex items-center justify-center 
                      transition-transform duration-500 group-hover:scale-110
                      "
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-fill"
                          />
                        </div>
                      </div>
                    </div>

                    {/* المعلومات السفلية (أبيض) */}
                    <div className="px-4 pt-2 pb-[14px] flex flex-col gap-2 text-start">
                      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
                        {/* Product Name + Code */}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-black mb-1 truncate">
                            {product.name}
                          </h3>
                          <p className="text-base text-[#9D9D9D] font-bold">
                            {code}
                          </p>
                        </div>

                        {/* Product Rating + Save Icon */}
                        <div className="flex items-center gap-1">
                          <div className="flex items-center gap-1 px-2 py-1 rounded-[5px] bg-[#F4F4F4]">
                            <Star className="w-[14px] h-[14px] text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-bold text-black">
                              {product.rating.toFixed(1)}
                            </span>
                          </div>

                          <button className="bg-[#9DC0C8] p-1 rounded-[5px] text-[#308DA2] hover:bg-[#308DA2] hover:text-white transition-colors">
                            <Bookmark className="w-[14px] h-[14px]" />
                          </button>
                        </div>
                      </div>

                      {/* السعر + زر الشراء */}
                      <div className="flex flex-col lg:flex-row items-center justify-between gap-[10px]">
                        {/* Product Price + Old Price + Currency */}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-1">
                          {/* Product Price + Currency */}
                          <span className="text-lg font-bold text-black leading-tight">
                            {product.price}
                            {product.currency}
                          </span>
                          {/* Product Old Price + Currency */}
                          {product.oldPrice &&
                            product.oldPrice > product.price && (
                              <span className="text-xs text-gray-400 line-through font-bold">
                                {product.oldPrice}
                                {product.currency}
                              </span>
                            )}
                        </div>

                        {/* Add to Cart + Buy Now */}
                        <div className="flex items-center gap-1.5">
                          <button
                            className="bg-[#BDE1C1] p-2 rounded-[5px] text-[#58935F] hover:bg-[#58935F]
                                      hover:text-white transition-colors "
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                          <button className="bg-black text-white px-3 py-2 rounded-[5px] font-bold text-xs lg:text-sm hover:opacity-90 transition-opacity">
                            {t("home.categorySection.buyNow")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* أزرار تحريك الكروت (يمين ويسار) */}
            <div className="block">
              {/* يسار (للرجوع/التالي حسب الاتجاه) */}
              <button
                type="button"
                onClick={() => handleScrollProducts("next")}
                className="
                text-white flex items-center justify-center
                  hover:bg-black/90 z-20 
                 bg-[#1C1A1B] 
                 absolute top-1/2 -translate-y-1/2
                 left-0 rtl:right-auto rtl:left-0 
                 xl:left-[10px] xl:rtl:-left-6
                w-[26px] h-[26px] border border-[#1C1A1B]
                rounded-[5px] 
              "
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* يمين (للتقدم/السابق) */}
              <button
                type="button"
                onClick={() => handleScrollProducts("prev")}
                className="bg-[#1C1A1B]
                text-white flex items-center justify-center
                hover:bg-black/90 z-20 
                 absolute top-1/2 -translate-y-1/2
                 right-0 rtl:left-auto rtl:right-0
                 xl:-left-[10px] xl:rtl:-right-8 xl:right-auto
                w-[26px] h-[26px] border border-[#1C1A1B]
                rounded-[5px] 
              "
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
