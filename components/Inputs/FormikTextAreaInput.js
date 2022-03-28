import React from "react";
import { useField } from "formik";
import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";

export default function FormikTextAreaInput(props) {
  const { label, errorText, ...rest } = props;
  const [field] = useField(props);
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Textarea rows="4" {...field} {...rest} />
    </FormControl>
  );
}
