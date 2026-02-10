
export interface Bid {
    id: string;
    user: string;
    price: number;
    phone: string;
    timestamp: Date;
    avatar?: string;
}

export interface AuctionProduct {
    id: string;
    name: string;
    description: string;
    startingPrice: number;
    currentBid: number;
    images: string[];
    specs: {
        brand: string;
        model: string;
        diameter: string;
        movement: string;
        material: string;
        year: string;
        condition: string;
        boxPapers: string;
    };
    endTime: Date;
    bids: Bid[];
}

// Mock Auction Data
export const AUCTION_DATA: AuctionProduct = {
    id: 'auction-001',
    name: 'Patek Philippe Nautilus 5711/1A-010',
    description: 'The legendary Patek Philippe Nautilus Ref. 5711/1A-010 featuring a blue dial. This discontinued model is one of the most sought-after timepieces in the world. Encased in stainless steel with an integrated bracelet, it represents the pinnacle of luxury sports watches.',
    startingPrice: 1000000000, // 1 billion VND
    currentBid: 0,
    images: [
        '/images/watches/watch-1.png', // Placeholder, using existing images
        '/images/watches/watch-2.png',
        '/images/watches/watch-3.png',
    ],
    specs: {
        brand: 'Patek Philippe',
        model: 'Nautilus 5711/1A',
        diameter: '40mm',
        movement: 'Automatic Caliber 26-330 S C',
        material: 'Stainless Steel',
        year: '2019',
        condition: 'Excellent (Mint)',
        boxPapers: 'Full Set (Box & Papers)',
    },
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Ends in 24 hours
    bids: [], // Initial state
};
