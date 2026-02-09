"use client"

import { use, useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Button, Badge, Reveal, ZoomImage } from '@/components/ui';
import { cn, formatPrice } from '@/lib/utils';
import { Newsletter, WatchCard } from '@/components/shared';
import { ROUTES } from '@/constants';
import { productService, BackendWatch } from '@/services/product.service';
import { WatchCardProps } from '@/components/shared/watch-card';
import { BACKEND_URL } from '@/services/api';

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
    const t = useTranslations('product');
    const tNav = useTranslations('nav');
    const { id } = use(params);

    const [watch, setWatch] = useState<WatchCardProps | null>(null);
    const [relatedWatches, setRelatedWatches] = useState<WatchCardProps[]>([]);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setIsLoading(true);
                const data = await productService.getById(id);
                setWatch(data);
                setSelectedImage(data.images?.[0] || '/images/watches/watch-1.png');

                // Increment view count
                productService.incrementView(id).catch(console.error);

                // Fetch related
                const response = await productService.getAll({ page: 1, limit: 10 });
                setRelatedWatches(response.items.filter(w => w.id !== id).slice(0, 4));
            } catch (error) {
                console.error('Failed to fetch product details:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (isLoading || !watch) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Breadcrumbs */}
            <div className="container py-8">
                <Reveal direction="none">
                    <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] font-bold">
                        <Link href={ROUTES.home} className="hover:text-white transition-colors">{tNav('home')}</Link>
                        <span>/</span>
                        <Link href={ROUTES.products} className="hover:text-white transition-colors">{tNav('collection')}</Link>
                        <span>/</span>
                        <span className="text-white">{watch.brand}</span>
                    </nav>
                </Reveal>
            </div>

            <section className="pb-24">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Image Gallery */}
                        <Reveal direction="left">
                            <div className="space-y-4">
                                <ZoomImage
                                    src={selectedImage}
                                    alt={watch.name}
                                    className="aspect-square"
                                    zoomScale={2.5}
                                />
                                {watch.images && watch.images.length > 1 && (
                                    <div className="grid grid-cols-4 gap-4">
                                        {watch.images.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedImage(img)}
                                                className={cn(
                                                    'relative aspect-square overflow-hidden border transition-all duration-300',
                                                    selectedImage === img
                                                        ? 'border-[var(--color-accent)] opacity-100'
                                                        : 'border-[var(--color-border)] opacity-60 hover:opacity-100'
                                                )}
                                            >
                                                <Image src={img} alt="Gallery" fill className="object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Reveal>

                        {/* Product Info */}
                        <Reveal direction="right">
                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-accent)]">
                                            {watch.brand}
                                        </span>
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                                        {watch.name}
                                    </h1>
                                </div>

                                <div className="space-y-2 border-y border-[var(--color-border)] py-8">
                                    <div className="flex items-baseline gap-4">
                                        <span className="text-3xl font-bold text-[var(--color-accent)]">
                                            {formatPrice(watch.price)}
                                        </span>
                                        {watch.originalPrice && watch.originalPrice > watch.price && (
                                            <span className="text-lg text-[var(--color-text-muted)] line-through">
                                                {formatPrice(watch.originalPrice)}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest font-bold">
                                        {t('inclusive')}
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-[var(--color-text-muted)]">
                                            {t('condition')}
                                        </h4>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="accent">{t(`conditions.${watch.condition}`).toUpperCase()}</Badge>
                                            {watch.status && watch.status !== 'available' && (
                                                <Badge
                                                    variant={watch.status === 'sold' ? 'error' : 'info'}
                                                >
                                                    {t(`statuses.${watch.status}`).toUpperCase()}
                                                </Badge>
                                            )}
                                            <p className="text-sm text-[var(--color-text-secondary)]">
                                                {t('authenticated')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8 border-t border-[var(--color-border)] pt-8">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold">Diameter</p>
                                            <p className="text-sm font-medium">{watch.specifications?.diameter || 'N/A'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold">{t('movement')}</p>
                                            <p className="text-sm font-medium">{watch.specifications?.movement || 'N/A'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold">Thickness</p>
                                            <p className="text-sm font-medium">{watch.specifications?.thickness || 'N/A'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold">Material</p>
                                            <p className="text-sm font-medium">{watch.specifications?.material || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 pt-6">
                                    <div className="prose prose-invert prose-sm max-w-none text-[var(--color-text-secondary)] font-light leading-relaxed">
                                        {watch.description || 'No description provided.'}
                                    </div>
                                    <div className="pt-4 space-y-4">
                                        <Button className="w-full h-16 rounded-none text-xs font-bold uppercase tracking-[0.3em]">
                                            {t('purchaseInquiry')}
                                        </Button>
                                    </div>
                                </div>

                                <p className="text-[10px] text-center text-[var(--color-text-muted)] uppercase tracking-widest leading-relaxed">
                                    {t('guaranteed')} • {t('warranty')} • {t('insured')}
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            <section className="py-24 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50">
                <div className="container space-y-12">
                    <Reveal direction="up">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl font-serif font-bold italic">{t('relatedTitle')}</h2>
                            <div className="h-px w-24 bg-[var(--color-accent)] mx-auto" />
                        </div>
                    </Reveal>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedWatches.map((w, index) => (
                            <Reveal key={w.id} direction="up" delay={index * 100}>
                                <WatchCard {...w} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <Reveal direction="none">
                <Newsletter />
            </Reveal>
        </div>
    );
}
