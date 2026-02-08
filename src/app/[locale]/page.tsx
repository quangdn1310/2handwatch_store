'use client';

import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Reveal } from '@/components/ui';
import { ROUTES } from '@/constants';
import {
  Newsletter,
  InstagramFeed,
  StorePolicies,
  Testimonials,
  WatchCard
} from '@/components/shared';
import { productService } from '@/services/product.service';
import { WatchCardProps } from '@/components/shared/watch-card';

export default function LandingPage() {
  const t = useTranslations();
  const [featuredWatches, setFeaturedWatches] = useState<WatchCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setIsLoading(true);
        // We'll just take the first 4 for now, or filter if we add isFeatured to API
        const data = await productService.getAll();
        setFeaturedWatches(data.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch featured watches:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=2000&auto=format&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover scale-105 animate-slow-zoom"
            priority
          />
        </div>

        <div className="container relative z-20 text-center space-y-12">
          <div className="space-y-6 max-w-4xl mx-auto">
            <Reveal direction="up" delay={200}>
              <h4 className="text-[var(--color-accent)] font-bold tracking-[0.5em] uppercase text-xs">
                {t('hero.subtitle')}
              </h4>
            </Reveal>
            <Reveal direction="up" delay={400}>
              <h1 className="text-6xl md:text-[9rem] font-serif font-bold text-white leading-[0.85] tracking-[-0.06em]">
                {t('hero.title')} <br />
                <span className="text-gold-gradient italic px-2">{t('hero.accent')}</span>
              </h1>
            </Reveal>
            <Reveal direction="up" delay={600}>
              <p className="text-[var(--color-text-secondary)] text-xl md:text-2xl font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
                {t('hero.description')}
              </p>
            </Reveal>
          </div>

          <Reveal direction="up" delay={800}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <Link href={ROUTES.products}>
                <Button variant="primary" className="h-16 px-12 font-bold uppercase tracking-[0.2em] text-xs rounded-none min-w-[240px]">
                  {t('common.explore')}
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="h-16 px-12 font-bold uppercase tracking-[0.2em] text-xs rounded-none border-white/20 hover:border-[var(--color-accent)] min-w-[240px]">
                  {t('common.philosophy')}
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 opacity-60">
          <div className="w-[1px] h-16 bg-gradient-to-b from-[var(--color-accent)] to-transparent" />
        </div>
      </section>

      {/* Heritage Split Section */}
      <section className="py-0 overflow-hidden border-b border-[var(--color-border)]">
        <div className="flex flex-col lg:flex-row min-h-[70vh]">
          <div className="lg:w-1/2 relative min-h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1677445166019-4fa91a090e49?q=80&w=1170&auto=format&fit=crop"
              alt="Watch heritage"
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:w-1/2 flex items-center bg-[var(--color-bg-secondary)] p-12 lg:p-24">
            <Reveal direction="right" className="space-y-8">
              <h4 className="text-[var(--color-accent)] font-bold tracking-[0.3em] uppercase text-xs">
                {t('heritage.subtitle')}
              </h4>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
                {t('heritage.title')}
              </h2>
              <p className="text-[var(--color-text-secondary)] text-lg font-light leading-relaxed max-w-lg">
                {t('heritage.description')}
              </p>
              <Button variant="outline" className="h-14 px-8 font-bold uppercase tracking-[0.2em] text-[10px] rounded-none border-[var(--color-border)]">
                {t('heritage.cta')}
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-32 bg-black">
        <div className="container space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <Reveal direction="left" className="space-y-4">
              <h4 className="text-[var(--color-accent)] font-bold tracking-[0.3em] uppercase text-xs">
                {t('arrivals.subtitle')}
              </h4>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white italic">
                {t('arrivals.title')}
              </h2>
            </Reveal>
            <Reveal direction="right">
              <Link href={ROUTES.products} className="group flex items-center gap-4 text-white hover:text-[var(--color-accent)] transition-colors">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{t('common.viewAll')}</span>
                <div className="w-10 h-px bg-white group-hover:bg-[var(--color-accent)] transition-all group-hover:w-16" />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse rounded-2xl" />
              ))
            ) : featuredWatches.map((watch, index) => (
              <Reveal key={watch.id} direction="up" delay={index * 150}>
                <WatchCard {...watch} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Categories Grid */}
      <section className="py-24 border-y border-[var(--color-border)]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 'classic',
                img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop'
              },
              {
                id: 'rare',
                img: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=694&auto=format&fit=crop'
              },
              {
                id: 'modern',
                img: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=704&auto=format&fit=crop'
              },
            ].map((cat, index) => (
              <Reveal key={index} direction="up" delay={index * 200} className="relative aspect-[3/4] group overflow-hidden cursor-pointer">
                <Image
                  src={cat.img}
                  alt={t(`categories.${cat.id}.title`)}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity" />
                <div className="absolute inset-x-0 bottom-0 p-8 z-20 space-y-2 text-center">
                  <span className="text-[var(--color-accent)] text-[10px] font-bold uppercase tracking-[0.4em] block translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {t(`categories.${cat.id}.subtitle`)}
                  </span>
                  <h3 className="text-2xl font-serif italic text-white">{t(`categories.${cat.id}.title`)}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Restoration Lab Split Section */}
      <section className="py-0 overflow-hidden border-b border-[var(--color-border)]">
        <div className="flex flex-col lg:flex-row-reverse min-h-[70vh]">
          <div className="lg:w-1/2 relative min-h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2000&auto=format&fit=crop"
              alt="Watch movement macro"
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:w-1/2 flex items-center bg-black p-12 lg:p-24">
            <Reveal direction="left" className="space-y-8">
              <h4 className="text-[var(--color-accent)] font-bold tracking-[0.3em] uppercase text-xs">
                {t('lab.subtitle')}
              </h4>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
                {t('lab.title')}
              </h2>
              <p className="text-[var(--color-text-secondary)] text-lg font-light leading-relaxed max-w-lg">
                {t('lab.description')}
              </p>
              <div className="pt-6 grid grid-cols-2 gap-8 border-t border-[var(--color-border)]">
                <div className="space-y-1">
                  <p className="text-white font-bold text-2xl font-serif italic">100%</p>
                  <p className="text-[var(--color-text-muted)] text-[10px] uppercase tracking-widest leading-none">{t('lab.stats.parts')}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-white font-bold text-2xl font-serif italic">30+</p>
                  <p className="text-[var(--color-text-muted)] text-[10px] uppercase tracking-widest leading-none">{t('lab.stats.inspection')}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Policies Shared Component */}
      <StorePolicies />

      {/* Testimonials Shared Component */}
      <Testimonials />

      <Reveal direction="none">
        <Newsletter />
      </Reveal>
      <Reveal direction="none">
        <InstagramFeed />
      </Reveal>
    </div>
  );
}
