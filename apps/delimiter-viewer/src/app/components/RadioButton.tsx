import { Field, useFormikContext } from "formik";
import { Values } from "../types";

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

  export default RadioButton;