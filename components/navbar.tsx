import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import { Lato } from "next/font/google";

const lato = Lato({
    weight: ["400", "700"],
    subsets: ["latin"],
});

export default function Navbar() {
    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                {/* Left side */}
                <div className="flex items-center">
                    <Link href={"/"} className="text-3xl font-bold text-verse font-quran-kareem">
                        قلب
                    </Link>
                </div>

                {/* Right side */}
                <div className={`flex items-center gap-5`}>
                    <Link href={"/donate"} className={`${lato.className}`}>
                        Donate
                    </Link>
                    <Link href={"/blog"} className={`${lato.className}`}>
                        Blogs
                    </Link>
                    <div className="flex items-center gap-2">
                        <ThemeSwitcher />
                        {/* User icon placeholder - you can add your user icon component here */}
                        <div className="w-8 h-8 rounded-full bg-foreground/10"></div>
                    </div>
                </div>
            </div>
        </nav>
    )
}