import { Settings, User, LogOut, NotebookPen } from "lucide-react"
import { MenuItems } from "./menu-items"
import { signOutAction } from "@/lib/actions/auth"
import { Dispatch, SetStateAction } from "react"

interface UserOptionsProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

/**
 * A user options component which on click opens a dropdown menu with the following options:
 * - Profile
 * - Settings
 * - Logout
 */
const menuItems = [
    { label: "Profile", icon: <User className="w-4 h-4" />, href: "/profile" },
    { label: "Notes", icon: <NotebookPen className="w-4 h-4" />, href: "/journals" },
    { label: "Settings", icon: <Settings className="w-4 h-4" />, href: "/settings" },
    { 
        label: "Logout", 
        icon: <LogOut className="w-4 h-4" />, 
        href: "#",
        action: signOutAction
    },
] as const;

export default function UserOptions({ setIsOpen }: UserOptionsProps) {
    return (
        <div className="relative">
            <MenuItems items={menuItems} onItemClick={() => setIsOpen(false)} />
        </div>
    )
}