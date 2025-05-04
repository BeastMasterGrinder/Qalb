"use client"
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import { Lato } from "next/font/google";
import UserAvatar from "@/components/navbar/Avatar";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const lato = Lato({
    weight: ["400", "700"],
    subsets: ["latin"],
});

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full border-b border-b-foreground/10 h-20 p-5 absolute top-0 left-0 z-30">
            <div className="flex justify-between items-center text-sm">
                {/* Left side */}
                <div className="flex-1">
                    <Link href={"/"} className="text-4xl md:text-5xl font-bold text-verse font-quran-kareem">
                        قلب
                    </Link>
                </div>
                <div className="md:hidden py-2">
                        <ThemeSwitcher />
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden flex-2" 
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6 lg:gap-10">
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
                        <ThemeSwitcher />
                        <UserAvatar />
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute left-0 top-20 w-full px-4 py-2 bg-card shadow-lg border-t border-foreground/10 z-12">
                    <div className="flex flex-col items-end gap-4 pb-4">
                        <Link 
                            href={"/donate"} 
                            className={`${lato.className} text-lg py-2`}
                            onClick={() => setIsOpen(false)}
                        >
                            Donate
                        </Link>
                        <Link 
                            href={"/blog"} 
                            className={`${lato.className} text-lg py-2`}
                            onClick={() => setIsOpen(false)}
                        >
                            Blogs
                        </Link>
                        <Link 
                            href={"/about"} 
                            className={`${lato.className} text-lg py-2`}
                            onClick={() => setIsOpen(false)}
                        >
                            About Me
                        </Link>
                        <div>
                            <UserAvatar />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}