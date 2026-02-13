"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/src/lib/utils";
import OrderItemCard, {
  OrderStatus,
} from "@/src/components/cart/OrderItemCard";
import OrderProgress from "@/src/components/cart/OrderProgress";
import OrderReview from "@/src/components/cart/OrderReview";
import OrderProcessingView from "@/src/components/cart/OrderProcessingView";
import { ChevronLeft, ChevronRight } from "lucide-react";
import OrderCanceled from "@/src/components/cart/OrderCanceled";
import RatingDropdown from "@/src/components/cart/RatingDropdown";
import ProductCard from "@/src/components/shared/ProductCard";
import { MOCKED_ORDERS, INITIAL_CART_ITEMS } from "@/src/lib/mockData";

export default function TrackOrdersView() {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [orders, setOrders] = useState(MOCKED_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  const selectedOrder = orders.find((o) => o.id === selectedOrderId);

  const handleOrderStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );
  };

  return (
    <div className="max-w-[1244px] mx-auto mb-16">
      {/* Back Button and Header when order selected */}
      {selectedOrderId && (
        <div className="flex flex-col mb-[25px]">
          <div className="flex items-center justify-between w-full mb-4">
            {/* back orders button */}
            <button
              onClick={() => setSelectedOrderId(null)}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center">
                  {isRtl ? (
                    <ChevronRight size={20} />
                  ) : (
                    <ChevronLeft size={20} />
                  )}
                </div>
                <span className="text-xl lg:text-2xl font-black">
                  {t("cart.order_details.back")}
                </span>
              </div>
            </button>

            {/* Rating trigger at the top right (or left in RTL) */}
            {selectedOrder?.status === "shipped" && <RatingDropdown />}
          </div>

          {/* order details header */}
          <div
            className="flex flex-wrap w-full justify-between items-center 
            gap-4 bg-black px-8 py-4 rounded-[15px]"
          >
            {/* Status Badge on the Start */}
            <div className="flex items-center">
              <span
                className={cn(
                  "px-8 py-2 rounded-[10px] text-xl lg:text-2xl font-black uppercase",
                  selectedOrder?.status === "shipped"
                    ? "bg-[#6ADE5B] text-white"
                    : selectedOrder?.status === "inDelivery"
                      ? "bg-[#308DA2] text-white"
                      : selectedOrder?.status === "processing"
                        ? "bg-white text-black"
                        : "bg-[#EC2D3C] text-white",
                )}
              >
                {t(`cart.statuses.${selectedOrder?.status}`)}
              </span>
            </div>

            {/* Order ID in the middle */}
            <div className="flex-1 flex px-4">
              <span className="text-white text-xl lg:text-2xl font-bold">
                {t("cart.order_details.order_id")} : # {selectedOrderId}
              </span>
            </div>

            {/* Price on the End */}
            <div
              className="flex items-center gap-[14px] text-white 
                  text-xl lg:text-2xl font-bold"
            >
              <p className="flex items-center ">
                {t("cart.order_details.amount_prefix")}{" "}
              </p>
              <div className="flex items-center gap-[5px]">
                <p className="flex items-center ">
                  {selectedOrder?.totalAmount?.toFixed(2)}{" "}
                </p>
                <span className="">{isRtl ? "شيكل" : "$"}</span>
              </div>
            </div>
          </div>

          {/* Status Selector */}
          <div className="flex justify-center mt-[25px] overflow-x-auto px-4">
            <div className="flex items-center justify-between gap-[23px] h-[34px] w-full max-w-[796px] px-8">
              {[
                {
                  id: "processing",
                  label: t("cart.statuses.processing"),
                  activeClass: "bg-white text-black shadow-lg",
                },
                {
                  id: "inDelivery",
                  label: t("cart.statuses.inDelivery"),
                  activeClass: "bg-[#308DA2] text-white",
                },
                {
                  id: "shipped",
                  label: t("cart.statuses.shipped"),
                  activeClass: "bg-[#6ADE5B] text-white",
                },
              ].map((statusOption) => {
                const isActive = selectedOrder?.status === statusOption.id;
                return (
                  <button
                    key={statusOption.id}
                    onClick={() => {
                      // Find another order with this status to simulate navigation
                      const nextOrder = MOCKED_ORDERS.find(
                        (o) => o.status === statusOption.id,
                      );
                      if (nextOrder) {
                        setSelectedOrderId(nextOrder.id);
                      }
                    }}
                    className={cn(
                      "flex-1 h-full bg-black flex items-center justify-center rounded-[8px] transition-all",
                      isActive
                        ? statusOption.activeClass
                        : "text-white/40 hover:text-white/60",
                    )}
                  >
                    <span className="text-sm md:text-xl lg:text-2xl font-bold whitespace-nowrap">
                      {statusOption.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      {!selectedOrderId ? (
        orders.map((order) => (
          <OrderItemCard
            key={order.id}
            order={order}
            onTrack={setSelectedOrderId}
          />
        ))
      ) : (
        <div className="flex flex-col gap-4">
          {/* Status Content */}
          {selectedOrder?.status === "shipped" ? (
            !isReviewSubmitted && (
              <OrderReview
                onReviewSubmitted={() => setIsReviewSubmitted(true)}
              />
            )
          ) : selectedOrder?.status === "processing" ? (
            <OrderProcessingView
              onCancelSuccess={() =>
                handleOrderStatusChange(selectedOrderId, "canceled")
              }
            />
          ) : selectedOrder?.status === "canceled" ? (
            <OrderCanceled status={selectedOrder.status} />
          ) : (
            <div className="bg-black/40 rounded-[20px] p-8 border border-white/5">
              <OrderProgress status={selectedOrder!.status} />
            </div>
          )}

          <div
            className="bg-black pt-4 pb-2 lg:pt-[39px] lg:pb-[11px]
                  px-4 lg:px-[15px] rounded-[25px] gap-6
                  flex flex-col items-start"
          >
            {/* Product List Header */}
            <span className="text-[#FF2D3D] text-xl lg:text-2xl font-black">
              {INITIAL_CART_ITEMS.length} {t("cart.order_details.total_items")}
            </span>

            {/* Products Grid */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 
                  lg:grid-cols-5 gap-y-4 gap-x-[10px]"
            >
              {/* Reuse INITIAL_CART_ITEMS for visualization as mocked order items */}
              {INITIAL_CART_ITEMS.map(({ quantity: _, ...item }) => (
                <ProductCard
                  key={item.id}
                  product={item} // item no longer has 'quantity'
                  hideActions={true}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
