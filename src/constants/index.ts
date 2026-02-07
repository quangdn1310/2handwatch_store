/**
 * Application constants for 2Hand Watch Store
 */

// Site configuration
export const SITE_CONFIG = {
    name: 'tiemdocu.unisex',
    description: 'Premium curated vintage & unisex timepieces',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
} as const;

// Navigation routes
export const ROUTES = {
    home: '/',
    products: '/products',
    product: (id: string) => `/products/${id}`,
    cart: '/cart',
    checkout: '/checkout',
    orders: '/orders',
    order: (id: string) => `/orders/${id}`,
    account: '/account',
    about: '/about',
    contact: '/contact',
} as const;

// Watch conditions
export const WATCH_CONDITIONS = {
    'like-new': {
        label: 'Like New',
        description: 'Perfect condition, no signs of use',
    },
    excellent: {
        label: 'Excellent',
        description: 'Very few signs of use, nearly new',
    },
    good: {
        label: 'Good',
        description: 'Showing light signs of use',
    },
    fair: {
        label: 'Fair',
        description: 'Visible signs of use, but in good working order',
    },
} as const;

// Popular watch brands
export const WATCH_BRANDS = [
    'Rolex',
    'Omega',
    'Cartier',
    'Tag Heuer',
    'Longines',
    'Tissot',
    'Seiko',
    'Citizen',
    'Orient',
    'Casio',
] as const;

// Pagination
export const PAGINATION = {
    defaultLimit: 12,
    maxLimit: 50,
} as const;

// Order statuses with labels
export const ORDER_STATUSES = {
    pending: { label: 'Pending', color: 'yellow' },
    confirmed: { label: 'Confirmed', color: 'blue' },
    shipping: { label: 'Shipping', color: 'purple' },
    delivered: { label: 'Delivered', color: 'green' },
    cancelled: { label: 'Cancelled', color: 'red' },
} as const;

// Payment methods
export const PAYMENT_METHODS = {
    cod: { label: 'Cash on Delivery', icon: 'truck' },
    'bank-transfer': { label: 'Bank Transfer', icon: 'building' },
    momo: { label: 'MoMo Wallet', icon: 'wallet' },
    vnpay: { label: 'VNPay', icon: 'credit-card' },
} as const;
