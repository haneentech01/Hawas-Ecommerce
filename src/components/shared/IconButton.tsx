"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/src/lib/utils";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md";
  variant?: "ghost" | "solid";
};

export default function IconButton({
  size = "md",
  variant = "ghost",
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-colors",
        variant === "ghost"
          ? "bg-white/10 text-white hover:bg-white/20"
          : "bg-white text-black hover:bg-white/90",
        size === "sm" ? "h-8 w-8" : "h-10 w-10",
        className,
      )}
      {...props}
    />
  );
}
