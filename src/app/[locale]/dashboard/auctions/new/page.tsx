import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { AuctionForm } from '@/components/dashboard/AuctionForm';

export default function NewAuctionPage() {
    return (
        <div className="space-y-6 max-w-6xl mx-auto pb-12">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/auctions">
                    <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-full border-white/10 hover:bg-white/10">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white uppercase tracking-wider">Create New Auction</h1>
                    <p className="text-text-secondary">Set up a new product for bidding</p>
                </div>
            </div>

            <AuctionForm />
        </div>
    );
}
