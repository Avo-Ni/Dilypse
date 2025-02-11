import axios from 'axios';

export const createApiInstance = (baseURL: string) => {
    const instance = axios.create({ baseURL });

    instance.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return instance;
};

export const authApi = createApiInstance('/user');
export const articleApi = createApiInstance('/api');
