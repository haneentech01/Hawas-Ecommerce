"use client";

import ToastProvider from "@/src/components/shared/ToastProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastProvider />
    </>
  );
}
