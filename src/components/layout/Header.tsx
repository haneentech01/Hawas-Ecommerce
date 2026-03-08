"use client";

import { useHeader } from "@/src/hooks/useHeader";
import { cn } from "@/src/lib/utils";
import { Logo } from "./Header/Logo";
import { NavLinks } from "./Header/NavLinks";
import { ActionButtons } from "./Header/ActionButtons";
import { SearchBar } from "./Header/SearchBar";
import { MobileMenu } from "./Header/MobileMenu";

export default function Header() {
  const {
    isRtl,
    isSearchActive,
    setIsSearchActive,
    isScrolled,
    isProductPage,
    isAuthPage,
  } = useHeader();

  return (
    <header
      className={cn(
        isAuthPage
          ? cn(
              "fixed top-0 z-50 transition-all duration-300 w-full shrink-0",
              isScrolled
                ? "bg-[#1C1A1B]/80 backdrop-blur-md"
                : "bg-transparent border-none",
            )
          : cn(
              "sticky top-0 z-50 transition-all duration-300 w-full shrink-0",
              isScrolled
                ? "bg-[#1C1A1B]/80 backdrop-blur-md"
                : isProductPage
                  ? "absolute top-0 bg-transparent border-none"
                  : "bg-[#1C1A1B]",
            ),
      )}
    >
      {isSearchActive && <SearchBar setIsSearchActive={setIsSearchActive} />}

      {/* Desktop Header */}
      <div
        className={cn(
          "hidden container mx-auto lg:flex items-center justify-between gap-4",
          isSearchActive ? "opacity-0 pointer-events-none" : "opacity-100",
          "lg:px-10 xl:px-[122px] pt-[30px] pb-[20px] transition-opacity duration-300",
        )}
      >
        <div className="flex items-center lg:gap-[95px] h-[68px]">
          <Logo isRtl={isRtl} />
          <NavLinks className="hidden lg:flex" />
        </div>
        <ActionButtons setIsSearchActive={setIsSearchActive} />
      </div>

      {/* Mobile Header */}
      <div
        className={cn(
          "container mx-auto flex items-center justify-between gap-4 px-4 py-4 lg:hidden transition-opacity duration-300",
          isSearchActive ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
      >
        <Logo isRtl={isRtl} />
        <MobileMenu isRtl={isRtl} setIsSearchActive={setIsSearchActive} />
      </div>
    </header>
  );
}
