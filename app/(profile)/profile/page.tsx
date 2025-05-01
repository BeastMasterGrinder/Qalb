import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";
import { getJournalDates } from "@/lib/actions/journal";
import Streaks from "@/components/profile/streaks";

export default async function ProfilePage()  {
    const supabase = await createClient();

    const {data, error} = await supabase.auth.getUser();

    if (!data.user){
        console.log('Can not come here');
        redirect('/');
    }

    console.log(data.user);
    const username = data.user?.user_metadata.full_name;
    const id = data.user.id;
    const journalsDateResult = await getJournalDates(id);
    
    // Check if result is an error object
    const journalsDate = 'error' in journalsDateResult ? [] : journalsDateResult;

    return (
        <>
            <h1>Hi {username}</h1>
            <Streaks journals={journalsDate} />
            {/* <Streaks journals={['2025-04-02', '2025-04-03']} /> */}
        </>
    )
}