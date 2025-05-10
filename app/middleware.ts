import { NextResponse, NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    await updateSession(req);

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
    matcher: [
        /*     * Match all request paths except for the ones starting with:     * - _next/static (static files)     * - _next/image (image optimization files)     * - favicon.ico (favicon file)     * Feel free to modify this pattern to include more paths.     */
        '/((?!_next/static|_next/image|favicon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};