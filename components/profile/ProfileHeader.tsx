'use client';

import { useState } from 'react';
import { Check, Pencil, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast"


interface ProfileHeaderProps {
    initialUsername: string;
    avatarUrl: string;
}

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 30;
const USERNAME_REGEX = /^[a-zA-Z0-9_-]+$/;

export default function ProfileHeader({ initialUsername, avatarUrl }: ProfileHeaderProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(initialUsername);
    const [tempUsername, setTempUsername] = useState(initialUsername);
    const [error, setError] = useState<string>("");
    const { toast } = useToast();
    const supabase = createClient();

    const validateUsername = (username: string): string | null => {
        if (username.length < USERNAME_MIN_LENGTH) {
            return `Username must be at least ${USERNAME_MIN_LENGTH} characters long`;
        }
        if (username.length > USERNAME_MAX_LENGTH) {
            return `Username must be less than ${USERNAME_MAX_LENGTH} characters`;
        }
        if (!USERNAME_REGEX.test(username)) {
            return "Username can only contain letters, numbers, underscores, and hyphens";
        }
        return null;
    };

    const handleUpdateUsername = async () => {
        try {
            // Reset error state
            setError("");

            // Validate username
            const validationError = validateUsername(tempUsername);
            if (validationError) {
                setError(validationError);
                toast({
                    variant: "destructive",
                    title: "Validation Error",
                    description: validationError
                });
                return;
            }

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                throw new Error("Not authenticated");
            }

            // First check if the user record exists
            const { data: existingUser } = await supabase
                .from('public_user_info')
                .select('id')
                .eq('auth_user_id', user.id)
                .single();

            let error;

            if (!existingUser) {
                // If no record exists, insert
                const { error: insertError } = await supabase
                    .from('public_user_info')
                    .insert({
                        auth_user_id: user.id,
                        user_name: tempUsername,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    });
                error = insertError;
            } else {
                // If record exists, update
                const { error: updateError } = await supabase
                    .from('public_user_info')
                    .update({ 
                        user_name: tempUsername,
                        updated_at: new Date().toISOString()
                    })
                    .eq('auth_user_id', user.id);
                error = updateError;
            }

            if (error) {
                console.error('Database operation failed:', error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to update username. Please try again."
                });
                throw error;
            }

            setUsername(tempUsername);
            setIsEditing(false);
            toast({
                title: "Success",
                description: "Username updated successfully",
            });
        } catch (error) {
            console.error('Error updating username:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "An unexpected error occurred. Please try again."
            });
        }
    };

    const handleCancel = () => {
        setTempUsername(username);
        setIsEditing(false);
        setError("");
    };

    return (
        <div className="flex items-center gap-6 mb-8">
            <Avatar className="h-24 w-24">
                <AvatarImage src={avatarUrl || "/images/pfp.png"} />
                <AvatarFallback>
                    <User className="h-12 w-12" />
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    {isEditing ? (
                        <>
                            <div className="flex flex-col gap-1">
                                <Input
                                    value={tempUsername}
                                    onChange={(e) => {
                                        setTempUsername(e.target.value);
                                        setError("");
                                    }}
                                    className={`h-9 w-[200px] ${error ? 'border-red-500' : ''}`}
                                    placeholder="Enter username"
                                />
                                {error && (
                                    <span className="text-xs text-red-500">{error}</span>
                                )}
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleUpdateUsername}
                                className="h-9 w-9 text-green-600 hover:text-green-700 hover:bg-green-50"
                            >
                                <Check className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleCancel}
                                className="h-9 w-9 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl font-semibold">{username}</h1>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsEditing(true)}
                                className="h-9 w-9 text-gray-600 hover:text-gray-700"
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>
                        </>
                    )}
                </div>
                <p className="text-sm text-muted-foreground">
                    Your profile picture is managed through your login provider
                </p>
            </div>
        </div>
    );
} 