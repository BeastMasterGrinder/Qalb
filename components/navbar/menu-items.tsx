"use client"

import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { ReactNode } from "react"

interface MenuItem {
    label: string;
    icon: ReactNode;
    href: string;
    action?: () => Promise<void>;
}

interface MenuItemsProps {
    items: readonly MenuItem[];
    onItemClick?: () => void;
}

export function MenuItems({ items, onItemClick }: MenuItemsProps) {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute right-0 w-48  bg-popover z-16 backdrop-blur-xl bg-background/80 border border-border/50 rounded-lg shadow-lg"
            >
                {items.map((item) => (
                    item.action ? (
                        <form key={item.label} action={item.action}>
                            <button 
                                type="submit"
                                className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors text-left"
                                onClick={onItemClick}
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        </form>
                    ) : (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors"
                            onClick={onItemClick}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    )
                ))}
            </motion.div>
        </AnimatePresence>
    )
} 