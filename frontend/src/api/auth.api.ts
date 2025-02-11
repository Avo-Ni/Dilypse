import { authApi } from './axios.config';
import { User, AuthResponse } from '../types/auth';

export const authService = {
    login: async (credentials: User): Promise<AuthResponse> => {
        const response = await authApi.post<AuthResponse>('/login', credentials);
        return response.data;
    },

    register: async (credentials: User): Promise<void> => {
        await authApi.post('/register', credentials);
    }
};