"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const isArabic = pathname.startsWith("/ar");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        className="relative bg-black border border-white w-full max-w-[1060px] h-auto lg:h-[525px] rounded-3xl overflow-hidden shadow-2xl flex flex-col p-8 lg:p-0"
        style={{ direction: isArabic ? "rtl" : "ltr" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 lg:top-8 lg:right-8 text-white/50 hover:text-white transition-colors z-50"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Logo - Absolutely positioned on Desktop */}
        <div
          className="hidden lg:block absolute"
          style={{
            top: "95px",
            left: isArabic ? "auto" : "818px",
            right: isArabic ? "818px" : "auto",
            width: "149px",
            height: "50px",
          }}
        >
          <Image
            src="/images/hawas.png"
            alt="Logo"
            fill
            className="object-contain"
          />
        </div>

        {/* Brand Logo for Mobile */}
        <div className="lg:hidden mb-8 self-center">
          <Image
            src="/images/hawas.png"
            alt="Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col h-full lg:pt-[130px] lg:px-[80px]">
          {/* Welcome Text */}
          <p className="text-[#6BAB64] text-xl lg:text-[30px] font-bold mb-6">
            {t("welcome")}
          </p>

          {/* Main Title */}
          <h2 className="text-white text-3xl lg:text-[60px] font-bold leading-tight mb-6 lg:max-w-[900px]">
            {t("notRegisteredTitle")}
          </h2>

          {/* Subtext */}
          <p className="text-white text-base lg:text-[20px] font-bold opacity-90 mb-10 lg:max-w-[800px]">
            {t("description")}
          </p>

          {/* Buttons Section */}
          <div className="mt-auto lg:mb-[92px] flex flex-col sm:flex-row gap-4 sm:gap-[15px]">
            <button
              onClick={onClose}
              className="px-6 lg:px-[48px] py-3 lg:py-[15px] border border-white text-white text-lg lg:text-[28px] font-bold rounded-xl hover:bg-white/10 transition-all text-center"
            >
              {t("backAndEdit")}
            </button>
            <button
              onClick={onConfirm}
              className="px-6 lg:px-[76px] py-3 lg:py-[15px] bg-[#1C1A1B] text-white text-lg lg:text-[28px] font-bold rounded-xl hover:bg-white hover:text-black transition-all text-center"
            >
              {t("createAccount")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
