import Hero from "@/components/hero";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Verse from "@/components/verse";
import Navbar from "@/components/navbar";
import { Suspense } from "react";
import Chat from "@/components/chat";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col gap-6 px-4">
      <Navbar />
      {/** Verse Randomizer */}
      <div className="justify-center items-center text-center">
        <Suspense fallback={<div>Loading...</div>}>
          {/* <Verse /> */}
        </Suspense>
      </div>
      {/* Chat text box */}
      <div>
        <Chat />
      </div>
    </div>
  );
}
