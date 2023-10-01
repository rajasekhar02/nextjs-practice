import {atom} from 'jotai'
import { Values, FormStages } from './types'

export const step1FormAtom = atom({delimiter:"", delimitedText:""})
export const formStagesAtom = atom({stage: FormStages.Step1Form})
export default {
    step1FormAtom
}