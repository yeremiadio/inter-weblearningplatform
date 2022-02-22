import { FormLabel } from "@chakra-ui/react";
import { useField } from "formik";
import React, { useCallback } from "react";
import CustomUploadButton from "../Buttons/CustomUploadButton";

const FormikUploadInput = (props) => {
  const { label, ...rest } = props;
  const [field, meta, helper] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = touched && error && true;
  const onChange = useCallback((e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    setValue(files[0]);
  });
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <CustomUploadButton {...field} {...rest} onChange={(e) => onChange(e)} />
      {isError && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </>
  );
};

export default FormikUploadInput;
