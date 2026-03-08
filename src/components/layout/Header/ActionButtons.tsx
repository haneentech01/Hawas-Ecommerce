"use client";

import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import IconButton from "@/src/components/shared/IconButton";
import { Button } from "@/src/components/ui/button";
import LanguageToggle from "../LanguageToggle";
import CountrySelector from "../CountrySelector";
import { cn } from "@/src/lib/utils";
import { Link } from "@/src/i18n/routing";

interface ActionButtonsProps {
  showLoginOnMobile?: boolean;
  setIsSearchActive: (active: boolean) => void;
}

export const ActionButtons = ({
  showLoginOnMobile = false,
  setIsSearchActive,
}: ActionButtonsProps) => {
  const t = useTranslations("navigation");

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6">
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

      <Link href="/login">
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
      </Link>
    </div>
  );
};
