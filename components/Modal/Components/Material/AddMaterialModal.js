import { useState, useCallback } from "react";
import Cookies from "js-cookie";
import instance from "../../../../utils/instance";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { FormErrorMessage } from "@chakra-ui/form-control";

function AddMaterialModal({ parent, materials, mutate, toast }) {
  const initialValues = {
    name: "",
  };
  const [errors, setErrors] = useState({});
  const onSubmit = useCallback(
    async (values) => {
      await instance()
        .post(`api/admin/pages/create`, values, {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        })
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
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div>
                <div className="mt-2">
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
              </div>
              <Box className="flex justify-end gap-2">
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
                <Button
                  size="md"
                  onClick={() => parent.current.close()}
                  mt="4"
                  type="button"
                >
                  Cancel
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
