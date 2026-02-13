import { OrderStatus } from "@/src/components/cart/OrderItemCard";

// Mock products data based on design
export const INITIAL_CART_ITEMS = [
  {
    id: 1,
    name: "ماوس أبل أصلي",
    code: "33123",
    price: 200,
    currency: "$",
    rating: 4.5,
    image: "/images/mouse.png",
    bgColor: "#E5D1FA", // Purple
    quantity: 1,
    category: "mouse",
  },
  {
    id: 2,
    name: "سماعات جيمنج",
    code: "33124",
    price: 200,
    currency: "$",
    rating: 4.5,
    image: "/images/headphones.png",
    bgColor: "#D1FAD1", // Green
    quantity: 1,
    category: "headphones",
  },
  {
    id: 3,
    name: "ايدي بلايستيشن أصلية",
    code: "33125",
    price: 200,
    currency: "$",
    rating: 4.5,
    image: "/images/playstation.png",
    bgColor: "#FAD1D1", // Red
    quantity: 1,
    category: "gamepad",
  },
  {
    id: 4,
    name: "كاميرا احترافية",
    code: "33126",
    price: 200,
    currency: "$",
    rating: 4.5,
    image: "/images/camera.png",
    bgColor: "#FFE4D1", // Orange
    quantity: 1,
    category: "electronics",
  },
  {
    id: 5,
    name: "سماعات لاسلكية",
    code: "33127",
    price: 200,
    currency: "$",
    rating: 4.5,
    image: "/images/earphonebg.png",
    bgColor: "#D1F3FA", // Cyan
    quantity: 1,
    category: "headphones",
  },
  {
    id: 6,
    name: "ماوس",
    code: "33127",
    price: 200,
    currency: "$",
    rating: 4.5,
    image: "/images/hero_mouse.png",
    bgColor: "#D1F3FA", // Cyan
    quantity: 1,
    category: "headphones",
  },
];

// Combine to get 10 items as in the screenshot
export const MOCKED_GRID_ITEMS = [
  ...INITIAL_CART_ITEMS,
  ...INITIAL_CART_ITEMS.map((item) => ({ ...item, id: item.id + 10 })),
];

export const MOCKED_ORDERS = [
  {
    id: "15",
    status: "shipped" as OrderStatus,
    items: [
      "/images/mouse.png",
      "/images/headphones.png",
      "/images/playstation.png",
      "/images/camera.png",
      "/images/earphonebg.png",
      "/images/verticalMouse.png",
      "/images/mouse.png",
      "/images/headphones.png",
      "/images/playstation.png",
      "/images/camera.png",
      "/images/earphonebg.png",
      "/images/mouse.png",
      "/images/verticalMouse.png",
      "/images/headphones.png",
      "/images/playstation.png",
      "/images/camera.png",
      "/images/keyboardIOS.png",
      "/images/mouse.png",
    ],
    totalAmount: 224.0,
    currency: "$",
  },
  {
    id: "16",
    status: "processing" as OrderStatus,
    items: [
      "/images/headphones.png",
      "/images/playstation.png",
      "/images/keyboardIOS.png",
      "/images/mouse.png",
      "/images/headphones.png",
      "/images/playstation.png",
      "/images/camera.png",
      "/images/mouse.png",
      "/images/headphones.png",
      "/images/keyboard.png",
      "/images/camera.png",
      "/images/verticalMouse.png",
    ],
    totalAmount: 320,
    currency: "$",
  },
  {
    id: "17",
    status: "inDelivery" as OrderStatus,
    items: [
      "/images/playstation.png",
      "/images/camera.png",
      "/images/earphonebg.png",
    ],
    totalAmount: 154,
    currency: "$",
  },
  {
    id: "18",
    status: "canceled" as OrderStatus,
    items: ["/images/camera.png", "/images/mouse.png"],
    totalAmount: 120,
    currency: "$",
  },
  {
    id: "19",
    status: "shipped" as OrderStatus,
    items: [
      "/images/mouse.png",
      "/images/headphones.png",
      "/images/playstation.png",
      "/images/camera.png",
      "/images/earphonebg.png",
      "/images/mouse.png",
      "/images/headphones.png",
    ],
    totalAmount: 424,
    currency: "$",
  },
];
