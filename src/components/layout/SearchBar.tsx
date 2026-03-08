"use client";

import { AlignLeft, Search, RotateCcw } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/src/lib/utils";

interface SearchBarProps {
  showFilter?: boolean; // هل نعرض زر الفلترة أم لا
  onFilterClick?: () => void; // حدث اختياري عند الضغط على زر الفلترة
  onApplyFilters?: (filters: {
    date: string;
    price: string;
    alphabetical: string;
  }) => void;
  className?: string;
}

interface FilterPopoverProps {
  isOpen: boolean;
  isRtl: boolean;
  filters: { date: string; price: string; alphabetical: string };
  setFilters: (filters: any) => void;
  onApplyFilters?: (filters: any) => void;
  onClose: () => void;
  t: any;
}

const FilterPopover = ({
  isOpen,
  isRtl,
  filters,
  setFilters,
  onApplyFilters,
  onClose,
  t,
}: FilterPopoverProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "absolute top-[calc(100%+0px)] z-50 p-4 lg:p-5 w-full max-w-[374px] bg-black rounded-b-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10",
        isRtl ? "left-0" : "right-0",
      )}
    >
      {/* Floating Arrow Indicator 
          Precision positioning matching the INNER Filter Button:
          Button is Left-side (RTL) / Right-side (LTR).
          Order is [Search(Outer)] [Filter(Inner)].
          Approximate Search width is 95px (mobile) / 165px (lg).
          Gap is 8px.
          Offset = 12px (edge) + SearchWidth + 8px (gap) + half FilterWidth (25/30).
          RTL (from Left): ~140px (mobile) / ~207px (lg).
      */}
      <div
        className={cn(
          "absolute -top-[5px] w-5 h-5 bg-black border-t border-l border-white/10 rotate-45 z-20",
          isRtl
            ? "left-[114px] lg:left-[184px]"
            : "right-[160px] lg:right-[228px]",
        )}
      />

      {/* Glowing Background Blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xl -z-10" />

      <div className="space-y-0 relative z-10">
        <div className="grid grid-cols-1 gap-x-6 gap-y-4">
          {/* date added */}
          <div className="space-y-2">
            <h3 className="text-white font-bold text-lg text-start">
              {t("filter.date_added")}
            </h3>
            <div className={cn("flex gap-2", isRtl && "flex-row-reverse")}>
              <Button
                onClick={() => setFilters({ ...filters, date: "newest" })}
                className={cn(
                  "h-11 w-full rounded-[8px] text-base font-bold transition-all",
                  filters.date === "newest"
                    ? "bg-[#1C1A1B] text-white border border-cyan-500/50"
                    : "bg-[#141214] text-[#8C8C8C] hover:bg-[#1C1A1B]",
                )}
              >
                {t("filter.newest_to_oldest")}
              </Button>
              <Button
                onClick={() => setFilters({ ...filters, date: "oldest" })}
                className={cn(
                  "h-11 w-full rounded-[8px] text-base font-bold transition-all",
                  filters.date === "oldest"
                    ? "bg-[#1C1A1B] text-white border border-cyan-500/50"
                    : "bg-[#141214] text-[#8C8C8C] hover:bg-[#1C1A1B]",
                )}
              >
                {t("filter.oldest_to_newest")}
              </Button>
            </div>
          </div>

          {/* price */}
          <div className="space-y-2">
            <h3 className="text-white font-bold text-lg text-start">
              {t("filter.price")}
            </h3>
            <div className="flex gap-2">
              <Button
                onClick={() => setFilters({ ...filters, price: "low_high" })}
                className={cn(
                  "h-11 w-full rounded-[8px] text-base font-bold transition-all",
                  filters.price === "low_high"
                    ? "bg-[#1C1A1B] text-white border border-cyan-500/50"
                    : "bg-[#141214] text-[#8C8C8C] hover:bg-[#1C1A1B]",
                )}
              >
                {t("filter.low_to_high")}
              </Button>
              <Button
                onClick={() => setFilters({ ...filters, price: "high_low" })}
                className={cn(
                  "h-11 w-full rounded-[8px] text-base font-bold transition-all",
                  filters.price === "high_low"
                    ? "bg-[#1C1A1B] text-white border border-cyan-500/50"
                    : "bg-[#141214] text-[#8C8C8C] hover:bg-[#1C1A1B]",
                )}
              >
                {t("filter.high_to_low")}
              </Button>
            </div>
          </div>

          {/* alphabetical */}
          <div className="space-y-2">
            <h3 className="text-white font-bold text-lg text-start">
              {t("filter.alphabetical")}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => setFilters({ ...filters, alphabetical: "a_z" })}
                className={cn(
                  "h-11 rounded-[8px] text-base font-bold transition-all",
                  filters.alphabetical === "a_z"
                    ? "bg-[#1C1A1B] text-white border border-cyan-500/50"
                    : "bg-[#141214] text-[#8C8C8C] hover:bg-[#1C1A1B]",
                )}
              >
                {t("filter.a_z")}
              </Button>
              <Button
                onClick={() => setFilters({ ...filters, alphabetical: "z_a" })}
                className={cn(
                  "h-11 rounded-[8px] text-base font-bold transition-all",
                  filters.alphabetical === "z_a"
                    ? "bg-[#1C1A1B] text-white border border-cyan-500/50"
                    : "bg-[#141214] text-[#8C8C8C] hover:bg-[#1C1A1B]",
                )}
              >
                {t("filter.z_a")}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-3 border-t border-white/10">
          <Button
            onClick={() => {
              setFilters({
                date: "newest",
                price: "none",
                alphabetical: "none",
              });
            }}
            className="w-14 h-12 bg-[#141214] hover:bg-[#1C1A1B] rounded-[10px] flex items-center justify-center shrink-0 transition-all border border-white/5"
          >
            <RotateCcw className="h-6 w-6 text-white" />
          </Button>
          <Button
            onClick={() => {
              if (onApplyFilters) onApplyFilters(filters);
              onClose();
            }}
            className="flex-1 h-12 bg-[#1C1A1B] hover:bg-black text-white rounded-[10px] font-bold text-xl transition-all shadow-lg border border-white/10"
          >
            {t("filter.apply_filter")}
          </Button>
        </div>
      </div>
    </div>
  );
};

