"use client";

import { useState, useEffect } from "react";
import { Product } from "@/src/types/catalog";

const STORAGE_KEY = "hawas_bookmarks";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Product[]>([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setBookmarks(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse bookmarks", e);
      }
    }
  }, []);

  // Update localStorage when bookmarks change
  const saveBookmarks = (newBookmarks: Product[]) => {
    setBookmarks(newBookmarks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks));
  };

  const toggleBookmark = (product: Product) => {
    const exists = bookmarks.find((b) => b.id === product.id);
    if (exists) {
      saveBookmarks(bookmarks.filter((b) => b.id !== product.id));
      return false; // Removed
    } else {
      saveBookmarks([...bookmarks, product]);
      return true; // Added
    }
  };

  const isBookmarked = (productId: number) => {
    return bookmarks.some((b) => b.id === productId);
  };

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
  };
}
