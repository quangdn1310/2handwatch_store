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
    status?: 'available' | 'preorder' | 'sold';
    year?: string;
    image: string;
    images?: string[];
    description?: string;
    specifications?: {
        diameter: string;
        thickness: string;
        material: string;
        movement: string;
        waterResistance?: string;
        crystal?: string;
        strap?: string;
    };
    isNew?: boolean;
    isFeatured?: boolean;
    views?: number;
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
    status = 'available',
}: WatchCardProps) {
    const t = useTranslations('product');
    const variant = conditionVariants[condition];

    return (
        <div className="card group bg-black/40 backdrop-blur-sm border-white/5 hover:border-accent/40 transition-all duration-500">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#0a0a0a]">
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
                <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                    <Badge variant={variant}>{t(`conditions.${condition}`)}</Badge>
                    {status !== 'available' && (
                        <Badge
                            variant={status === 'sold' ? 'error' : 'warning'}
                        >
                            {t(`statuses.${status}`).toUpperCase()}
                        </Badge>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
                {/* Brand & Year */}
                <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-[0.2em] font-medium">
                        {brand} {year && <span className="text-white/20 px-1">•</span>} {year}
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
                <h3 className="font-serif text-xl font-bold text-white line-clamp-2 h-[3rem] group-hover:text-[var(--color-accent)] transition-colors leading-[1.2] overflow-hidden">
                    {name}
                </h3>

                {/* Price Section */}
                <div className="pt-2">
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
                    <Button variant="outline" className="w-full rounded-none font-bold uppercase tracking-[0.2em] text-[10px] py-6 h-auto border-white/10 group-hover:border-accent group-hover:text-accent transition-all duration-300">
                        {t('details')}
                    </Button>
                </Link>
            </div>
        </div>
    );
}
