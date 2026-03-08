"use client";

import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface SearchBarProps {
  setIsSearchActive: (active: boolean) => void;
}

export const SearchBar = ({ setIsSearchActive }: SearchBarProps) => {
  const t = useTranslations("navigation");

  return (
    <div
      className="absolute inset-0 z-50 flex items-center 
    bg-[#1C1A1B] px-4 py-8 
    animate-in fade-in slide-in-from-top-4 
    duration-300"
    >
      <div
        className="container mx-auto flex h-full items-center gap-4 
      rounded-[20px] bg-[#D9D9D9] p-2 pr-4 shadow-lg"
      >
        <Button
          className="h-full rounded-[14px] bg-[#111111] px-10 text-xl font-bold
           text-white hover:bg-[#111111]/90"
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
};
