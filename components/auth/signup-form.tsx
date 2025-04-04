'use client'
import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import ThirdPartyAuth from "./third-party-auth"
import TosBar from "./tos-bar"
import { signUpAction } from "@/lib/actions/auth"
import { useSearchParams } from "next/navigation"
import SuccessSignup from "@/components/auth/Success-Signup"
import { useActionState } from 'react'


export function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
    const searchParams = useSearchParams()
    const successMessage = searchParams.get('success');
    const [state, action, pending] = useActionState(signUpAction, undefined);
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [debouncedEmail, setDebouncedEmail] = useState("")
    const [debouncedPassword, setDebouncedPassword] = useState("")
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [passwordValid, setPasswordValid] = useState(false)
  
    // Debounce email input
    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedEmail(email)
      }, 800)
  
      return () => clearTimeout(timer)
    }, [email])
  
    // Separate debounce for password input
    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedPassword(password)
      }, 800)
  
      return () => clearTimeout(timer)
    }, [password])
  
    // Check if email is valid and show password field
    useEffect(() => {
      if (debouncedEmail && isValidEmail(debouncedEmail)) {
        setShowPassword(true)
      }
    }, [debouncedEmail])

    // Check if password is valid
    useEffect(() => {
      console.log("debouncedPassword", debouncedPassword)
      if (debouncedPassword) {
        const isValid = isValidPassword(debouncedPassword)
        console.log("isValid", isValid)
        setPasswordValid(isValid)
      } else {
        setPasswordValid(false)
      }
    }, [debouncedPassword])

    // Check if passwords match
    useEffect(() => {
      if (password && confirmPassword) {
        setPasswordsMatch(password === confirmPassword)
      }
    }, [password, confirmPassword])
  
    const isValidEmail = (email: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const isValidPassword = (password: string) => {
      return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)
    }
    
    // If success message is present, show verification UI
    if (successMessage) {
      return <SuccessSignup />
    }
    
    return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form action={action}>
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
              {state?.errors?.email && (
                <p className="text-sm text-red-500">{state.errors.email.join(', ')}</p>
              )}
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
                {state?.errors?.password && (
                  <div>
                    <p>Password must:</p>
                    <ul>
                      {state.errors.password.map((error) => (
                        <li key={error}>- {error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {debouncedPassword && !passwordValid && (
                  <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{
                        duration: 0.4,
                        ease: "easeIn"
                    }}
                    className="grid gap-2"
                  >
                    <p className="text-sm text-red-500">Password needs: 8+ chars, ABC, abc, 123, @#$</p>
                  </motion.div>
                )}
              </>
            )}

            <Button 
              type="submit" 
              className="w-full"
              disabled={!email || !isValidEmail(email) || !password || !isValidPassword(password) || !confirmPassword || !passwordsMatch}
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

