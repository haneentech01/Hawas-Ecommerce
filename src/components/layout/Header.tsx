"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/src/i18n/routing";
import { Search, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/src/constants/navigation";
import IconButton from "@/src/components/shared/IconButton";
import { Button } from "@/src/components/ui/button";
import LanguageToggle from "./LanguageToggle";
import CountrySelector from "./CountrySelector";

import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { cn } from "@/src/lib/utils";

const Logo = ({ isRtl }: { isRtl: boolean }) => (
  <Link
    href="/"
    className="relative h-8 w-24 md:h-10 md:w-32 lg:w-[149px] lg:h-[50px]"
  >
    <Image
      src={isRtl ? "/images/hawas.png" : "/images/hawasEn.png"}
      alt="Hawas"
      fill
      className="object-contain"
      priority
    />
  </Link>
);

const NavLinks = ({
  className,
  pathname,
  t,
}: {
  className?: string;
  pathname: string;
  t: (key: string) => string;
}) => (
  <nav
    className={cn(
      "flex items-center gap-9 font-semibold text-white/70",
      className,
    )}
  >
    {NAV_LINKS.map((link) => {
      const isActive = pathname === link.href;
      return (
        <Link
          key={link.id}
          href={link.href}
          className={cn(
            "transition-colors font-bold text-xl lg:text-[22px] hover:text-white",
            isActive && "text-white",
          )}
        >
          {t(link.id)}
        </Link>
      );
    })}
  </nav>
);

const ActionButtons = ({
  showLoginOnMobile = false,
  t,
  setIsSearchActive,
}: {
  showLoginOnMobile?: boolean;
  t: (key: string) => string;
  setIsSearchActive: (active: boolean) => void;
}) => (
  <div className="flex flex-col md:flex-row items-center gap-6">
    <div className="flex flex-col lg:flex-row items-center gap-6">
      <div className="flex flex-col lg:flex-row items-center gap-5">
        <LanguageToggle />
        <CountrySelector />
      </div>
      <IconButton
        size="sm"
        aria-label={t("search")}
        onClick={() => setIsSearchActive(true)}
      >
        <Search className="h-4 w-4" />
      </IconButton>
    </div>

    <Button
      variant="outline"
      rounded="full"
      className={cn(
        "border-white/20 flex justify-center items-center rounded-[14px] bg-transparent py-5 px-9 text-lg lg:text-[22px] font-bold text-white hover:bg-white/10",
        !showLoginOnMobile && "inline-flex",
      )}
    >
      {t("login")}
    </Button>
  </div>
);

const SearchBar = ({
  t,
  setIsSearchActive,
}: {
  t: (key: string) => string;
  setIsSearchActive: (active: boolean) => void;
}) => (
  <div className="absolute inset-0 z-50 flex items-center bg-[#1C1A1B] px-4 py-3 animate-in fade-in slide-in-from-top-4 duration-300">
    <div className="container mx-auto flex h-full items-center gap-4 rounded-[20px] bg-[#D9D9D9] p-2 pr-4 shadow-lg">
      <Button
        className="h-full rounded-[14px] bg-[#111111] px-10 text-xl font-bold text-white hover:bg-[#111111]/90"
        onClick={() => setIsSearchActive(false)}
      >
        {t("search_btn.search")}
      </Button>
      <input
        type="text"
        placeholder={t("search_btn.search_placeholder")}
        className="flex-1 bg-transparent px-4 text-xl font-medium text-[#111111] outline-none placeholder:text-[#111111]/60"
        autoFocus
      />
      <button
        onClick={() => setIsSearchActive(false)}
        className="ml-2 flex h-8 w-8 items-center justify-center rounded-full text-[#111111]/40 hover:bg-[#111111]/10 hover:text-[#111111]"
      >
        <X className="h-6 w-6" />
      </button>
    </div>
  </div>
);

export default function Header() {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const locale = useLocale();
  const isRtl = locale === "ar";
  const isProductPage = pathname.includes("/product");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 w-full shrink-0",
        isScrolled
          ? "bg-[#1C1A1B]/80 backdrop-blur-md"
          : isProductPage
            ? "absolute top-0 bg-transparent border-none py-2"
            : "bg-[#1C1A1B] py-2",
      )}
    >
      {isSearchActive && (
        <SearchBar t={t} setIsSearchActive={setIsSearchActive} />
      )}

      {/* Desktop Header */}
      <div
        className={cn(
          "hidden container mx-auto lg:flex items-center justify-between gap-4 px-5 py-6 transition-opacity duration-300",
          isSearchActive ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
      >
        <div className="flex items-center lg:gap-[95px]">
          <Logo isRtl={isRtl} />
          <NavLinks className="hidden lg:flex" pathname={pathname} t={t} />
        </div>
        <ActionButtons t={t} setIsSearchActive={setIsSearchActive} />
      </div>

      {/* Mobile Header */}
      <div
        className={cn(
          "container mx-auto flex items-center justify-between gap-4 px-4 py-4 lg:hidden transition-opacity duration-300",
          isSearchActive ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
      >
        <Logo isRtl={isRtl} />
        <div className="flex items-center gap-4 mx-5">
          <DropdownMenu open={open} onOpenChange={setOpen}>
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
                  return (
                    <Link
                      key={link.id}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "transition-colors font-bold text-xl text-white/70 hover:text-white py-2",
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
                t={t}
                setIsSearchActive={setIsSearchActive}
                showLoginOnMobile
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
