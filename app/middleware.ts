import { NextResponse, NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export function middleware(req: NextRequest) {
    const res = NextResponse.next();
    
    // Check if the cookie exists
    let cookie = req.cookies.get('unique_user_id');

    if (!cookie) {
        // Generate a new unique ID
        const userId = uuidv4();

        res.cookies.set('unique_user_id', userId, {
            maxAge: 60 * 60 * 24 * 365,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
    }

    console.log('cookie', cookie);
    return res;
}

export const config = {
    matcher: '/',
};