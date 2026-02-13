"use client";

import { useTranslations, useLocale } from "next-intl";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import { useState } from "react";
import { cn } from "@/src/lib/utils";
import ProductCard from "@/src/components/shared/ProductCard";
import OrderItemCard, {
  OrderStatus,
} from "@/src/components/cart/OrderItemCard";
import { Link } from "@/src/i18n/navigation";

// Mock products data based on design
const INITIAL_CART_ITEMS = [
  {
    id: 1,
    name: "ماوس أبل أصلي",
    code: "33123",
    price: 200,
    currency: "$",
    rating: 4.5,
    image: "/images/mouse.png",
    bgColor: "#E5D1FA", // Purple
    quantity: 1,
    category: "mouse",
  },
  {
    id: 2,
    name: "سماعات جيمنج",
    code: "33124",
    price: 200,
    currency: "$",
    rating: 4.5,
    image: "/images/headphones.png",
    bgColor: "#D1FAD1", // Green
    quantity: 1,
    category: "headphones",
  },
  {
    id: 3,
    name: "ايدي بلايستيشن أصلية",
    code: "33125",
    price: 200,
    currency: "$",
    rating: 4.5,
    image: "/images/playstation.png",
    bgColor: "#FAD1D1", // Red
    quantity: 1,
    category: "gamepad",
  },
  {
    id: 4,
    name: "كاميرا احترافية",
    code: "33126",
    price: 200,
    currency: "$",
    rating: 4.5,
    image: "/images/camera.png",
    bgColor: "#FFE4D1", // Orange
    quantity: 1,
    category: "electronics",
  },
  {
    id: 5,
    name: "سماعات لاسلكية",
    code: "33127",
    price: 200,
    currency: "$",
    rating: 4.5,
    image: "/images/earphonebg.png",
    bgColor: "#D1F3FA", // Cyan
    quantity: 1,
    category: "headphones",
  },
  {
    id: 6,
    name: "ماوس",
    code: "33127",
    price: 200,
    currency: "$",
    rating: 4.5,
    image: "/images/hero_mouse.png",
    bgColor: "#D1F3FA", // Cyan
    quantity: 1,
    category: "headphones",
  },
];

// Combine to get 10 items as in the screenshot
const MOCKED_GRID_ITEMS = [
  ...INITIAL_CART_ITEMS,
  ...INITIAL_CART_ITEMS.map((item) => ({ ...item, id: item.id + 10 })),
];

const MOCKED_ORDERS = [
  {
    id: "15",
    status: "shipped" as OrderStatus,
    items: [
      "/images/mouse.png",
      "/images/headphones.png",
      "/images/playstation.png",
      "/images/camera.png",
      "/images/earphonebg.png",
      "/images/verticalMouse.png",
      "/images/mouse.png",
      "/images/headphones.png",
      "/images/playstation.png",
      "/images/camera.png",
      "/images/earphonebg.png",
      "/images/mouse.png",
      "/images/verticalMouse.png",
      "/images/headphones.png",
      "/images/playstation.png",
      "/images/camera.png",
      "/images/keyboardIOS.png",
      "/images/mouse.png",
    ],
    totalAmount: 224.0,
    currency: "$",
  },
  {
    id: "16",
    status: "processing" as OrderStatus,
    items: [
      "/images/headphones.png",
      "/images/playstation.png",
      "/images/keyboardIOS.png",
      "/images/mouse.png",
      "/images/headphones.png",
      "/images/playstation.png",
      "/images/camera.png",
      "/images/mouse.png",
      "/images/headphones.png",
      "/images/keyboard.png",
      "/images/camera.png",
      "/images/verticalMouse.png",
    ],
    totalAmount: 320,
    currency: "$",
  },
  {
    id: "17",
    status: "inDelivery" as OrderStatus,
    items: [
      "/images/playstation.png",
      "/images/camera.png",
      "/images/earphonebg.png",
    ],
    totalAmount: 154,
    currency: "$",
  },
  {
    id: "18",
    status: "canceled" as OrderStatus,
    items: ["/images/camera.png", "/images/mouse.png"],
    totalAmount: 120,
    currency: "$",
  },
  {
    id: "19",
    status: "shipped" as OrderStatus,
    items: [
      "/images/mouse.png",
      "/images/headphones.png",
      "/images/playstation.png",
      "/images/camera.png",
      "/images/earphonebg.png",
      "/images/mouse.png",
      "/images/headphones.png",
    ],
    totalAmount: 424,
    currency: "$",
  },
];

import OrderProgress from "@/src/components/cart/OrderProgress";
import OrderReview from "@/src/components/cart/OrderReview";
import OrderProcessingView from "@/src/components/cart/OrderProcessingView";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import OrderCanceled from "@/src/components/cart/OrderCanceled";
import RatingDropdown from "@/src/components/cart/RatingDropdown";

