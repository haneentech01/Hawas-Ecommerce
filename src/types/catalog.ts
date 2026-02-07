export type CategoryIconName =
  | "grid"
  | "headphones"
  | "mouse"
  | "gamepad"
  | "keyboard"
  | "watch"
  | "sparkles";

export type CategoryFilterSource = {
  id: string;
  labelKey: string;
  icon: CategoryIconName;
};

export type CategoryFilter = {
  id: string;
  label: string;
  icon: CategoryIconName;
};

export type ProductStatus = "available" | "soldOut";

export type Product = {
  id: number;
  category: string;
  name: string;
  status?: ProductStatus;
  rating: number;
  price: number;
  oldPrice?: number;
  currency?: string;
  image: string;
  bgColor: string;
  colors?: string[];
  code?: string;
  titleKey?: string;
  reviews?: number;
  priceLabel?: string;
  availabilityLabel?: string;
  badge?: ProductBadge;
  variant?: ProductCardVariant;
};

export type ProductBadgeTone = "new" | "hot" | "sale";

export type ProductBadge = {
  label: string;
  tone: ProductBadgeTone;
};

export type ProductCardVariant = {
  id: string;
  image: string;
  gradient: string;
  glow: string;
};

export type CartItem = {
  productId: number;
  quantity: number;
};
