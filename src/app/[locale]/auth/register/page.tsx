"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterFormData,
} from "../../../../lib/validation/auth";
import { useAuth } from "../../../../hooks/useAuth";
import { useRouter, Link } from "@/src/i18n/routing";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const { register: registerUser, isLoading, error } = useAuth();
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left side */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <span className="flex items-center space-x-2 space-x-reverse">
                <span>🇵🇸</span>
                <span>فلسطين</span>
              </span>
              <select className="bg-transparent border border-gray-600 rounded px-2 py-1 text-sm">
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>

            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-green">حوت</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
              <Link
                href="/"
                className="hover:text-primary-green transition-colors"
              >
                الرئيسية
              </Link>
              <Link
                href="/categories"
                className="hover:text-primary-green transition-colors"
              >
                كاجوري
              </Link>
              <Link
                href="/blog"
                className="hover:text-primary-green transition-colors"
              >
                المدونة
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Register Form Section */}
      <section className="bg-primary-green min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">
                {t("register.title")}
              </h2>
              <p className="text-black opacity-80">{t("register.subtitle")}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <div>
                <input
                  type="text"
                  placeholder={t("register.fullName")}
                  {...register("fullName")}
                  className="w-full px-4 py-3 bg-white bg-opacity-90 border border-gray-300 rounded text-black placeholder-gray-500 focus:outline-none focus:border-black focus:bg-white"
                />
                {errors.fullName && (
                  <p className="mt-1 text-red-600 text-sm">
                    {t(errors.fullName.message as string)}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder={t("register.email")}
                  {...register("email")}
                  className="w-full px-4 py-3 bg-white bg-opacity-90 border border-gray-300 rounded text-black placeholder-gray-500 focus:outline-none focus:border-black focus:bg-white"
                />
                {errors.email && (
                  <p className="mt-1 text-red-600 text-sm">
                    {t(errors.email.message as string)}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <input
                  type="password"
                  placeholder={t("register.password")}
                  {...register("password")}
                  className="w-full px-4 py-3 bg-white bg-opacity-90 border border-gray-300 rounded text-black placeholder-gray-500 focus:outline-none focus:border-black focus:bg-white"
                />
                {errors.password && (
                  <p className="mt-1 text-red-600 text-sm">
                    {t(errors.password.message as string)}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <input
                  type="password"
                  placeholder={t("register.confirmPassword")}
                  {...register("confirmPassword")}
                  className="w-full px-4 py-3 bg-white bg-opacity-90 border border-gray-300 rounded text-black placeholder-gray-500 focus:outline-none focus:border-black focus:bg-white"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-red-600 text-sm">
                    {t(errors.confirmPassword.message as string)}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "جاري التحميل..." : t("register.registerButton")}
              </button>

              {/* Login Link */}
              <div className="text-center">
                <span className="text-black">
                  {t("register.haveAccount")}{" "}
                  <Link
                    href="/auth/login"
                    className="text-black underline hover:no-underline"
                  >
                    {t("register.loginHere")}
                  </Link>
                </span>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-8 rounded-lg max-w-sm mx-4">
            <h3 className="text-xl font-bold mb-4">تم إنشاء الحساب بنجاح!</h3>
            <p className="mb-6">
              مرحباً بك في عائلة هوس. سيتم توجيهك إلى الصفحة الرئيسية.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-primary-green text-black px-4 py-2 rounded font-semibold"
            >
              حسناً
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo */}
            <div className="col-span-1">
              <h3 className="text-2xl font-bold text-primary-green mb-4">
                حوت
              </h3>
            </div>

            {/* Links */}
            <div className="col-span-1">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-primary-green"
                  >
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link
                    href="/offers"
                    className="text-gray-400 hover:text-primary-green"
                  >
                    خصومات
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories"
                    className="text-gray-400 hover:text-primary-green"
                  >
                    كاموري
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-400 hover:text-primary-green"
                  >
                    المدونة
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-1">
              <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
              <p className="text-gray-400">الميل: Sammer.125400@gmail.com</p>
              <p className="text-gray-400">جوال: 0597731101</p>
            </div>

            {/* Newsletter */}
            <div className="col-span-1">
              <h4 className="text-lg font-semibold mb-4">
                اشترك في الرسائل البريدية
              </h4>
              <form className="flex space-x-2 space-x-reverse">
                <input
                  type="email"
                  placeholder="الميل"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm"
                />
                <button
                  type="submit"
                  className="bg-primary-green text-black px-4 py-2 rounded font-semibold text-sm"
                >
                  ارسال
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">2023 جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
