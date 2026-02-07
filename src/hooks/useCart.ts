"use client";

import { useMemo, useState } from "react";
import { CartItem, Product } from "@/src/types/catalog";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const addItem = (product: Product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === product.id);
      if (existing) {
        return current.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...current, { productId: product.id, quantity }];
    });
  };

  const removeItem = (productId: number) => {
    setItems((current) =>
      current.filter((item) => item.productId !== productId),
    );
  };

  const clear = () => {
    setItems([]);
  };

  return {
    items,
    totalItems,
    addItem,
    removeItem,
    clear,
    isLoading,
    error,
  };
}
