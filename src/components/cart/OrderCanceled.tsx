"use client";

import { useTranslations } from "next-intl";
import { OrderStatus } from "./OrderItemCard";

interface OrderCanceledProps {
  status: OrderStatus;
}

export default function OrderCanceled({ status }: OrderCanceledProps) {
  const t = useTranslations("cart.order_details");

  if (status !== "canceled") return null;

  return (
    <div
      className="flex flex-col items-center justify-center text-start
    bg-black/40 rounded-[25px] border border-white/5"
    >
      <div
        className="flex flex-col items-start gap-4 px-6 lg:px-[145px]
        py-5 lg:py-7"
      >
        <h3 className="text-[#EC2D3C] text-2xl lg:text-3xl font-black w-full">
          {t("canceled_view.title")}
        </h3>
        <p className="text-[#AEAEAE] text-base lg:text-lg font-bold leading-[1.8]">
          {t("canceled_view.description")}
        </p>
      </div>
    </div>
  );
}
