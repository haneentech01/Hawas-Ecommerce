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
  status?: ProductStatus; // من الباك إند، مع قيمة افتراضية
  rating: number;
  price: number;
  oldPrice?: number;
  currency?: string;
  image: string;
  bgColor: string; // لون/جريدينت الخلفية
  colors?: string[]; // ألوان النقاط (من الباك إند)
  code?: string; // كود المنتج (من الباك إند)
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
  productId: string;
  quantity: number;
};
