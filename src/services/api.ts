/**
 * API Service configuration for 2Hand Watch Store
 */

// Base URLs for API and Static Files
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
export const API_BASE_URL = `${BACKEND_URL}/api/v1`;

interface RequestConfig extends RequestInit {
    params?: Record<string, string | number | boolean>;
}

/**
 * Creates a configured fetch request
 */
async function request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { params, ...init } = config;

    // Build URL with query params
    const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const url = new URL(cleanEndpoint, baseUrl);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
    }

    // Get token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const headers: Record<string, string> = {
        'ngrok-skip-browser-warning': 'true',
        ...init.headers as Record<string, string>,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Don't set Content-Type for FormData, browser will do it with boundary
    if (!(init.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url.toString(), {
        ...init,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));

        // Handle 401 Unauthorized
        if (response.status === 401 && typeof window !== 'undefined' && !url.pathname.includes('auth/login')) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }

        throw new Error(error.detail || error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
}

/**
 * API client with common HTTP methods
 */
export const api = {
    get: <T>(endpoint: string, params?: Record<string, string | number | boolean>) =>
        request<T>(endpoint, { method: 'GET', params }),

    post: <T>(endpoint: string, data?: unknown) =>
        request<T>(endpoint, {
            method: 'POST',
            body: data instanceof FormData ? data : JSON.stringify(data),
        }),

    put: <T>(endpoint: string, data?: unknown) =>
        request<T>(endpoint, {
            method: 'PUT',
            body: data instanceof FormData ? data : JSON.stringify(data),
        }),

    patch: <T>(endpoint: string, data?: unknown) =>
        request<T>(endpoint, {
            method: 'PATCH',
            body: data instanceof FormData ? data : JSON.stringify(data),
        }),

    delete: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' }),
};

export default api;
