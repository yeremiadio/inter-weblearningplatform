import { useState, useCallback, useRef } from "react";
import instance from "../../../../utils/instance";
import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { CameraIcon, PaperAirplaneIcon } from "@heroicons/react/solid";
import { FormErrorMessage, FormHelperText } from "@chakra-ui/form-control";
import { jsonToFormData } from "../../../../utils/jsonToFormData";

function AddMaterialModal({ parent, materials, mutate, toast }) {
  const initialValues = {
    name: "",
    description: "",
    thumbnail: "",
  };
  const FormikRef = useRef();
  const thumbnailRef = useRef();
  const [errors, setErrors] = useState({});
  const onChangeImage = useCallback((e, index) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    FormikRef.current.setFieldValue(index, files[0]);
  });
  const onSubmit = useCallback(
    async (values) => {
      const formData = jsonToFormData(values);
      await instance()
        .post(`api/admin/pages/create`, formData)
        .then((res) => {
          toast({
            title: "Success",
            description: res.data.message,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          parent.current.close();
          mutate([...materials, res.data.data], false);
        })
        .catch((err) => {
          toast({
            title: "Error",
            description: err.response.data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          setErrors(err.response.data.data);
          setTimeout(() => {
            setErrors();
          }, 3000);
        });
    },
    [errors]
  );

  return (
    <div className="p-4">
      <h3 className="font-bold text-xl text-primary">Tambah Materi</h3>
      <p className="font-base tracking-wide text-secondary">
        Lengkapi datanya disini.
      </p>
      <Box className="mt-4">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          innerRef={FormikRef}
        >
          {({ isSubmitting, values, setFieldValue, touched }) => (
            <Form>
              <div>
                <div className="mt-4">
                  <FormControl id="name">
                    <FormLabel>Judul Materi</FormLabel>
                    <Field
                      as={Input}
                      isInvalid={errors?.name}
                      focusBorderColor="blue.600"
                      name="name"
                      placeholder="Masukkan Judul..."
                    />
                    {errors?.name && (
                      <FormErrorMessage>{errors?.name}</FormErrorMessage>
                    )}
                  </FormControl>
                </div>
                <div className="mt-4">
                  <FormControl
                    id="description"
                    isInvalid={errors?.description && touched.description}
                  >
                    <FormLabel>Deskripsi</FormLabel>
                    <Field
                      as={Textarea}
                      focusBorderColor="blue.600"
                      name="description"
                      rows="4"
                      placeholder="Deskripsi Singkat..."
                    />
                    <FormHelperText>Maks: 255 Karakter</FormHelperText>
                    <FormErrorMessage>{errors?.description}</FormErrorMessage>
                  </FormControl>
                </div>
                <div className="mt-4">
                  <FormControl
                    id="thumbnail"
                    isInvalid={errors?.thumbnail && touched.thumbnail}
                  >
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
                          onChange={(event) => {
                            onChangeImage(event, "thumbnail");
                          }}
                        />
                      </Button>
                    </div>
                    {errors?.thumbnail && (
                      <FormErrorMessage>{errors?.thumbnail}</FormErrorMessage>
                    )}
                  </FormControl>
                </div>
                {values?.thumbnail ? (
                  typeof values?.thumbnail !== "object" ? (
                    <Box className="w-full lg:w-80 rounded-md p-4 border border-gray-200">
                      <img
                        src={values.thumbnail}
                        alt=""
                        className="w-full object-cover"
                      />
                    </Box>
                  ) : (
                    <Box className="w-full lg:w-80 rounded-md p-4 border border-gray-200">
                      <img
                        src={URL.createObjectURL(values.thumbnail)}
                        alt=""
                        className="w-full object-cover"
                      />
                    </Box>
                  )
                ) : (
                  ""
                )}
              </div>
              <Box className="flex justify-end gap-2">
                <Button
                  size="md"
                  onClick={() => parent.current.close()}
                  mt="4"
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isSubmitting}
                  loadingText="Checking..."
                  size="md"
                  leftIcon={<PaperAirplaneIcon className="w-4 h-4 rotate-90" />}
                  mt="4"
                  colorScheme="blue"
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
}

export default AddMaterialModal;
