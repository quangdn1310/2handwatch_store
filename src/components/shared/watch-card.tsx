'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui';
import { Button } from '@/components/ui';
import { cn, formatPrice } from '@/lib/utils';

export interface WatchCardProps {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    condition: 'like-new' | 'excellent' | 'good' | 'fair';
    year?: string;
    image: string;
    isNew?: boolean;
    isFeatured?: boolean;
}

const conditionVariants = {
    'like-new': 'success' as const,
    excellent: 'accent' as const,
    good: 'info' as const,
    fair: 'warning' as const,
};

export function WatchCard({
    id,
    name,
    brand,
    price,
    originalPrice,
    condition,
    year,
    image,
    isNew,
    isFeatured,
}: WatchCardProps) {
    const t = useTranslations('product');
    const variant = conditionVariants[condition];

    return (
        <div className="card group">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-[#1f1f1f]">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {isNew && <Badge variant="accent">{t('new')}</Badge>}
                    {isFeatured && <Badge variant="warning">{t('featured')}</Badge>}
                </div>

                {/* Condition Badge */}
                <div className="absolute top-3 right-3">
                    <Badge variant={variant}>{t(`conditions.${condition}`)}</Badge>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
                {/* Brand & Year */}
                <div className="flex items-center justify-between">
                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-[0.2em] font-semibold">
                        {brand} {year && `• ${year}`}
                    </p>
                    <button className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </button>
                </div>

                {/* Name */}
                <h3 className="font-serif text-base font-medium text-white line-clamp-2 min-h-[2.5rem] group-hover:text-[var(--color-accent)] transition-colors tracking-tight leading-snug">
                    {name}
                </h3>

                {/* Price Section */}
                <div className="pt-1">
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-[var(--color-accent)]">
                            {formatPrice(price)}
                        </span>
                        {originalPrice && originalPrice > price && (
                            <span className="text-sm text-[var(--color-text-muted)] line-through">
                                {formatPrice(originalPrice)}
                            </span>
                        )}
                    </div>
                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mt-1">
                        {t('currentPrice')}
                    </p>
                </div>

                {/* Action Button */}
                <Link href={`/products/${id}`} className="block pt-2">
                    <Button variant="primary" className="w-full rounded-none font-bold uppercase tracking-widest text-[10px] py-4 h-auto">
                        {t('details')}
                    </Button>
                </Link>
            </div>
        </div>
    );
}
