"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/src/i18n/routing";
import { cn } from "@/src/lib/utils";

const ProfileSidebar = () => {
  const t = useTranslations("profile.sidebar");
  const pathname = usePathname();
  const locale = useLocale();
  const isRtl = locale === "ar";

  const menuItems = [
    { id: "personal_data", href: "/profile" },
    { id: "shipping_address", href: "/profile/address" },
    { id: "my_orders", href: "/profile/orders" },
    { id: "my_invoices", href: "/profile/invoices" },
    { id: "change_password", href: "/profile/change-password" },
    { id: "payment_cards", href: "/profile/cards" },
  ];

  return (
    <aside className="w-full lg:w-[223px] shrink-0">
      <div
        className="bg-[#000000] lg:h-[522px] p-0 lg:p-0 rounded-[10px]
                  flex flex-col gap-2 shadow-[0_0_20px_rgba(0,0,0,0.5)] 
                  "
      >
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "w-full text-start p-4 rounded-tr-[10px] rounded-tl-[10px] text-xl lg:text-2xl font-bold transition-all duration-200",
                isActive
                  ? "bg-[#111111] text-[#BBBABB] "
                  : "text-white hover:text-[#BBBABB] hover:bg-[#080808]",
              )}
            >
              {t(item.id)}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default ProfileSidebar;
