"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/hooks/useAuth";

type CategoryPageProps = {
  params: { category: string };
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const t = useTranslations("catalog");
  const guard = useTranslations("authGuard");
  const { isAuthenticated, isReady } = useAuth();

  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <section className="container mx-auto px-4 py-16 text-white">
        <div className="rounded-2xl border border-white/10 bg-[#141214] p-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
            {guard("title")}
          </p>
          <h1 className="mt-3 text-2xl font-bold">{guard("description")}</h1>
          <Link href="/auth/login" className="mt-6 inline-flex">
            <Button rounded="full" className="px-6">
              {guard("loginButton")}
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16 text-white">
      <div className="rounded-2xl border border-white/10 bg-[#141214] p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          {t("subtitle")}
        </p>
        <h1 className="mt-2 text-3xl font-bold">
          {t("title")} · {params.category}
        </h1>
        <p className="mt-3 text-sm text-white/60">{t("availability")}</p>
      </div>
    </section>
  );
}
