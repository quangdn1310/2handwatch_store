'use client';

import { useTranslations } from 'next-intl';
import { Select } from '@/components/ui';
import { WATCH_BRANDS } from '@/constants';

interface FilterBarProps {
    onBrandChange?: (brand: string) => void;
    onPriceChange?: (price: string) => void;
    onConditionChange?: (condition: string) => void;
    onSortChange?: (sort: string) => void;
}

export function FilterBar({
    onBrandChange,
    onPriceChange,
    onConditionChange,
    onSortChange,
}: FilterBarProps) {
    const t = useTranslations('filter');

    const brandOptions = [
        { value: '', label: t('allBrands') },
        ...WATCH_BRANDS.map((brand) => ({ value: brand.toLowerCase(), label: brand })),
    ];

    const priceOptions = [
        { value: '', label: t('allPrices') },
        { value: '0-5000000', label: t('under5M') },
        { value: '5000000-10000000', label: t('5-10M') },
        { value: '10000000-20000000', label: t('10-20M') },
        { value: '20000000-50000000', label: t('20-50M') },
        { value: '50000000+', label: t('above50M') },
    ];

    const conditionOptions = [
        { value: '', label: t('allConditions') },
        { value: 'like-new', label: 'Like New' },
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
    ];

    const sortOptions = [
        { value: 'newest', label: t('newest') },
        { value: 'price-asc', label: t('priceAsc') },
        { value: 'price-desc', label: t('priceDesc') },
        { value: 'name', label: t('name') },
    ];
    return (
        <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                </svg>
                <span>{t('title')}</span>
            </div>

            <div className="flex items-center gap-2">
                <Select
                    options={brandOptions}
                    onChange={(e) => onBrandChange?.(e.target.value)}
                    className="min-w-[160px]"
                />

                <Select
                    options={priceOptions}
                    onChange={(e) => onPriceChange?.(e.target.value)}
                    className="min-w-[140px]"
                />
            </div>

            <div className="flex items-center gap-2">
                <Select
                    options={conditionOptions}
                    onChange={(e) => onConditionChange?.(e.target.value)}
                    className="min-w-[160px]"
                />
            </div>

            <div className="ml-auto">
                <Select
                    options={sortOptions}
                    onChange={(e) => onSortChange?.(e.target.value)}
                    className="min-w-[140px]"
                />
            </div>
        </div>
    );
}
