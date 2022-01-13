import { useToast } from "@chakra-ui/toast";
import React, { useEffect, useRef, useState } from "react";
import instance from "../../utils/instance";

const TextEditor = ({ content, setContent, ...props }) => {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const toast = useToast();
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  const handleChangeContent = (e, editor) => {
    setContent(editor.getData());
  };

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("files", file);
            instance()
              .post("api/upload", body)
              .then((res) => res.data)
              .catch((err) => {
                toast({
                  status: "error",
                  title: "Error",
                  description: "Error upload image",
                  duration: 3000,
                  isClosable: true,
                });
                console.log(err.response.status);
              });
          });
        });
      },
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  return (
    <>
      {editorLoaded ? (
        <CKEditor
          config={{
            extraPlugins: [uploadPlugin],
          }}
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          {...props}
          onChange={handleChangeContent}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </>
  );
};

export default TextEditor;
