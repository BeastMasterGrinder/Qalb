'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"
import { AvatarButton } from "./avatar-button"
import LogInButton from "./log-in-button"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { getSignedURLClient } from "@/lib/actions/signedUrlClient"

export default function UserAvatar() {
    const [user_auth, setUserAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [user_avatar, setUserAvatar] = useState<string>("/images/pfp.png");
    useEffect(() => {
        const getUser = async () => {
            try {
                const supabase = createClient();
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    
                    // Get the profile pic from profile table
                    const { data: profile, error: profileError } = await supabase
                        .from('profiles')
                        .select('avatar_url')
                        .eq('id', user.id)
                        .single();

                    if (profileError) {
                        console.error("Error fetching profile:", profileError);
                    }
                    setUserAuth(true);
                    setUserAvatar(await getSignedURLClient(profile?.avatar_url) || "/images/pfp.png");
                } else {
                    setUserAuth(false);
                    setUserAvatar("/images/pfp.png");
                }

            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, [pathname, searchParams]);

    if (loading) {
        return <div className="w-8 h-8 animate-pulse bg-muted rounded-full" />;
    }

    return (
        <div className="relative">
            {user_auth ? (
                <AvatarButton>
                    <AvatarImage src={user_avatar} />
                    <AvatarFallback>
                        <User />
                    </AvatarFallback>
                </AvatarButton>
            ) : (
                <LogInButton />
            )}
        </div>
    )
}