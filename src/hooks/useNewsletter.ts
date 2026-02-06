"use client";

import { useState } from "react";

export function useNewsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const submit = async () => {
    if (!email) return;
    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      // TODO: Replace with real API integration.
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsSuccess(true);
      setEmail("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    setEmail,
    isSubmitting,
    isSuccess,
    submit,
  };
}
