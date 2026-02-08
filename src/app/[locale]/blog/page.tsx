import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import BlogHeroSection from "@/src/components/blog/BlogHeroSection";
import { useTranslations } from "next-intl";
import AccordionHero from "@/src/components/home/AccordionHero";
import SearchBar from "@/src/components/layout/SearchBar";

export default function BlogPage() {
  const t = useTranslations("navigation");

  return (
    <div className="min-h-screen bg-[#1C1A1B] text-white font-sans">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Search Bar Section */}
        <SearchBar showFilter={false} />

        <AccordionHero />

        <BlogHeroSection />
      </main>

      <Footer />
    </div>
  );
}
