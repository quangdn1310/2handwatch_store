'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auctionService, Auction } from '@/services/auction.service';
import { Button, Badge } from '@/components/ui';
import { formatPrice } from '@/lib/utils';
import { PlusIcon, PencilIcon } from 'lucide-react';

export default function AuctionsPage() {
    const router = useRouter();
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAuctions();
    }, []);

    const fetchAuctions = async () => {
        try {
            const data = await auctionService.getAllAuctions();
            setAuctions(data);
        } catch (error) {
            console.error("Failed to fetch auctions:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Auctions Management</h1>
                    <p className="text-text-secondary">Manage your auction events</p>
                </div>
                <Link href="/dashboard/auctions/new">
                    <Button className="bg-accent text-black hover:bg-accent/90">
                        <PlusIcon className="w-4 h-4 mr-2" />
                        New Auction
                    </Button>
                </Link>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-white/10 text-text-muted">
                            <th className="p-4 font-medium uppercase tracking-wider text-xs">Product</th>
                            <th className="p-4 font-medium uppercase tracking-wider text-xs">Status</th>
                            <th className="p-4 font-medium uppercase tracking-wider text-xs">Current Bid</th>
                            <th className="p-4 font-medium uppercase tracking-wider text-xs">End Time</th>
                            <th className="p-4 font-medium uppercase tracking-wider text-xs text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {auctions.map((auction) => (
                            <tr key={auction.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-medium text-white">{auction.name}</td>
                                <td className="p-4">
                                    <Badge
                                        variant={auction.status === 'active' ? 'default' : 'secondary'}
                                        className={auction.status === 'active' ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : ''}
                                    >
                                        {auction.status}
                                    </Badge>
                                </td>
                                <td className="p-4 font-mono text-accent">{formatPrice(auction.current_bid)}</td>
                                <td className="p-4 text-text-secondary">
                                    {new Date(auction.end_time).toLocaleString()}
                                </td>
                                <td className="p-4 text-right">
                                    <Link href={`/dashboard/auctions/${auction.id}/edit`}>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <PencilIcon className="w-4 h-4 text-text-muted hover:text-white" />
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {auctions.length === 0 && !loading && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-text-muted italic">
                                    No auctions found. Create your first one!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
