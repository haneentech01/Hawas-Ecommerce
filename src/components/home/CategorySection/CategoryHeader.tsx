"use client";

interface CategoryHeaderProps {
  title: string;
  subtitle?: string;
}

export const CategoryHeader = ({ title, subtitle }: CategoryHeaderProps) => {
  return (
    <div className="relative z-10 text-center">
      <h2 className="text-4xl md:text-6xl font-bold text-white">{title}</h2>
      {subtitle && (
        <p className="text-2xl md:text-3xl text-white font-bold">{subtitle}</p>
      )}
    </div>
  );
};
