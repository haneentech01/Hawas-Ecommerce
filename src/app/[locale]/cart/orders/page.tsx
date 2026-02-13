"use client";

import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import CartTabs from "@/src/components/cart/CartTabs";
import TrackOrdersView from "@/src/components/cart/TrackOrdersView";

export default function TrackOrdersPage() {
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
        {/* Tab Selector */}
        <CartTabs activeTab="orders" />

        {/* Content Area */}
        <TrackOrdersView />
      </main>

      <Footer />
    </div>
  );
}
