import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";

export default function Navbar() {
    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"} className="text-3xl font-bold text-verse font-quran-kareem">
                        قلب
                    </Link>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <ThemeSwitcher />
            </div>
        </nav>
    )
}