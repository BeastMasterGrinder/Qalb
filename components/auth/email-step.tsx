import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
// Step 1: Email Input Component
export default function EmailStep({
    email,
    setEmail,
    onContinue,
  }: {
    email: string
    setEmail: (email: string) => void
    onContinue: () => void
  }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-6 w-full"
      >
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="farjad@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button
          type="button"
          className="w-full"
          onClick={onContinue}
          disabled={!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
        >
          Continue
        </Button>
      </motion.div>
    )
  }