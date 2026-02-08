"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

export default function PaymentCardsPage() {
  const t = useTranslations("profile.cards");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <div
      className="w-full bg-[#000000] rounded-[10px] p-8 lg:p-12 lg:h-[610px] 
                    flex flex-col items-start justify-start border border-white/5 relative overflow-hidden"
    >
      <div className="w-full max-w-[700px] mx-auto flex flex-col gap-8">
        {/* Visual Credit Card */}
        <div
          className="w-full h-48 lg:h-64 rounded-[15px] p-6 lg:p-8 flex flex-col justify-between relative"
          style={{ background: "linear-gradient(to right, #E53437, #000000)" }}
        >
          {/* Top Row: Visa Logo */}
          <div className="flex justify-end">
            <span className="text-white text-2xl lg:text-3xl font-black italic tracking-tighter">
              VISA
            </span>
          </div>

          {/* Middle Row: Chip and Number Label */}
          <div className="flex justify-between items-end">
            {/* SIM Chip */}
            <div className="w-10 h-8 lg:w-14 lg:h-10 bg-gradient-to-br from-yellow-200 to-yellow-600 rounded-[4px] relative overflow-hidden border border-black/10">
              <div className="absolute top-0 left-0 w-full h-full opacity-30">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black" />
                <div className="absolute top-0 left-1/2 w-[1px] h-full bg-black" />
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-white/70 text-sm lg:text-base font-bold">
                {t("card_number")}
              </span>
              <span className="text-white text-lg lg:text-xl font-bold tracking-widest font-mono">
                **** **** **** 4589
              </span>
            </div>
          </div>

          {/* Bottom Row: Expiry */}
          <div className="flex justify-end">
            <div className="flex flex-col items-end gap-0">
              <span className="text-white/70 text-[10px] lg:text-xs font-bold leading-tight uppercase">
                {t("expiry_date")}
              </span>
              <span className="text-white text-xs lg:text-sm font-bold">
                12/26
              </span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form className="w-full space-y-6 lg:space-y-8 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            {/* Cardholder Name */}
            <div className="flex flex-col gap-1 border-b border-white/20 pb-1">
              <label className="text-[#8C8C8C] text-sm lg:text-base font-bold px-1 text-end">
                {t("cardholder_name")}
              </label>
              <input
                type="text"
                placeholder="Sameer Kraem"
                className="bg-transparent h-10 lg:h-12 px-1 text-white text-lg lg:text-xl font-bold focus:outline-none placeholder:text-white/50 text-start"
              />
            </div>

            {/* Card Number Input */}
            <div className="flex flex-col gap-1 border-b border-white/20 pb-1">
              <label className="text-[#8C8C8C] text-sm lg:text-base font-bold px-1 text-end">
                {t("card_number")}
              </label>
              <input
                type="text"
                placeholder="3672 8791 0091 1555"
                className="bg-transparent h-10 lg:h-12 px-1 text-white text-lg lg:text-xl font-bold focus:outline-none placeholder:text-white/50 text-start"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            {/* Expiry Date Input */}
            <div className="flex flex-col gap-1 border-b border-white/20 pb-1">
              <label className="text-[#8C8C8C] text-sm lg:text-base font-bold px-1 text-end">
                MM / YY
              </label>
              <input
                type="text"
                placeholder="05 / 23"
                className="bg-transparent h-10 lg:h-12 px-1 text-white text-lg lg:text-xl font-bold focus:outline-none placeholder:text-white/50 text-start"
              />
            </div>

            {/* CVV Input */}
            <div className="flex flex-col gap-1 border-b border-white/20 pb-1">
              <label className="text-[#8C8C8C] text-sm lg:text-base font-bold px-1 text-end">
                CVV
              </label>
              <input
                type="text"
                placeholder="587"
                className="bg-transparent h-10 lg:h-12 px-1 text-white text-lg lg:text-xl font-bold focus:outline-none placeholder:text-white/50 text-start"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="w-full max-w-[500px] h-12 lg:h-14 bg-[#1C1A1B] hover:bg-[#252525] text-white text-lg lg:text-xl font-bold rounded-[5px] transition-all shadow-xl"
            >
              {t("save_data")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
