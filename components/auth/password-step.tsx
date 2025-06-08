import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SubmitLoadingButton from "./submit-loading-button"

// Step 2: Password Input Component
export default function PasswordStep({
    email,
    onBack,
  }: {
    email: string
    onBack: () => void
  }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-6 w-full"
      >
        <div className="flex flex-col gap-3">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-muted-foreground mb-2">
            Signing in as <span className="font-medium text-foreground">{email}</span>
            <Button variant="link" className="p-0 h-auto ml-2 text-sm" onClick={onBack}>
              Change
            </Button>
          </motion.div>
  
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="••••••••" required />
            <Input type="hidden" name="email" value={email} />
          </div>
        </div>
        <SubmitLoadingButton loadingText="Signing in...">Login</SubmitLoadingButton>
      </motion.div>
    )
  }