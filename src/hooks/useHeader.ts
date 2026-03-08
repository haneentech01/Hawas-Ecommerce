"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "@/src/i18n/routing";

export const useHeader = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isProductPage = pathname.includes("/product");
  const isLoginPage = pathname.includes("/login");
  const isRegisterPage = pathname.includes("/register");
  const isAuthPage = isLoginPage || isRegisterPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    pathname,
    isRtl,
    isSearchActive,
    setIsSearchActive,
    isScrolled,
    isProductPage,
    isLoginPage,
    isRegisterPage,
    isAuthPage,
  };
};
