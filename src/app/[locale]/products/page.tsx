'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Reveal, Button } from '@/components/ui';
import { WatchCard, WatchCardProps } from '@/components/shared/watch-card';
import { Pagination, Newsletter, InstagramFeed } from '@/components/shared';
import { productService, ProductFilterOptions } from '@/services/product.service';
import { cn } from '@/lib/utils';

export default function ProductsPage() {
  const t = useTranslations('product');
  const tc = useTranslations('collection');
  const [products, setProducts] = useState<WatchCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // Reset to first page on search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);

      const options: ProductFilterOptions = {
        page: currentPage,
        limit: 12,
        q: debouncedSearch || undefined,
        brand: selectedBrand !== 'all' ? selectedBrand : undefined,
        condition: selectedCondition !== 'all' ? selectedCondition : undefined,
        sortBy,
        sortOrder
      };

      // Price filtering logic (simplified for now, can be expanded on backend)
      if (selectedPrice !== 'all') {
        const [min, max] = selectedPrice.split('-').map(Number);
        options.minPrice = min;
        if (max) options.maxPrice = max;
      }

      const response = await productService.getAll(options);
      setProducts(response.items);
      setTotalPages(response.totalPages);
      setTotalProducts(response.total);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, debouncedSearch, selectedBrand, selectedPrice, selectedCondition, sortBy, sortOrder]);

  const brands = ['Rolex', 'Omega', 'Seiko', 'Waltham', 'Bulova', 'Citizen'];
  const conditions = ['like-new', 'excellent', 'good', 'fair'];
  const priceRanges = [
    { label: 'Dưới 5tr', value: '0-5000000' },
    { label: '5tr - 20tr', value: '5000000-20000000' },
    { label: '20tr - 50tr', value: '20000000-50000000' },
    { label: 'Trên 50tr', value: '50000000' },
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <section className="pt-16 pb-8">
          <Reveal direction="up">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                <span className="text-white">{tc('title')} </span>
                <span className="text-gold-gradient italic">{tc('accent')}</span>
              </h1>
              <p className="text-[var(--color-text-secondary)] text-lg font-light tracking-wide mt-4 max-w-2xl">
                {tc('description')}
              </p>
            </div>
          </Reveal>
        </section>

        {/* Header / Search */}
        <Reveal direction="down">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-10 border-b border-white/10">
            <div className="relative flex-1 max-w-2xl">
              <input
                type="text"
                placeholder="Tìm kiếm theo thương hiệu, mẫu mã, kỷ nguyên..."
                className="w-full bg-white/5 border border-white/10 px-12 py-4 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors h-14"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <Button variant="primary" className="h-14 px-12 font-bold uppercase tracking-widest text-xs whitespace-nowrap">
              SẢN PHẨM MỚI HÀNG TUẦN
            </Button>
          </div>
        </Reveal>

        {/* Filters & Sorting */}
        <Reveal direction="up" delay={100}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 py-8">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="text-white/40 uppercase tracking-widest font-bold flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Bộ lọc:
              </span>

              {/* Brand Filter */}
              <select
                className="bg-white/5 border border-white/10 text-white px-4 py-2 hover:border-[var(--color-accent)] focus:outline-none transition-colors cursor-pointer"
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all" className="bg-[#121212]">Tất cả thương hiệu</option>
                {brands.map(brand => (
                  <option key={brand} value={brand} className="bg-[#121212]">{brand}</option>
                ))}
              </select>

              {/* Price Filter */}
              <select
                className="bg-white/5 border border-white/10 text-white px-4 py-2 hover:border-[var(--color-accent)] focus:outline-none transition-colors cursor-pointer"
                value={selectedPrice}
                onChange={(e) => {
                  setSelectedPrice(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all" className="bg-[#121212]">Tát cả mức giá</option>
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value} className="bg-[#121212]">{range.label}</option>
                ))}
              </select>

              {/* Condition Filter */}
              <select
                className="bg-white/5 border border-white/10 text-white px-4 py-2 hover:border-[var(--color-accent)] focus:outline-none transition-colors cursor-pointer"
                value={selectedCondition}
                onChange={(e) => {
                  setSelectedCondition(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all" className="bg-[#121212]">Tất cả tình trạng</option>
                {conditions.map(c => (
                  <option key={c} value={c} className="bg-[#121212]">{t(`conditions.${c}`)}</option>
                ))}
              </select>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-4">
              <select
                className="bg-white/5 border border-white/10 text-white px-4 py-2 hover:border-[var(--color-accent)] focus:outline-none transition-colors cursor-pointer"
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSort, newOrder] = e.target.value.split('-');
                  setSortBy(newSort);
                  setSortOrder(newOrder as 'asc' | 'desc');
                }}
              >
                <option value="created_at-desc" className="bg-[#121212]">Mới nhất</option>
                <option value="price-asc" className="bg-[#121212]">Giá: Thấp đến cao</option>
                <option value="price-desc" className="bg-[#121212]">Giá: Cao đến thấp</option>
                <option value="views-desc" className="bg-[#121212]">Xem nhiều nhất</option>
              </select>
            </div>
          </div>
        </Reveal>

        {/* Results Count */}
        <Reveal direction="up" delay={200}>
          <div className="pb-8">
            <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">
              {tc.rich('showing', {
                start: Math.min((currentPage - 1) * 12 + 1, totalProducts),
                end: Math.min(currentPage * 12, totalProducts),
                total: totalProducts,
                span: (chunks) => <span className="text-white">{chunks}</span>
              })}
            </p>
          </div>
        </Reveal>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 pb-20">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse" />
            ))
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <Reveal key={product.id} direction="up" delay={index * 50}>
                <WatchCard {...product} />
              </Reveal>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-white/60 font-serif text-2xl italic">Không tìm thấy sản phẩm nào matching với bộ lọc của bạn.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedBrand('all');
                  setSelectedPrice('all');
                  setSelectedCondition('all');
                }}
                className="mt-6 text-[var(--color-accent)] underline underline-offset-4 hover:text-white transition-colors"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pb-20">
            <Reveal direction="up">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </Reveal>
          </div>
        )}
      </div>

      <Reveal direction="none">
        <Newsletter />
      </Reveal>
      <Reveal direction="none">
        <InstagramFeed />
      </Reveal>
    </div>
  );
}
