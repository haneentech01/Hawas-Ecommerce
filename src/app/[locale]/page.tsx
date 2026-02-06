import Footer from "@/src/components/layout/Footer";
import Header from "@/src/components/layout/Header";
import HomeContent from "@/src/sections/home/HomeContent";

export async function generateMetadata() {
  return {
    title: "هوس - متجر إلكتروني متخصص",
    description: "متجر إلكتروني متخصص في المنتجات التقنية والإلكترونيات",
  };
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#1C1A1B] text-white font-sans">
      <Header />

      <main className="space-y-12">
        <HomeContent />
      </main>

      <Footer />
    </div>
  );
}
