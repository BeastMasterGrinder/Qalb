import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import { Lato } from "next/font/google";
import UserAvatar from "@/components/navbar/Avatar";

const lato = Lato({
    weight: ["400", "700"],
    subsets: ["latin"],
});

export default function Navbar() {
    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-20">
            <div className="w-full flex justify-between items-center p-8 text-sm">
                {/* Left side */}
                <div className="flex items-center">
                    <Link href={"/"} className="text-5xl font-bold text-verse font-quran-kareem">
                        قلب
                    </Link>
                </div>

                {/* Right side */}
                <div className={`flex items-center gap-10`}>
                    <Link href={"/donate"} className={`${lato.className} text-lg`}>
                        Donate
                    </Link>
                    <Link href={"/blog"} className={`${lato.className} text-lg`}>
                        Blogs
                    </Link>
                    <Link href={"/about"} className={`${lato.className} text-lg`}>
                        About Me
                    </Link>
                    <div className="flex items-center gap-2">
                        <UserAvatar />
                    </div>
                </div>
            </div>
        </nav>
    )
}