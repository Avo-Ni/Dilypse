import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ArticleForm } from '../../../components/articles/ArticleForm';
import { useArticleStore } from '../../../stores/articleStore';

describe('ArticleForm', () => {
    const mockArticle = {
        id: '1',
        name: 'Test Article',
        description: 'Test Description',
        price: 10,
        quantity: 5
    };

    it('should render empty form for creation', () => {
        render(
            <ArticleForm
                open={true}
                onClose={() => {}}
            />
        );

        expect(screen.getByLabelText(/name/i)).toHaveValue('');
        expect(screen.getByLabelText(/description/i)).toHaveValue('');
    });

    it('should render form with article data for editing', () => {
        render(
            <ArticleForm
                article={mockArticle}
                open={true}
                onClose={() => {}}
            />
        );

        expect(screen.getByLabelText(/name/i)).toHaveValue(mockArticle.name);
        expect(screen.getByLabelText(/description/i)).toHaveValue(mockArticle.description);
    });

    it('should handle form submission', async () => {
        const onClose = vi.fn();

        render(
            <ArticleForm
                open={true}
                onClose={onClose}
            />
        );

        fireEvent.change(screen.getByLabelText(/name/i), {
            target: { value: 'New Article' }
        });

        fireEvent.change(screen.getByLabelText(/description/i), {
            target: { value: 'New Description' }
        });

        fireEvent.change(screen.getByLabelText(/price/i), {
            target: { value: '15' }
        });

        fireEvent.change(screen.getByLabelText(/quantity/i), {
            target: { value: '10' }
        });

        fireEvent.click(screen.getByRole('button', { name: /save/i }));

        await waitFor(() => {
            expect(onClose).toHaveBeenCalled();
        });
    });
});
