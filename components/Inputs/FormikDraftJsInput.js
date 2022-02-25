import { FormLabel } from "@chakra-ui/react";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useField } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import DraftJsEditor from "../RichTextEditor/DraftJsEditor";

const FormikDraftJsInput = (props) => {
  const initialEditorState = EditorState.createEmpty();
  const [editorState, setEditorState] = useState(initialEditorState);
  const rawContentState = convertToRaw(editorState.getCurrentContent());
  const markup = draftToHtml(rawContentState, { trigger: "#", separator: " " });
  const { label, setFieldValue, ...rest } = props;
  const [field, meta, helper] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helper;
  const { value } = field;
  const isError = touched && error && true;

  useEffect(() => {
    setFieldValue(props.name, markup);
    if (value) {
      setValue(markup);
    }
  }, [editorState, value]);
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <div className="border-2 border-gray-200">
        <DraftJsEditor
          editorState={editorState}
          setEditorState={setEditorState}
          {...rest}
        />
        {isError && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </>
  );
};

export default FormikDraftJsInput;
