import { api, BACKEND_URL } from './api';
import { WatchCardProps } from '@/components/shared/watch-card';

// Types matching the backend schema
export interface BackendWatch {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    condition: 'like-new' | 'excellent' | 'good' | 'fair';
    status: 'available' | 'preorder' | 'sold';
    images: string[];
    description: string;
    specifications: {
        diameter: string;
        thickness: string;
        material: string;
        movement: string;
        waterResistance?: string;
        crystal?: string;
        strap?: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface WatchCreateInput {
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    condition: string;
    status: string;
    images: string[];
    description: string;
    specifications: {
        diameter: string;
        thickness: string;
        material: string;
        movement: string;
        waterResistance?: string;
        crystal?: string;
        strap?: string;
    };
}

export interface BackendWatchPagination {
    items: BackendWatch[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface PaginatedWatchResponse {
    items: WatchCardProps[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface SiteStats {
    totalVisits: number;
    totalProducts: number;
    totalViews: number;
}

// Mapper from Backend to Frontend
export const mapBackendToFrontend = (watch: BackendWatch): WatchCardProps => {
    const processedImages = watch.images.map((url: string) => {
        // If it's already an absolute URL (starts with http), return as is
        if (url.startsWith('http')) return url;

        // If it's a relative path starting with /static or static, prepend BACKEND_URL
        if (url.startsWith('/static/') || url.startsWith('static/')) {
            return `${BACKEND_URL}${url.startsWith('/') ? '' : '/'}${url}`;
        }

        return url;
    });

    return {
        id: watch.id,
        name: watch.name,
        brand: watch.brand,
        price: watch.price,
        originalPrice: watch.originalPrice,
        condition: watch.condition,
        status: watch.status || 'available',
        image: processedImages[0] || '/images/watches/watch-1.png',
        images: processedImages,
        description: watch.description,
        specifications: watch.specifications,
        views: (watch as any).views || 0,
        year: '', // Backend doesn't have year, we might need to add it later
        isNew: false, // Map based on some logic if needed
        isFeatured: false,
    };
};

export const productService = {
    getAll: async (page: number = 1, limit: number = 100): Promise<PaginatedWatchResponse> => {
        const skip = (page - 1) * limit;
        const response = await api.get<BackendWatchPagination>(`products/?skip=${skip}&limit=${limit}`);

        return {
            items: response.items.map(mapBackendToFrontend),
            total: response.total,
            page: response.page,
            limit: response.limit,
            totalPages: response.totalPages
        };
    },

    getById: async (id: string): Promise<WatchCardProps> => {
        const watch = await api.get<BackendWatch>(`products/${id}`);
        return mapBackendToFrontend(watch);
    },

    create: async (data: WatchCreateInput): Promise<WatchCardProps> => {
        const watch = await api.post<BackendWatch>('products/', data);
        return mapBackendToFrontend(watch);
    },

    update: async (id: string, data: Partial<WatchCreateInput>): Promise<WatchCardProps> => {
        const watch = await api.put<BackendWatch>(`products/${id}`, data);
        return mapBackendToFrontend(watch);
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`products/${id}`);
    },

    incrementView: async (id: string): Promise<void> => {
        await api.post(`products/${id}/view`, {});
    },

    incrementSiteVisit: async (): Promise<void> => {
        const sessionKey = 'site-visit-tracked';
        if (typeof window !== 'undefined' && !sessionStorage.getItem(sessionKey)) {
            await api.post('analytics/visit', {});
            sessionStorage.setItem(sessionKey, 'true');
        }
    },

    getStats: async (): Promise<SiteStats> => {
        return await api.get<SiteStats>('analytics/stats');
    },
};
