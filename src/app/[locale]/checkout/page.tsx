"use client";

import { useTranslations, useLocale } from "next-intl";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import { useState } from "react";
import { cn } from "@/src/lib/utils";
import SuccessModal from "@/src/components/cart/SuccessModal";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "@/src/i18n/routing";

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [isContactOpen, setIsContactOpen] = useState(true);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(true);
  const [isPaymentOpen, setIsPaymentOpen] = useState(true);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const labelClasses = "text-[#B2B2B2] text-xl lg:text-[28px] font-bold px-2";
  const inputClasses =
    "bg-transparent border border-white/20 rounded-[5px] h-12 lg:h-14 px-4 text-white text-lg focus:border-white/40 focus:outline-none transition-all w-full placeholder:text-white/20";
  const sectionTitleClasses =
    "text-white text-3xl lg:text-[60px] font-black mb-7 flex items-center gap-7";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccessModalOpen(true);
  };

  const Input = ({ label, placeholder, type = "text" }: any) => (
    <div className="flex flex-col gap-4 w-full">
      <label className="text-white text-xl lg:text-2xl font-bold px-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-black border border-[#4C4C4C] rounded-[10px] py-5 px-6 text-white text-lg placeholder:text-[#4C4C4C] focus:outline-none focus:border-white transition-colors"
        />
        <div className="absolute top-1/2 -translate-y-1/2 right-6">
          <ChevronDown className="text-white/20 w-6 h-6" />
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-black text-white flex flex-col overflow-x-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 lg:py-16 max-w-[1244px]">
        <form
          onSubmit={handleSubmit}
          className="space-y-12 lg:space-y-[109px] px-4 gap-6 lg:gap-12"
        >
          {/* Section 1: Contact Information */}
          <section className="relative group">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsContactOpen(!isContactOpen)}
            >
              <h2 className={sectionTitleClasses}>{t("title")}</h2>
              <div
                className="w-6 h-6 rounded-[2px] bg-[#1C1A1B] 
              flex items-center justify-center transition-transform"
              >
                {isContactOpen ? (
                  <ChevronUp className="text-white w-4 h-4" />
                ) : (
                  <ChevronDown className="text-white w-4 h-4" />
                )}
              </div>
            </div>

            <div
              className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-6 overflow-hidden transition-all duration-300",
                isContactOpen
                  ? "max-h-[1000px] opacity-100 mt-2"
                  : "max-h-0 opacity-0 overflow-hidden",
              )}
            >
              <div className="flex flex-col gap-3">
                <label className={labelClasses}>{t("first_name")}</label>
                <input type="text" className={inputClasses} />
              </div>
              <div className="flex flex-col gap-3">
                <label className={labelClasses}>{t("last_name")}</label>
                <input type="text" className={inputClasses} />
              </div>
              <div className="flex flex-col gap-3">
                <label className={labelClasses}>{t("email")}</label>
                <input type="email" className={inputClasses} />
              </div>
              <div className="flex flex-col gap-3">
                <label className={labelClasses}>{t("phone")}</label>
                <div className="flex gap-3" dir={isRtl ? "rtl" : "ltr"}>
                  <input
                    type="text"
                    defaultValue="+970"
                    className={cn(inputClasses, "w-24 text-center")}
                  />
                  <input type="text" className={inputClasses} />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Delivery Information */}
          <section className="relative group">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}
            >
              <h2 className={sectionTitleClasses}>{t("address_info")}</h2>
              <div
                className="w-6 h-6 rounded-[2px] bg-[#1C1A1B] 
              flex items-center justify-center transition-transform"
              >
                {isDeliveryOpen ? (
                  <ChevronUp className="text-white w-4 h-4" />
                ) : (
                  <ChevronDown className="text-white w-4 h-4" />
                )}
              </div>
            </div>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                isDeliveryOpen
                  ? "max-h-[1000px] opacity-100 mt-2"
                  : "max-h-0 opacity-0 overflow-hidden",
              )}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
                <div className="flex flex-col gap-3">
                  <label className={labelClasses}>{t("address")}</label>
                  <input type="text" className={inputClasses} />
                </div>
                <div className="flex flex-col gap-3">
                  <label className={labelClasses}>{t("city")}</label>
                  <input type="text" className={inputClasses} />
                </div>
                <div className="flex flex-col gap-3">
                  <label className={labelClasses}>{t("street")}</label>
                  <input type="text" className={inputClasses} />
                </div>
                <div className="flex flex-col gap-3">
                  <label className={labelClasses}>{t("home")}</label>
                  <input type="text" className={inputClasses} />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-x-12 gap-y-6">
                <div className="mt-8 flex flex-col gap-3 max-w-full lg:max-w-2xl">
                  <label className={labelClasses}>{t("additional_info")}</label>
                  <input type="text" className={inputClasses} />
                </div>
                <p className="mt-6 text-white text-lg lg:text-xl max-w-[588px] leading-relaxed font-bold">
                  {t.rich("terms_note", {
                    terms: (chunks) => (
                      <Link
                        href="/terms"
                        className="text-[#EC2D3C] cursor-pointer"
                      >
                        {chunks}
                      </Link>
                    ),
                    privacy: (chunks) => (
                      <Link href="/terms" className="text-[#EC2D3C]">
                        {chunks}
                      </Link>
                    ),
                  })}
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Payment Information */}
          <section className="relative group">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsPaymentOpen(!isPaymentOpen)}
            >
              <h2 className={sectionTitleClasses}>{t("payment_info")}</h2>
              <div
                className="w-6 h-6 rounded-[2px] bg-[#1C1A1B] 
              flex items-center justify-center transition-transform"
              >
                {isPaymentOpen ? (
                  <ChevronUp className="text-white w-4 h-4" />
                ) : (
                  <ChevronDown className="text-white w-4 h-4" />
                )}
              </div>
            </div>
            <div
              className={cn(
                "grid grid-cols-1 lg:grid-cols-1 gap-x-12 gap-y-6 overflow-hidden transition-all duration-300",
                isPaymentOpen
                  ? "max-h-[1000px] opacity-100 mt-2"
                  : "max-h-0 opacity-0 overflow-hidden",
              )}
            >
              <div className="grid grid-cols-2 gap-5 w-full">
                <div className="flex flex-col gap-3">
                  <label className={labelClasses}>{t("cardholder_name")}</label>
                  <input type="text" className={inputClasses} />
                </div>

                <div className="flex flex-col gap-3">
                  <label className={labelClasses}>{t("card_number")}</label>
                  <input type="text" className={inputClasses} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 w-full">
                <div className="flex flex-col gap-3">
                  <label className={labelClasses}>{t("expiry_date")}</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className={inputClasses}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className={labelClasses}>{t("cvv")}</label>
                  <input type="text" className={inputClasses} />
                </div>
              </div>
            </div>
          </section>

          {/* Action Footer */}
          <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start gap-4 lg:gap-[18px] pb-20">
            <button
              type="submit"
              className="bg-white text-black px-12 
              py-3 lg:px-7 lg:py-5 rounded-full text-xl lg:text-[28px] 
              font-black hover:bg-gray-200 transition-all transform 
              hover:scale-105 active:scale-95 shadow-lg"
            >
              {t("complete_purchase")}
            </button>

            <div className="">
              <p
                className="text-white text-lg lg:text-[28px] max-w-[169px] 
              lg:max-w-full leading-relaxed font-bold"
              >
                {t("total_price", { price: "100$" })}
              </p>
            </div>
          </div>
        </form>
      </main>

      <Footer />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title={t("success_modal.thanks")}
        mainMessage={t("success_modal.success_msg")}
        subMessage={t("track_msg")}
        button1Text={t("success_modal.track_btn")}
        button1Href="/cart?tab=orders"
        button2Text={t("success_modal.continue_btn")}
        button2Href="/"
        onButton1Click={() => setIsSuccessModalOpen(false)}
        onButton2Click={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
}
