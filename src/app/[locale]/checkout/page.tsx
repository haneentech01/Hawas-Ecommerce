"use client";

import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/src/lib/utils";

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const labelClasses = "text-[#B2B2B2] text-xl lg:text-[28px] font-bold px-2";
  const inputClasses =
    "bg-transparent border border-white/20 rounded-[5px] h-12 lg:h-14 px-4 text-white text-lg focus:border-white/40 focus:outline-none transition-all w-full placeholder:text-white/20";
  const sectionTitleClasses =
    "text-white text-2xl lg:text-[38px] font-black mb-8 flex items-center gap-4";

  return (
    <div
      className="min-h-screen bg-[#000000] text-white font-sans py-10 lg:py-20 px-4 lg:px-20 overflow-x-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-[1200px] mx-auto">
        <form className="space-y-16 lg:space-y-24">
          {/* Section 1: Contact Information */}
          <section className="relative">
            <div className="absolute -right-8 lg:-right-12 top-2 w-6 h-6 border border-white/20 flex items-center justify-center text-[10px] text-white/40">
              ✕
            </div>
            <h2 className={sectionTitleClasses}>{t("contact_title")}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-14">
              {/* Row 1 */}
              <div className="flex flex-col gap-3">
                <label className={labelClasses}>{t("first_name")}</label>
                <input type="text" className={inputClasses} />
              </div>
              <div className="flex flex-col gap-3 lg:order-2">
                <label className={labelClasses}>{t("last_name")}</label>
                <input type="text" className={inputClasses} />
              </div>
              {/* Row 2 */}
              <div className="flex flex-col gap-3">
                <label className={labelClasses}>{t("email")}</label>
                <input type="email" className={inputClasses} />
              </div>
              <div className="flex flex-col gap-3 lg:order-2">
                <label className={labelClasses}>{t("phone")}</label>
                <div className="flex gap-3">
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
          <section className="relative">
            <div className="absolute -right-8 lg:-right-12 top-2 w-6 h-6 border border-white/20 flex items-center justify-center text-[10px] text-white/40">
              ✕
            </div>
            <h2 className={sectionTitleClasses}>{t("delivery_title")}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-14">
              {/* Row 1 */}
              <div className="flex flex-col gap-3">
                <label className={labelClasses}>{t("address")}</label>
                <input type="text" className={inputClasses} />
              </div>
              <div className="flex flex-col gap-3 lg:order-2">
                <label className={labelClasses}>{t("city")}</label>
                <input type="text" className={inputClasses} />
              </div>
              {/* Row 2 */}
              <div className="flex flex-col gap-3">
                <label className={labelClasses}>{t("street")}</label>
                <input type="text" className={inputClasses} />
              </div>
              <div className="flex flex-col gap-3 lg:order-2">
                <label className={labelClasses}>{t("home")}</label>
                <input type="text" className={inputClasses} />
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <label className={labelClasses}>{t("additional_notes")}</label>
              <input type="text" className={inputClasses} />
            </div>
            <p className="mt-6 text-[#EC2D3C] text-sm lg:text-[18px] max-w-[800px] leading-relaxed font-bold">
              {t("terms_note")}
            </p>
          </section>

          {/* Section 3: Payment Information */}
          <section className="relative">
            <div className="absolute -right-8 lg:-right-12 top-2 w-6 h-6 border border-white/20 flex items-center justify-center text-[10px] text-white/40">
              ✕
            </div>
            <h2 className={sectionTitleClasses}>{t("payment_title")}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-14">
              <div className="flex flex-col gap-3">
                <label className={labelClasses}>{t("cardholder_name")}</label>
                <input type="text" className={inputClasses} />
              </div>
              <div className="flex flex-col gap-3 lg:order-2">
                <label className={labelClasses}>{t("card_number")}</label>
                <input type="text" className={inputClasses} />
              </div>
              <div className="flex flex-col gap-3">
                <label className={labelClasses}>{t("expiry_date")}</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className={inputClasses}
                />
              </div>
              <div className="flex flex-col gap-3 lg:order-2">
                <label className={labelClasses}>{t("cvv")}</label>
                <input type="text" className={inputClasses} />
              </div>
            </div>
          </section>

          {/* Action Footer */}
          <div className="flex flex-col lg:flex-row items-center justify-end gap-6 lg:gap-12 pt-10 pb-20">
            <span className="text-white text-xl lg:text-[28px] font-black">
              {t("total_price", { price: "800" })}
            </span>
            <button
              type="submit"
              className="bg-white text-black px-12 py-4 lg:px-[212px] lg:py-4 rounded-full text-xl lg:text-[30px] font-black hover:bg-gray-200 transition-colors"
            >
              {t("complete_purchase")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
