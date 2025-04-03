export interface Blog {
    id: string;
    title: string;
    content: string;
    excerpt?: string;
    slug: string;
    created_at: string;
    author?: string;
  }