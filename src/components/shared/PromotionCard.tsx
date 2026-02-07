"use client";

import Image from "next/image";

interface PromotionCardProps {
  title: string;
  image: string;
  bgColor: string;
  buttonText: string;
  className?: string;
}

export default function PromotionCard({
  title,
  image,
  bgColor,
  buttonText,
  className = "",
}: PromotionCardProps) {
  return (
    <div
      className={`relative flex items-center justify-between p-4 rounded-[30px] h-full shadow-lg ${bgColor} ${className}`}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[112px] h-[112px] opacity-10 blur-xl rounded-full bg-white/20" />
      <div className="relative w-28 h-28">
        <Image src={image} alt={title} fill className="object-contain" />
      </div>

      {buttonText && (
        <button className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-100 transition-colors self-start z-10">
          {buttonText}
        </button>
      )}
    </div>
  );
}
