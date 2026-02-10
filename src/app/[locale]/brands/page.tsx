'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Reveal, Button } from '@/components/ui';
import { BrandTierSection } from '@/components/shared';
import { BRAND_TIERS } from '@/data/brands';
import { ROUTES } from '@/constants';

export default function BrandsPage() {
    const t = useTranslations('brands');

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center bg-black overflow-hidden">
                {/* Background with gradient overlay */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
                    <div className="absolute inset-0 bg-dot-pattern opacity-20" />
                </div>

                {/* Content */}
                <div className="container relative z-20 py-32 text-center">
                    <Reveal direction="up" delay={100}>
                        <div className="inline-flex items-center gap-4 px-8 py-3 border border-accent/30 bg-black/40 backdrop-blur-sm mb-8">
                            <span className="w-8 h-px bg-accent" />
                            <span className="text-accent font-bold tracking-[0.5em] uppercase text-[9px] md:text-[10px]">
                                {t('subtitle')}
                            </span>
                            <span className="w-8 h-px bg-accent" />
                        </div>
                    </Reveal>

                    <Reveal direction="up" delay={300}>
                        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-white leading-[0.9] tracking-[-0.04em] mb-8">
                            {t('title')}
                        </h1>
                    </Reveal>

                    <Reveal direction="up" delay={500}>
                        <p className="text-text-secondary text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
                            {t('description')}
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Brand Tiers */}
            <div className="border-t border-white/5">
                {BRAND_TIERS.map((tier, index) => (
                    <BrandTierSection key={tier.id} tier={tier} index={index} />
                ))}
            </div>

            {/* Bottom CTA Section */}
            <section className="py-28 bg-gradient-to-t from-black to-transparent border-t border-white/5">
                <div className="container text-center">
                    <Reveal direction="up">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white italic">
                                {t('cta.title')}
                            </h2>
                            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                                {t('cta.description')}
                            </p>
                            <Link href={ROUTES.products}>
                                <Button
                                    variant="primary"
                                    className="h-16 px-14 btn-gold rounded-none min-w-[280px] uppercase tracking-[0.4em] text-[11px] font-bold hover:scale-105 transition-transform duration-300"
                                >
                                    {t('cta.button')}
                                </Button>
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
