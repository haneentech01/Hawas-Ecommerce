"use client";

import { useTranslations } from "next-intl";

export default function ChangePasswordPage() {
  const t = useTranslations("profile.change_password");

  return (
    <div
      className="w-full bg-[#000000] rounded-[10px] p-8 lg:p-12 lg:h-[522px] 
                    flex flex-col items-start justify-start border border-white/5 relative overflow-hidden"
    >
      {/* Form Section */}
      <form className="w-full space-y-6 lg:space-y-8 mt-4 lg:mt-8 max-w-[700px] mx-auto">
        {/* Row 1: Old Password */}
        <div className="flex flex-col gap-2">
          <label className="text-white text-lg lg:text-xl font-bold px-2 text-start w-full">
            {t("old_password")}
          </label>
          <input
            type="password"
            className="w-full bg-transparent border border-white/20 rounded-[5px] h-12 lg:h-14 px-4 text-white text-lg focus:border-white/40 focus:outline-none transition-all"
          />
        </div>

        {/* Row 2: New Password */}
        <div className="flex flex-col gap-2">
          <label className="text-white text-lg lg:text-xl font-bold px-2 text-start w-full">
            {t("new_password")}
          </label>
          <input
            type="password"
            className="w-full bg-transparent border border-white/20 rounded-[5px] h-12 lg:h-14 px-4 text-white text-lg focus:border-white/40 focus:outline-none transition-all"
          />
        </div>

        {/* Row 3: Confirm New Password */}
        <div className="flex flex-col gap-2">
          <label className="text-white text-lg lg:text-xl font-bold px-2 text-start w-full">
            {t("confirm_new_password")}
          </label>
          <input
            type="password"
            className="w-full bg-transparent border border-white/20 rounded-[5px] h-12 lg:h-14 px-4 text-white text-lg focus:border-white/40 focus:outline-none transition-all"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4 lg:pt-6">
          <button
            type="submit"
            className="w-full max-w-[500px] h-14 lg:h-16 bg-[#1C1A1B] hover:bg-[#252525] text-white text-xl lg:text-2xl font-bold rounded-[5px] transition-all shadow-xl"
          >
            {t("save_change_password")}
          </button>
        </div>
      </form>
    </div>
  );
}
