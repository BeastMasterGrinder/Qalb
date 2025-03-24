'use client'
import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import ThirdPartyAuth from "./auth/third-party-auth"
import TosBar from "./auth/tos-bar"


export function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
    const [email, setEmail] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [debouncedEmail, setDebouncedEmail] = useState("")
  
    // Debounce email input
    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedEmail(email)
      }, 800) // 800ms debounce time
  
      return () => clearTimeout(timer)
    }, [email])
  
    // Check if email is valid and show password field
    useEffect(() => {
      if (debouncedEmail && isValidEmail(debouncedEmail)) {
        setShowPassword(true)
      }
    }, [debouncedEmail])
  
    // Simple email validation
    const isValidEmail = (email: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }
    
    return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }} 
            transition={{
                duration: 0.6,
                scale: { visualDuration: 0.6 },
            }}
            className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-bold">Create your account</h1>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <a href="/sign-in" className="underline underline-offset-4">
                Log in
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="farjad@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {showPassword && (
              <>
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{
                        duration: 0.4,
                        ease: "easeIn"
                    }}
                    className="grid gap-2"
                >
                    <Label htmlFor="confirm-password">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" required />
                </motion.div>
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{
                        duration: 0.4,
                        ease: "easeIn"
                    }}
                    className="grid gap-2"
                >
                    <Label htmlFor="password">Confirm Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" required />
                </motion.div>
              </>
            )}

            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </div>
          <ThirdPartyAuth />
        </motion.div>
      </form>
      <TosBar />
    </div>
  )
}

