"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { CancelOrderModal } from "@/src/components/order/cancel-order-modal";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import ProductCard from "@/src/components/shared/ProductCard";
import { OrderStatus } from "@/src/components/order/order-status";
import { Product } from "@/src/types/catalog";

type OrderStatusType = "processing" | "in-delivery" | "delivered" | "cancelled";

// Sample products data
const products: Product[] = [
  {
    id: 1,
    category: "tech",
    name: "ماوس ابل اصلي",
    code: "32123",
    price: 200,
    rating: 4.5,
    image: "/images/mouse.jpg",
    status: "available",
    bgColor: "#F4F4F4",
    currency: "شيكل",
  },
  {
    id: 2,
    category: "tech",
    name: "سماعات جيمنج",
    code: "32124",
    price: 200,
    rating: 4.5,
    image: "/images/headset.jpg",
    status: "available",
    bgColor: "#F4F4F4",
    currency: "شيكل",
  },
  {
    id: 3,
    category: "tech",
    name: "يد تحكم بلايستيشن",
    code: "32125",
    price: 200,
    oldPrice: 300,
    rating: 4.5,
    image: "/images/controller.jpg",
    status: "available",
    bgColor: "#F4F4F4",
    currency: "شيكل",
  },
  {
    id: 4,
    category: "tech",
    name: "ايفون برو",
    code: "32126",
    price: 200,
    rating: 4.5,
    image: "/images/phone.jpg",
    status: "available",
    bgColor: "#F4F4F4",
    currency: "شيكل",
  },
  {
    id: 5,
    category: "tech",
    name: "سماعات ابل",
    code: "32127",
    price: 200,
    oldPrice: 300,
    rating: 4.5,
    image: "/images/earbuds.jpg",
    status: "available",
    bgColor: "#F4F4F4",
    currency: "شيكل",
  },
  {
    id: 6,
    category: "tech",
    name: "سماعات جيمنج برو",
    code: "32128",
    price: 200,
    rating: 4.5,
    image: "/images/headset.jpg",
    status: "available",
    bgColor: "#F4F4F4",
    currency: "شيكل",
  },
];

// Content based on status
const statusContent: Record<
  OrderStatusType,
  {
    title: string;
    description: string;
    showCancel?: boolean;
    isError?: boolean;
  }
> = {
  processing: {
    title: "جاري معالجة الطلب",
    description:
      "شكراً لطلبك! يجري التأكد من الطلب من قبل الإدارة وتجهيزها وإرسالها للشحن. لن تطول العملية كثيراً ونعمل جاهدين إن نجرج الطلبات في وقتها الحاضر لعدم التأخر عليكم.. راجع قائمة طلباتك ايها بأول من هذي الصفحة.",
    showCancel: true,
  },
  "in-delivery": {
    title: "الطلب قيد التوصيل",
    description:
      "شكرا لصبرك! فقد تم شحن الطلب وإرساله لشركة الشحن وجاري التوصيل قد تستغرق العملية من 3 الى 7 ايام ولكن نحاول جاهدين ان يكون التوصيل اقصر بكثير. راجع سياسات التوصيل لدينا للتعرف أكثر على طرق التوصيل لدينا.",
  },
  delivered: {
    title: "تم التوصيل",
    description:
      "تهانينا! تم توصيل طلبك بنجاح. نأمل أن تكون راضياً عن منتجاتك. إذا كان لديك أي استفسارات، لا تتردد في التواصل معنا.",
  },
  cancelled: {
    title: "نعتذر لهذه التجربة السيئة",
    description:
      "تم إلغاء الطلب! ولكن لا تقلق يمكنك الطلب من جديد والتميح بتجربة راجعة وفريدة فنحن فى هوس نطلب طلباً للالغاء وفضلاً نراجعه ونعمل على تطوير خدماتنا لتناسب احتياجاتكم والتقليل من المشكلات او العقبات التى تواجهكم. شكراً لتسامحكم.",
    isError: true,
  },
};

