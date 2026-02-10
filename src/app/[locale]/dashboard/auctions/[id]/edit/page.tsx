'use client';

import { useState, useEffect, use } from 'react';
import { auctionService, Auction } from '@/services/auction.service';
import { Button } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { AuctionForm } from '@/components/dashboard/AuctionForm';

export default function EditAuctionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [auction, setAuction] = useState<Auction | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuction = async () => {
            try {
                const data = await auctionService.getAuction(id);
                setAuction(data);
            } catch (error) {
                console.error("Failed to fetch auction:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAuction();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!auction) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-bold text-white mb-4">Auction not found</h2>
                <Link href="/dashboard/auctions">
                    <Button variant="outline">Back to Auctions</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-6xl mx-auto pb-12">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/auctions">
                    <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-full border-white/10 hover:bg-white/10">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white uppercase tracking-wider">Edit Auction</h1>
                    <p className="text-text-secondary">Modify auction details and timing</p>
                </div>
            </div>

            <AuctionForm initialData={auction} isEdit />
        </div>
    );
}
