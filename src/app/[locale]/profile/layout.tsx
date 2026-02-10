import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import ProfileSidebar from "@/src/components/profile/ProfileSidebar";
import { getLocale } from "next-intl/server";
import { cn } from "@/src/lib/utils";

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
          className={cn(
            "flex flex-col md:flex-row gap-2 lg:gap-5",
            isRtl ? "" : "md:flex-row",
          )}
        >
          {/* Sidebar */}
          <ProfileSidebar />

          {/* Main Content */}
          <div className="flex-1 w-full min-w-0">{children}</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
