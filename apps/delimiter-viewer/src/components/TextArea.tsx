import { Field, useFormikContext } from "formik";
import { Values } from "../app/types";

const TextArea = function () {
  const { values } = useFormikContext<Values>();
  return (
    <>
      <label
        htmlFor="message"
        className="mb-2 mt-6 block font-semibold text-gray-900 dark:text-white"
      >
        Paste the Delimited Image Urls
      </label>
      <Field
        component="textarea"
        id="message"
        name="delimitedText"
        rows={4}
        value={values.delimitedText}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Paste your delimited data here..."
      ></Field>
    </>
  );
};

export default TextArea;
