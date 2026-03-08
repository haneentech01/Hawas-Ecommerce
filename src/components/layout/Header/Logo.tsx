"use client";

import Image from "next/image";
import { Link } from "@/src/i18n/routing";

interface LogoProps {
  isRtl: boolean;
}

export const Logo = ({ isRtl }: LogoProps) => (
  <Link
    href="/"
    className="relative flex items-center h-8 w-24 md:h-10 md:w-32 lg:w-[149px] lg:h-[50px] shrink-0"
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
