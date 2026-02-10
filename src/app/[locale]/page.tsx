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
        const response = await productService.getAll({ page: 1, limit: 4 });
        setFeaturedWatches(response.items);
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
      {/* Hero Section - Premium Redesign */}
      <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0">
          {/* Main background image with parallax effect */}
          <div className="absolute inset-0 scale-110">
            <Image
              src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=2400&auto=format&fit=crop"
              alt="Luxury Vintage Watch"
              fill
              className="object-cover animate-slow-zoom"
              priority
            />
          </div>

          {/* Gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60" />

          {/* Animated grain texture */}
          <div className="absolute inset-0 bg-dot-pattern opacity-30" />
        </div>

        {/* Main Content - Centered */}
        <div className="container relative z-20 py-28">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-12">
              {/* Subtitle Badge */}
              <Reveal direction="up" delay={100}>
                <div className="inline-flex items-center gap-4 px-8 py-3 border border-accent/30 bg-black/40 backdrop-blur-sm">
                  <span className="w-8 h-px bg-accent" />
                  <span className="text-accent font-bold tracking-[0.5em] uppercase text-[9px] md:text-[10px]">
                    {t('hero.subtitle')}
                  </span>
                  <span className="w-8 h-px bg-accent" />
                </div>
              </Reveal>

              {/* Main Headline */}
              <Reveal direction="up" delay={300}>
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[180px] font-serif font-bold text-white leading-[0.85] tracking-[-0.05em]">
                  {t('hero.title')}
                  <br />
                  <span className="text-gold-gradient italic relative inline-block mt-4">
                    {t('hero.accent')}
                    <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
                  </span>
                </h1>
              </Reveal>

              {/* Description */}
              <Reveal direction="up" delay={500}>
                <p className="text-text-secondary text-lg md:text-xl lg:text-2xl font-light tracking-wide max-w-3xl mx-auto leading-relaxed">
                  {t('hero.description')}
                </p>
              </Reveal>

              {/* CTA Buttons */}
              <Reveal direction="up" delay={700} className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                <Link href={ROUTES.products}>
                  <Button
                    variant="primary"
                    className="h-16 px-14 btn-gold rounded-none min-w-[280px] uppercase tracking-[0.4em] text-[11px] font-bold hover:scale-105 transition-transform duration-300"
                  >
                    {t('common.explore')}
                  </Button>
                </Link>
                <button className="group h-16 px-14 border-2 border-white/20 hover:border-white/40 bg-transparent text-white rounded-none min-w-[280px] uppercase tracking-[0.4em] text-[11px] font-bold transition-all duration-300 hover:bg-white/5">
                  <span className="inline-flex items-center gap-3">
                    {t('common.story')}
                    <span className="inline-block w-6 h-px bg-white group-hover:w-10 transition-all duration-300" />
                  </span>
                </button>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Floating Stats Cards */}
        <div className="absolute bottom-32 left-0 right-0 z-30 hidden lg:block">
          <div className="container">
            <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { value: '4,000+', label: t('expertise.stats.sold'), delay: 200 },
                { value: '$40M', label: t('expertise.stats.volume'), delay: 400 },
                { value: '150+', label: t('expertise.stats.brands'), delay: 600 }
              ].map((stat, idx) => (
                <Reveal key={idx} direction="up" delay={stat.delay}>
                  <div className="group relative bg-black/60 backdrop-blur-xl border border-white/10 hover:border-accent/30 p-8 transition-all duration-500 hover:bg-black/80">
                    <div className="absolute top-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-500" />
                    <div className="text-center space-y-3">
                      <p className="text-4xl md:text-5xl font-serif italic font-bold text-white group-hover:text-accent transition-colors duration-300">
                        {stat.value}
                      </p>
                      <p className="text-[9px] md:text-[10px] text-text-muted uppercase tracking-[0.3em] font-bold">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Stats - Bottom Bar */}
        <div className="absolute bottom-0 left-0 w-full bg-black/90 backdrop-blur-md border-t border-white/10 py-6 lg:hidden z-30">
          <div className="container flex justify-around items-center text-center px-4">
            <div className="space-y-1">
              <p className="text-white text-2xl font-serif font-bold italic">4K+</p>
              <p className="text-text-muted text-[8px] uppercase tracking-widest font-bold">{t('expertise.stats.sold')}</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="space-y-1">
              <p className="text-white text-2xl font-serif font-bold italic">$40M</p>
              <p className="text-text-muted text-[8px] uppercase tracking-widest font-bold">{t('expertise.stats.volume')}</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="space-y-1">
              <p className="text-white text-2xl font-serif font-bold italic">150+</p>
              <p className="text-text-muted text-[8px] uppercase tracking-widest font-bold">{t('expertise.stats.brands')}</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <Reveal direction="up" delay={900}>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-3 animate-bounce">
            <span className="text-white/60 text-[9px] uppercase tracking-[0.3em] font-bold rotate-90 origin-center">
              {t('common.scroll')}
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-accent/50 to-transparent" />
          </div>
        </Reveal>
      </section>

      {/* Visual Categories Grid */}
      <section className="py-28 border-y border-white/5 bg-black">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[800px]">
            {/* Category 1 - Large Side */}
            <div className="md:col-span-7 h-full">
              <Reveal direction="up" delay={100} className="relative h-full group overflow-hidden cursor-pointer border border-white/5">
                <Image
                  src="/images/watches/classic.jpg"
                  alt={t(`categories.classic.title`)}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-80" />
                <div className="absolute inset-x-0 bottom-0 p-12 z-20 space-y-4">
                  <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em] block">
                    {t(`categories.classic.subtitle`)}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-serif italic text-white">{t(`categories.classic.title`)}</h3>
                  <p className="text-text-secondary max-w-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {t('categories.classic.description')}
                  </p>
                  <Link href="/products?category=classic" className="inline-block pt-4 text-white border-b border-accent text-[10px] uppercase font-bold tracking-widest">
                    {t('common.explore')}
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Category 2 & 3 - Stacked Side */}
            <div className="md:col-span-5 grid grid-rows-2 gap-6">
              {[
                { id: 'rare', img: '/images/watches/rare_discoveries.jpg' },
                { id: 'modern', img: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=704&auto=format&fit=crop' },
              ].map((cat, index) => (
                <Reveal key={index} direction="up" delay={index * 200 + 300} className="relative group overflow-hidden cursor-pointer border border-white/5">
                  <Image
                    src={cat.img}
                    alt={t(`categories.${cat.id}.title`)}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-80" />
                  <div className="absolute inset-x-0 bottom-0 p-8 z-20 space-y-2">
                    <span className="text-accent text-[9px] font-bold uppercase tracking-[0.4em] block">
                      {t(`categories.${cat.id}.subtitle`)}
                    </span>
                    <h3 className="text-2xl font-serif italic text-white">{t(`categories.${cat.id}.title`)}</h3>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-28 bg-black">
        <div className="container space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4">
            <Reveal direction="left" className="space-y-4">
              <h4 className="text-accent font-bold tracking-[0.3em] uppercase text-[10px]">
                {t('arrivals.subtitle')}
              </h4>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-white italic">
                {t('arrivals.title')}
              </h2>
            </Reveal>
            <Reveal direction="right">
              <Link href={ROUTES.products} className="group flex items-center gap-4 text-white hover:text-accent transition-colors border-b border-white/10 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{t('common.viewAll')}</span>
                <div className="w-10 h-px bg-white group-hover:bg-accent transition-all group-hover:w-16" />
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


      {/* Heritage Story Section - Dual Column storytelling */}
      <section className="py-28 overflow-hidden bg-black border-b border-white/5">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Reveal direction="right" className="relative group">
              <div className="absolute -inset-4 border border-accent/20 z-0"></div>
              <div className="relative z-10 aspect-[4/5] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2000&auto=format&fit=crop"
                  alt="Watch movement macro"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-accent text-black p-10 hidden xl:block z-20">
                <p className="font-serif italic text-2xl font-bold leading-tight">{t('heritage.story')}</p>
              </div>
            </Reveal>

            <Reveal direction="left" className="space-y-10">
              <div className="space-y-4">
                <h4 className="text-accent font-bold tracking-[0.3em] uppercase text-[10px]">
                  {t('heritage.subtitle')}
                </h4>
                <h2 className="text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1]">
                  {t.rich('heritage.legacy', {
                    span: (chunks) => <span className="text-accent italic">{chunks}</span>,
                    br: () => <br />
                  })}
                </h2>
              </div>

              <p className="text-text-secondary text-lg font-light leading-relaxed max-w-lg">
                {t('heritage.description')}
              </p>

              <div className="space-y-6 border-t border-white/5 pt-8">
                <div className="flex gap-6 items-start">
                  <span className="text-accent font-serif italic text-3xl font-bold">01.</span>
                  <div>
                    <h5 className="text-white font-bold uppercase tracking-widest text-xs mb-2">{t('heritage.curation.title')}</h5>
                    <p className="text-text-muted text-sm font-light">{t('heritage.curation.description')}</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <span className="text-accent font-serif italic text-3xl font-bold">02.</span>
                  <div>
                    <h5 className="text-white font-bold uppercase tracking-widest text-xs mb-2">{t('heritage.restoration.title')}</h5>
                    <p className="text-text-muted text-sm font-light">{t('heritage.restoration.description')}</p>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="h-16 px-10 btn-gold border-none rounded-none text-[11px]">
                {t('heritage.cta')}
              </Button>
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
