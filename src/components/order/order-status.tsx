"use client";

import { Check } from "lucide-react";

type OrderStatusType = "processing" | "in-delivery" | "delivered" | "cancelled";

interface OrderStatusProps {
  status: OrderStatusType;
}

const steps = [
  { id: "processing", label: "جاري معالجة الطلب" },
  { id: "in-delivery", label: "قيد التوصيل" },
  { id: "delivered", label: "تم التوصيل" },
];

export function OrderStatus({ status }: OrderStatusProps) {
  const getStepStatus = (stepId: string) => {
    if (status === "cancelled") return "cancelled";

    const statusOrder = ["processing", "in-delivery", "delivered"];
    const currentIndex = statusOrder.indexOf(status);
    const stepIndex = statusOrder.indexOf(stepId);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "active";
    return "pending";
  };

  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-2xl mx-auto">
      {steps.map((step, index) => {
        const stepStatus = getStepStatus(step.id);

        return (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step button */}
            <button
              type="button"
              className={`
                flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all
                ${
                  stepStatus === "active"
                    ? "bg-primary text-primary-foreground"
                    : stepStatus === "completed"
                      ? "bg-primary/20 text-primary"
                      : "bg-secondary text-muted-foreground"
                }
                ${status === "cancelled" ? "bg-destructive/10 text-destructive" : ""}
              `}
            >
              {step.label}
            </button>
          </div>
        );
      })}
    </div>
  );
}
