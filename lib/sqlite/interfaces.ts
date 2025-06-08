interface DatabaseError extends Error {
    code?: string;
    errno?: number;
}

export type { DatabaseError };