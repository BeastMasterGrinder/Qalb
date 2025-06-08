import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dispatch, SetStateAction } from "react"


export interface FieldBoxInterface {
    id :string,
    name: string,
    label: string,
    type: string,
    placeholder: string,
    value: any,
    onChange: Dispatch<SetStateAction<any>>
}

export default function FieldBox( data: FieldBoxInterface){
    return (
        <div className="grid gap-2">
              <Label htmlFor={data.id}>{data.label}</Label>
              <Input
                id={data.id}
                name={data.name}
                type={data.type}
                placeholder={data.placeholder}
                required
                value={data.value}
                onChange={(e) => data.onChange(e.target.value)}
              />
            </div>
    );
}