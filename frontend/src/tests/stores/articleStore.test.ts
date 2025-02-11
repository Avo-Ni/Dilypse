import { describe, it, expect, beforeEach } from 'vitest';
import { useArticleStore } from '../../stores/articleStore';

describe('articleStore', () => {
    beforeEach(() => {
        useArticleStore.setState({
            articles: [],
            loading: false,
            error: null,
            selectedArticle: null,
            isFormOpen: false
        });
    });

    it('should fetch articles successfully', async () => {
        await useArticleStore.getState().fetchArticles();

        const state = useArticleStore.getState();
        expect(state.articles).toHaveLength(2);
        expect(state.error).toBeNull();
    });

    it('should handle article creation', async () => {
        const newArticle = {
            name: 'New Article',
            description: 'Description',
            price: 10,
            quantity: 5
        };

        await useArticleStore.getState().createArticle(newArticle);

        const state = useArticleStore.getState();
        expect(state.error).toBeNull();
        expect(state.isFormOpen).toBe(false);
    });

    it('should handle article deletion', async () => {
        useArticleStore.setState({
            articles: [{ id: '1', name: 'Test Article' }],
        });

        await useArticleStore.getState().deleteArticle('1');

        const state = useArticleStore.getState();
        expect(state.articles).toHaveLength(0);
        expect(state.error).toBeNull();
    });
});
