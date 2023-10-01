"use client";
import Image from "next/image";
import { useFormikContext, Form, FormikHelpers, Formik, Field } from "formik";
import { Values } from "./types";

const RadioButton = function ({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const { values } = useFormikContext<Values>();
  return (
    <li className="w-full border-b border-gray-200 dark:border-gray-600 sm:border-b-0 sm:border-r">
      <div className="flex items-center pl-3">
        <Field
          type="radio"
          id="horizontal-list-radio-license"
          name="delimiter"
          className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
          value={value}
          checked={value == values.delimiter}
        />
        <label
          htmlFor="horizontal-list-radio-license"
          className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
      </div>
    </li>
  );
};

const TextArea = function () {
  const { values } = useFormikContext<Values>();
  return (
    <>
      <label
        htmlFor="message"
        className="mb-4 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Paste the Delimited Text
      </label>
      <Field
        component="textarea"
        id="message"
        name="delimitedText"
        rows={4}
        value={values.delimitedText}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Write your thoughts here..."
      ></Field>
    </>
  );
};

function submitStep1Form(
  values: Values,
  { setSubmitting }: FormikHelpers<Values>,
) {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 500);
}

const Step1Form = function () {
  const defaultDelimiters: Array<[string, string]> = [
    ["Comma", ","],
    ["pipe", "|"],
    ["tab", " "],
  ];
  let formInitValues = {
    delimiter: defaultDelimiters[0][1],
    delimitedText: "",
  };
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

export default function Home() {
  // let [isChecked, setIsChecked] = useState<number>(1);

  return (
    <main>
      <div>
        <Step1Form></Step1Form>
      </div>
    </main>
  );
}
