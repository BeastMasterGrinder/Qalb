'use client'
import { Button } from "../ui/button"
import Link from "next/link";

export default function LogInButton() {
    return (
        <Link href="/sign-in">
            <Button
                variant="ghost"
                size="lg" 
                className="bg-primary text-white rounded-xl text-md px-4 py-2">
                Log In
            </Button>
        </Link>
    )
}