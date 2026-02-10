'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { AuctionProduct } from '@/data/auction';
import { cn, formatPrice } from '@/lib/utils';
import { ZoomImage } from '@/components/ui';

interface AuctionInfoProps {
    product: AuctionProduct;
}

export function AuctionInfo({ product }: AuctionInfoProps) {
    const t = useTranslations('auction.specs');
    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    return (
        <div className="space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
                <div className="relative aspect-square overflow-hidden rounded-sm border border-white/10">
                    <ZoomImage
                        src={selectedImage}
                        alt={product.name}
                        className="aspect-square object-cover w-full h-full"
                        zoomScale={2}
                    />
                    <div className="absolute top-4 left-4 z-10">
                        <div className="bg-red-600 text-white text-xs font-bold uppercase px-3 py-1 tracking-widest animate-pulse">
                            Live Auction
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {product.images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedImage(img)}
                            className={cn(
                                'relative aspect-square overflow-hidden border transition-all duration-300',
                                selectedImage === img
                                    ? 'border-accent opacity-100'
                                    : 'border-white/10 opacity-60 hover:opacity-100'
                            )}
                        >
                            <Image src={img} alt="Thumbnail" fill className="object-cover" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
                <div>
                    <h3 className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-2">{product.specs.brand}</h3>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">{product.name}</h1>
                </div>

                <div className="prose prose-invert prose-sm text-text-secondary">
                    <p>{product.description}</p>
                </div>

                {/* Specs Table */}
                <div className="border-t border-white/10 pt-6">
                    <h4 className="text-white font-bold uppercase tracking-widest mb-4 text-xs">{t('title')}</h4>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                        <div>
                            <span className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">{t('model')}</span>
                            <span className="text-white font-medium">{product.specs.model}</span>
                        </div>
                        <div>
                            <span className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">{t('diameter')}</span>
                            <span className="text-white font-medium">{product.specs.diameter}</span>
                        </div>
                        <div>
                            <span className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">{t('material')}</span>
                            <span className="text-white font-medium">{product.specs.material}</span>
                        </div>
                        <div>
                            <span className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">{t('movement')}</span>
                            <span className="text-white font-medium">{product.specs.movement}</span>
                        </div>
                        <div>
                            <span className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">{t('condition')}</span>
                            <span className="text-white font-medium">{product.specs.condition}</span>
                        </div>
                        <div>
                            <span className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">{t('year')}</span>
                            <span className="text-white font-medium">{product.specs.year}</span>
                        </div>
                        <div className="col-span-2">
                            <span className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">{t('boxPapers')}</span>
                            <span className="text-white font-medium">{product.specs.boxPapers}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
