import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import ProfileSidebar from "@/src/components/profile/ProfileSidebar";
import { getLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const isRtl = locale === "ar";

  return (
    <div className="min-h-screen bg-[#1C1A1B] text-white flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 lg:pt-6 lg:pb-[62px]">
        <div
          className={`flex flex-col lg:flex-row gap-8 lg:gap-5 mx-5 lg:mx-[50px] xl:mx-[100px] 
          ${isRtl ? "" : "lg:flex-row-reverse"}`}
        >
          {/* Sidebar */}
          <ProfileSidebar />

          {/* Main Content */}
          <div className="flex-1 w-full min-w-0">
            {children}
            <Analytics />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
