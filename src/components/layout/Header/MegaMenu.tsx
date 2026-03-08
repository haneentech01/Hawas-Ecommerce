"use client";

import Image from "next/image";
import { Link } from "@/src/i18n/routing";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { CATEGORIES } from "@/src/constants/navigation";
import {
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/src/components/ui/dropdown-menu";

interface MegaMenuProps {
  isRtl: boolean;
}

export const MegaMenu = ({ isRtl }: MegaMenuProps) => {
  const catT = useTranslations("navigation.categories_list");
  const searchParams = useSearchParams();
  const activeType = searchParams.get("type");

  return (
    <DropdownMenuContent
      side="bottom"
      align="center"
      sideOffset={10}
      className={cn(
        "w-screen max-w-none",
        "bg-black backdrop-blur-xl",
        "border-t border-[#2A2A2A]",
        "shadow-[0_25px_60px_rgba(0,0,0,0.6)]",
        "rounded-b-[32px]",
        "z-50",
        "overflow-visible",
      )}
    >
      <DropdownMenuArrow className="fill-black" width={20} height={10} />

      <div className="max-w-[1400px] mx-auto py-[42px] px-6 lg:px-16 xl:px-[122px]">
        <div
          className="
            grid 
            grid-cols-2 
            md:grid-cols-4 
            lg:grid-cols-5 
            xl:grid-cols-7
            gap-x-[25px] 
            gap-y-[20px]
            justify-items-start
          "
        >
          {CATEGORIES.map((cat) => {
            const isActiveItem = activeType === cat.id;

            return (
              <DropdownMenuItem
                key={cat.id}
                asChild
                className="p-0 focus:bg-transparent focus:text-inherit cursor-pointer"
              >
                <Link
                  href={`/categories?type=${cat.id}`}
                  className={cn(
                    "group flex items-center justify-start cursor-pointer",
                    "w-[147px] h-[44px]",
                    "px-[14px]",
                    "rounded-[10px]",
                    "transition-all duration-200",
                    isActiveItem
                      ? "bg-white text-black"
                      : "text-[#999898] hover:bg-white focus:bg-white hover:text-black focus:text-black",
                  )}
                >
                  <div
                    className={cn(
                      "w-[26px] h-[26px]",
                      "rounded-[8px]",
                      "flex items-center justify-center",
                      "transition-colors duration-200",
                      isActiveItem
                        ? "bg-black"
                        : "bg-[#D9D9D9] group-hover:bg-black group-focus:bg-black",
                    )}
                  >
                    <Image
                      src={cat.image}
                      alt={cat.id}
                      width={18}
                      height={18}
                      className="object-contain"
                    />
                  </div>
                  <span
                    className={cn(
                      "font-bold whitespace-nowrap",
                      isRtl ? "text-2xl" : "text-xl",
                    )}
                  >
                    {catT(cat.id)}
                  </span>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </div>
      </div>
    </DropdownMenuContent>
  );
};
