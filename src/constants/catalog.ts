import { CategoryFilterSource, ProductCardVariant } from "@/src/types/catalog";

export const CATEGORY_FILTERS: CategoryFilterSource[] = [
  { id: "all", labelKey: "all", icon: "grid" },
  { id: "audio", labelKey: "audio", icon: "headphones" },
  { id: "accessories", labelKey: "accessories", icon: "mouse" },
  { id: "gaming", labelKey: "gaming", icon: "gamepad" },
  { id: "keyboards", labelKey: "keyboards", icon: "keyboard" },
  { id: "wearables", labelKey: "wearables", icon: "watch" },
  { id: "collectibles", labelKey: "collectibles", icon: "sparkles" },
];

export const PRODUCT_CARD_VARIANTS: ProductCardVariant[] = [
  {
    id: "violet",
    image: "/images/mouse.png",
    gradient: "bg-gradient-to-b from-[#8C63C6] via-[#6E36A5] to-[#331B4B]",
    glow: "shadow-[0_20px_40px_rgba(140,99,198,0.35)]",
  },
  {
    id: "midnight",
    image: "/images/headphones.png",
    gradient: "bg-gradient-to-b from-[#3D1F6A] via-[#2B144D] to-[#12091F]",
    glow: "shadow-[0_20px_40px_rgba(86,43,140,0.4)]",
  },
  {
    id: "ember",
    image: "/images/playStation.png",
    gradient: "bg-gradient-to-b from-[#F36C5B] via-[#E23D2F] to-[#8B1E18]",
    glow: "shadow-[0_20px_40px_rgba(226,61,47,0.35)]",
  },
  {
    id: "orchid",
    image: "/images/earphone.png",
    gradient: "bg-gradient-to-b from-[#CDA9F5] via-[#9D77D6] to-[#5C3C8C]",
    glow: "shadow-[0_20px_40px_rgba(157,119,214,0.35)]",
  },
];

export const CATALOG_PAGE_SIZE = 16;
