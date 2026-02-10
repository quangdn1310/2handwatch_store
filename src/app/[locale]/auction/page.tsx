'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Reveal } from '@/components/ui';
import { AuctionInfo } from '@/components/auction/AuctionInfo';
import { BiddingSection } from '@/components/auction/BiddingSection';
import { auctionService, Auction } from '@/services/auction.service';

export default function AuctionPage() {
    const t = useTranslations('auction');
    const [auction, setAuction] = useState<Auction | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuction = async () => {
            try {
                const data = await auctionService.getActiveAuction();
                setAuction(data);
            } catch (error) {
                console.error('Failed to fetch active auction:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAuction();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
        );
    }

    if (!auction) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white pt-24">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-serif italic">{t('title')}</h2>
                    <p className="text-text-muted">{t('noBids') || "No active auction at the moment. Please check back later."}</p>
                    <div className="w-16 h-[1px] bg-accent mx-auto opacity-50"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-12 pb-24">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent opacity-50" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
            </div>

            <div className="container relative z-10">
                <header className="text-center mb-8 space-y-4">
                    <Reveal direction="up">
                        <div className="inline-flex items-center gap-4 px-6 py-2 border border-accent/20 bg-accent/5 rounded-full mb-6">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em]">
                                {t('title')}
                            </span>
                        </div>
                    </Reveal>
                    {/* <Reveal direction="up" delay={100}>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white italic">
                            {t('subtitle')}
                        </h1>
                    </Reveal> */}
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    {/* Left: Product Info */}
                    <div className="lg:col-span-7">
                        <Reveal direction="left" delay={200}>
                            {/* @ts-ignore */}
                            <AuctionInfo product={auction} />
                        </Reveal>
                    </div>

                    {/* Right: Bidding Area */}
                    <div className="lg:col-span-5">
                        <Reveal direction="right" delay={300}>
                            <BiddingSection auction={auction} />
                        </Reveal>
                    </div>
                </div>
            </div>
        </div>
    );
}
