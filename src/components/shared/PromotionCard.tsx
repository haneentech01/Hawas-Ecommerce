'use client';

import { useTranslations } from 'next-intl';

interface PromotionCardProps {
  title: string;
  description?: string;
  backgroundColor: string;
  image?: string;
  buttonText?: string;
  className?: string;
}

export default function PromotionCard({
  title,
  description,
  backgroundColor,
  image,
  buttonText,
  className = '',
}: PromotionCardProps) {
  const t = useTranslations('home.promotions');

  return (
    <div 
      className={`relative rounded-lg overflow-hidden ${className}`}
      style={{ backgroundColor }}
    >
      <div className="p-6 h-full flex flex-col justify-between">
        <div>
          <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
          {description && (
            <p className="text-white text-sm opacity-90">{description}</p>
          )}
        </div>
        
        {image && (
          <div className="flex justify-center my-4">
            <img 
              src={image} 
              alt={title}
              className="h-32 w-auto object-contain"
            />
          </div>
        )}

        {buttonText && (
          <button className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-100 transition-colors self-start">
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
