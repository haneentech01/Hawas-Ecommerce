"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../../../lib/validation/auth";
import { useAuth } from "../../../hooks/useAuth";
import { useRouter, Link } from "@/src/i18n/routing";
import Image from "next/image";
import { Check } from "lucide-react";
import NewUserModal from "@/src/components/auth/NewUserModal";
import Footer from "@/src/components/layout/Footer";
import Header from "@/src/components/layout/Header";
import { cn } from "@/src/lib/utils";

export default function LoginPage() {
  const t = useTranslations("auth");
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const locale = useLocale();
  const isRTL = locale === "ar";

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

  return (
    <div className="bg-[#1C1A1B] text-white font-sans">
      {/* Fixed Header */}
      <Header />

      {/* Hero / Login Section with Green Gradient */}
      <section
        className="relative flex flex-col 
        bg-gradient-to-b from-[#236726] to-[#46CD4C] 
        rounded-b-[25px] overflow-hidden min-h-screen lg:min-h-0 lg:h-screen
        xl:mx-[122px] mb-4 md:mb-6 lg:mb-8 xl:mb-[35px]"
      >
        {/* Fixed top spacer to account for fixed header height */}
        <div className="h-[108px] shrink-0" />
        <div className="px-4 md:px-12 xl:px-[122px] flex-1 flex flex-col justify-center w-full relative z-10 pt-4 pb-12 lg:pb-16 max-h-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 w-full h-full lg:h-auto max-h-full">
            {/* Login Form Section */}
            <div className="w-full lg:w-[450px] max-w-[522px] relative z-20 shrink-0 order-2 lg:order-1 flex flex-col justify-center">
              <div className="flex flex-col mb-8 text-right rtl:text-right ltr:text-left">
                <p
                  className="text-[#6BAB64] text-lg md:text-xl xl:text-3xl 
                  font-bold"
                >
                  {t("login.welcome")}
                </p>
                <h2
                  className="text-5xl md:text-6xl lg:text-[60px] 
                font-black text-white leading-tight"
                >
                  {t("login.title")}
                </h2>
                <p
                  className="text-white/90 text-sm md:text-base lg:text-xl
                 font-bold leading-relaxed"
                >
                  {t("login.description")}
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-3 lg:space-y-4 w-full"
              >
                <div className="relative">
                  <input
                    type="email"
                    placeholder={t("login.email")}
                    {...register("email")}
                    className="w-full bg-transparent border-[1.5px] border-white 
                    rounded-[8px] 
                    px-6 py-3 lg:py-[17px] 
                    text-white placeholder:text-white 
                    focus:outline-none 
                    transition-all text-lg lg:text-[22px] font-bold"
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-200 text-sm font-bold px-3 py-1 rounded-md inline-block">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="password"
                    placeholder={t("login.password")}
                    {...register("password")}
                    className="w-full bg-transparent border-[1.5px] border-white 
                    rounded-[8px] px-6 py-3 lg:py-[17px] text-white 
                    placeholder:text-white focus:outline-none
                    transition-all text-lg lg:text-[22px] font-bold"
                  />
                  {errors.password && (
                    <p className="mt-1 text-red-200 text-sm font-bold px-3 py-1 rounded-md inline-block">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#1C1A1B] text-white py-3 lg:py-[15px] 
                  rounded-[8px] text-xl lg:text-[28px] font-black 
                  hover:bg-black transition-all transform active:scale-[0.98] 
                  shadow-2xl disabled:opacity-70 mt-4"
                >
                  {isLoading ? "..." : t("login.loginButton")}
                </button>

                <div className="flex items-center justify-between mt-5 px-1">
                  {/* Remember Me - right side */}
                  <div
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => setRememberMe(!rememberMe)}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-[2px] 
                        border-white flex items-center justify-center 
                        transition-all ${rememberMe ? "bg-white" : "bg-transparent"}`}
                    >
                      {rememberMe && (
                        <Check
                          className="w-3.5 h-3.5 text-[#236726]"
                          strokeWidth={4}
                        />
                      )}
                    </div>
                    <span className="text-white font-bold text-sm lg:text-base select-none">
                      {t("login.rememberPassword")}
                    </span>
                  </div>

                  {/* Forgot Password - left side */}
                  <button
                    type="button"
                    className="text-white font-bold text-sm lg:text-lg hover:text-white/80 transition-colors select-none"
                  >
                    {t("login.forgotPassword")}
                  </button>
                </div>
              </form>
            </div>

            {/* Character Image - absolutely positioned to allow 750px width */}
            <div
              className="absolute bottom-0 end-0 
              w-[300px] md:w-[450px] lg:w-[750px]
              h-[350px] md:h-[500px] lg:h-full
              pointer-events-none z-10"
            >
              <div
                className={cn(
                  "relative w-full h-full transition-transform duration-1000",
                  "animate-in fade-in slide-in-from-bottom-10",
                  "lg:-mb-16 xl:-mb-24",
                  isRTL ? " -left-10" : "scale-x-[-1] -right-20",
                )}
              >
                <Image
                  src="/images/man.png"
                  alt="3D Character"
                  fill
                  className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />

      {/* Custom Modal for New User */}
      <NewUserModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
          router.push("/register");
        }}
      />
    </div>
  );
}
