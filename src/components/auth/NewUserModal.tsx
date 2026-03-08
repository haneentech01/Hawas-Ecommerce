"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { Logo } from "../layout/Header/Logo";

interface NewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function NewUserModal({
  isOpen,
  onClose,
  onConfirm,
}: NewUserModalProps) {
  const t = useTranslations("auth.newUserModal");
  const locale = useLocale();
  const isRtl = locale === "ar";

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center
     bg-black/80 backdrop-blur-sm p-4"
    >
      <div
        className="relative bg-black border border-white/10 w-full 
        max-w-[1060px] rounded-[45px] overflow-hidden shadow-2xl 
        flex flex-col items-start justify-start 
        p-8 lg:p-16 text-start"
        style={{ direction: isRtl ? "rtl" : "ltr" }}
      >
        {/* Logo at Top */}
        <div
          className="relative flex items-center justify-center 
        w-32 lg:w-[149px] h-12 mb-4"
        >
          <Logo isRtl={isRtl} />
        </div>

        {/* Welcome Text */}
        <p className="text-[#6BAB64] text-xl lg:text-3xl font-bold mb-5">
          {t("welcome")}
        </p>

        {/* Main Title */}
        <h2
          className="text-white text-3xl lg:text-6xl 
        font-black leading-tight mb-8 max-w-[596px]"
        >
          {t("notRegisteredTitle")}
        </h2>

        {/* Subtext */}
        <p
          className="text-white text-sm lg:text-xl font-bold 
        leading-relaxed mb-5"
        >
          {t("description")}
        </p>

        {/* Buttons Section */}
        <div
          className="flex flex-col sm:flex-row 
        gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <button
            onClick={onClose}
            className="px-10 lg:px-[49px] py-3.5 lg:py-[15px]
            bg-black text-white text-lg lg:text-[28px] 
            font-black rounded-[5px] hover:bg-white hover:text-black 
            transition-all border border-white"
          >
            {t("backAndEdit")}
          </button>
          <button
            onClick={onConfirm}
            className="px-10 lg:px-[76px] py-3.5 lg:py-[15px]
            border-[1.5px] border-transparent
            bg-[#1C1A1B] text-white text-lg lg:text-[28px] 
            font-black rounded-[5px] hover:bg-white/10 transition-all"
          >
            {t("createAccount")}
          </button>
        </div>
      </div>
    </div>
  );
}
