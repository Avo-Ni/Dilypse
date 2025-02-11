import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '../../../components/auth/LoginForm';
import { useAuthStore } from '../../../stores/authStore';

describe('LoginForm', () => {
    it('should render login form', () => {
        render(<LoginForm />);

        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('should handle form submission', async () => {
        render(<LoginForm />);

        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: 'testuser' }
        });

        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'password' }
        });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(useAuthStore.getState().isAuthenticated).toBe(true);
        });
    });

    it('should display error on failed login', async () => {
        server.use(
            rest.post('/user/login', (req, res, ctx) => {
                return res(ctx.status(401), ctx.json({ error: 'Unauthorized' }));
            })
        );

        render(<LoginForm />);

        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: 'wronguser' }
        });

        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'wrongpassword' }
        });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(screen.getByText(/unauthorized/i)).toBeInTheDocument();
        });
    });
});
