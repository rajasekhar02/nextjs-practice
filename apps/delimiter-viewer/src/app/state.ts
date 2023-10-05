import {atom} from 'jotai'
import { Values, FormStages } from './types'
import { defaultDelimiters } from './constants'

export const step1FormAtom = atom({
    delimiter: defaultDelimiters[1][1],
    delimitedText: "",
    customDelimiter: ""
})
export const splittedTextAtom = atom((get)=>{
  const {delimitedText, delimiter} = get(step1FormAtom)
  return delimitedText.split(delimiter)
})
export const formStagesAtom = atom({stage: FormStages.Step1Form})
export default {
    step1FormAtom,
    splittedTextAtom,
    formStagesAtom
}