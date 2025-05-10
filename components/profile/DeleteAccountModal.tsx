"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { deleteUserAccount } from "@/lib/actions/account";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteAccountModal({ isOpen, onClose }: DeleteAccountModalProps) {
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDeleteAccount = async () => {
    if (confirmText !== "Delete") {
      setError("Please type 'Delete' to confirm");
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      // Call the server action to delete the account
      const result = await deleteUserAccount();
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      // Redirect to home page after account deletion
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Error deleting account:", err);
      setError(err instanceof Error ? err.message : "Failed to delete account. Please try again later.");
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-background rounded-lg shadow-lg max-w-md w-full p-6"
          >
            <h2 className="text-2xl font-bold text-destructive mb-4">Delete Account</h2>
            <p className="mb-6 text-foreground/80">
              Are you sure you want to delete your account? This action is irreversible and all your data will be permanently deleted.
            </p>
            
            <div className="mb-6">
              <Label htmlFor="confirm-delete" className="mb-2 block">
                Type <span className="font-semibold">Delete</span> to confirm
              </Label>
              <Input
                id="confirm-delete"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full border-destructive/30 focus:border-destructive"
                placeholder="Delete"
                autoComplete="off"
              />
              {error && <p className="text-destructive text-sm mt-2">{error}</p>}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button
                variant="outline"
                onClick={onClose}
                className="sm:order-1"
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={isDeleting || confirmText !== "Delete"}
                className="sm:order-2"
              >
                {isDeleting ? "Deleting..." : "Delete Account"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 