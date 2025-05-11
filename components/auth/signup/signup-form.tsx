'use client'
import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import ThirdPartyAuth from "@/components/auth/third-party-auth"
import TosBar from "@/components/auth/tos-bar"
import { signUpAction } from "@/lib/actions/auth"
import { useSearchParams } from "next/navigation"
import SuccessSignup from "@/components/auth/signup/Success-Signup"
import { Noto_Serif_Khitan_Small_Script } from "next/font/google"
import FieldBox from "./FieldBox"


export function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
    const searchParams = useSearchParams()
    const successMessage = searchParams.get('success');
    
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
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
            <div className="flex flex-row gap-x-3 ">
              <FieldBox
                  id="first_name"
                  name="first_name" 
                  label="First Name"
                  type="text"
                  placeholder="first name"
                  value={firstName}
                  onChange={setFirstName}
                />
              <FieldBox
                  id="last_name"
                  name="last_name" 
                  label="Last Name"
                  type="text"
                  placeholder="last name"
                  value={lastName}
                  onChange={setLastName}
                />
            </div>
            <FieldBox
              id="email"
              name="email" 
              label="Email"
              type="email"
              placeholder="farjad@example.com"
              value={email}
              onChange={setEmail}
            />

            {showPassword && (
              <>
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{
                        duration: 0.4,
                        ease: "easeIn"
                    }}
                >
                    <FieldBox
                      id="password"
                      name="password" 
                      label="Password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={setPassword}
                    />
                </motion.div>
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{
                        duration: 0.4,
                        ease: "easeIn"
                    }}
                >
                    <FieldBox
                      id="confirm-password"
                      name="confirm-password" 
                      label="Confirm Password"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={setConfirmPassword}
                    />
                    {!passwordsMatch && password && confirmPassword && (
                      <p className="text-sm text-red-500">Passwords do not match</p>
                    )}
                </motion.div>
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

