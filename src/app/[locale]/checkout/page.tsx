// "use client";

// import { useTranslations } from "next-intl";
// import { Link } from "@/src/i18n/routing";
// import { useCart } from "@/src/hooks/useCart";
// import { useCheckout } from "@/src/hooks/useCheckout";
// import { formatPrice } from "@/src/lib/formatters";
// import { Button } from "@/src/components/ui/button";
// import { Input } from "@/src/components/ui/input";
// import { Label } from "@/src/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
// import { Badge } from "@/src/components/ui/badge";
// import { Trash2, CreditCard, MapPin, User, Mail, Phone } from "lucide-react";
// import Header from "@/src/components/layout/Header";
// import Footer from "@/src/components/layout/Footer";

// export default function CheckoutPage() {
//   const t = useTranslations("checkout");
//   const cart = useCart();
//   const checkout = useCheckout();

//   const handlePlaceOrder = () => {
//     checkout.placeOrder();
//   };

//   return (
//     <div className="min-h-screen bg-[#1C1A1B] text-white font-sans">
//       <Header />

//       <main className="container mx-auto px-4 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
//           <p className="text-muted-foreground">{t("subtitle")}</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Checkout Form */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Customer Information */}
//             <Card className="bg-[#2A2829] border-border">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <User className="w-5 h-5 text-primary" />
//                   {t("customer_info.title")}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="name" className="mb-2 block">
//                       {t("customer_info.name")}
//                     </Label>
//                     <Input
//                       id="name"
//                       placeholder={t("customer_info.name_placeholder")}
//                       value={checkout.formData.name}
//                       onChange={(e) =>
//                         checkout.setFormData({
//                           ...checkout.formData,
//                           name: e.target.value,
//                         })
//                       }
//                       className="bg-[#1C1A1B] border-border text-white"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="email" className="mb-2 block">
//                       {t("customer_info.email")}
//                     </Label>
//                     <Input
//                       id="email"
//                       type="email"
//                       placeholder={t("customer_info.email_placeholder")}
//                       value={checkout.formData.email}
//                       onChange={(e) =>
//                         checkout.setFormData({
//                           ...checkout.formData,
//                           email: e.target.value,
//                         })
//                       }
//                       className="bg-[#1C1A1B] border-border text-white"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <Label htmlFor="phone" className="mb-2 block">
//                     {t("customer_info.phone")}
//                   </Label>
//                   <Input
//                     id="phone"
//                     type="tel"
//                     placeholder={t("customer_info.phone_placeholder")}
//                     value={checkout.formData.phone}
//                     onChange={(e) =>
//                       checkout.setFormData({
//                         ...checkout.formData,
//                         phone: e.target.value,
//                       })
//                     }
//                     className="bg-[#1C1A1B] border-border text-white"
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Shipping Address */}
//             <Card className="bg-[#2A2829] border-border">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <MapPin className="w-5 h-5 text-primary" />
//                   {t("shipping_address.title")}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <Label htmlFor="address" className="mb-2 block">
//                     {t("shipping_address.address")}
//                   </Label>
//                   <Input
//                     id="address"
//                     placeholder={t("shipping_address.address_placeholder")}
//                     value={checkout.formData.address}
//                     onChange={(e) =>
//                       checkout.setFormData({
//                         ...checkout.formData,
//                         address: e.target.value,
//                       })
//                     }
//                     className="bg-[#1C1A1B] border-border text-white"
//                   />
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="city" className="mb-2 block">
//                       {t("shipping_address.city")}
//                     </Label>
//                     <Input
//                       id="city"
//                       placeholder={t("shipping_address.city_placeholder")}
//                       value={checkout.formData.city}
//                       onChange={(e) =>
//                         checkout.setFormData({
//                           ...checkout.formData,
//                           city: e.target.value,
//                         })
//                       }
//                       className="bg-[#1C1A1B] border-border text-white"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="country" className="mb-2 block">
//                       {t("shipping_address.country")}
//                     </Label>
//                     <Input
//                       id="country"
//                       placeholder={t("shipping_address.country_placeholder")}
//                       value={checkout.formData.country}
//                       onChange={(e) =>
//                         checkout.setFormData({
//                           ...checkout.formData,
//                           country: e.target.value,
//                         })
//                       }
//                       className="bg-[#1C1A1B] border-border text-white"
//                     />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Payment Method */}
//             <Card className="bg-[#2A2829] border-border">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <CreditCard className="w-5 h-5 text-primary" />
//                   {t("payment_method.title")}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="card_number" className="mb-2 block">
//                       {t("payment_method.card_number")}
//                     </Label>
//                     <Input
//                       id="card_number"
//                       placeholder="•••• •••• •••• ••••"
//                       value={checkout.formData.cardNumber}
//                       onChange={(e) =>
//                         checkout.setFormData({
//                           ...checkout.formData,
//                           cardNumber: e.target.value,
//                         })
//                       }
//                       className="bg-[#1C1A1B] border-border text-white"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="expiry_date" className="mb-2 block">
//                       {t("payment_method.expiry_date")}
//                     </Label>
//                     <Input
//                       id="expiry_date"
//                       placeholder="MM/YY"
//                       value={checkout.formData.expiryDate}
//                       onChange={(e) =>
//                         checkout.setFormData({
//                           ...checkout.formData,
//                           expiryDate: e.target.value,
//                         })
//                       }
//                       className="bg-[#1C1A1B] border-border text-white"
//                     />
//                   </div>
//                 </div>
//                 <div>
