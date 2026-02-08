"use client";

import { useTranslations } from "next-intl";

export default function ShippingAddressPage() {
  const t = useTranslations("profile.address");

  return (
    <div
      className="w-full bg-[#000000] rounded-[10px] p-8 lg:p-12 lg:h-[522px] 
                flex flex-col items-start justify-start border border-white/5 relative overflow-hidden"
    >
      {/* Form Section */}
      <form className="w-full space-y-6 lg:space-y-8 mt-4 lg:mt-8">
        {/* Row 1: Address & City */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Address (Right in RTL) */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-lg lg:text-xl font-bold px-2">
              {t("address")}
            </label>
            <input
              type="text"
              className="bg-transparent border border-white/20 rounded-[5px] h-12 lg:h-14 px-4 text-white text-lg focus:border-white/40 focus:outline-none transition-all"
            />
          </div>
          {/* City (Left in RTL) */}
          <div className="flex flex-col gap-2 lg:order-first">
            <label className="text-white text-lg lg:text-xl font-bold px-2">
              {t("city")}
            </label>
            <input
              type="text"
              className="bg-transparent border border-white/20 rounded-[5px] h-12 lg:h-14 px-4 text-white text-lg focus:border-white/40 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Row 2: Street & Home */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Street (Right in RTL) */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-lg lg:text-xl font-bold px-2">
              {t("street")}
            </label>
            <input
              type="text"
              className="bg-transparent border border-white/20 rounded-[5px] h-12 lg:h-14 px-4 text-white text-lg focus:border-white/40 focus:outline-none transition-all"
            />
          </div>
          {/* Home (Left in RTL) */}
          <div className="flex flex-col gap-2 lg:order-first">
            <label className="text-white text-lg lg:text-xl font-bold px-2">
              {t("home")}
            </label>
            <input
              type="text"
              className="bg-transparent border border-white/20 rounded-[5px] h-12 lg:h-14 px-4 text-white text-lg focus:border-white/40 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Row 3: Additional Notes */}
        <div className="flex flex-col gap-2">
          <label className="text-white text-lg lg:text-xl font-bold px-2 text-start w-full">
            {t("additional_notes")}
          </label>
          <input
            type="text"
            className="w-full bg-transparent border border-white/20 rounded-[5px] h-12 lg:h-14 px-4 text-white text-lg focus:border-white/40 focus:outline-none transition-all"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4 lg:pt-6">
          <button
            type="submit"
            className="w-full max-w-[500px] h-14 lg:h-16 bg-[#1C1A1B] hover:bg-[#252525] text-white text-xl lg:text-2xl font-bold rounded-[5px] transition-all shadow-xl"
          >
            {t("save_address")}
          </button>
        </div>
      </form>
    </div>
  );
}
