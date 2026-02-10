import Footer from "@/src/components/layout/Footer";
import Header from "@/src/components/layout/Header";
import ProductDetails from "@/src/components/product/ProductDetails";
import SimilarProducts from "@/src/components/product/SimilarProducts";

export async function generateMetadata() {
  return {
    title: "منتج - هوس",
    description: "صفحة المنتج - كيبورد جيمنج RGB",
  };
}

export default async function ProductPage() {
  return (
    <div className="min-h-screen bg-[#1C1A1B] text-white font-sans">
      <Header />

      <main className="space-y-0">
        <ProductDetails />
        <SimilarProducts />
      </main>

      <Footer />
    </div>
  );
}
