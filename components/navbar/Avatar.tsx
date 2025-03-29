import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"
import { AvatarButton } from "./avatar-button"
import LogInButton from "./log-in-button"
import { createClient } from "@/utils/supabase/client"

export default async function UserAvatar() {
    const supabase = createClient();
    const { data: user } = await supabase.auth.getUser();

    console.log("user", user);

    return (
        <div className="relative">
            {user.user ? (
                <AvatarButton>
                    <AvatarImage src="/images/pfp.png" />
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