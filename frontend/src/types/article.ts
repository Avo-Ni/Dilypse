export interface Article {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    createdAt : string;
}

export interface CreateArticleDTO {
    name: string;
    description: string;
    price: number;
    quantity: number;
}
