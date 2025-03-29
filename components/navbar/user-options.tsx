
import { Settings, User, LogOut } from "lucide-react"
import { MenuItems } from "./menu-items"
import { signOutAction } from "@/lib/actions/auth"

/**
 * A user options component which on click opens a dropdown menu with the following options:
 * - Profile
 * - Settings
 * - Logout
 */
const menuItems = [
    { label: "Profile", icon: <User className="w-4 h-4" />, href: "/profile" },
    { label: "Settings", icon: <Settings className="w-4 h-4" />, href: "/settings" },
    { 
        label: "Logout", 
        icon: <LogOut className="w-4 h-4" />, 
        href: "#",
        action: signOutAction
    },
] as const;

export default function UserOptions() {
    return (
        <div className="relative">
            <MenuItems items={menuItems} />
        </div>
    )
}