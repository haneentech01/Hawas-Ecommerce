"use client";

import AccordionHero from "@/src/components/home/AccordionHero";
import SecondaryAds from "@/src/components/home/SecondaryAds";
import FeatureStats from "@/src/components/home/FeatureStats";
import CategorySection from "@/src/components/home/CategorySection";
import BlogHeroSection from "@/src/components/blog/BlogHeroSection";
import PromoBanner from "@/src/components/home/PromoBanner";
import CategoryGrid from "@/src/components/home/CategoryGrid";
import ContactSection from "@/src/components/home/ContactSection";
import CatalogSection from "@/src/sections/home/CatalogSection";
import { useAuth } from "@/src/hooks/useAuth";

export default function HomeContent() {
  const { isAuthenticated, isReady } = useAuth();

  return (
    <>
      <AccordionHero />
      <SecondaryAds />
      <CategorySection />
      <FeatureStats />

      {isReady && isAuthenticated && <CatalogSection />}

      <BlogHeroSection />
      {/* <PromoBanner />
      <CategoryGrid /> */}
      <ContactSection />
    </>
  );
}
