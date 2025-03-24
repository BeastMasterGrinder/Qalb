import Verse from "@/components/verse";
import { Suspense } from "react";
import Chat from "@/components/chat";
import BackgroundPaths from "@/components/kokonutui/background-paths";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col gap-6 px-4 pt-[10rem]">
      <BackgroundPaths />
      {/** Verse Randomizer */}
      <div className="justify-center items-center text-center px-[12rem] ">
        <Suspense fallback={<div>Loading...</div>}>
          <Verse />
        </Suspense>
      </div>
      {/* Chat text box */}
      <div className="justify-center items-center px-[14rem]">
        <Chat />
      </div>
    </div>
  );
}
