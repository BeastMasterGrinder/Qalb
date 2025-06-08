export type Journal = {
    id: string; // uuid
    createdAt: string; // iso string --> Composite key
    userId: string; // uuid --> Foreign key and Composite key with createdAt
    sentiments: string | null; // stringified json of sentiments
    content: string | null; // stringified json of content
    is_deleted: boolean; // boolean
}