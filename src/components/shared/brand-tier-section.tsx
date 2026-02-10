'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui';
import type { BrandTier } from '@/data/brands';

interface BrandTierSectionProps {
    tier: BrandTier;
    index: number;
}

export function BrandTierSection({ tier, index }: BrandTierSectionProps) {
    const t = useTranslations('brands.tiers');

    // Generate star icons based on tier stars
    const renderStars = () => {
        return Array.from({ length: tier.stars }).map((_, i) => (
            <span key={i} className="text-accent text-xl">★</span>
        ));
    };

    return (
        <section className="relative py-16 border-b border-white/5 overflow-hidden">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                    {/* Left Side - Tier Label */}
                    <Reveal
                        direction="right"
                        delay={index * 100}
                        className="lg:col-span-3"
                    >
                        <div className="relative">
                            {/* Diagonal accent line */}
                            <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-accent/50 via-accent to-transparent hidden lg:block" />

                            <div className="space-y-4">
                                {/* Stars */}
                                <div className="flex gap-1">
                                    {renderStars()}
                                </div>

                                {/* Tier Title */}
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white uppercase tracking-wider">
                                    {t(tier.titleKey as any)}
                                </h3>

                                {/* Tier Number */}
                                <div className="text-text-muted text-sm uppercase tracking-[0.3em]">
                                    Tier {tier.tier}
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    {/* Right Side - Brand Grid */}
                    <div className="lg:col-span-9">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
                            {tier.brands.map((brand, brandIndex) => (
                                <Reveal
                                    key={brand.name}
                                    direction="up"
                                    delay={index * 100 + brandIndex * 50}
                                >
                                    <div className="group relative p-4 lg:p-6 bg-black/20 border border-white/5 hover:border-accent/30 hover:bg-black/40 transition-all duration-300">
                                        {/* Hover accent line */}
                                        <div className="absolute top-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-500" />

                                        {/* Brand Name */}
                                        <p className="text-center text-white font-medium text-sm lg:text-base group-hover:text-accent transition-colors duration-300">
                                            {brand.name}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
