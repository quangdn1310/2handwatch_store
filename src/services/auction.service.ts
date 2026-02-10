import { api } from './api';

export interface Bid {
    id: string;
    auction_id: string;
    user_name: string;
    phone_number: string;
    amount: number;
    avatar?: string;
    created_at: string;
}

export interface Auction {
    id: string;
    name: string;
    description: string;
    images: string[];
    start_time: string;
    end_time: string;
    starting_price: number;
    bid_step: number;
    current_bid: number;
    status: string;
    specs: any;
    bids: Bid[];
}

export const auctionService = {
    getAllAuctions: async (): Promise<Auction[]> => {
        return api.get<Auction[]>('/auctions');
    },

    getActiveAuction: async (): Promise<Auction> => {
        return api.get<Auction>('/auctions/active');
    },

    getAuction: async (id: string): Promise<Auction> => {
        return api.get<Auction>(`/auctions/${id}`);
    },

    createAuction: async (data: Partial<Auction>): Promise<Auction> => {
        const response = await api.post<Auction>('/auctions', data);
        return response;
    },

    updateAuction: async (id: string, data: Partial<Auction>): Promise<Auction> => {
        const response = await api.put<Auction>(`/auctions/${id}`, data);
        return response;
    },

    getBids: async (auctionId: string): Promise<Bid[]> => {
        return api.get<Bid[]>(`/auctions/${auctionId}/bids`);
    },

    placeBid: async (auctionId: string, data: { phone_number: string; amount: number }): Promise<Bid> => {
        const response = await api.post<Bid>(`/auctions/${auctionId}/bids`, data);
        return response;
    }
};
