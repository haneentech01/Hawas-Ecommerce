"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/src/i18n/routing";
import { cn } from "@/src/lib/utils";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  mainMessage: string;
  subMessage: string;
  button1Text: string;
  button2Text: string;
  button1Href?: string;
  button2Href?: string;
  onButton1Click?: () => void;
  onButton2Click?: () => void;
  secondaryTitle?: string;
  isCentered?: boolean;
  button1Variant?: "outline" | "outline-red" | "filled-gray" | "outline-white";
  button2Variant?: "outline" | "outline-red" | "filled-gray" | "outline-white";
}

const Logo = ({
  isRtl,
  isCentered,
}: {
  isRtl: boolean;
  isCentered?: boolean;
}) => (
  <Link
    href="/"
    className={cn(
      "relative block h-8 w-24 md:h-10 md:w-32 lg:w-[149px] lg:h-[50px]",
      isCentered && "mx-auto",
    )}
  >
    <Image
      src={isRtl ? "/images/hawas.png" : "/images/hawasEn.png"}
      alt="Hawas"
      fill
      className="object-contain"
      priority
    />
  </Link>
);

export default function SuccessModal({
  isOpen,
  onClose,
  title,
  mainMessage,
  subMessage,
  button1Text,
  button2Text,
  button1Href,
  button2Href,
  onButton1Click,
  onButton2Click,
  secondaryTitle,
  isCentered = false,
  button1Variant = "outline",
  button2Variant = "filled-gray",
}: SuccessModalProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";

  if (!isOpen) return null;

  const getButtonClass = (variant: string) => {
    switch (variant) {
      case "outline-red":
        return "border border-[#FF0000] text-[#FF0000] hover:bg-[#FF0000]/10";
      case "outline-white":
      case "outline":
        return "border border-white text-white hover:bg-white/10";
      case "filled-gray":
        return "bg-[#1C1A1B] text-white hover:bg-white/10 border border-white/5";
      default:
        return "border border-white text-white hover:bg-white/10";
    }
  };

  const renderButton = (
    text: string,
    href?: string,
    onClick?: () => void,
    variant: string = "outline",
  ) => {
    const className = cn(
      "w-full sm:flex-1 py-4 rounded-[5px] text-xl font-black transition-all text-center",
      getButtonClass(variant),
    );

    if (href) {
      return (
        <Link
          href={href}
          onClick={() => {
            onClick?.();
            onClose();
          }}
          className={className}
        >
          {text}
        </Link>
      );
    }

    return (
      <button
        type="button"
        onClick={() => {
          onClick?.();
          // We don't call onClose() here automatically to allow step transitions
        }}
        className={className}
      >
        {text}
      </button>
    );
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={cn(
          "bg-black w-full max-w-[1060px] min-h-[412px] rounded-[45px] p-10 lg:px-24 flex flex-col shadow-2xl relative overflow-hidden border border-white/10",
          isCentered
            ? "items-start text-start justify-start p-12"
            : "items-start text-start",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Title Watermark */}
        {!isCentered && (
          <div className="absolute top-10 right-10 opacity-5 select-none pointer-events-none hidden lg:block">
            <h2 className="text-white text-6xl font-black whitespace-nowrap">
              {title}
            </h2>
          </div>
        )}

        {/* Hawas Logo */}
        <div className={cn("mb-8", isCentered ? "mt-0" : "mt-10")}>
          <Logo isRtl={isRtl} isCentered={isCentered} />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 mb-10 w-full">
          {secondaryTitle && (
            <p className="text-[#EC2D3C] text-xl lg:text-2xl font-black">
              {secondaryTitle}
            </p>
          )}

          {!isCentered && (
            <h2 className="text-[#6BAB64] text-2xl lg:text-3xl font-black">
              {title}
            </h2>
          )}

          <p
            className={cn(
              "text-white font-black",
              isCentered
                ? "text-3xl lg:text-[60px] max-w-[666px] leading-[0.9] "
                : "text-3xl lg:text-[60px] max-w-[596px] leading-[0.9]",
            )}
          >
            {mainMessage}
          </p>

          <p className="text-white text-lg lg:text-xl font-bold">
            {subMessage}
          </p>
        </div>

        {/* Actions */}
        <div
          className={cn(
            "flex flex-col sm:flex-row items-center gap-[15px] w-full max-w-[800px]",
            isCentered && "justify-center",
          )}
        >
          {renderButton(
            button1Text,
            button1Href,
            onButton1Click,
            button1Variant,
          )}
          {renderButton(
            button2Text,
            button2Href,
            onButton2Click,
            button2Variant,
          )}
        </div>
      </div>
    </div>
  );
}
