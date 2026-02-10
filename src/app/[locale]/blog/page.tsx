import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import BlogHeroSection from "@/src/components/blog/BlogHeroSection";
import AccordionHero from "@/src/components/home/AccordionHero";
import SearchBar from "@/src/components/layout/SearchBar";
import BannerPromoCard from "@/src/components/blog/cards/BannerPromoCard";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#1C1A1B] text-white font-sans">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Search Bar Section */}
        <SearchBar showFilter={false} />

        <AccordionHero />

        <div className="container mx-auto px-4">
          <BannerPromoCard
            titleKey="playstationController"
            descriptionKey="playstationDesc"
            subtitleKey="playstationSub"
            image="/images/ballsAndPlayStation.png"
            secondImage="/images/playstationController.png"
            logo="/images/playStationLogo.png"
            bgColor="bg-[#DF5731]"
            colSpan="col-span-12"
            cardType="banner"
            textColor="text-white"
            subtitleColor="#B02A07"
          />
          <BlogHeroSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
