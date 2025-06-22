'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"
import { AvatarButton } from "./avatar-button"
import LogInButton from "./log-in-button"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { getSignedURL } from "@/lib/actions/singedUrlServer"

export default function UserAvatar() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [user_avatar, setUserAvatar] = useState<string>("/images/pfp.png");
    useEffect(() => {
        const getUser = async () => {
            try {
                const supabase = createClient();
                const { data: { user } } = await supabase.auth.getUser();
                setUser(user);
                setUserAvatar(await getSignedURL(user?.user_metadata?.avatar_url) || "/images/pfp.png");
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
            {user ? (
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