import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";
import { getJournalDates } from "@/lib/actions/journal";
import Streaks from "@/components/profile/streaks";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { error } from "console";

export default async function ProfilePage() {
    const supabase = await createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (!user || userError) {
        console.log('Cannot access profile page');
        redirect('/');
    }

    // Fetch user info from the user_info table
    const { data: userInfo, error: userInfoError } = await supabase
        .from('public_user_info')
        .select('user_name')
        .eq('auth_user_id', user.id)
        .single();

    if (userInfoError) {
        console.error('Error fetching user info:', userInfoError);
    }

    const username = userInfo?.user_name || "";
    const avatarUrl = user.user_metadata.avatar_url;
    const journalsDateResult = await getJournalDates(user.id);
    
    // Check if result is an error object
    const journalsDate = 'error' in journalsDateResult ? [] : journalsDateResult;

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            <ProfileHeader 
                initialUsername={username} 
                avatarUrl={avatarUrl} 
            />
            <Streaks journals={journalsDate} />
        </div>
    );
}