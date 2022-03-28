import React from "react";
import { useField } from "formik";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function InputField(props) {
  const { label, errorText, ...rest } = props;
  const [field] = useField(props);
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input type="text" {...field} {...rest} />
    </FormControl>
  );
}
