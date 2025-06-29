'use client';

import { useState } from 'react';
import { Check, Pencil, X } from 'lucide-react';

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast"
import ProfileAvatar from './ProfileAvatar';

interface ProfileHeaderProps {
    initialUsername: string;
    avatarUrl: string;
    user_id: string;
}

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 30;
const USERNAME_REGEX = /^[a-zA-Z0-9_-]+$/;

export default function ProfileHeader({ initialUsername, avatarUrl, user_id }: ProfileHeaderProps) {
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

            // const { data: { user } } = await supabase.auth.getUser();
            // if (!user) {
            //     throw new Error("Not authenticated");
            // }

            const { error } = await supabase
            .from('profiles')
            .upsert({
                id: user_id as string,
                username: tempUsername,
                updated_at: new Date().toISOString()
            })


            if (error) {
                console.log('Database operation failed:', error);
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
            
            <ProfileAvatar avatarUrl={avatarUrl} user_id={user_id}/>

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
                    images supported are: .jpeg and must be less than 2MB
                </p>
            </div>
        </div>
    );
} 