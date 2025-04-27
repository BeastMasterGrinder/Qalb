import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";

export default async function ProfilePage()  {
    const supabase = await createClient();

    const {data, error} = await supabase.auth.getUser();

    if (!data.user){
        console.log('Can not come here');
        redirect('/');
    }

    console.log(data.user);
    const username = data.user?.user_metadata.full_name;
    return (
        <>
            <h1>Hi {username}</h1>
        </>
    )
}