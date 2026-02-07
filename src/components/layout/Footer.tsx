"use client";

import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Link } from "@/src/i18n/routing";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

const FOOTER_LINKS = [
  { href: "/", label: "home" },
  { href: "/discounts", label: "discounts" },
  { href: "/category", label: "category" },
  { href: "/about", label: "about" },
  { href: "/policy", label: "policy" },
  { href: "/blog", label: "blog" },
];

export default function Footer() {
  const t = useTranslations("home.footer");

  const locale = useLocale();
  const isRtl = locale === "ar";

  const Logo = isRtl ? (
    <Link
      href="/"
      className="relative h-8 w-24 md:h-10 md:w-32 lg:w-[149px] lg:h-[50px]"
    >
      <Image
        src="/images/hawas.png"
        alt="Hawas"
        fill
        className="object-contain"
        priority
      />
    </Link>
  ) : (
    <Link
      href="/"
      className="relative h-8 w-24 md:h-10 md:w-32 lg:w-[149px] lg:h-[50px]"
    >
      <Image
        src="/images/hawasEn.png"
        alt="Hawas"
        fill
        className="object-contain"
        priority
      />
    </Link>
  );

  return (
    <footer className="bg-black border-t border-white/10 mt-auto text-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col gap-16">
          {/* ================= القسم العلوي: اللوجو والروابط ================= */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* 1. اللوجو  */}
            <div className="flex flex-col items-start">{Logo}</div>

            {/* 2. الروابط  */}
            <nav className="flex flex-wrap gap-x-8 gap-y-4 items-center justify-center lg:justify-end">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xl md:text-[28px] underline underline-offset-2 decoration-white font-bold text-white hover:text-white/80 transition-colors"
                >
                  {t(`links.${link.label}`)}
                </Link>
              ))}
            </nav>
          </div>

          {/* ================= القسم الأوسط: التواصل والنشرة البريدية ================= */}
          <div className="flex flex-col lg:flex-row justify-between items-end gap-10">
            {/* 3. معلومات التواصل (تحت اللوجو - يمين) */}
            <div className="flex flex-col gap-4 w-full lg:w-auto text-right order-2 lg:order-1">
              <h3 className="text-xl font-bold text-white mb-2">
                {t("contact.title")}:
              </h3>

              <div className="flex flex-col gap-3">
                <a
                  href="mailto:Sammeer125400@gmail.com"
                  className="flex items-center justify-start lg:justify-start gap-2 text-white/90 hover:text-white transition-colors"
                >
                  <span className="text-lg font-bold">
                    {t("contact.email")}:
                  </span>
                  <span className="text-lg font-medium font-sans" dir="ltr">
                    Sammeer 125400@gmail .com
                  </span>
                </a>

                <a
                  href="tel:0597731101"
                  className="flex items-center justify-start lg:justify-start gap-2 text-white/90 hover:text-white transition-colors"
                >
                  <span className="text-lg font-bold">
                    {t("contact.phone")}:
                  </span>
                  <span className="text-lg font-medium font-sans" dir="ltr">
                    0597731101
                  </span>
                </a>
              </div>
            </div>

            {/* 4. النشرة البريدية (تحت الروابط - يسار) */}
            <div className="w-full lg:w-auto order-1 lg:order-2 ">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col md:flex-row gap-[29px] w-full"
              >
                {/* حقل الإدخال */}
                <Input
                  type="email"
                  placeholder={t("newsletter.placeholder")}
                  className="bg-black border border-white rounded-[14px] text-white text-start 
                  px-9 py-[22px] placeholder:text-white/70w-full md:w-[285px] h-[65px] 
                  text-xl focus-visible:ring-0 focus-visible:border-white"
                />

                {/* زر الاشتراك  */}
                <Button
                  type="submit"
                  className="bg-[#111111] hover:bg-[#2a2a2a] text-white text-2xl font-bold
                            rounded-[14px] md:w-[224px] h-[68px]
                            px-9 py-[24px] whitespace-nowrap"
                >
                  {t("newsletter.button")}
                </Button>
              </form>
            </div>
          </div>

          {/* ================= القسم السفلي: الحقوق والخصوصية ================= */}
          <div className="mt-8 pt-8 border-t border-white/20 flex flex-col-reverse md:flex-row items-center gap-10 text-sm font-bold text-white">
            {/* الحقوق */}
            <p className="flex items-center gap-1 text-lg">
              <span>© 2025.</span>
              <span>{t("copyright")}</span>
            </p>

            {/* روابط الشروط */}
            <div className="flex items-center gap-6 underline underline-offset-4 decoration-white/50">
              <Link
                href="/terms"
                className="hover:text-white transition-colors text-lg"
              >
                {t("links.terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
