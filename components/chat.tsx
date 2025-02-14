"use server"
import { CustomExpandingTextarea } from "@/components/custom-textarea"

export default async function Chat() {
    return (
        <div className="relative">
            <CustomExpandingTextarea 
                placeholder="السلام عليكم"
                className="placeholder:font-quran-kareem placeholder:text-verse placeholder:text-center placeholder:text-xl text-xl pr-12"
            />
        </div>
    )
}