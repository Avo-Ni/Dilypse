import { articleApi } from './axios.config';
import { Article, CreateArticleDTO } from '../types/article';

export const articleService = {
    getAll: async (): Promise<Article[]> => {
        const response = await articleApi.get<Article[]>('/articles');
        return response.data;
    },

    getOne: async (id: string): Promise<Article> => {
        const response = await articleApi.get<Article>(`/articles/${id}`);
        return response.data;
    },

    create: async (article: CreateArticleDTO): Promise<Article> => {
        const response = await articleApi.post<Article>('/articles', article);
        return response.data;
    },

    update: async (id: string, article: CreateArticleDTO): Promise<Article> => {
        const response = await articleApi.put<Article>(`/articles/${id}`, article);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await articleApi.delete(`/articles/${id}`);
    }
};