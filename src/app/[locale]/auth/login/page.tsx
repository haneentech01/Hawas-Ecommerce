"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../../../../lib/validation/auth";
import { useAuth } from "../../../../hooks/useAuth";
import { useRouter, Link } from "@/src/i18n/routing";
import Image from "next/image";
import LanguageToggle from "@/src/components/layout/LanguageToggle";
import { ChevronDown, Check } from "lucide-react";
import NewUserModal from "@/src/components/auth/NewUserModal";
import Footer from "@/src/components/layout/Footer";

export default function LoginPage() {
  const t = useTranslations("auth");
  const navT = useTranslations("navigation");
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    // In a real app, we check if user exists via API
    // For now, we simulate "user not found" to show the modal as requested
    // You can add your API call here: const response = await login(data);

    // Simulating user discovery logic
    const userExists = false; // This would come from your API

    if (!userExists) {
      setShowModal(true);
    } else {
      const response = await login(data);
      if (response?.success) {
        router.push("/");
      }
    }
  };

  const menuLinks = [
    { id: "home", href: "/" },
    { id: "categories", href: "/categories" },
    { id: "blog", href: "/blog" },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* Hero / Login Section with Green Gradient */}
      <section className="relative min-h-[850px] bg-gradient-to-b from-[#236726] to-[#46CD4C] rounded-b-[60px] lg:rounded-b-[100px] overflow-hidden">
        {/* Navigation Overlaid on Gradient */}
        <header className="container mx-auto px-4 md:px-12 lg:px-[122px] py-10">
          <div className="flex items-center justify-between">
            {/* Left side: Country & Language */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                <Image
                  src="/images/ps.png"
                  alt="Palestine"
                  width={20}
                  height={14}
                  className="rounded-sm"
                />
                <span className="text-sm font-bold">فلسطين</span>
                <ChevronDown className="w-4 h-4 opacity-50" />
              </div>
              <LanguageToggle />
            </div>

            {/* Middle: Nav Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-10">
              {menuLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="text-lg font-bold hover:text-black transition-colors"
                >
                  {navT(link.id)}
                </Link>
              ))}
            </nav>

            {/* Right side: Logo */}
            <Link href="/" className="relative w-28 h-8 lg:w-36 lg:h-10">
              <Image
                src="/images/hawas.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 md:px-12 lg:px-[122px] pt-10 pb-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            {/* Character Image - Hidden on small mobile or positioned specifically */}
            <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">
              <div className="relative w-[300px] h-[400px] md:w-[500px] md:h-[600px] lg:w-[600px] lg:h-[700px] z-10 transition-transform duration-1000 animate-in fade-in slide-in-from-left-20">
                <Image
                  src="/images/man.png"
                  alt="3D Character"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
              {/* Abstract Green Shape in background of character */}
              <div className="absolute -bottom-10 -left-10 w-[120%] h-[80%] bg-emerald-400/20 blur-[100px] rounded-full -rotate-12 pointer-events-none" />
            </div>

            {/* Login Form Section */}
            <div className="w-full lg:w-[500px] relative z-20">
              <div className="flex flex-col mb-10 text-right rtl:text-right ltr:text-left">
                <p className="text-white/80 text-xl font-bold mb-2">
                  {t("login.welcome")}
                </p>
                <h2 className="text-6xl lg:text-[70px] font-black text-white leading-tight italic">
                  {t("login.title")}
                </h2>
                <p className="text-white/90 text-sm font-bold max-w-[380px] leading-relaxed mt-4">
                  {t("login.description")}
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder={t("login.email")}
                    {...register("email")}
                    className="w-full bg-white/10 border border-white/30 rounded-2xl px-6 py-5 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition-all text-xl font-bold"
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-200 text-sm font-bold bg-red-900/40 px-3 py-1 rounded-md inline-block">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="password"
                    placeholder={t("login.password")}
                    {...register("password")}
                    className="w-full bg-white/10 border border-white/30 rounded-2xl px-6 py-5 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition-all text-xl font-bold"
                  />
                  {errors.password && (
                    <p className="mt-1 text-red-200 text-sm font-bold bg-red-900/40 px-3 py-1 rounded-md inline-block">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#1C1A1B] text-white py-5 rounded-2xl text-2xl font-black hover:bg-black transition-all transform active:scale-[0.98] shadow-2xl disabled:opacity-70 mt-4"
                >
                  {isLoading ? "..." : t("login.loginButton")}
                </button>

                <div className="flex items-center justify-between mt-6 px-2">
                  <div
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => setRememberMe(!rememberMe)}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center transition-all ${rememberMe ? "bg-white" : "bg-transparent"}`}
                    >
                      {rememberMe && (
                        <Check className="w-4 h-4 text-[#236726]" />
                      )}
                    </div>
                    <span className="text-white font-bold text-sm">
                      {t("login.rememberPassword")}
                    </span>
                  </div>

                  <Link
                    href="/auth/forgot-password"
                    className="text-white font-bold text-sm hover:underline"
                  >
                    {t("login.forgotPassword")}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Persistence and Additional Content if needed */}
      <main className="py-20 h-40">
        {/* Empty space or additional content as requested */}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Custom Modal for New User */}
      <NewUserModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
          router.push("/auth/register");
        }}
      />
    </div>
  );
}
