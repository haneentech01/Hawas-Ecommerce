"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { useCategories } from "@/src/hooks/useCategories";

export default function CategoriesPage() {
  const t = useTranslations("catalog");
  const { categories } = useCategories();

  return (
    <section className="container mx-auto px-4 py-16 text-white">
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
            {t("subtitle")}
          </p>

          <h1 className="mt-3 text-3xl font-bold">{t("title")}</h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories
            .filter((category) => category.id !== "all")
            .map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="rounded-2xl border border-white/10 bg-[#141214] px-6 py-5 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
              >
                {category.label}
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
