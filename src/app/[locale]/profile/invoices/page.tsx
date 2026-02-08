"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { cn } from "@/src/lib/utils";
import Pagination from "@/src/components/shared/Pagination";
import { useState } from "react";

const invoicesData = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  date: "13 يوليو",
  code: "#328178",
  name: "اسم المنتج",
  price: "200$",
}));

export default function InvoicesPage() {
  const t = useTranslations("profile.invoices");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 9;

  return (
    <div className="w-full bg-[#000000] px-8 py-5 rounded-[10px]">
      {/* Table Header */}
      <div className="bg-[#1C1A1B] rounded-tr-[10px] rounded-tl-[10px] p-4 lg:p-6 grid grid-cols-4 text-center items-center">
        <span className=" text-white text-lg lg:text-xl font-bold">
          {t("table.date")}
        </span>
        <span className="text-white text-lg lg:text-xl font-bold">
          {t("table.product_code")}
        </span>
        <span className="text-white text-lg lg:text-xl font-bold">
          {t("table.product_name")}
        </span>
        <span className="text-white text-lg lg:text-xl font-bold">
          {t("table.price")}
        </span>
      </div>

      {/* Table Content */}
      <div className="flex flex-col gap-0 mt-0">
        {invoicesData.map((invoice, index) => (
          <div
            key={invoice.id}
            className={cn(
              "p-4 lg:p-6 grid grid-cols-4 text-center items-center rounded-[10px] transition-all hover:bg-white/5",
              index % 2 === 0 ? "bg-[#000000]" : "bg-[#1C1A1B]",
            )}
          >
            <span className="text-white text-lg lg:text-xl">
              {invoice.date}
            </span>
            <span className="text-white text-lg lg:text-xl">
              {invoice.code}
            </span>
            <Link
              href={`/product/${invoice.id}`}
              className="text-[#58935F] underline text-lg lg:text-xl font-bold hover:text-cyan-400"
            >
              {invoice.name}
            </Link>
            <span className="text-white text-lg lg:text-xl font-bold">
              {invoice.price}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
