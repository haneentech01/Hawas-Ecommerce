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
}

const SearchBar = ({ showFilter = false, onApplyFilters }: SearchBarProps) => {
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
      className="flex flex-col gap-3 mb-6 mx-auto w-full relative"
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

        {/* Search Icon (Right side) */}
        <Search
          className={cn(
            "absolute top-1/2 -translate-y-1/2 h-6 w-6 text-black",
            isRtl ? "right-8" : "left-8",
          )}
        />

        {/* Buttons Group (Left side) */}
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2",
            isRtl ? "left-3" : "right-3",
            "flex items-center gap-2",
          )}
        >
          {/* Optional Filter Button */}
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

          {/* Search Button */}
          <Button
            variant="default"
            onClick={handleSearch}
            className={cn(
              "shadow-2xl bg-black text-white hover:bg-black/90",
              "px-6 lg:px-14 rounded-[10px] font-bold text-2xl h-[50px] lg:h-[60px]",
              isRtl ? "py-3" : "py-6",
            )}
          >
            {t("navigation.search_btn.search")}
          </Button>
        </div>
      </div>

      {/* Filter Popover */}
      {isFilterOpen && (
        <div
          className={cn(
            "absolute top-[calc(100%+15px)] z-50 p-6 w-full max-w-[500px] bg-black rounded-[20px] shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10",
            isRtl ? "left-0" : "right-0",
          )}
        >
          {/* Triangular Arrow */}
          <div
            className={cn(
              "absolute -top-2 w-4 h-4 bg-black border-t border-l border-white/10 rotate-45 z-20",
              isRtl ? "left-[38%]" : "right-[45%]",
            )}
          />

          {/* Glowing Background Blur */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 backdrop-blur-xl -z-10" />

          <div className="space-y-6 relative z-10">
            {/* Date Added Section */}
            <div>
              <h3 className="text-white font-bold text-xl mb-3 text-start">
                {t("filter.date_added")}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => setFilters({ ...filters, date: "newest" })}
                  className={cn(
                    "h-14 rounded-[10px] text-lg font-bold transition-all",
                    filters.date === "newest"
                      ? "bg-[#1C1A1B] text-white border-2 border-cyan-500/50"
                      : "bg-[#141214] text-[#8C8C8C] hover:bg-[#1C1A1B]",
                  )}
                >
                  {t("filter.newest_to_oldest")}
                </Button>
                <Button
                  onClick={() => setFilters({ ...filters, date: "oldest" })}
                  className={cn(
                    "h-14 rounded-[10px] text-lg font-bold transition-all",
                    filters.date === "oldest"
                      ? "bg-[#1C1A1B] text-white border-2 border-cyan-500/50"
                      : "bg-[#141214] text-[#8C8C8C] hover:bg-[#1C1A1B]",
                  )}
                >
                  {t("filter.oldest_to_newest")}
                </Button>
              </div>
            </div>

            {/* Price Section */}
            <div>
              <h3 className="text-white font-bold text-xl mb-3 text-start">
                {t("filter.price")}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => setFilters({ ...filters, price: "low_high" })}
                  className={cn(
                    "h-14 rounded-[10px] text-lg font-bold transition-all",
                    filters.price === "low_high"
                      ? "bg-[#1C1A1B] text-white border-2 border-cyan-500/50"
                      : "bg-[#141214] text-[#8C8C8C] hover:bg-[#1C1A1B]",
                  )}
                >
                  {t("filter.low_to_high")}
                </Button>
                <Button
                  onClick={() => setFilters({ ...filters, price: "high_low" })}
                  className={cn(
                    "h-14 rounded-[10px] text-lg font-bold transition-all",
                    filters.price === "high_low"
                      ? "bg-[#1C1A1B] text-white border-2 border-cyan-500/50"
                      : "bg-[#141214] text-[#8C8C8C] hover:bg-[#1C1A1B]",
                  )}
                >
                  {t("filter.high_to_low")}
                </Button>
              </div>
            </div>

            {/* Alphabetical Section */}
            <div>
              <h3 className="text-white font-bold text-xl mb-3 text-start">
                {t("filter.alphabetical")}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() =>
                    setFilters({ ...filters, alphabetical: "a_z" })
                  }
                  className={cn(
                    "h-14 rounded-[10px] text-lg font-bold transition-all",
                    filters.alphabetical === "a_z"
                      ? "bg-[#1C1A1B] text-white border-2 border-cyan-500/50"
                      : "bg-[#141214] text-[#8C8C8C] hover:bg-[#1C1A1B]",
                  )}
                >
                  {t("filter.a_z")}
                </Button>
                <Button
                  onClick={() =>
                    setFilters({ ...filters, alphabetical: "z_a" })
                  }
                  className={cn(
                    "h-14 rounded-[10px] text-lg font-bold transition-all",
                    filters.alphabetical === "z_a"
                      ? "bg-[#1C1A1B] text-white border-2 border-cyan-500/50"
                      : "bg-[#141214] text-[#8C8C8C] hover:bg-[#1C1A1B]",
                  )}
                >
                  {t("filter.z_a")}
                </Button>
              </div>
            </div>

            {/* Final Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-white/10">
              <Button
                onClick={() => {
                  setFilters({
                    date: "newest",
                    price: "none",
                    alphabetical: "none",
                  });
                }}
                className="w-20 h-20 bg-[#141214] hover:bg-[#1C1A1B] rounded-[10px] flex items-center justify-center shrink-0 transition-all border border-white/5"
              >
                <RotateCcw className="h-8 w-8 text-white" />
              </Button>
              <Button
                onClick={() => {
                  console.log("Applying filters:", filters);
                  if (onApplyFilters) onApplyFilters(filters);
                  setIsFilterOpen(false);
                }}
                className="flex-1 h-20 bg-[#1C1A1B] hover:bg-black text-white rounded-[10px] font-bold text-2xl transition-all shadow-[0_4px_20px_rgba(0,0,0,0.4)] border border-white/10"
              >
                {t("filter.apply_filter")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
