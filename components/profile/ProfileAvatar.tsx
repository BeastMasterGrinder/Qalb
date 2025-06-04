'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CaseLower, User } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Pencil } from 'lucide-react';
import { getPFPUrl } from "@/lib/actions/buckets";

interface ProfileAvatar {
    avatarUrl: string,
    user_id: string
}

export default function ProfileAvatar( data: ProfileAvatar){
    const supabase = createClient();
    const [avatarUrl, setAvatarUrl] = useState<string | null>(data.avatarUrl);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchAvatarUrl = async () => {

            const url = await getPFPUrl();
            if (typeof url === 'string') {
                setAvatarUrl(url);
            } else {
                alert(`Error uploading avatar! ${url}`);
            }
        };
        fetchAvatarUrl();
    }, [data.avatarUrl]);

    const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
        try {
            setUploading(true);
            
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            let fileExt = file.name.split('.').pop();

            if (fileExt?.toLowerCase() !== 'jpg'){
                throw new Error("Uploaded an unsupported file. Must be only jpeg")
            }

            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
                throw new Error('No user found');
            }

            const filePath = `${user.id}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, {    
                    cacheControl: '3600',
                    upsert: true
                });

            if (uploadError) {
                throw uploadError;
            }

            setAvatarUrl(filePath);
        } catch (error) {
            alert(`Error uploading avatar! ${error}`);
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="relative">
            <Avatar className="h-24 w-24">
                <AvatarImage src={avatarUrl || "/images/pfp.png"} />
                <AvatarFallback>
                    <User className="h-12 w-12" />
                </AvatarFallback>
            </Avatar>
            <div className="absolute -top-2 -right-2 bg-background rounded-full p-1.5 border border-border/50 cursor-pointer hover:bg-muted transition-colors">
                <label className="cursor-pointer" htmlFor="single">
                    <Pencil className="h-4 w-4"/>
                </label>
                <input
                    style={{
                        visibility: 'hidden',
                        position: 'absolute',
                    }}
                    type="file"
                    id="single"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                />
            </div>
        </div>
    )
}