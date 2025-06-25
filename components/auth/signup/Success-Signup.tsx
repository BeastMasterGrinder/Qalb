"use client"

import * as motion from "motion/react-client";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"

interface SuccessSignupProps extends React.ComponentPropsWithoutRef<"div"> {
    className?: string;
}

export default function SuccessSignup({ className, ...props }: SuccessSignupProps) {
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