"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectArrow,
} from "@/src/components/ui/select";
import { cn } from "@/src/lib/utils";

const COUNTRIES = [
  { id: "palestine", code: "ps", flag: "/images/flags/ps.png" },
  { id: "saudiArabia", code: "sa", flag: "/images/flags/sa.png" },
  { id: "uae", code: "ae", flag: "/images/flags/ae.png" },
];

export default function CountrySelector() {
  const t = useTranslations("navigation");
  const [selectedCountry, setSelectedCountry] = React.useState(COUNTRIES[0].id);

  return (
    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
      <SelectTrigger
        hideIcon
        className="w-auto border-none bg-transparent p-0 text-white 
                  text-xl md:text-2xl font-bold 
                  focus:ring-0 outline-none flex items-center justify-start"
      >
        <div className="flex items-center px-1">
          <SelectValue placeholder={t("selectCountry")} />
        </div>
        <Image
          src="/images/dropDown.png"
          alt=""
          width={12}
          height={12}
          className="object-contain"
        />
      </SelectTrigger>
      <SelectContent className="bg-[#111111] shadow-2xl backdrop-blur-2xl min-w-[160px] p-2 rounded-xl">
        {COUNTRIES.map((country) => (
          <SelectItem
            key={country.id}
            value={country.id}
            hideIndicator
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors mb-1 last:mb-0",
              selectedCountry === country.id
                ? "bg-white text-black focus:bg-white focus:text-black"
                : "text-white/70 hover:text-white focus:text-white",
            )}
          >
            <div className="flex items-center gap-3 w-full">
              <div className="relative h-6 w-10 shrink-0 overflow-hidden rounded-sm border border-black/10">
                <Image
                  src={country.flag}
                  alt={country.id}
                  fill
                  className="object-fill"
                />
              </div>
              <span className="font-bold text-2xl">
                {t(`countries.${country.id}`)}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
