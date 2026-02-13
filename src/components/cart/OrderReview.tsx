"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/src/lib/utils";
import SuccessModal from "./SuccessModal";

interface OrderReviewProps {
  onReviewSubmitted: () => void;
}

export default function OrderReview({ onReviewSubmitted }: OrderReviewProps) {
  const t = useTranslations("cart.order_details");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    // Simulate API call
    setIsModalOpen(true);
  };

  const handleGoToTracking = () => {
    setIsModalOpen(false);
    onReviewSubmitted();
  };

  const handleContinueShopping = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="bg-black/40 rounded-[20px] p-8 lg:p-12 mb-8 
        border border-white/5 max-w-[1198px]"
      >
        <div className="flex flex-col items-start gap-7 lg:px-[205px]">
          <h3 className="text-white text-xl lg:text-2xl font-black">
            {t("review_title")}
          </h3>

          <div className="flex flex-col gap-[19px] w-full">
            <h4 className="text-white text-xl lg:text-2xl font-black">
              {t("review_description")}
            </h4>

            {/* Star Rating */}
            <div className="flex justify-center gap-2 bg-[#1C1A1B] p-4 rounded-[10px] w-full">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={cn(
                      "w-4 h-4 lg:w-5 lg:h-5 transition-colors",
                      (hover || rating) >= star
                        ? "fill-[#FFCC33] text-[#FFCC33]"
                        : "text-[#4C4C4C]",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Textarea */}
          <div className="w-full flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[19px]">
              <label className="text-white text-xl lg:text-2xl font-black">
                {t("review_note")}
              </label>
              <textarea
                placeholder={t("review_placeholder")}
                className="w-full bg-[#1C1A1B] border border-white/10 
                p-6 text-white text-lg lg:text-xl  max-w-[778px]
                min-h-[241px] focus:outline-none focus:border-white/30 
                transition-colors placeholder:text-[#4C4C4C]"
              />
            </div>

            <div className="flex justify-center items-center">
              <button
                onClick={handleSubmit}
                className="bg-[#1C1A1B] text-white px-4 max-w-[527px] py-4 w-full 
              rounded-[5px] text-xl font-black hover:bg-white/10 
              transition-all self-center border border-white/10"
              >
                {t("send_btn")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <SuccessModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={t("review_success.title")}
          mainMessage={t("review_success.main_message")}
          subMessage={t("review_success.sub_message")}
          button1Text={t("review_success.go_to_tracking")}
          onButton1Click={handleGoToTracking}
          button2Text={t("review_success.continue_shopping")}
          button2Href="/cart"
          onButton2Click={handleContinueShopping}
        />
      )}
    </>
  );
}
