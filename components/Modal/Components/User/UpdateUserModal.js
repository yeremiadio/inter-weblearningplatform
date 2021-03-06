import { useState, useRef, useCallback } from "react";
import instance from "../../../../utils/instance";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { jsonToFormData } from "../../../../utils/jsonToFormData";
import { PaperAirplaneIcon, CameraIcon } from "@heroicons/react/solid";
import { Select } from "@chakra-ui/select";
import BlueSpinner from "../../../Spinner/BlueSpinner";
import useSWR from "swr";
import { FormErrorMessage } from "@chakra-ui/form-control";
import { fetcher } from "../../../../utils/fetcher";

function UpdateUserModal({ parent, user, indexData, users, mutate, toast }) {
  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    role: user?.roles[0]?.name || "",
  };
  const { data: roles, error } = useSWR("api/roles", fetcher);
  const FormikRef = useRef();
  const avatarRef = useRef();
  const onChangeImage = useCallback((e, index) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    FormikRef.current.setFieldValue(index, files[0]);
  });
  // const [isSmallestThan768] = useMediaQuery("(max-width: 768px)");
  const [errors, setErrors] = useState({});
  const onSubmit = useCallback(
    async (values) => {
      const formData = jsonToFormData(values);
      formData.append("_method", "put");
  
      await instance()
        .post(`api/users/${user.id}/update`, formData)
        .then((res) => {
          toast({
            title: "Success",
            description: res.data.message,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          parent.current.close();
          // window.location.reload();
          let newArr = [...users];
          newArr[indexData] = res.data.data;
          mutate(newArr, false);
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
      <h3 className="font-bold text-xl text-primary">Edit User</h3>
      <p className="font-base tracking-wide text-secondary">
        Lengkapi datanya disini.
      </p>
      <Box className="mt-4">
        <Formik
          initialValues={initialValues}
          enableReinitialize
          innerRef={FormikRef}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, values, touched, handleChange, handleBlur }) => (
            <Form>
              <div>
                <div className="mt-2">
                  <FormControl id="name">
                    <FormLabel>Nama</FormLabel>
                    <Field
                      as={Input}
                      isInvalid={errors?.name}
                      focusBorderColor="blue.600"
                      name="name"
                    />
                    <p className="text-red-500">{errors?.name}</p>
                  </FormControl>
                </div>
                <div className="mt-2">
                  <FormControl id="email">
                    <FormLabel>Email</FormLabel>
                    <Field
                      as={Input}
                      isInvalid={errors?.email}
                      focusBorderColor="blue.600"
                      name="email"
                      type="email"
                    />
                    <p className="text-red-500">{errors?.email}</p>
                  </FormControl>
                </div>
                {!roles && !error ? (
                  <BlueSpinner />
                ) : (
                  <div className="mt-2">
                    <FormControl id="role">
                      <FormLabel>Role</FormLabel>
                      <Select
                        placeholder={"Role"}
                        isInvalid={errors?.role}
                        size="lg"
                        variant="outline"
                        focusBorderColor="blue.600"
                        name="role"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {roles?.map((item, i) => (
                          <option
                            key={i}
                            value={item.name}
                            selected={user?.roles[0]?.name === item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                      </Select>
                      <p className="text-red-500">{errors?.role}</p>
                    </FormControl>
                  </div>
                )}
                <div className="mt-2">
                  <FormControl
                    id="avatar"
                    isInvalid={errors?.avatar && touched.avatar}
                  >
                    <FormLabel>Avatar</FormLabel>
                    <div className="flex flex-row w-full items-center gap-2">
                      <Button
                        variant="outline"
                        leftIcon={<CameraIcon className="w-5 h-5" />}
                        onClick={() => avatarRef.current.click()}
                      >
                        Upload
                        <input
                          ref={avatarRef}
                          type="file"
                          name="avatar"
                          hidden
                          accept="image/*"
                          onChange={(event) => {
                            onChangeImage(event, "avatar");
                          }}
                        />
                      </Button>
                    </div>
                    <div className="my-2 lg:my-4">
                      {values?.avatar ? (
                        typeof values?.avatar !== "object" ? (
                          <Box className="w-full lg:w-80 rounded-md p-4 border border-gray-200">
                            <img
                              src={values.avatar}
                              alt=""
                              className="w-full object-cover"
                            />
                          </Box>
                        ) : (
                          <Box className="w-full lg:w-80 rounded-md p-4 border border-gray-200">
                            <img
                              src={URL.createObjectURL(values.avatar)}
                              alt=""
                              className="w-full object-cover"
                            />
                          </Box>
                        )
                      ) : (
                        ""
                      )}
                    </div>
                    {errors?.avatar && (
                      <FormErrorMessage>{errors?.avatar}</FormErrorMessage>
                    )}
                  </FormControl>
                </div>
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

export default UpdateUserModal;
