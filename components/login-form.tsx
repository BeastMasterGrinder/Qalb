"use client"

import type React from "react"

import { useState } from "react"
import { GalleryVerticalEnd } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"

import EmailStep from "@/components/auth/email-step"
import PasswordStep from "@/components/auth/password-step"
import ThirdPartyAuth from "@/components/auth/third-party-auth"
import TosBar from "@/components/auth/tos-bar"



export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [step, setStep] = useState<"email" | "password">("email")
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === "email") {
      setStep("password")
    } else {
      // Handle login submission
      console.log("Login submitted")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <motion.h1 key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={step === "email" ? "text-3xl font-quran-kareem text-verse" : "text-3xl font-bold"}>
              {step === "email" ? "السلام عليكم" : "Enter your password"}
            </motion.h1>
          </div>

          <div className="flex flex-col gap-6">
            <AnimatePresence mode="wait">
              {step === "email" ? (
                <EmailStep key="email-step" email={email} setEmail={setEmail} onContinue={() => setStep("password")} />
              ) : (
                <PasswordStep key="password-step" email={email} onBack={() => setStep("email")} />
              )}
            </AnimatePresence>
          </div>

            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/sign-up" className="underline underline-offset-4">
                Sign up
                </a>
            </div>

          {step === "email" && (
            <ThirdPartyAuth />
          )}
        </div>
      </form>
      <TosBar />
    </div>
  )
}
