import { useAtomValue } from "jotai"
import { step1FormAtom } from "../state"

export default function StatusComponent({status}:{status?:'submitted'|'pending'}){
    const step1FormAtomValue = useAtomValue(step1FormAtom)
    return (
        <div>{JSON.stringify(step1FormAtomValue)}</div>
    )
}