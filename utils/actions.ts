'use server'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


const signInWith = (provider: any) => async () => {
    const supabase = await createClient();

    const auth_callback_url = `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`;

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
            redirectTo: auth_callback_url,
        },
    });

    if (error) {
        console.error(error);
    }

    if (data.url) {
        redirect(data.url);
    }
} 

const signInWithGoogle = signInWith('google');

export { signInWithGoogle };