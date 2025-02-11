import { http, HttpResponse } from 'msw';

const allArticles = new Map([
    ['1', { id: '1', name: 'Test Article', description: 'Test Description', price: 10, quantity: 5 }],
    ['2', { id: '2', name: 'Test Article 2', description: 'Test Description 2', price: 20, quantity: 10 }]
]);

export const handlers = [
    http.get('/api/articles', () => {
        return HttpResponse.json(Array.from(allArticles.values()));
    }),

    http.post('/api/articles', async ({ request }) => {
        const newArticle = await request.json();
        const id = (allArticles.size + 1).toString();
        allArticles.set(id, { ...newArticle, id });
        return HttpResponse.json({ ...newArticle, id }, { status: 201 });
    }),

    http.delete('/api/articles/:id', ({ params }) => {
        const { id } = params;
        const deletedArticle = allArticles.get(id);
        if (!deletedArticle) {
            return new HttpResponse(null, { status: 404 });
        }
        allArticles.delete(id);
        return HttpResponse.json(deletedArticle);
    }),

    http.post('/user/login', async ({ request }) => {
        const { username, password } = await request.json();
        if (username === 'test' && password === 'test') {
            return HttpResponse.json({ token: 'fake-token' });
        }
        return new HttpResponse(null, { status: 401 });
    })
];
