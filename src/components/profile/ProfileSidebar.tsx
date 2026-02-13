"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/src/i18n/routing";
import { cn } from "@/src/lib/utils";
import {
  User,
  MapPin,
  Package,
  FileText,
  Lock,
  CreditCard,
} from "lucide-react";
import { useRef, useState } from "react";

const ProfileSidebar = () => {
  const t = useTranslations("profile.sidebar");
  const pathname = usePathname();
  const locale = useLocale();
  const isRtl = locale === "ar";
  const scrollRef = useRef<HTMLDivElement>(null);

  // Drag to scroll logic
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast factor
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const menuItems = [
    { id: "personal_data", href: "/profile", icon: User },
    { id: "shipping_address", href: "/profile/address", icon: MapPin },
    { id: "my_orders", href: "/profile/orders", icon: Package },
    { id: "my_invoices", href: "/profile/invoices", icon: FileText },
    { id: "change_password", href: "/profile/change-password", icon: Lock },
    { id: "payment_cards", href: "/profile/cards", icon: CreditCard },
  ];

  return (
    <div className="w-full md:w-auto shrink-0 z-40">
      {/* Mobile Breadcrumbs Style (xs, sm) */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={cn(
          "flex md:hidden overflow-x-auto no-scrollbar gap-2 py-2 mb-4 px-2 bg-[#000000] rounded-[10px] border border-white/5 shadow-lg",
          isDragging ? "cursor-grabbing" : "cursor-grab active:cursor-grabbing",
        )}
      >
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-[8px] whitespace-nowrap transition-all duration-200 shrink-0",
                isActive
                  ? "bg-[#111111] text-[#BBBABB] border border-white/10"
                  : "text-white/70 hover:text-white",
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-bold">{t(item.id)}</span>
            </Link>
          );
        })}
      </div>

      {/* Tablet Icon Rail (md) & Desktop Full Sidebar (lg) */}
      <aside
        className={cn(
          "hidden md:flex flex-col bg-[#000000] rounded-[10px] shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/5 transition-all duration-300",
          "md:w-20 lg:w-[223px] lg:h-[522px]",
        )}
      >
        <div className="flex flex-col h-full py-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 w-full text-start p-4 transition-all duration-200",
                  isActive
                    ? "bg-[#111111] text-[#BBBABB]"
                    : "text-white hover:text-[#BBBABB] hover:bg-[#080808]",
                  "md:justify-center lg:justify-start",
                )}
                title={t(item.id)}
              >
                <Icon className="w-6 h-6 shrink-0 lg:hidden" />
                <span className="hidden lg:inline text-xl font-bold whitespace-nowrap">
                  {t(item.id)}
                </span>
              </Link>
            );
          })}
        </div>
      </aside>
    </div>
  );
};

export default ProfileSidebar;
