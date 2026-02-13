"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { cn } from "@/src/lib/utils";

export type OrderStatus = "shipped" | "processing" | "inDelivery" | "canceled";

interface OrderItemCardProps {
  order: {
    id: string;
    status: OrderStatus;
    items: string[]; // URLs of images
    totalAmount: number;
    currency: string;
  };
  onTrack?: (id: string) => void;
}

export default function OrderItemCard({ order, onTrack }: OrderItemCardProps) {
  const t = useTranslations("cart");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const statusColors = {
    shipped: "bg-[#6ADE5B] text-white",
    processing: "bg-[#fff] text-black",
    inDelivery: "bg-[#308DA2] text-white",
    canceled: "bg-[#B90130] text-white",
  };

  const statusLabel = t(`statuses.${order.status}`);

  return (
    <div className="bg-black rounded-[5px] overflow-hidden mb-4">
      <div className="px-6 py-4 lg:px-12 lg:py-7 flex flex-col gap-2">
        {/* Top Header: Status and ID */}
        <div className="flex justify-between items-center">
          <div className="text-start">
            <span
              className="text-white text-xl lg:text-2xl font-bold flex 
            items-center gap-2"
            >
              {order.id}
              <span className="text-[#FF2D3D] text-xl lg:text-2xl font-bold">
                {t("products_suffix")}
              </span>
            </span>
          </div>

          <span
            className={cn(
              "px-1 rounded-[5px] text-base font-bold uppercase tracking-wider",
              statusColors[order.status],
            )}
          >
            {statusLabel}
          </span>
        </div>

        {/* Middle: Product List and Tracking Button */}
        <div className="flex flex-col items-start justify-between gap-8">
          {/* Thumbnails Row */}
          <div className="flex items-center gap-3 w-full border-b border-white/10 pb-4 mt-2">
            {/* Scrollable/Overflowing Image Container */}
            <div className="flex items-center gap-[10px] flex-1 overflow-hidden">
              {order.items.slice(0, 15).map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-14 h-14 lg:w-20 lg:h-20 flex-shrink-0 rounded-[5px]
                   bg-black flex items-center justify-center p-2"
                >
                  <Image
                    src={img}
                    alt="Product"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Always Visible +N Indicator */}
            {order.items.length > 15 && (
              <div
                className="w-14 h-14 lg:w-20 lg:h-20 flex-shrink-0 bg-transparent border border-white 
                rounded-[5px] flex items-center justify-center shadow-lg"
              >
                <span className="text-white text-xl lg:text-2xl font-black">
                  +{order.items.length - 15}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center gap-4 w-full">
            <div
              className="flex flex-col items-center lg:items-start mr-auto 
            lg:mr-0 px-4"
            >
              <span className="text-[#9D9D9D] text-sm font-bold">
                {t("amount")}
              </span>
              <span className="text-[#6ADE5B] text-xl font-black">
                {order.totalAmount} {order.currency}
              </span>
            </div>
            <button
              onClick={() => onTrack?.(order.id)}
              className="bg-white text-black px-8 py-[6px] rounded-full text-base 
            font-black hover:bg-opacity-90 transition-all"
            >
              {t("track_order_btn")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
