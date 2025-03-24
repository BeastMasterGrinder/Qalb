import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"
import UserOptions from "./user-options"
import { AvatarButton } from "./avatar-button"

export default function UserAvatar() {
    return (
        <div className="relative">
            <AvatarButton>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                    <User />
                </AvatarFallback>
            </AvatarButton>
        </div>
    )
}