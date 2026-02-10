import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import localFont from "next/font/local";

const cairo = localFont({
  src: [
    {
      path: "../../../public/fonts/AbdoFreeBold.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/AbdoFreeBold.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../../../public/fonts/AbdoFreeBold.ttf",
      weight: "800",
      style: "extrabold",
    },
  ],
  variable: "--font-cairo",
  display: "swap",
});

const locales = ["en", "ar"];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata() {
  return {
    title: "Haws - E-commerce",
    description: "Premium e-commerce experience",
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${cairo.variable} font-sans`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
