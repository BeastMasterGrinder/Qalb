import Hero from "@/components/hero";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Verse from "@/components/verse";

export default async function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">المزيد من الأفكار</h2>
        {/** Verse Randomizer */}
        <Verse />
        {/* Chat text box */}
      </main>
    </>
  );
}
