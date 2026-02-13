"use client";

import { useTranslations } from "next-intl";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import { useState } from "react";
import ProductCard from "@/src/components/shared/ProductCard";
import { Link } from "@/src/i18n/navigation";
import CartTabs from "@/src/components/cart/CartTabs";
import { MOCKED_GRID_ITEMS } from "@/src/lib/mockData";

export default function CartPage() {
  const t = useTranslations();
  const [items, setItems] = useState(MOCKED_GRID_ITEMS);

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

      <main className="flex-1 container px-6 mx-auto py-8 lg:py-12 max-w-[1196px]">
        {/* Tab Selector */}
        <CartTabs activeTab="cart" />

        {/* Content Area */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 
        gap-x-[10px] gap-y-[15px] mb-16"
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

        {/* Summary Table - Only shown in Cart tab */}
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
      </main>

      <Footer />
    </div>
  );
}