const SearchBar = ({
  showFilter = false,
  onApplyFilters,
  className,
}: SearchBarProps) => {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [query, setQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    date: "newest",
    price: "none",
    alphabetical: "none",
  });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);

  // Close filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const performSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    console.log("Searching for:", searchTerm);
  };

  const handleSearch = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    performSearch(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (value.trim()) {
      timeoutRef.current = setTimeout(() => {
        performSearch(value);
      }, 3000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 mb-6 mx-auto w-full relative",
        className,
      )}
      ref={filterRef}
    >
      <div className="relative flex-1">
        <Input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={t("navigation.search_btn.search_placeholder")}
          className={cn(
            "w-full bg-[#D9D9D9] border-none text-foreground placeholder:text-black/60",
            "text-xl py-6 rounded-[10px] text-start h-auto transition-all duration-300 truncate",
            "text-sm md:text-lg lg:text-xl",
            // Padding based on RTL and filter icon
            isRtl
              ? cn(
                  "pr-16", // For search icon on the right
                  showFilter ? "pl-44 lg:pl-56" : "pl-36 lg:pl-48", // For buttons on the left
                )
              : cn(
                  "pl-16", // For search icon on the left
                  showFilter ? "pr-44 lg:pr-56" : "pr-36 lg:pr-48", // For buttons on the right
                ),
          )}
        />

        {/* Search Icon */}
        <Search
          className={cn(
            "absolute top-1/2 -translate-y-1/2 h-6 w-6 text-black",
            isRtl ? "right-8" : "left-8",
          )}
        />

        {/* Buttons Group */}
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2",
            isRtl ? "left-3" : "right-3",
            "flex items-center gap-2",
          )}
        >
          {isRtl ? (
            <>
              {/* Optional Filter Button (Inner in RTL) */}
              {showFilter && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={cn(
                    "hover:bg-[#C9C9C9] h-[50px] lg:h-[60px] w-[50px] lg:w-[60px] p-0 flex items-center justify-center shrink-0 rounded-[10px] transition-all duration-200",
                    isFilterOpen && "bg-[#C9C9C9] ring-2 ring-black/10",
                  )}
                >
                  <AlignLeft className="h-6 w-6 lg:h-8 lg:w-8 text-black" />
                </Button>
              )}
              {/* Search Button (Outer in RTL) */}
              <Button
                variant="default"
                onClick={handleSearch}
                className={cn(
                  "shadow-2xl bg-black text-white hover:bg-black/90",
                  "px-6 lg:px-14 rounded-[10px] font-bold text-2xl h-[50px] lg:h-[60px]",
                  "py-3",
                )}
              >
                {t("navigation.search_btn.search")}
              </Button>
            </>
          ) : (
            <>
              {/* Optional Filter Button (Inner in LTR) */}
              {showFilter && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={cn(
                    "hover:bg-[#C9C9C9] h-[50px] lg:h-[60px] w-[50px] lg:w-[60px] p-0 flex items-center justify-center shrink-0 rounded-[10px] transition-all duration-200",
                    isFilterOpen && "bg-[#C9C9C9] ring-2 ring-black/10",
                  )}
                >
                  <AlignLeft className="h-6 w-6 lg:h-8 lg:w-8 text-black" />
                </Button>
              )}

              {/* Search Button (Outer in LTR) */}
              <Button
                variant="default"
                onClick={handleSearch}
                className={cn(
                  "shadow-2xl bg-black text-white hover:bg-black/90",
                  "px-6 lg:px-14 rounded-[10px] font-bold text-2xl h-[50px] lg:h-[60px]",
                  "py-6",
                )}
              >
                {t("navigation.search_btn.search")}
              </Button>
            </>
          )}
        </div>
      </div>

      <FilterPopover
        isOpen={isFilterOpen}
        isRtl={isRtl}
        filters={filters}
        setFilters={setFilters}
        onApplyFilters={onApplyFilters}
        onClose={() => setIsFilterOpen(false)}
        t={t}
      />
    </div>
  );
};

export default SearchBar;
