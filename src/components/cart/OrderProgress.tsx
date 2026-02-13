"use client";

import { useTranslations } from "next-intl";
import { OrderStatus } from "./OrderItemCard";

interface OrderProgressProps {
  status: OrderStatus;
}

export default function OrderProgress({ status }: OrderProgressProps) {
  const t = useTranslations("cart.order_details");

  if (status !== "inDelivery") return null;

  return (
    <div className="flex flex-col items-center justify-center text-start">
      <div
        className="flex flex-col items-start gap-4 px-6 lg:px-[145px]
        py-5 lg:py-7"
      >
        <h3 className="text-white text-2xl lg:text-3xl font-black w-full">
          {t("in_delivery_info.title")}
        </h3>
        <p className="text-[#AEAEAE] text-base lg:text-lg font-bold leading-[1.8]">
          {t("in_delivery_info.description")}
        </p>
      </div>
    </div>
  );
}
