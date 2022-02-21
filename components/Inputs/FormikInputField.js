import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function InputField(props) {
  const { label, errorText, ...rest } = props;
  const [field, meta] = useField(props);

  function renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return <p className="text-sm text-red-500 mt-2">{error}</p>;
    }
  }

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input
        type="text"
        {...field}
        {...rest}
        isInvalid={meta.touched && meta.error && true}
      />
      {renderHelperText()}
    </FormControl>
  );
}
