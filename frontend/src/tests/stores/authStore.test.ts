import { describe, it, expect, beforeEach } from 'vitest';
import { server } from './mocks/server';
import { http, HttpResponse } from 'msw';
import { useAuthStore } from './path-to-auth-store';

describe('authStore', () => {
    beforeEach(() => {
        useAuthStore.getState().logout();
    });

    it('should handle successful login', async () => {
        server.use(
            http.post('/user/login', async ({ request }) => {
                const { username, password } = await request.json();
                if (username === 'test' && password === 'test') {
                    return HttpResponse.json({ token: 'fake-token' });
                }
                return new HttpResponse(null, { status: 401 });
            })
        );

        const credentials = { username: 'test2', password: 'password' };
        await useAuthStore.getState().login(credentials);

        expect(useAuthStore.getState().isAuthenticated).toBe(true);
        expect(useAuthStore.getState().error).toBeNull();
    });

    it('should handle login failure', async () => {
        server.use(
            http.post('/user/login', async () => {
                return new HttpResponse(null, { status: 401 });
            })
        );

        const credentials = { username: 'wrong', password: 'wrong' };
        await useAuthStore.getState().login(credentials);

        expect(useAuthStore.getState().isAuthenticated).toBe(false);
        expect(useAuthStore.getState().error).not.toBeNull();
    });
});
