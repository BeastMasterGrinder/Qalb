"use client"

import { Avatar } from "@/components/ui/avatar"
import { useState, useRef, useEffect } from "react"
import UserOptions from "./user-options"
import { type ReactNode } from "react"

interface AvatarButtonProps {
    children: ReactNode;
}

export function AvatarButton({ children }: AvatarButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="relative">
            <Avatar 
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setIsOpen(!isOpen)}
            >
                {children}
            </Avatar>
            {isOpen && <UserOptions setIsOpen={setIsOpen} />}
        </div>
    )
} 