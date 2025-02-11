import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ArticleList } from '../../../components/articles/ArticleList';
import { useArticleStore } from '../../../stores/articleStore';

describe('ArticleList', () => {
    it('should render article list', async () => {
        render(<ArticleList onEdit={() => {}} />);

        await waitFor(() => {
            expect(screen.getByText('Test Article')).toBeInTheDocument();
            expect(screen.getByText('Test Article 2')).toBeInTheDocument();
        });
    });

    it('should handle article deletion', async () => {
        render(<ArticleList onEdit={() => {}} />);

        await waitFor(() => {
            const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
            fireEvent.click(deleteButtons[0]);
        });

        await waitFor(() => {
            expect(screen.queryByText('Test Article')).not.toBeInTheDocument();
        });
    });
});
