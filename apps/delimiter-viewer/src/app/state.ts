import { atom } from "jotai";
import { Values, FormStages } from "./types";
import { defaultDelimiters } from "./constants";

export const step1FormAtom = atom({
  delimiter: defaultDelimiters[1][1],
  delimitedText: "",
  customDelimiter: "",
});
export const splittedTextAtom = atom((get) => {
  const { delimitedText, customDelimiter, delimiter } = get(step1FormAtom);
  if (delimiter == "custom") {
    return delimitedText.split(customDelimiter);
  }
  return delimitedText.split(delimiter);
});
export const formStagesAtom = atom({ stage: FormStages.Step1Form });
const allModules = {
  step1FormAtom,
  splittedTextAtom,
  formStagesAtom,
};
export default allModules;
