"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";

export default function SimilarProducts() {
  const t = useTranslations("home.featuredProducts");

  const products = [
    {
      id: 1,
      name: "Mouse Pro Wireless",
      price: "159 SAR",
      image: "/images/mouse.png",
      tag: "Best Seller",
      color: "bg-purple-600",
    },
    {
      id: 2,
      name: "Gaming Headset 7.1",
      price: "299 SAR",
      image: "/images/headset.png",
      tag: "New",
      color: "bg-indigo-600",
    },
    {
      id: 3,
      name: "PS5 Controller",
      price: "349 SAR",
      image: "/images/controller.png",
      tag: "Sale",
      color: "bg-orange-600",
    },
    {
      id: 4,
      name: "Camera Control",
      price: "129 SAR",
      image: "/images/camera.png",
      tag: null,
      color: "bg-stone-600",
    },
    {
      id: 5,
      name: "Earbuds Pro",
      price: "499 SAR",
      image: "/images/earbuds.png",
      tag: "Hot",
      color: "bg-rose-600",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">{t("title")}</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="group border-none shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-zinc-900 overflow-hidden rounded-2xl"
          >
            <div
              className={`relative h-48 w-full ${product.color} bg-opacity-10 dark:bg-opacity-10 flex items-center justify-center p-6`}
            >
              {/* Product Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Badges/Actions */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full h-8 w-8"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>

              {product.tag && (
                <span className="absolute top-3 left-3 bg-black/80 text-white text-[10px] px-2 py-1 rounded-md">
                  {product.tag}
                </span>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                {product.name}
              </h3>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold text-[#EC2D3C]">
                  {product.price}
                </span>
                <Button
                  size="icon"
                  className="h-8 w-8 rounded-lg bg-black text-white hover:bg-zinc-800"
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
