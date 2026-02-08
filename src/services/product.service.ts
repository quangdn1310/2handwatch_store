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

// Mapper from Backend to Frontend
export const mapBackendToFrontend = (watch: BackendWatch): WatchCardProps => {
    const processedImages = watch.images.map((url: string) =>
        (url.startsWith('/static/') || url.startsWith('static/'))
            ? `${BACKEND_URL}${url.startsWith('/') ? '' : '/'}${url}`
            : url
    );

    return {
        id: watch.id,
        name: watch.name,
        brand: watch.brand,
        price: watch.price,
        originalPrice: watch.originalPrice,
        condition: watch.condition,
        image: processedImages[0] || '/images/watches/watch-1.png',
        images: processedImages,
        description: watch.description,
        specifications: watch.specifications,
        year: '', // Backend doesn't have year, we might need to add it later
        isNew: false, // Map based on some logic if needed
        isFeatured: false,
    };
};

export const productService = {
    getAll: async (): Promise<WatchCardProps[]> => {
        const watches = await api.get<BackendWatch[]>('products/');
        return watches.map(mapBackendToFrontend);
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
};
