"use server"
import { CustomExpandingTextarea } from "@/components/chat/custom-textarea"

export default async function Chat() {
    return (
        <div className="">
            <CustomExpandingTextarea 
                placeholder="السلام عليكم"
                className="placeholder:font-quran-kareem placeholder:text-verse placeholder:text-center placeholder:text-2xl md:placeholder:text-3xl text-xl p-12"
            />
        </div>
    )
}