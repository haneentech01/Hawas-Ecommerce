"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import { cn } from "@/src/lib/utils";

interface CartTabsProps {
  activeTab: "cart" | "orders";
}

export default function CartTabs({ activeTab }: CartTabsProps) {
  const t = useTranslations();

  return (
    <div className="flex items-center gap-[15px] mb-[25px]">
      <Link href="/cart">
        <button
          className={cn(
            "flex-1 rounded-[10px] text-x lg:text-2xl font-black transition-all",
            "text-center w-[147px] h-[44px]",
            activeTab === "cart"
              ? "bg-white text-black shadow-lg"
              : "text-[#8C8C8C] bg-black hover:text-white",
          )}
        >
          {t("navigation.cart")}
        </button>
      </Link>
      <Link href="/cart/orders">
        <button
          className={cn(
            "flex-1 rounded-[10px] text-xl lg:text-2xl font-black transition-all w-[147px] h-[44px]",
            activeTab === "orders"
              ? "bg-white text-black shadow-lg"
              : "text-[#8C8C8C] bg-black hover:text-white",
          )}
        >
          {t("navigation.track_orders")}
        </button>
      </Link>
    </div>
  );
}
