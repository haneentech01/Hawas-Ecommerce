"use client";

import { useRouter, usePathname } from "@/src/i18n/routing";
import { useLocale } from "next-intl";

const LanguageToggle = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const toggleLanguage = () => {
    const newLang = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: newLang });
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white"
      title={locale === "en" ? "Switch to Arabic" : "تبديل إلى الإنجليزية"}
      aria-label="Toggle language"
    >
      <span className="text-xl font-bold">{locale === "en" ? "EN" : "AR"}</span>
    </button>
  );
};

export default LanguageToggle;
