import { create } from 'zustand';
import { authService } from '../api/auth.api';
import { User } from '../types/auth';

interface AuthState {
    isAuthenticated: boolean;
    error: string | null;
    loading: boolean;
    login: (credentials: User) => Promise<void>;
    register: (credentials: User) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: !!localStorage.getItem('token'),
    error: null,
    loading: false,

    login: async (credentials) => {
        set({ loading: true });
        try {
            const response = await authService.login(credentials);
            localStorage.setItem('token', response.token);
            set({ isAuthenticated: true, error: null });
        } catch (error) {
            set({ error: 'Invalid credentials' });
        } finally {
            set({ loading: false });
        }
    },

    register: async (credentials) => {
        set({ loading: true });
        try {
            await authService.register(credentials);
            set({ error: null });
        } catch (error) {
            set({ error: 'Registration failed' });
        } finally {
            set({ loading: false });
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ isAuthenticated: false });
    },

    clearError: () => set({ error: null })
}));