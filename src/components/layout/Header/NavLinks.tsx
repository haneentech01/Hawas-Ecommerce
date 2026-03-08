"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/src/i18n/routing";
import { NAV_LINKS } from "@/src/constants/navigation";
import { cn } from "@/src/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { MegaMenu } from "./MegaMenu";
import { Suspense } from "react";

interface NavLinksContentProps {
  className?: string;
}

const NavLinksContent = ({ className }: NavLinksContentProps) => {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <nav
      className={cn(
        "flex items-center gap-9 font-bold text-[#999898]",
        className,
      )}
    >
      {NAV_LINKS.map((link) => {
        const isActive = pathname === link.href;
        const isCategories = link.id === "categories";

        if (isCategories) {
          return (
            <DropdownMenu key={link.id} dir={isRtl ? "rtl" : "ltr"}>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "transition-colors font-bold text-xl lg:text-[24px] hover:text-white",
                    "data-[state=open]:text-white",
                    "flex items-center gap-2 outline-none",
                    isActive && "text-white",
                  )}
                >
                  {t(link.id)}
                  <Image
                    src="/images/dropDown.png"
                    alt=""
                    width={12}
                    height={12}
                    className="object-contain"
                  />
                </button>
              </DropdownMenuTrigger>
              <MegaMenu isRtl={isRtl} />
            </DropdownMenu>
          );
        }

        return (
          <Link
            key={link.id}
            href={link.href}
            className={cn(
              "transition-colors font-bold text-xl lg:text-[28px] hover:text-white flex items-center gap-2",
              isActive && "text-white",
            )}
          >
            {t(link.id)}
          </Link>
        );
      })}
    </nav>
  );
};

export const NavLinks = ({ className }: NavLinksContentProps) => (
  <Suspense fallback={<div className="h-10 w-32 animate-pulse bg-white/5" />}>
    <NavLinksContent className={className} />
  </Suspense>
);
