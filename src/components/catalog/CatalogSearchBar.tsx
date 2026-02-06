"use client";

import { FormEvent } from "react";
import { Search } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

type CatalogSearchBarProps = {
  value: string;
  placeholder: string;
  buttonLabel: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  className?: string;
};

export default function CatalogSearchBar({
  value,
  placeholder,
  buttonLabel,
  onChange,
  onSubmit,
  className,
}: CatalogSearchBarProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex w-full items-center gap-3 rounded-full border border-white/10 bg-[#111011] px-4 py-2",
        className,
      )}
    >
      <Search className="h-5 w-5 text-white/50" />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 flex-1 border-0 bg-transparent text-sm text-white placeholder:text-white/40 focus-visible:ring-0"
      />
      <Button
        type="submit"
        variant="white"
        rounded="full"
        className="px-6 text-sm font-semibold"
      >
        {buttonLabel}
      </Button>
    </form>
  );
}
