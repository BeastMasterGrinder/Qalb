export type Blog = {
    id: string;
    title: string;
    content: string;
    excerpt?: string;
    author?: string;
    created_at: string;
    slug: string;
    coverImage?: string;
};