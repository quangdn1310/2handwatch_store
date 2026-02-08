'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Select, Reveal } from '@/components/ui';
import {
  WatchCard,
  SearchBar,
  FilterBar,
  Newsletter,
  InstagramFeed,
  Pagination,
} from '@/components/shared';
import { mockWatches } from '@/lib/mock-data';

export default function ProductsPage() {
  const t = useTranslations('collection');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const totalProducts = 206;

  return (
    <div className="min-h-screen bg-black">
      {/* Header Section */}
      <section className="pt-16 pb-8 border-b border-[var(--color-border)]">
        <div className="container space-y-10">
          {/* Title Area */}
          <Reveal direction="up">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                <span className="text-white">{t('title')} </span>
                <span className="text-gold-gradient italic">{t('accent')}</span>
              </h1>
              <p className="text-[var(--color-text-secondary)] text-lg font-light tracking-wide max-w-2xl">
                {t('description')}
              </p>
            </div>
          </Reveal>

          {/* Search & Action Bar */}
          <Reveal direction="up" delay={200}>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1 w-full">
                  <SearchBar placeholder={t('searchPlaceholder')} />
                </div>
                <Button variant="primary" className="h-[54px] px-8 font-bold uppercase tracking-[0.2em] text-xs whitespace-nowrap hidden md:flex">
                  {t('newDrop')}
                </Button>
              </div>

              {/* Filter Bar */}
              <div className="pt-4 border-t border-[var(--color-border)]">
                <FilterBar />
              </div>
            </div>
          </Reveal>

          {/* Results Count */}
          <Reveal direction="up" delay={300}>
            <div className="flex items-center justify-between text-[10px] text-[var(--color-text-muted)] uppercase tracking-[0.2em] font-bold">
              <p>
                {t.rich('showing', {
                  start: 1,
                  end: 12,
                  total: totalProducts,
                  span: (chunks) => <span className="text-white">{chunks}</span>
                })}
              </p>
            </div>
          </Reveal>
        </div>
      </section>


      {/* Product Grid */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockWatches.map((watch, index) => (
              <Reveal key={watch.id} direction="up" delay={(index % 4) * 100}>
                <WatchCard {...watch} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="pb-12">
        <div className="container">
          <Reveal direction="up">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </Reveal>
        </div>
      </section>

      <Reveal direction="none">
        <Newsletter />
      </Reveal>
      <Reveal direction="none">
        <InstagramFeed />
      </Reveal>
    </div>
  );
}
