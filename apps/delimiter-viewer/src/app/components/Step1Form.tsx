import { Form, Formik, FormikHelpers, useField, useFormikContext } from "formik";
import RadioButton from "./RadioButton";
import { FormStages, Values } from "../types";
import TextArea from "./TextArea";
import { formStagesAtom, step1FormAtom } from "../state";
import {
  useAtomValue,
  ExtractAtomArgs,
  ExtractAtomResult,
} from "jotai";
import {defaultDelimiters} from "@/app/constants"
import { useSetAtom } from "jotai";
import { ChangeEvent, useEffect } from "react";

type SetAtom<Args extends any[], Result> = (...args: Args) => Result;

function submitStep1Form(
  values: Values,
  { setSubmitting }: FormikHelpers<Values>,
  setStep1Form: SetAtom<
    ExtractAtomArgs<typeof step1FormAtom>,
    ExtractAtomResult<typeof step1FormAtom>
  >,
  setFormStage: SetAtom<
    ExtractAtomArgs<typeof formStagesAtom>,
    ExtractAtomResult<typeof formStagesAtom>
  >,
) {
  setStep1Form(values);
  setFormStage({ stage: FormStages.GalleryView });
  // setTimeout(() => {
  //   alert(JSON.stringify(values, null, 2));
  //   setSubmitting(false);
  // }, 500);
}
const RadioButtonWithCustomInput = function(){
  const [delimiterField, metaDF, helpersDF] = useField('delimiter');
  const [customDelimiterField, metaCDF, helpersCDF] = useField('customDelimiter');
  let handleCustomDelimiterChange = function (newText:ChangeEvent<HTMLInputElement>) {
    helpersCDF.setValue(newText.target.value)
  }
  let handleOnFocus = function(){
    helpersDF.setValue('custom')
    console.log(delimiterField.value)
  }
  // useEffect(()=>{
  //   console.log(delimiterField.value)
  // },[delimiterField])
  return (
    <RadioButton
    label="Custom"
    value={"custom"}
    key={`delimiter-radio-custom`}
  >
    <input
      value={customDelimiterField.value}
      type="text"
      name="custom-delimiter"
      className="mr-1 block w-4/5 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
      placeholder="|@@|"
      onChange={handleCustomDelimiterChange}
      onFocus={handleOnFocus}
      required
    />
  </RadioButton>
  )
}
const Step1Form = function () {
  
  let step1FormAtomValue = useAtomValue(step1FormAtom)
  let setStep1Form = useSetAtom(step1FormAtom);
  let setFormStage = useSetAtom(formStagesAtom);  
  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <Formik
      initialValues={step1FormAtomValue}
      onSubmit={(values, params) =>
        submitStep1Form(values, params, setStep1Form, setFormStage)
      }
    >
      <Form className="space-y-0">
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
         <RadioButtonWithCustomInput></RadioButtonWithCustomInput>
        </ul>
        <TextArea></TextArea>
        <button
          type="submit"
          className="mb-2 mr-2 mt-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          Next
        </button>
      </Form>
    </Formik>
    </div>
  );
};

export default Step1Form;
