"use client"

import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"
import { ReactNode } from "react"

interface SubmitLoadingButtonProps {
  loadingText?: string
  children: ReactNode
  className?: string
}

export default function SubmitLoadingButton({ 
  loadingText = "Loading...", 
  children, 
  className = "w-full" 
}: SubmitLoadingButtonProps) {
  const { pending } = useFormStatus()
  
  return (
    <Button type="submit" className={className} disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  )
} 