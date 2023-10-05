import { Form, Formik, FormikHelpers } from "formik";
import RadioButton from "./RadioButton";
import { FormStages, Values } from "../types";
import TextArea from "./TextArea";
import { formStagesAtom, step1FormAtom } from "../state";
import { ExtractAtomValue, useAtomValue, ExtractAtomArgs, ExtractAtomResult } from 'jotai'
import { useSetAtom } from "jotai";

type SetAtom<Args extends any[], Result> = (...args: Args) => Result

function submitStep1Form(
  values: Values,
  {setSubmitting}:FormikHelpers<Values>,
  setStep1Form: SetAtom<ExtractAtomArgs<typeof step1FormAtom>,ExtractAtomResult<typeof step1FormAtom>>,
  setFormStage: SetAtom<ExtractAtomArgs<typeof formStagesAtom>,ExtractAtomResult<typeof formStagesAtom>>
) {
  setStep1Form(values)
  setFormStage({stage:FormStages.Step2Form})
  // setTimeout(() => {
  //   alert(JSON.stringify(values, null, 2));
  //   setSubmitting(false);
  // }, 500);
}

const Step1Form = function () {
  const defaultDelimiters: Array<[string, string]> = [
    ["Comma", ","],
    ["pipe", "|"],
    ["tab", "\\t"],
  ];
  let formInitValues = {
    delimiter: defaultDelimiters[1][1],
    delimitedText: "",
  };
  let setStep1Form = useSetAtom(step1FormAtom)
  let setFormStage = useSetAtom(formStagesAtom)
  return (
    
    <Formik  initialValues={formInitValues} onSubmit={(values, params)=>submitStep1Form(values, params, setStep1Form, setFormStage)}>
      <Form className="space-y-6">
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
          Delimiter
        </h3>
        <ul className="radio-group-container w-full items-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:flex">
          {defaultDelimiters.map((delimiter, index: number) => {
            return (
              <RadioButton
                label={delimiter[0]}
                value={delimiter[1]}
                key={`delimiter-radio-${index}`}
              >
                {`${delimiter[0]} (${delimiter[1]})`}
              </RadioButton>
            );
          })}
        </ul>
        <TextArea></TextArea>
        <button type="submit" className="mt-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Next</button>
      </Form>
    </Formik>

  );
};
  
  export default Step1Form