export default function OrderPage() {
  const params = useParams();
  const [status, setStatus] = useState<OrderStatusType>("processing");
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const content = statusContent[status];
  const orderId = params.id || "32123";
  const totalPrice = 100.0;

  const handleCancelOrder = () => {
    setStatus("cancelled");
    setCancelModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Back link */}
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          العودة للطلبات
        </Link>

        {/* Order header */}
        <div className="flex items-center justify-between bg-secondary rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">السعر:</span>
            <span className="text-sm font-medium text-foreground">
              {totalPrice.toFixed(2)} شيكل
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              رقم الطلب: #{orderId}
            </span>
            <Badge
              className={`
                ${
                  status === "cancelled"
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-primary text-primary-foreground"
                }
              `}
            >
              {status === "cancelled"
                ? "تم الغاء الطلب"
                : status === "processing"
                  ? "جاري معالجة الطلب"
                  : status === "in-delivery"
                    ? "قيد التوصيل"
                    : "تم التوصيل"}
            </Badge>
          </div>
        </div>

        {/* Status tabs - only show if not cancelled */}
        {status !== "cancelled" && (
          <div className="mb-6">
            <OrderStatus status={status} />
          </div>
        )}

        {/* Status message */}
        <div
          className={`rounded-lg p-6 mb-6 ${content.isError ? "bg-destructive/10 border border-destructive/20" : "bg-card border border-border"}`}
        >
          <h2
            className={`text-lg font-bold mb-2 text-center ${content.isError ? "text-destructive" : "text-foreground"}`}
          >
            {content.title}
          </h2>
          <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        {/* Cancel notice - only for processing status */}
        {content.showCancel && (
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <h3 className="text-sm font-bold text-foreground mb-2 text-center">
              يمكنك إلغاء الطلب في هذه المرحلة فقط
            </h3>
            <p className="text-xs text-muted-foreground text-center mb-4">
              في حال اردت إلغاء الطلب يمكنك إلغاءه في مرحلة المعالجة ولا يمكنك
              إلغاءه في حال تم الشحن ومتم مراجعته طلب الالغاء من قبل فريق هوس
              ولن يتم فرض رسوم على عملية الإلغاء.
            </p>
            <div className="flex justify-center">
              <Button
                variant="outline"
                className="border-border text-foreground hover:bg-secondary bg-transparent"
                onClick={() => setCancelModalOpen(true)}
              >
                إلغاء الطلب
              </Button>
            </div>
          </div>
        )}

        {/* Demo controls */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground mb-3 text-center">
            تجربة حالات الطلب:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              size="sm"
              variant={status === "processing" ? "default" : "outline"}
              onClick={() => setStatus("processing")}
              className={status !== "processing" ? "bg-transparent" : ""}
            >
              جاري المعالجة
            </Button>
            <Button
              size="sm"
              variant={status === "in-delivery" ? "default" : "outline"}
              onClick={() => setStatus("in-delivery")}
              className={status !== "in-delivery" ? "bg-transparent" : ""}
            >
              قيد التوصيل
            </Button>
            <Button
              size="sm"
              variant={status === "delivered" ? "default" : "outline"}
              onClick={() => setStatus("delivered")}
              className={status !== "delivered" ? "bg-transparent" : ""}
            >
              تم التوصيل
            </Button>
            <Button
              size="sm"
              variant={status === "cancelled" ? "destructive" : "outline"}
              onClick={() => setStatus("cancelled")}
              className={status !== "cancelled" ? "bg-transparent" : ""}
            >
              ملغي
            </Button>
          </div>
        </div>

        {/* Products section */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-end gap-2 mb-6">
            <span className="text-primary font-bold">15</span>
            <span className="text-muted-foreground">منتج</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />

      <CancelOrderModal
        open={cancelModalOpen}
        onOpenChange={setCancelModalOpen}
        onConfirm={handleCancelOrder}
      />
    </div>
  );
}
