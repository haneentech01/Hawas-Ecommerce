"use client";

import type { ComponentType } from "react";
import {
  Gamepad2,
  Headphones,
  Keyboard,
  LayoutGrid,
  Mouse,
  Sparkles,
  Watch,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { CategoryFilter, CategoryIconName } from "@/src/types/catalog";

const iconMap: Record<CategoryIconName, ComponentType<{ className?: string }>> =
  {
    grid: LayoutGrid,
    headphones: Headphones,
    mouse: Mouse,
    gamepad: Gamepad2,
    keyboard: Keyboard,
    watch: Watch,
    sparkles: Sparkles,
  };

type CategoryFilterListProps = {
  categories: CategoryFilter[];
  activeId: string;
  onSelect: (id: string) => void;
};

export default function CategoryFilterList({
  categories,
  activeId,
  onSelect,
}: CategoryFilterListProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {categories.map((category) => {
        const Icon = iconMap[category.icon];
        const isActive = category.id === activeId;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(category.id)}
            className={cn(
              "flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition",
              isActive
                ? "border-white bg-white text-black"
                : "border-white/10 bg-[#141214] text-white/80 hover:border-white/30 hover:text-white",
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{category.label}</span>
          </button>
        );
      })}
    </div>
  );
}
