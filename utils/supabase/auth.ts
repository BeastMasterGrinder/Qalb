import { createClient } from '@supabase/supabase-js'


export const AuthClientServer = async () => {

    const secret = process.env.NEXT_PRIVATE_SUPABASE_SERVICE_KEY;
    const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL

    if (!secret || !supabase_url){
        return null
    }


    const supabase = createClient(supabase_url, secret, 
        {  
            auth: {
                    autoRefreshToken: false,
                    persistSession: false  
                }
        }
    )
    return supabase.auth.admin
}