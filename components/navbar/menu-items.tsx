"use client"

import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { ReactNode } from "react"
import { useRouter } from "next/navigation"

interface MenuItem {
    label: string;
    icon: ReactNode;
    href: string;
    action?: string;
}

interface MenuItemsProps {
    items: readonly MenuItem[];
    onItemClick?: () => void;
}

export function MenuItems({ items, onItemClick }: MenuItemsProps) {
    const router = useRouter();

    const handleAction = async (action: string) => {
        if (onItemClick) onItemClick();
        
        try {
            const response = await fetch(action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.ok) {
                router.refresh();
                // If the server redirects, we need to follow it
                if (response.redirected) {
                    window.location.href = response.url;
                }
            }
        } catch (error) {
            console.error('Error performing action:', error);
        }
    };

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
                        <button 
                            key={item.label}
                            onClick={() => handleAction(item.action!)}
                            className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors text-left"
                        >
                            {item.icon}
                            {item.label}
                        </button>
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