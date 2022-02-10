import { useState, useRef, useCallback } from "react";

import instance from "../../../../utils/instance";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
// import { jsonToFormData } from "../../../../utils/jsonToFormData";
// import { PaperAirplaneIcon, CameraIcon } from "@heroicons/react/solid";
// import { Select } from "@chakra-ui/select";
// import BlueSpinner from "../../../Spinner/BlueSpinner";
// import { FormErrorMessage } from "@chakra-ui/form-control";

function CreateWebPageBuilderModal({ parent, data, mutate, router, toast }) {
  const initialValues = {
    title: "",
    type: "webpage-builder",
    code: "",
  };
  const [errors, setErrors] = useState();
  const onSubmit = useCallback(
    async (values) => {
      await instance()
        .post(`api/code/create`, values)
        .then((res) => {
          const response = res.data.data;
          toast({
            title: "Success",
            description: res.data.message,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          parent.current.close();
          mutate([...data, response], false);
          router.push(`playground/${response.type}/${response.slug}`);
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
      <h3 className="font-bold text-xl text-primary">Webpage Builder</h3>
      <p className="font-base tracking-wide text-secondary">
        Lengkapi datanya dibawah ini.
      </p>
      <Box className="mt-4">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <>
                <div className="mt-2">
                  <FormControl id="title">
                    <FormLabel>Judul Webpage</FormLabel>
                    <Field
                      as={Input}
                      isInvalid={errors?.title}
                      focusBorderColor="blue.600"
                      name="title"
                    />
                    <p className="text-red-500">{errors?.title}</p>
                  </FormControl>
                </div>
                <Button
                  type="submit"
                  colorScheme={"blue"}
                  className="mt-4"
                  isLoading={isSubmitting}
                >
                  Submit & Play
                </Button>
              </>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
}

export default CreateWebPageBuilderModal;
