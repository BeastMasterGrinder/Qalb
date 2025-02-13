"use client"

import { Textarea } from "@/components/ui/textarea"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { getSentiments } from "@/app/actions/getSentiments"

export default function Chat() {
    const [message, setMessage] = useState<string>("")

    const handleSubmit = async () => {
        try {
            console.log("sending message")
            // Replace with your API endpoint
            const response = await getSentiments(message);
            
            if (!response.ok) {
                throw new Error('Failed to send message');
            }
            console.log(response);
            
            // Clear the input after successful submission
            setMessage("")
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    return (
        <div className="relative">
            <Textarea 
                placeholder="السلام عليكم" 
                className="placeholder:font-quran-kareem placeholder:text-verse placeholder:text-center placeholder:text-xl text-xl pr-12"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                id="prompt"
            />
            <Button 
                onClick={handleSubmit}
                className="absolute bottom-3 right-3 p-2 rounded-full hover:bg-primary/90"
                size="icon"
            >
                <ArrowUp className="h-4 w-4" />
            </Button>
        </div>
    )
}