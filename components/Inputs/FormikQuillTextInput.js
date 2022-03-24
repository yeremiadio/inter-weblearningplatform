import { FormLabel } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useField } from "formik";
import React, { useRef, useMemo, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import instance from "../../utils/instance";

const QuillTextEditor = (props) => {
  const { label, ...rest } = props;
  const [field, meta, helper] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = touched && error && true;
  const { value, onBlur } = field;

  function onChange(val) {
    if (val) {
      setValue(val);
    }
  }
  const handleEditorBlur = () => {
    onBlur({ target: { name } });
  };
  const toast = useToast();
  const quillRef = useRef();
  const imageHandler = () => {
    const editor = quillRef.current.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      var formData = new FormData();
      formData.append("image", file);
      try {
        await instance()
          .post("api/upload-cloudinary", formData)
          .then((res) => {
            toast({
              title: "Success",
              duration: 3000,
              status: "success",
              isClosable: true,
              description: "Image Upload successfully",
            });
            editor.insertEmbed(editor.getSelection(), "image", res.data);
          });
      } catch (err) {
        toast({
          title: "Error",
          duration: 3000,
          status: "error",
          isClosable: true,
          description: "Image failed to upload",
        });
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
          ["link", "image", "video"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <>
      <FormLabel>{label}</FormLabel>
      <ReactQuill
        modules={modules}
        theme="snow"
        value={value}
        onChange={onChange}
        onBlur={handleEditorBlur}
        ref={quillRef}
        placeholder={"Content goes here..."}
      />
      {isError && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </>
  );
};

export default QuillTextEditor;
