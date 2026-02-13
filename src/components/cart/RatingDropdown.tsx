"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { Star, ChevronDown } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface RatingDropdownProps {
  initialRating?: number;
  initialNote?: string;
  onSave?: (rating: number, note: string) => void;
}

export default function RatingDropdown({
  initialRating = 4.9,
  initialNote = "",
}: RatingDropdownProps) {
  const t = useTranslations("cart.order_details");
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(initialRating);
  const [note, setNote] = useState(initialNote);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const isRtl = locale === "ar";

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Header (Image 1) */}
      <div
        className={cn(
          "flex items-center gap-2 cursor-pointer group select-none",
          isRtl ? "flex-row" : "flex-row-reverse",
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Rating Badge */}
        <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-[5px] h-fit">
          <Star className="w-3.5 h-3.5 fill-[#FFCC33] text-[#FFCC33]" />
          <span className="text-black text-xs lg:text-sm font-black leading-none">
            4.9
          </span>
        </div>

        {/* Text and Chevron */}
        <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
          <span className="text-xl lg:text-2xl font-black whitespace-nowrap">
            {t("rating_and_notes")}
          </span>
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </div>
      </div>

      {/* Dropdown Content (Image 2) */}
      {isOpen && (
        <div
          className={cn(
            "absolute top-full mt-4 w-[320px] lg:w-[374px] bg-black",
            "rounded-[15px]",
            "p-6 z-50 shadow-2xl",
            isRtl ? "left-0" : "right-0",
          )}
        >
          {/* Tip Arrow */}
          <div
            className={cn(
              "absolute -top-[9px] w-4 h-4 bg-black rotate-45",
              isRtl ? "left-10" : "right-10",
            )}
          />

          <div className="flex flex-col gap-6 text-start">
            {/* Rating Section */}
            <div className="flex flex-col gap-3">
              <label className="text-white text-lg lg:text-xl font-black text-end">
                {t("review_description")}
              </label>
              <div className="flex justify-center gap-4 bg-[#1C1A1B] py-5 rounded-[5px]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "w-7 h-7 transition-colors cursor-pointer",
                      Math.round(rating) >= star
                        ? "fill-[#FFCC33] text-[#FFCC33]"
                        : "fill-[#4C4C4C] text-[#4C4C4C]",
                    )}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>

            {/* Notes Section */}
            <div className="flex flex-col gap-3">
              <label className="text-white text-lg lg:text-xl font-black text-end">
                {t("review_note")}
              </label>
              <div className="bg-[#1C1A1B] rounded-[10px] p-6 min-h-[200px]">
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t("review_placeholder")}
                  className="w-full bg-transparent border-none 
                  text-white text-base lg:text-lg font-bold
                  focus:outline-none resize-none scrollbar-hide text-end"
                  dir={isRtl ? "rtl" : "ltr"}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
