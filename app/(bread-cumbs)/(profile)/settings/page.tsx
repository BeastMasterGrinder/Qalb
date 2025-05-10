import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import DeleteAccountCard from "@/components/profile/DeleteAccountCard";

export const metadata: Metadata = {
  title: "Account Settings | Qalb",
  description: "Manage your account settings and preferences",
};

export default async function Settings() {
  const supabase = await createClient();

  // Check if user is authenticated
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (!user || userError) {
    console.log("Cannot access settings page - user not authenticated");
    redirect("/");
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-red-200">
            Danger Zone
          </h2>
          <DeleteAccountCard />
        </div>
      </div>
    </div>
  );
}