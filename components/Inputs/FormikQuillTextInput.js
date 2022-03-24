import React from "react";
import { useField } from "formik";
import QuillTextEditor from "../RichTextEditor/QuillTextEditor";

const FormikQuillTextInput = (props) => {
  const { label, ...rest } = props;
  const [field, meta, helper] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = touched && error && true;
  return (
    <>
      <QuillTextEditor setValue={setValue} {...field} {...rest} />;
      {isError && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </>
  );
};

export default FormikQuillTextInput;