export default function CartPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [activeTab, setActiveTab] = useState<"cart" | "orders">("cart");
  const [items, setItems] = useState(MOCKED_GRID_ITEMS);
  const [orders, setOrders] = useState(MOCKED_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  const selectedOrder = orders.find((o) => o.id === selectedOrderId);

  const handleOrderStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    );
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const delivery = 10;
  const discount = 2;
  const total = subtotal + delivery - discount;

  return (
    <div
      className="min-h-screen bg-[#1C1A1B] text-white flex flex-col 
     overflow-x-hidden"
    >
      <Header />

      <main
        className="flex-1 container mx-auto px-4 py-8 lg:py-12 
      max-w-[1198px]"
      >
        {/* Tab Selector & Back Button */}
        <div className="flex flex-col items-start justify-between mb-[25px]">
          {!selectedOrderId ? (
            <div className="flex items-center gap-[15px]">
              <button
                onClick={() => {
                  setActiveTab("cart");
                  setSelectedOrderId(null);
                }}
                className={cn(
                  "flex-1 rounded-[10px] text-x lg:text-2xl font-black transition-all",
                  "text-center w-[147px] h-[44px]",
                  activeTab === "cart"
                    ? "bg-white text-black shadow-lg"
                    : "text-[#8C8C8C] bg-black hover:text-white",
                )}
              >
                {t("navigation.cart")}
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={cn(
                  "flex-1 rounded-[10px] text-xl lg:text-2xl font-black transition-all w-[147px] h-[44px]",
                  activeTab === "orders"
                    ? "bg-white text-black shadow-lg"
                    : "text-[#8C8C8C] bg-black hover:text-white",
                )}
              >
                {t("navigation.track_orders")}
              </button>
            </div>
          ) : (
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
          )}

          {/* order details */}
          {selectedOrderId && (
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
          )}
        </div>

        {/* Status Selector */}
        {selectedOrderId && (
          <div className="flex justify-center mb-10 overflow-x-auto px-4">
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
        )}

        {/* Content Area */}
        {activeTab === "cart" ? (
          <div
            className="grid grid-cols-2 md:grid-cols-3 
          lg:grid-cols-5 gap-x-[10px] gap-y-[15px] mb-16
          px-2 md:px-11 lg:px-[122px]"
          >
            {items.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                quantity={item.quantity}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </div>
        ) : (
          <div className="max-w-[1244px] mx-auto mb-16">
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
                    {INITIAL_CART_ITEMS.length}{" "}
                    {t("cart.order_details.total_items")}
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
        )}

        {/* Summary Table - Only shown in Cart tab */}
        {activeTab === "cart" && (
          <div className="max-w-full mb-20">
            <div className="bg-black shadow-2xl">
              <div
                className="flex flex-col items-start justify-between 
                px-8 lg:px-12 py-10 gap-8"
              >
                {/* Labels & Values Breakdown */}
                <div className="flex flex-col justify-between w-full gap-x-16 gap-y-6 flex-1">
                  <div className="flex gap-1 justify-between items-center pb-2 border-b border-[#4C4C4C]">
                    <span className="text-white text-lg lg:text-2xl font-bold">
                      {t("cart.items_price")}
                    </span>
                    <span className="text-white text-lg lg:text-xl font-black">
                      {subtotal} $
                    </span>
                  </div>
                  <div className="flex gap-1 justify-between items-center pb-2 border-b border-[#4C4C4C]">
                    <span className="text-white text-lg lg:text-2xl font-bold">
                      {t("cart.delivery_price")}
                    </span>
                    <span className="text-white text-lg lg:text-xl font-black">
                      {delivery} $
                    </span>
                  </div>
                  <div className="flex gap-1 justify-between items-center pb-2 border-b border-[#4C4C4C]">
                    <span className="text-white text-lg lg:text-2xl font-bold">
                      {t("cart.discount")}
                    </span>
                    <span className="text-white text-lg lg:text-xl font-black">
                      {discount} $
                    </span>
                  </div>
                </div>

                {/* Total and CTA */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col gap-1 items-center lg:items-start">
                    <span className="text-[#9D9D9D] text-sm font-bold">
                      {t("cart.total")}
                    </span>
                    <span className="text-[#6ADE5B] text-xl font-black leading-none">
                      {total} $
                    </span>
                  </div>
                  <Link
                    href="/checkout"
                    className="bg-white text-black px-7 py-[6px] rounded-full
                  text-base font-black hover:bg-opacity-90 transition-all transform hover:scale-105 
                  active:scale-95 shadow-xl inline-block text-center"
                  >
                    {t("cart.pay_now")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
