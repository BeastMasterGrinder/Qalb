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
import { signUpAction } from "@/lib/actions/auth"
import { useSearchParams } from "next/navigation"
import { Mail } from "lucide-react"


export function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
    const searchParams = useSearchParams()
    const successMessage = searchParams.get('success')
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [debouncedEmail, setDebouncedEmail] = useState("")
    const [passwordsMatch, setPasswordsMatch] = useState(true)
  
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

    // Check if passwords match
    useEffect(() => {
      if (password && confirmPassword) {
        setPasswordsMatch(password === confirmPassword)
      }
    }, [password, confirmPassword])
  
    // Simple email validation
    const isValidEmail = (email: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }
    
    // If success message is present, show verification UI
    if (successMessage) {
      return (
        <div className={cn("flex flex-col gap-6 items-center text-center", className)} {...props}>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }} 
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8 items-center max-w-md"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">Check your email</h1>
              <p className="text-muted-foreground">
                We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <a href="/sign-in">
                <Button variant="outline" className="w-full">
                  Go to Sign in
                </Button>
              </a>
              <p className="text-sm text-muted-foreground">
                Didn't receive an email? Check your spam folder or{" "}
                <a href="/sign-up" className="underline underline-offset-4">
                  try again
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      )
    }
    
    return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form action={signUpAction}>
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
                name="email"
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
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      name="password" 
                      type="password" 
                      placeholder="••••••••" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
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
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      placeholder="••••••••" 
                      required 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {!passwordsMatch && password && confirmPassword && (
                      <p className="text-sm text-red-500">Passwords do not match</p>
                    )}
                </motion.div>
              </>
            )}

            <Button 
              type="submit" 
              className="w-full"
              disabled={!email || !isValidEmail(email) || !password || !confirmPassword || !passwordsMatch}
            >
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

