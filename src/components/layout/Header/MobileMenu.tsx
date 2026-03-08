"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/src/i18n/routing";
import { Menu } from "lucide-react";
import { NAV_LINKS, CATEGORIES } from "@/src/constants/navigation";
import { cn } from "@/src/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuSeparator,
} from "@/src/components/ui/dropdown-menu";
import { ActionButtons } from "./ActionButtons";

interface MobileMenuProps {
  isRtl: boolean;
  setIsSearchActive: (active: boolean) => void;
}

export const MobileMenu = ({ isRtl, setIsSearchActive }: MobileMenuProps) => {
  const t = useTranslations("navigation");
  const catT = useTranslations("navigation.categories_list");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-4 mx-5 lg:hidden">
      <DropdownMenu
        open={open}
        onOpenChange={setOpen}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <DropdownMenuTrigger asChild>
          <button className="text-white outline-none relative">
            <Menu className="h-6 w-6" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          align="start"
          className={cn(
            "absolute w-56 bg-[#1C1A1B] border-white/10 p-4 mt-2",
            isRtl ? "-left-5" : "-right-10",
          )}
        >
          <nav className="flex flex-col items-center gap-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const isCategories = link.id === "categories";

              if (isCategories) {
                return (
                  <DropdownMenuSub key={link.id}>
                    <DropdownMenuSubTrigger
                      className={cn(
                        "transition-colors font-bold text-xl text-white/70 hover:text-white py-2 flex items-center gap-1 w-full justify-center data-[state=open]:text-white [&_svg]:hidden",
                        isActive && "text-white",
                      )}
                    >
                      {t(link.id)}
                      <Image
                        src="/images/dropDown.png"
                        alt=""
                        width={10}
                        height={10}
                        className="object-contain mt-1"
                      />
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="bg-[#1C1A1B] border-white/10 min-w-[220px] p-2">
                        {CATEGORIES.map((cat) => (
                          <DropdownMenuItem
                            key={cat.id}
                            onClick={() => setOpen(false)}
                            asChild
                          >
                            <Link
                              href={`/categories?type=${cat.id}`}
                              className="w-full cursor-pointer text-white/70 hover:text-white hover:bg-white/5 font-bold text-lg py-3 px-4 flex items-center justify-between gap-3 mb-1 rounded-lg"
                            >
                              <span>{catT(cat.id)}</span>
                              <div className="w-6 h-6 rounded bg-[#D9D9D9] flex items-center justify-center">
                                <Image
                                  src={cat.image}
                                  alt={cat.id}
                                  width={20}
                                  height={20}
                                  className="w-5 h-5 object-contain"
                                />
                              </div>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                );
              }

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "transition-colors font-bold text-xl text-white/70 hover:text-white py-2 flex items-center gap-2 justify-center",
                    isActive && "text-white",
                  )}
                >
                  {t(link.id)}
                </Link>
              );
            })}
          </nav>

          <DropdownMenuSeparator />

          <ActionButtons
            setIsSearchActive={setIsSearchActive}
            showLoginOnMobile
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
