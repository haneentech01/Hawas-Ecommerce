"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import { Link } from "@/src/i18n/routing";
import { useLocale } from "next-intl";

const Logo = ({ isRtl }: { isRtl: boolean }) => (
  <Link
    href="/"
    className="relative h-8 w-24 md:h-10 md:w-32 lg:w-[149px] lg:h-[50px]"
  >
    <Image
      src={isRtl ? "/images/hawas.png" : "/images/hawasEn.png"}
      alt="Hawas"
      fill
      className="object-contain"
      priority
    />
  </Link>
);

interface CancelOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function CancelOrderModal({
  open,
  onOpenChange,
  onConfirm,
}: CancelOrderModalProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-card border-border max-w-lg"
        showCloseButton={false}
      >
        <DialogHeader className="text-center space-y-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-foreground mx-auto">
            <Logo isRtl={isRtl} />
          </div>

          {/* Warning message */}
          <p className="text-destructive font-medium">
            نعتذر لهذه التجربة السيئة
          </p>

          {/* Main message */}
          <div className="space-y-2 text-right">
            <p className="text-foreground">
              هل أنت متأكد في رغبتك لإلغاء الطلب{" "}
              <span className="font-bold">
                فلا يمكنك التراجع بعد هذه الخطوة
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              يمكنك التراجع عن إلغاء الطلب الآن لو لم تكن متأكد من الإلغاء.
            </p>
          </div>
        </DialogHeader>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <Button
            variant="outline"
            className="flex-1 border-border text-foreground hover:bg-secondary bg-transparent"
            onClick={() => onOpenChange(false)}
          >
            الرجوع عن الالغاء
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
            onClick={onConfirm}
          >
            إلغاء الطلب
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
