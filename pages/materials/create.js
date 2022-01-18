import React, { useCallback, useRef, useState } from "react";
import Admin from "../../layouts/Admin";
import DraftJsEditor from "../../components/RichTextEditor/DraftJsEditor";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Field, Form, Formik } from "formik";
import {
  Box,
  Button,
  useToast,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { CameraIcon, PaperAirplaneIcon } from "@heroicons/react/solid";
import { jsonToFormData } from "../../utils/jsonToFormData";
import instance from "../../utils/instance";

export default function createMaterialPage() {
  //DraftJs
  let initialEditorState = EditorState.createEmpty();
  const [editorState, setEditorState] = useState(initialEditorState);
  const rawContentState = convertToRaw(editorState.getCurrentContent());
  const markup = draftToHtml(rawContentState, { trigger: "#", separator: " " });
  const toast = useToast();

  //Formik
  const formikRef = useRef();
  const thumbnailRef = useRef();
  const initialValues = {
    title: "",
    description: "",
    thumbnail: "",
  };

  const onChangeImage = useCallback((e, index) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    formikRef.current.setFieldValue(index, files[0]);
  });

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required").max(200),
  });

  const onSubmit = useCallback(async (values) => {
    const formData = jsonToFormData(values);
    formData.append("content", markup);
    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    try {
      const res = await instance().post("api/materials/create", formData);
      toast({
        title: "Success",
        status: "success",
        description: res.data.message,
        duration: 3000,
        isClosable: true,
      });
      setEditorState(initialEditorState);
      formikRef.current.resetForm();
    } catch (err) {
      toast({
        title: "Error",
        status: "error",
        description: "Error submit material",
        duration: 3000,
        isClosable: true,
      });
      console.log(err);
    }
  });

  return (
    <>
      <div className="bg-section">
        <h3 className="font-bold text-xl text-primary">Tambah Materi</h3>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={onSubmit}
          innerRef={formikRef}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, errors, values }) => (
            <Form>
              <>
                <div className="mt-4">
                  <FormLabel>Judul</FormLabel>
                  <Field
                    as={Input}
                    isInvalid={errors.title}
                    focusBorderColor="blue.600"
                    name="title"
                    placeholder="Masukkan Judul..."
                  />
                  {errors.title && (
                    <p className="text-red-500">{errors.title}</p>
                  )}
                </div>
                <div className="mt-4">
                  <FormLabel>Deskripsi</FormLabel>
                  <Field
                    as={Textarea}
                    isInvalid={errors.description}
                    focusBorderColor="blue.600"
                    name="description"
                    placeholder="Masukkan Deskripsi..."
                  />
                  {errors.description ? (
                    <p className="text-red-500">{errors.description}</p>
                  ) : (
                    <p className="mt-2 text-sm text-gray-500">
                      Maksimal 200 Karakter
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <FormLabel>Thumbnail</FormLabel>
                  <div className="flex flex-row w-full items-center gap-2">
                    <Button
                      variant="outline"
                      leftIcon={<CameraIcon className="w-5 h-5" />}
                      onClick={() => thumbnailRef.current.click()}
                    >
                      Upload
                      <input
                        ref={thumbnailRef}
                        type="file"
                        name="thumbnail"
                        hidden
                        accept="image/*"
                        onChange={(e) => onChangeImage(e, "thumbnail")}
                      />
                    </Button>
                  </div>
                  {values?.thumbnail && typeof values?.thumbnail === "object" && (
                    <Box className="w-full mt-4 lg:w-80 rounded-md p-4 border border-gray-200">
                      <img
                        src={URL.createObjectURL(values.thumbnail)}
                        alt=""
                        className="w-full object-cover"
                      />
                    </Box>
                  )}
                </div>
                <div className="mt-4">
                  <FormLabel>Konten</FormLabel>
                  <DraftJsEditor
                    editorState={editorState}
                    setEditorState={setEditorState}
                  />
                  {errors?.content && touched.content && (
                    <p className="text-red-500">{errors?.content}</p>
                  )}
                </div>
                <Box className="flex justify-end gap-2">
                  <Button
                    isLoading={isSubmitting}
                    loadingText="Checking..."
                    size="md"
                    leftIcon={
                      <PaperAirplaneIcon className="w-4 h-4 rotate-90" />
                    }
                    mt="4"
                    colorScheme="blue"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Box>
              </>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

createMaterialPage.layout = Admin;
