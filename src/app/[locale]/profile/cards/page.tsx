"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CircleX, Delete, Plus } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface Card {
  id: string;
  type: "visa" | "mastercard";
  last4: string;
  expiry: string;
  gradient: string;
}

export default function PaymentCardsPage() {
  const t = useTranslations("profile.cards");
  const locale = useLocale();
  const isRtl = locale === "ar";

  // Mock initial state - In the future, this will be fetched from the API
  const [cards, setCards] = useState<Card[]>([
    {
      id: "1",
      type: "visa",
      last4: "4589",
      expiry: "12/26",
      gradient: "linear-gradient(to right, #E53437, #000)",
    },
    {
      id: "2",
      type: "mastercard",
      last4: "4589",
      expiry: "12/25",
      gradient: "linear-gradient(to right, #E53437, #000)",
    },
  ]);

  const [loading, setLoading] = useState(false);

  // Future API Integration placeholder
  useEffect(() => {
    // const fetchCards = async () => {
    //   setLoading(true);
    //   const response = await fetch('/api/cards');
    //   const data = await response.json();
    //   setCards(data);
    //   setLoading(false);
    // };
    // fetchCards();
  }, []);

  const handleDeleteCard = (id: string) => {
    // Future API call: await deleteCard(id);
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <div
      className="w-full bg-[#000000] rounded-[10px] p-6 lg:p-10 
                flex flex-col items-center border border-white/5 
                relative overflow-hidden min-h-[522px]"
    >
      <div className="w-full max-w-[800px] flex flex-col gap-6">
        {loading ? (
          <div className="text-white text-center py-10">{t("loading")}</div>
        ) : (
          <>
            {/* List of Cards */}
            <div className="flex flex-col gap-6 w-full">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={cn(
                    "w-full flex h-[160px] lg:h-[200px] rounded-[15px] overflow-hidden border border-white/5",
                    isRtl ? "flex-row-reverse" : "flex-row",
                  )}
                >
                  {/* Delete Section */}
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="w-[100px] lg:w-[140px] bg-gradient-to-tl from-[#E53437] to-[#000000] 
                             flex flex-col items-center justify-center gap-2 hover:opacity-90 transition-all border-r border-white/5"
                  >
                    <div className="w-8 h-8 lg:w-10 lg:h-10rounded-full flex items-center justify-center">
                      <Delete className="text-white w-5 h-5 lg:w-6 lg:h-6 -scale-x-125" />
                    </div>
                    <span className="text-white text-xs lg:text-base font-bold">
                      {t("delete_card")}
                    </span>
                  </button>

                  {/* Card Visual Section */}
                  <div
                    className="flex-1 relative p-5 lg:p-7 flex flex-col justify-between"
                    style={{ background: card.gradient }}
                  >
                    {/* Brand Logo */}
                    <div className="flex justify-start">
                      <div className="relative w-12 h-5 lg:w-16 lg:h-6">
                        <Image
                          src={
                            card.type === "visa"
                              ? "/images/visaLogoSmall.png"
                              : "/images/mastercard.png"
                          }
                          alt={card.type}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* Masked Number */}
                    <div className="flex flex-col gap-1 items-start">
                      <span className="text-white font-bold text-xl lg:text-[28px]">
                        {t("card_number")}
                      </span>
                      <span
                        className="text-white text-lg lg:text-xl font-bold 
                      tracking-widest"
                      >
                        **** **** **** {card.last4}
                      </span>
                    </div>

                    {/* Expiry and Chip */}
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-white font-bold text-sm lg:text-lg">
                          {t("expiry_date")}
                        </span>
                        <span className="text-white text-xs lg:text-base font-medium opacity-80">
                          {card.expiry}
                        </span>
                      </div>

                      {/* Chip Icon */}
                      <div className="relative w-8 lg:w-10 h-6 lg:h-7">
                        <Image
                          src="/images/SIM.png"
                          alt="chip"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Card Button */}
            <button
              className="w-full h-12 lg:h-14 bg-[#1C1A1B] mt-10 lg:mt-16
               rounded-[4px] flex items-center justify-center gap-3 
               text-white text-base lg:text-xl font-bold 
               hover:bg-[#252525] transition-all"
            >
              <Plus className="w-5 h-5 lg:w-6 lg:h-6" />
              {t("add_card_button")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
