import { create } from 'zustand';
import { articleService } from '../api/articles.api';
import { Article, CreateArticleDTO } from '../types/article';

interface ArticleState {
    articles: Article[];
    selectedArticle: Article | null;
    loading: boolean;
    error: string | null;
    isFormOpen: boolean;

    getArticleById: (id: string) => Article | undefined;

    fetchArticles: () => Promise<void>;
    createArticle: (article: CreateArticleDTO) => Promise<void>;
    updateArticle: (id: string, article: CreateArticleDTO) => Promise<void>;
    deleteArticle: (id: string) => Promise<void>;

    setSelectedArticle: (article: Article | null) => void;
    openForm: () => void;
    closeForm: () => void;
    clearError: () => void;
}

export const useArticleStore = create<ArticleState>((set, get) => ({
    articles: [],
    selectedArticle: null,
    loading: false,
    error: null,
    isFormOpen: false,

    getArticleById: (id: string) => {
        return get().articles.find(article => article.id === id);
    },

    fetchArticles: async () => {
        set({ loading: true });
        try {
            const articles = await articleService.getAll();
            set({ articles, error: null });
        } catch (error) {
            set({ error: 'Failed to fetch articles' });
        } finally {
            set({ loading: false });
        }
    },

    createArticle: async (articleData: CreateArticleDTO) => {
        set({ loading: true });
        try {
            const newArticle = await articleService.create(articleData);
            set(state => ({
                articles: [...state.articles, newArticle],
                error: null,
                isFormOpen: false
            }));
        } catch (error) {
            set({ error: 'Failed to create article' });
        } finally {
            set({ loading: false });
        }
    },

    updateArticle: async (id: string, articleData: CreateArticleDTO) => {
        set({ loading: true });
        try {
            const updatedArticle = await articleService.update(id, articleData);
            set(state => ({
                articles: state.articles.map(article =>
                    article.id === id ? updatedArticle : article
                ),
                error: null,
                isFormOpen: false,
                selectedArticle: null
            }));
        } catch (error) {
            set({ error: 'Failed to update article' });
        } finally {
            set({ loading: false });
        }
    },

    deleteArticle: async (id: string) => {
        set({ loading: true });
        try {
            await articleService.delete(id);
            set(state => ({
                articles: state.articles.filter(article => article.id !== id),
                error: null
            }));
        } catch (error) {
            set({ error: 'Failed to delete article' });
        } finally {
            set({ loading: false });
        }
    },

    setSelectedArticle: (article: Article | null) => {
        set({
            selectedArticle: article,
            isFormOpen: !!article
        });
    },

    openForm: () => {
        set({ isFormOpen: true });
    },

    closeForm: () => {
        set({
            isFormOpen: false,
            selectedArticle: null,
            error: null
        });
    },

    clearError: () => {
        set({ error: null });
    }
}));

interface PaginationState {
    page: number;
    perPage: number;
    totalPages: number;
}

interface PaginatedArticleStore extends ArticleState {
    pagination: PaginationState;
    setPagination: (pagination: Partial<PaginationState>) => void;
    paginatedArticles: Article[];
}

export const usePaginatedArticleStore = create<PaginatedArticleStore>((set, get) => ({
    ...useArticleStore.getState(),

    pagination: {
        page: 1,
        perPage: 10,
        totalPages: 1
    },

    setPagination: (newPagination) => {
        set(state => ({
            pagination: {
                ...state.pagination,
                ...newPagination
            }
        }));
    },

    get paginatedArticles() {
        const { articles, pagination: { page, perPage } } = get();
        const start = (page - 1) * perPage;
        const end = start + perPage;
        return articles.slice(start, end);
    }
}));

export const useArticleListWithPagination = () => {
    const store = usePaginatedArticleStore();
    const {
        paginatedArticles,
        pagination,
        setPagination,
        loading,
        error,
        fetchArticles
    } = store;

    const handlePageChange = (newPage: number) => {
        setPagination({ page: newPage });
    };

    return {
        articles: paginatedArticles,
        pagination,
        loading,
        error,
        fetchArticles,
        handlePageChange
    };
};