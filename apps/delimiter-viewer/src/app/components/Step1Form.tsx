import { Form, Formik, FormikHelpers } from "formik";
import RadioButton from "./RadioButton";
import { FormStages, Values } from "../types";
import TextArea from "./TextArea";
import { formStagesAtom, step1FormAtom } from "../state";
import { useSetAtom } from "jotai";


  
  const Step1Form = function () {
    const defaultDelimiters: Array<[string, string]> = [
      ["Comma", ","],
      ["pipe", "|"],
      ["tab", " "],
    ];
    let formInitValues = {
      delimiter: defaultDelimiters[1][1],
      delimitedText: "",
    };
    let setStep1Form = useSetAtom(step1FormAtom)
    let setFormStage = useSetAtom(formStagesAtom)
    function submitStep1Form(
      values: Values,
      {setSubmitting}:FormikHelpers<Values>
    ) {
      setStep1Form(values)
      setFormStage({stage:FormStages.Step2Form})
      // setTimeout(() => {
      //   alert(JSON.stringify(values, null, 2));
      //   setSubmitting(false);
      // }, 500);
    }
    return (
      <Formik initialValues={formInitValues} onSubmit={submitStep1Form}>
        <Form>
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
                ></RadioButton>
              );
            })}
          </ul>
          <TextArea></TextArea>
          <button type="submit">Next</button>
        </Form>
      </Formik>
    );
  };
  
  export default Step1Form