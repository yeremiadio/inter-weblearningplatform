import { useToast } from "@chakra-ui/toast";
import React from "react";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import instance from "../../utils/instance";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const TextEditor = ({ editorState, setEditorState, ...props }) => {
  const toast = useToast();

  const onEditorStateChange = (state) => {
    setEditorState(state);
  };

  const uploadImageCallBack = (file, callback) => {
    return new Promise((resolve, reject) => {
      const reader = new window.FileReader();
      reader.onloadend = async () => {
        const data = new FormData();
        data.append("image", file);
        instance()
          .post("api/upload", data)
          .then((res) => {
            toast({
              title: "Success",
              duration: 3000,
              status: "success",
              isClosable: true,
              description: "Image Upload successfully",
            });
            resolve({ data: { link: res.data } });
          })
          .catch((err) => {
            toast({
              title: "Error",
              duration: 3000,
              status: "error",
              isClosable: true,
              description: "Image failed to upload",
            });
            reject(err);
          });
      };
      reader.readAsDataURL(file);
    });
  };

  const embedVideoCallBack = (link) => {
    if (link.indexOf("youtube") >= 0) {
      link = link.replace("watch?v=", "embed/");
      link = link.replace("/watch/", "/embed/");
      link = link.replace("youtu.be/", "youtube.com/embed/");
    }
    return link;
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      {...props}
      toolbar={{
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        fontFamily: {
          options: ["Arial", "Tahoma"],
        },
        embedded: {
          embedCallback: embedVideoCallBack,
        },
        link: { inDropdown: true },
        history: { inDropdown: true },
        image: {
          uploadCallback: uploadImageCallBack,
          previewImage: true,
          alt: { present: true, mandatory: false },
        },
      }}
    />
  );
};

export default TextEditor;
