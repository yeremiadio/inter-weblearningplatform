import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import { FormLabel, Select } from "@chakra-ui/react";

const FormikSelectInput = (props) => {
  const { label, data, ...rest } = props;
  const [field, meta] = useField(props);
  const { value: selectedValue } = field;
  const [touched, error] = at(meta, "touched", "error");
  const isError = touched && error && true;
  function renderErrorText() {
    if (isError) {
      return <p className="text-sm text-red-500 mt-2">{error}</p>;
    }
  }
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <Select
        size="md"
        {...field}
        {...rest}
        onError={() => isError}
        value={selectedValue ? selectedValue : ""}
      >
        {data.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </Select>
      {renderErrorText()}
    </>
  );
};

export default FormikSelectInput;
