import { useToast } from "@chakra-ui/toast";
import React, { useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import instance from "../../utils/instance";
import Quill from "quill";
//Text direction
Quill.register(Quill.import("attributors/style/direction"), true);
//Alignment
Quill.register(Quill.import("attributors/style/align"), true);

const QuillTextEditor = ({ setValue, placeholder, ...rest }) => {
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
    <ReactQuill
      modules={modules}
      theme="snow"
      ref={quillRef}
      onChange={setValue}
      {...rest}
      placeholder={placeholder ? placeholder : "Content goes here..."}
    />
  );
};

export default QuillTextEditor;
