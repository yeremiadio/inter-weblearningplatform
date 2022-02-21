import { FormLabel } from "@chakra-ui/react";
import { useField } from "formik";
import React, { useCallback, useState } from "react";
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
      <FormLabel>Thumbnail</FormLabel>
      <CustomUploadButton {...field} {...rest} onChange={(e) => onChange(e)} />
    </>
  );
};

export default FormikUploadInput;
