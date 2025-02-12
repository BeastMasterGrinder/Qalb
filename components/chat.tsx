import { Textarea } from "@/components/ui/textarea"

export default function Chat() {
    return (
        <div>
            <Textarea placeholder="السلام عليكم" className={`placeholder:font-quran-kareem placeholder:text-verse`}/>
        </div>
    )
}