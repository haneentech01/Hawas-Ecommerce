"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import SuccessModal from "./SuccessModal";

interface OrderProcessingViewProps {
  onCancelSuccess?: () => void;
}

export default function OrderProcessingView({
  onCancelSuccess,
}: OrderProcessingViewProps) {
  const t = useTranslations("cart.order_details");
  const [cancelStep, setCancelStep] = useState<"none" | "confirm" | "success">(
    "none",
  );

  const handleCancelClick = () => {
    setCancelStep("confirm");
  };

  const handleConfirmCancel = () => {
    // Simulate API call transition
    setCancelStep("success");
  };

  const handleClose = () => {
    setCancelStep("none");
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Processing Info Section */}
      <div className="bg-black/40 rounded-[25px] border border-white/5">
        <div
          className="flex flex-col items-start gap-4 px-6 lg:px-[145px]
        py-5 lg:py-7"
        >
          <h3 className="text-white text-xl lg:text-2xl font-black">
            {t("processing_info.title")}
          </h3>
          <p className="text-[#AEAEAE] text-base lg:text-lg font-bold leading-relaxed max-w-[900px]">
            {t("processing_info.description")}
          </p>
        </div>
      </div>

      {/* Cancel Info Section */}
      <div className="bg-black/40 rounded-[25px] p-8 lg:p-12 border border-white/5">
        <div className="flex flex-col items-start gap-6 px-5 lg:px-[145px]">
          <div className="flex flex-col gap-4">
            <h3 className="text-white text-2xl lg:text-3xl font-bold">
              {t("cancel_info.title")}
            </h3>
            <p className="text-[#AEAEAE] text-base lg:text-lg font-bold leading-relaxed max-w-[900px]">
              {t("cancel_info.description")}
            </p>
          </div>

          <button
            onClick={handleCancelClick}
            className="border border-white text-white px-12 lg:px-[86px] py-1 
          rounded-[25px] text-xl lg:text-2xl font-black 
          hover:bg-white/10 transition-all 
          self-center lg:self-end"
          >
            {t("cancel_info.cancel_btn")}
          </button>
        </div>
      </div>

      {/* Cancellation Flow Modals */}
      <SuccessModal
        isOpen={cancelStep === "confirm"}
        onClose={handleClose}
        isCentered
        secondaryTitle={t("cancel_confirmation.subtitle")}
        title=""
        mainMessage={t("cancel_confirmation.title")}
        subMessage={t("cancel_confirmation.description")}
        button1Text={t("cancel_confirmation.confirm_btn")}
        button1Variant="outline-red"
        onButton1Click={handleConfirmCancel}
        button2Text={t("cancel_confirmation.back_btn")}
        button2Variant="filled-gray"
        onButton2Click={handleClose}
      />

      <SuccessModal
        isOpen={cancelStep === "success"}
        onClose={handleClose}
        isCentered
        secondaryTitle={t("cancel_success_view.subtitle")}
        title=""
        mainMessage={t("cancel_success_view.title")}
        subMessage={t("cancel_success_view.description")}
        button1Text={t("cancel_success_view.tracking_btn")}
        button1Variant="outline-white"
        onButton1Click={() => {
          onCancelSuccess?.();
          handleClose();
        }}
        button2Text={t("cancel_success_view.continue_btn")}
        button2Variant="filled-gray"
        button2Href="/"
        onButton2Click={handleClose}
      />
    </div>
  );
}
