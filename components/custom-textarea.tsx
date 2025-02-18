"use client"

import type React from "react"
import { useState, type KeyboardEvent, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { getSentiments } from "@/app/actions/getSentiments"
import { ArrowUp } from "lucide-react"
import { format } from "date-fns"

interface CustomExpandingTextareaProps {
    placeholder?: string
    className?: string
};

export function CustomExpandingTextarea({
    placeholder,
    className
}: CustomExpandingTextareaProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [message, setMessage] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update time every second when expanded
    useEffect(() => {
        if (!isExpanded) return
        
        const interval = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(interval)
    }, [isExpanded])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        if (!isExpanded && e.target.value.length > 0) {
            setIsExpanded(true);
        } else if (isExpanded && e.target.value.length === 0) {
            setIsExpanded(false);
        }
    };

    const handleSubmit = async () => {
        try {
            console.log("sending message")
            // Replace with your API endpoint
            const response = await getSentiments(message);

            console.log(response);
            if (!response) {
                throw new Error('Failed to send message');
            }
            // Save the json to local storage
            localStorage.setItem('sentiments', JSON.stringify(response));

            // Clear the input after successful submission
            setMessage("")
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        };
    };

    return (
        <div className="relative w-full">
            <div
                className={cn(
                    "fixed inset-0 bg-background/60 backdrop-blur-sm transition-all duration-700",
                    isExpanded ? "opacity-100" : "opacity-0 pointer-events-none",
                )}
                onClick={() => setIsExpanded(false)}
            />
            <div
                className={cn(
                    "relative grid transition-all duration-700 ease-in-out transform",
                    isExpanded
                        ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[80vw] lg:w-[70vw] h-[70vh] md:h-[60vh] z-50 scale-105"
                        : "w-full h-20 scale-100",
                )}
            >
                {/* Header Grid */}
                <div className={cn(
                    "grid grid-cols-3 items-center px-4 py-2",
                    "absolute top-0 left-0 right-0 z-50",
                    "transition-all duration-500",
                    isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                )}>
                    <div /> {/* Empty div for left alignment */}
                    <span className="text-base font-medium justify-self-center">
                        {format(currentTime, "h:mm:ss a")}
                    </span>
                    <div className="flex flex-col items-end gap-1">
                        <span className="text-sm text-muted-foreground">
                            {format(currentTime, "EEEE, MMMM d, yyyy")}
                        </span>
                    </div>
                </div>

                {/* Textarea */}
                <Textarea
                    value={message}
                    onChange={handleChange}
                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}
                    className={cn(
                        "w-full h-full pr-12 transition-all duration-700 ease-in-out",
                        isExpanded ? "text-lg pt-12" : "text-base",
                        "focus:ring-0 focus:ring-offset-0 focus:outline-none",
                        "bg-background/80 backdrop-blur-sm rounded-xl shadow-lg",
                        className
                    )}
                />

                {/* Submit Button */}
                <Button
                    onClick={handleSubmit}
                    className={cn(
                        "absolute bottom-3 right-3 p-2 rounded-full",
                        "transition-all duration-700 ease-in-out",
                        "bg-primary/80 hover:bg-primary/90",
                        "shadow-md hover:shadow-lg",
                        isExpanded ? "scale-110" : "scale-100",
                    )}
                    size="icon"
                >
                    <ArrowUp className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

