import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        console.log("Signing out...")
        const supabase = await createClient()

        // Check if a user's logged in
        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (user) {
            const { error } = await supabase.auth.signOut()
            if (error) {
                console.error("Error signing out:", error)
                return NextResponse.json({ error: error.message }, { status: 500 })
            }
            console.log("Successfully signed out user:", user.id)
        }

        revalidatePath('/', 'layout')
        return NextResponse.redirect(new URL('/sign-in', req.nextUrl.origin), {
            status: 302,
        })
    } catch (error) {
        console.error("Unexpected error during sign out:", error)
        return NextResponse.json(
            { error: "An unexpected error occurred" },
            { status: 500 }
        )
    }
}