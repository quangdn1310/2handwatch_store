import api from './api';
import Cookies from 'js-cookie';

export interface LoginResponse {
    access_token: string;
    token_type: string;
}

export const authService = {
    login: async (username: string, password: string): Promise<LoginResponse> => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const response = await api.post<LoginResponse>('auth/login', formData);

        if (response.access_token) {
            localStorage.setItem('token', response.access_token);
            // Set cookie for middleware access
            Cookies.set('token', response.access_token, { expires: 7, path: '/' });
        }

        return response;
    },

    logout: () => {
        localStorage.removeItem('token');
        Cookies.remove('token');
        window.location.href = '/login';
    },

    getToken: () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token') || Cookies.get('token');
        }
        return Cookies.get('token');
    },

    isAuthenticated: () => {
        if (typeof window !== 'undefined') {
            return !!(localStorage.getItem('token') || Cookies.get('token'));
        }
        return !!Cookies.get('token');
    }
};
