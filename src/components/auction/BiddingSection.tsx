'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { auctionService, Auction, Bid } from '@/services/auction.service';
import { cn, formatPrice } from '@/lib/utils';
import { Button, Input } from '@/components/ui';

interface BiddingSectionProps {
    auction: Auction | null;
}

export function BiddingSection({ auction }: BiddingSectionProps) {
    const t = useTranslations('auction');
    const [bids, setBids] = useState<Bid[]>([]);
    const [input, setInput] = useState('');
    const [timeLeft, setTimeLeft] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [currentBidPrice, setCurrentBidPrice] = useState(auction ? auction.current_bid : 0);

    useEffect(() => {
        if (auction) {
            setCurrentBidPrice(auction.current_bid);
            // Initial fetch
            fetchBids();

            // Poll for updates every 5 seconds
            const interval = setInterval(() => {
                fetchBids();
                // We should also re-fetch active auction to update current_bid if needed, 
                // but for now let's rely on bids list to calc max or just fetch bids.
                // Actually, best to fetch auction details to get authoritative current_bid
                updateAuctionDetails();
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [auction]);

    const fetchBids = async () => {
        if (!auction) return;
        try {
            const data = await auctionService.getBids(auction.id);
            setBids(data);
        } catch (err) {
            console.error("Failed to fetch bids", err);
        }
    };

    const updateAuctionDetails = async () => {
        if (!auction) return;
        try {
            const data = await auctionService.getActiveAuction();
            if (data) {
                setCurrentBidPrice(data.current_bid);
            }
        } catch (err) {
            console.error("Failed to update auction details", err);
        }
    }

    // Calculate highest bid from local list or use auction's current_bid
    // The auction.current_bid from server is the source of truth
    const displayPrice = Math.max(currentBidPrice, bids.length > 0 ? Math.max(...bids.map(b => b.amount)) : 0);

    // Countdown Timer (Using auction.end_time)
    useEffect(() => {
        if (!auction) return;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = new Date(auction.end_time).getTime() - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft('EXPIRED');
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }, 1000);

        return () => clearInterval(interval);
    }, [auction]);

    const validateInput = (value: string) => {
        const regex = /^([\d.,]+)\s*-\s*(\d{9,11})$/;
        const match = value.match(regex);

        if (!match) return null;

        const rawPrice = match[1].replace(/[.,]/g, '');
        const phone = match[2];

        return {
            price: parseInt(rawPrice, 10),
            phone
        };
    };

    const handleBidSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!auction) return;

        const parsed = validateInput(input);

        if (!parsed || isNaN(parsed.price)) {
            setError(t('errors.invalidFormat'));
            return;
        }

        if (parsed.price <= displayPrice) {
            setError(t('errors.lowBid'));
            return;
        }

        if (parsed.price < auction.starting_price) {
            setError(t('errors.lowStartingBid'));
            return;
        }

        try {
            await auctionService.placeBid(auction.id, {
                phone_number: parsed.phone,
                amount: parsed.price
            });

            setSuccess(t('success'));
            setInput('');
            fetchBids(); // Refresh immediately
            updateAuctionDetails();
        } catch (err: any) {
            setError(err.response?.data?.detail || "Failed to place bid");
        }
    };

    if (!auction) return null;

    return (
        <div className="bg-white/5 border border-white/10 p-6 md:p-8 space-y-8 sticky top-24">
            {/* Timer & Current Bid */}
            <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-6">
                <div>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">{t('endsIn')}</p>
                    <p className="text-xl md:text-2xl font-mono text-accent font-bold tabular-nums">{timeLeft}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">{t('currentBid')}</p>
                    <p className="text-xl md:text-2xl font-serif text-white font-bold">{formatPrice(displayPrice)}</p>
                </div>
            </div>

            {/* Bid Form */}
            <form onSubmit={handleBidSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs uppercase font-bold tracking-widest text-white">{t('placeBid')}</label>
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={t('inputPlaceholder')}
                        className="bg-black/50 border-white/20 focus:border-accent text-white placeholder:text-white/30 h-12"
                    />
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    {success && <p className="text-green-500 text-xs">{success}</p>}
                </div>
                <Button
                    type="submit"
                    className="w-full h-12 bg-accent hover:bg-accent/90 text-black font-bold uppercase tracking-widest"
                >
                    {t('submit')}
                </Button>
            </form>

            {/* Rules */}
            <div className="bg-white/5 p-4 text-xs text-text-secondary space-y-2">
                <h5 className="text-white font-bold uppercase tracking-wider mb-2">{t('rules.title')}</h5>
                <ul className="list-disc list-inside space-y-1 text-text-muted">
                    <li>{t('rules.rule1')}</li>
                    <li>{t('rules.rule2')}</li>
                    <li>{t('rules.rule3')}</li>
                </ul>
            </div>

            {/* Bid History */}
            <div className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="text-sm font-bold uppercase tracking-widest text-white">{t('bidHistory')}</h4>

                {bids.length === 0 ? (
                    <p className="text-text-muted text-sm italic py-4 text-center">{t('noBids')}</p>
                ) : (
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {bids.map((bid) => (
                            <div key={bid.id} className="flex items-center justify-between p-3 bg-black/40 border border-white/5 hover:border-accent/20 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/10">
                                        <Image src={bid.avatar!} alt="Avatar" fill className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-white">{bid.user_name}</p>
                                        <p className="text-[10px] text-text-muted">{new Date(bid.created_at).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-accent">{formatPrice(bid.amount)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
