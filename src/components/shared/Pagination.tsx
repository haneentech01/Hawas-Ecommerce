"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/src/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  const t = useTranslations("profile.invoices.pagination");

  // Only show if there's more than 1 page
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 mt-8 lg:mt-12",
        className,
      )}
    >
      <button
        onClick={() => {
          if (currentPage > 1) onPageChange(currentPage - 1);
        }}
        disabled={currentPage === 1}
        className={cn(
          "px-6 lg:px-10 h-10 lg:h-12 bg-[#0D0D0D] text-[#8C8C8C] rounded-[10px] text-lg lg:text-xl font-bold transition-all flex items-center justify-center",
          currentPage > 1
            ? "hover:bg-[#111111] hover:text-white"
            : "opacity-50 cursor-not-allowed",
        )}
      >
        {t("prev")}
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-[10px] text-lg lg:text-xl font-bold transition-all",
            page === currentPage
              ? "bg-[#111111] text-white ring-1 ring-white/10"
              : "bg-[#0D0D0D] text-[#8C8C8C] hover:bg-[#111111] hover:text-white",
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => {
          if (currentPage < totalPages) onPageChange(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
        className={cn(
          "px-6 lg:px-10 h-10 lg:h-12 bg-[#0D0D0D] text-[#8C8C8C] rounded-[10px] text-lg lg:text-xl font-bold transition-all flex items-center justify-center",
          currentPage < totalPages
            ? "hover:bg-[#111111] hover:text-white"
            : "opacity-50 cursor-not-allowed",
        )}
      >
        {t("next")}
      </button>
    </div>
  );
};

export default Pagination;
