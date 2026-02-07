/**
 * Common TypeScript types for 2Hand Watch Store
 */

// Product types
export interface Watch {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    condition: 'like-new' | 'excellent' | 'good' | 'fair';
    images: string[];
    description: string;
    specifications: WatchSpecifications;
    createdAt: Date;
    updatedAt: Date;
}

export interface WatchSpecifications {
    diameter: string;
    thickness: string;
    material: string;
    movement: string;
    waterResistance?: string;
    crystal?: string;
    strap?: string;
}

// Cart types
export interface CartItem {
    watch: Watch;
    quantity: number;
}

export interface Cart {
    items: CartItem[];
    total: number;
}

// User types
export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: Address;
    createdAt: Date;
}

export interface Address {
    street: string;
    ward: string;
    district: string;
    city: string;
    country: string;
}

// Order types
export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    status: OrderStatus;
    shippingAddress: Address;
    paymentMethod: PaymentMethod;
    total: number;
    createdAt: Date;
    updatedAt: Date;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cod' | 'bank-transfer' | 'momo' | 'vnpay';

// API Response types
export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
