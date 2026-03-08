"use client";

import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import TrackOrdersView from "@/src/components/cart/TrackOrdersView";

export default function TrackOrdersPage() {
  return (
    <div
      className="min-h-screen bg-[#1C1A1B] text-white flex flex-col 
     overflow-x-hidden"
    >
      <Header />

      <main className="flex-1 w-full py-8 lg:py-12">
        <div className="px-4 lg:px-10 xl:px-[122px]">
          {/* Content Area */}
          <TrackOrdersView />
        </div>
      </main>

      <Footer />
    </div>
  );
}
