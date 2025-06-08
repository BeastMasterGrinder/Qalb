import Verse from "@/components/verse";
import { Suspense } from "react";
import Chat from "@/components/chat";
import BackgroundPaths from "@/components/kokonutui/background-paths";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <BackgroundPaths />
      {/** Verse Randomizer */}
      <div className="flex-[0.7] text-center p-4 sm:p-6 md:p-8 md:px-[8rem] lg:px-[12rem] max-h-[70vh] flex items-center justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <Verse />
        </Suspense>
      </div>
      {/* Chat text box */}
      <div className="flex-[0.3] lg:px-[14rem]">
        <Chat />
      </div>
    </div>
  );
}
