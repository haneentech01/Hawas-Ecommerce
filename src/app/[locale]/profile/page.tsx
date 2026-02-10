"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function ProfilePage() {
  const t = useTranslations("profile");

  return (
    <div
      className="w-full bg-[#000000] rounded-[10px] p-8 lg:pr-9 lg:pt-11 lg:h-[522px] 
                flex flex-col items-start justify-start 
                border border-white/5 relative overflow-hidden"
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-[25px] w-full">
        <div className="relative">
          <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-[#1C1A1B]">
            <Image
              src="/images/profile.jpg"
              alt="Profile"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        </div>

        <button className="text-[#8C8C8C] text-xl lg:text-2xl font-bold hover:text-white transition-colors">
          {t("form.change_photo")}
        </button>
      </div>

      {/* Form Section */}
      <form className="w-full space-y-1 lg:space-y-2">
        {/* Row 1: Names */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
          {/* First Name (Right in RTL) */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-lg lg:text-xl font-bold px-2">
              {t("form.first_name")}
            </label>
            <input
              type="text"
              className="bg-transparent border border-white/20 rounded-[5px] h-12 lg:h-14 px-4 text-white text-lg focus:border-white/40 focus:outline-none transition-all"
            />
          </div>
          {/* Last Name (Left in RTL) */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-lg lg:text-xl font-bold px-2">
              {t("form.last_name")}
            </label>
            <input
              type="text"
              className="bg-transparent border border-white/20 rounded-[5px] h-12 lg:h-14 px-4 text-white text-lg focus:border-white/40 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Row 2: Email & Phone */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
          {/* Email (Right in RTL) */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-lg lg:text-xl font-bold px-2">
              {t("form.email")}
            </label>
            <input
              type="email"
              className="bg-transparent border border-white/20 rounded-[5px] h-12 lg:h-14 px-4 text-white text-lg focus:border-white/40 focus:outline-none transition-all"
            />
          </div>
          {/* Phone (Left in RTL) */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-lg lg:text-xl font-bold px-2">
              {t("form.phone")}
            </label>
            <div className="flex gap-2">
              <div className="w-24 lg:w-32 bg-transparent border border-white/20 rounded-[5px] h-12 lg:h-14 flex items-center justify-between px-3 cursor-pointer group">
                <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5 text-white/50 group-hover:text-white transition-colors" />
                <span className="text-white text-lg font-bold">+00</span>
              </div>
              <input
                type="tel"
                className="flex-1 bg-transparent border border-white/20 rounded-[5px] h-12 lg:h-14 px-4 text-white text-lg focus:border-white/40 focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4 lg:pt-4">
          <button
            type="submit"
            className="w-full max-w-[500px] h-14 lg:h-16 bg-[#1C1A1B] hover:bg-[#252525] text-white text-xl lg:text-2xl font-bold rounded-[5px] transition-all shadow-xl"
          >
            {t("form.save")}
          </button>
        </div>
      </form>
    </div>
  );
}
