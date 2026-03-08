"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "../../../lib/validation/auth";
import { useAuth } from "../../../hooks/useAuth";
import { useRouter, Link } from "@/src/i18n/routing";
import Image from "next/image";
import { Check } from "lucide-react";
import Footer from "@/src/components/layout/Footer";
import Header from "@/src/components/layout/Header";
import { cn } from "@/src/lib/utils";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const { register: registerUser, isLoading, error } = useAuth();
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const locale = useLocale();
  const isRTL = locale === "ar";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const response = await registerUser(data);

    if (response?.success) {
      setShowSuccessModal(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  return (
    <div className="bg-[#1C1A1B] text-white font-sans min-h-screen">
      {/* Fixed Header */}
      <Header />

      <section
        className="relative flex flex-col 
        bg-gradient-to-b from-[#236726] to-[#46CD4C] 
        rounded-b-[25px] overflow-hidden min-h-screen 
        xl:mx-[94px] mb-4 md:mb-6 lg:mb-8 xl:mb-[35px]"
      >
        <div className="h-[120px] shrink-0" />
        <div
          className="px-4 md:px-12 xl:px-[122px] flex-1 
        flex flex-col justify-center w-full relative z-10 
        pt-0 pb-12 lg:pb-16 "
        >
          <div
            className="flex flex-col lg:flex-row 
          items-center justify-between gap-10 lg:gap-16 
          w-full h-full "
          >
            {/* Registration Form Section */}
            <div
              className="w-full lg:w-[450px] max-w-[522px] relative z-20 
            shrink-0 order-2 lg:order-1 flex flex-col justify-center"
            >
              <div
                className="flex flex-col mb-3 text-right rtl:text-right 
              ltr:text-left"
              >
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
                  {t("register.title")}
                </h2>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-3 lg:space-y-4 w-full"
              >
                {/* Full Name */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t("register.fullName")}
                    {...register("fullName")}
                    className="w-full bg-transparent border-[1.5px] border-white 
                    rounded-[8px] px-6 py-2 lg:py-3 
                    text-white placeholder:text-white 
                    focus:outline-none transition-all text-lg lg:text-[22px] font-bold"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-red-200 text-sm font-bold px-3">
                      {t(errors.fullName.message as string)}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    placeholder={t("register.email")}
                    {...register("email")}
                    className="w-full bg-transparent border-[1.5px] border-white 
                    rounded-[8px] px-6 py-2 lg:py-3 
                    text-white placeholder:text-white 
                    focus:outline-none transition-all text-lg lg:text-[22px] font-bold"
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-200 text-sm font-bold px-3">
                      {t(errors.email.message as string)}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="relative">
                  <input
                    type="password"
                    placeholder={t("register.password")}
                    {...register("password")}
                    className="w-full bg-transparent border-[1.5px] border-white 
                    rounded-[8px] px-6 py-2 lg:py-3 text-white 
                    placeholder:text-white focus:outline-none transition-all text-lg lg:text-[22px] font-bold"
                  />
                  {errors.password && (
                    <p className="mt-1 text-red-200 text-sm font-bold px-3">
                      {t(errors.password.message as string)}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <input
                    type="password"
                    placeholder={t("register.confirmPassword")}
                    {...register("confirmPassword")}
                    className="w-full bg-transparent border-[1.5px] border-white 
                    rounded-[8px] px-6 py-2 lg:py-3 text-white 
                    placeholder:text-white focus:outline-none transition-all text-lg lg:text-[22px] font-bold"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-red-200 text-sm font-bold px-3">
                      {t(errors.confirmPassword.message as string)}
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
                  {isLoading ? "..." : t("register.registerButton")}
                </button>

                <div className="text-center">
                  <span className="text-white font-bold">
                    {t("register.haveAccount")}{" "}
                    <Link
                      href="/login"
                      className="text-white underline hover:no-underline"
                    >
                      {t("register.loginHere")}
                    </Link>
                  </span>
                </div>

                {error && (
                  <div className="bg-red-900/50 border border-red-500 text-white px-4 py-3 rounded mt-4 font-bold">
                    {error}
                  </div>
                )}
              </form>
            </div>

            {/* Character Image */}
            <div
              className="absolute bottom-10 end-0 
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

      <Footer />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans">
          <div className="bg-[#0D0D0D] border border-white/10 p-8 lg:p-12 rounded-[40px] max-w-lg w-full text-center shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center">
                <Check className="w-10 h-10 text-black" strokeWidth={3} />
              </div>
            </div>
            <h3 className="text-3xl font-black text-white mb-4">
              تم إنشاء الحساب بنجاح!
            </h3>
            <p className="text-white/80 text-lg font-medium leading-relaxed mb-8">
              مرحباً بك في عائلة هوس. سيتم توجيهك إلى الصفحة الرئيسية.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-[#1C1A1B] text-white px-8 py-4 rounded-xl font-black text-xl hover:bg-white hover:text-black transition-all"
            >
              حسناً
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
