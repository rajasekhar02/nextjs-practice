import { useAtomValue, useSetAtom } from "jotai"
import { formStagesAtom, step1FormAtom } from "../state"
import { FormStages } from "../types"

export default function GalleryView({status}:{status?:'submitted'|'pending'}){
    const step1FormAtomValue = useAtomValue(step1FormAtom)
    const setFormStage = useSetAtom(formStagesAtom)
    return (
        <div>
            <p>{JSON.stringify(step1FormAtomValue)}</p>
            <button
              type="button"
              className="mb-2 mr-2 mt-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              onClick={()=> setFormStage({stage: FormStages.Step1Form})}
            >
              Back
            </button>
        </div>
        
    )
}