"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Deletes a user account and all associated data
 */
export async function deleteUserAccount() {
  try {
    const supabase = await createClient();
    
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error(`Error getting user: ${userError?.message}`);
    }

    console.log(user)
    
    // Step 1: Remove storage items owned by the user
    // First list all files in the storage owned by the user
    const { data: storageObjects, error: storageListError } = await supabase
      .storage
      .from('avatars') // Add other buckets as needed using multiple calls
      .list(`${user.id}`); // If your storage path includes user ID
      
    if (storageListError && storageListError.message !== 'The resource was not found') {
      console.error("Error listing storage objects:", storageListError);
      // Continue with deletion anyway, don't block the process
    }
    
    // Delete each storage object found
    if (storageObjects && storageObjects.length > 0) {
      const filesToRemove = storageObjects.map(file => `${user.id}/${file.name}`);
      
      const { error: storageDeleteError } = await supabase
        .storage
        .from('avatars')
        .remove(filesToRemove);
        
      if (storageDeleteError) {
        console.error("Error deleting storage objects:", storageDeleteError);
        // Continue with deletion anyway
      }
    }
    
    // If you have other buckets, repeat the process for each
    // e.g., 'journals', 'uploads', etc.
    
    // Step 2: Delete user data from database tables
    
    // Delete user's journals
    const { error: journalsError } = await supabase
      .from("Journals")
      .delete()
      .eq("user_id", user.id);
    
    if (journalsError) {
      console.error("Error deleting journals:", journalsError);
      // Continue with the process
    }
    
    // Delete user info
    const { error: userInfoError } = await supabase
      .from('public_user_info')
      .delete()
      .eq('auth_user_id', user.id);
    
    if (userInfoError) {
      console.error("Error deleting user info:", userInfoError);
      // We'll continue anyway to try to delete the user
    }
    
    // Delete from other tables if needed
    // Example:
    // await supabase.from('journals').delete().eq('user_id', user.id);
    
    // Step 3: Delete the user account
    const { error: deleteUserError } = await supabase.auth.admin.deleteUser(
      user.id,
      true // This cascades the deletion
    );

    if (deleteUserError) {
      throw new Error(`Something went wrong with deletion. Error: ${deleteUserError?.message}`);
    }

    // Step 4: Sign out after successful deletion
    const { error: signOutError } = await supabase.auth.signOut();
    
    if (signOutError) {
      console.error("Error signing out:", signOutError);
      // User is deleted already, so this is not critical
    }
    
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Exception in deleteUserAccount:", err);
    return { error: err instanceof Error ? err.message : "An unexpected error occurred" };
  }
} 