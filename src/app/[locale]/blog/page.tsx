import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import BlogHeroSection from "@/src/components/blog/BlogHeroSection";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function BlogPage() {
  const t = useTranslations("navigation");

  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Search Bar Section */}
        <div className="max-w-[1170px] mx-auto mb-10">
          <div className="relative flex items-center h-[50px] lg:h-[65px] bg-[#D9D9D9] rounded-[20px] overflow-hidden">
            <input
              type="text"
              placeholder={t("search_btn.search_placeholder")}
              className="flex-1 h-full bg-transparent px-8 lg:px-12 text-lg lg:text-xl text-black outline-none placeholder:text-black/50"
            />
            <Button className="h-full px-10 lg:px-16 bg-[#111111] text-white rounded-[20px] text-lg lg:text-xl font-bold hover:bg-[#111111]/90">
              {t("search_btn.search")}
            </Button>
          </div>
        </div>

        <BlogHeroSection />
      </main>

      <Footer />
    </div>
  );
}
