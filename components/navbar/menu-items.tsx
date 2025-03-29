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
}

export function MenuItems({ items }: MenuItemsProps) {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute right-0 mt-2 w-48 py-2 bg-popover border rounded-lg shadow-lg z-50"
            >
                {items.map((item) => (
                    item.action ? (
                        <form key={item.label} action={item.action}>
                            <button 
                                type="submit"
                                className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors text-left"
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