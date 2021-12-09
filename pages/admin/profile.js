import React, { useCallback, useRef, useState } from "react";
import Admin from "../../layouts/Admin.js";
import { useDispatch, useSelector } from "react-redux";
// import useSWR from "swr";
// import { fetchWithToken } from "../../utils/fetcher.js";
import instance from "../../utils/instance.js";
import { jsonToFormData } from "../../utils/jsonToFormData.js";
import { useToast } from "@chakra-ui/toast";
import { Field, Form, Formik } from "formik";
import { Box } from "@chakra-ui/layout";
import Cookies from "js-cookie";
// import { Select } from "@chakra-ui/select";
// import BlueSpinner from "../../components/Spinner/BlueSpinner";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Button } from "@chakra-ui/button";
import { CameraIcon, PaperAirplaneIcon } from "@heroicons/react/solid";
import { Input } from "@chakra-ui/input";
import { SET_USER } from "../../constants/types.js";

export default function profileConfiguration() {
  const auth = useSelector((state) => state.auth);
  const toast = useToast();
  const dispatch = useDispatch();
  const user = auth.user;
  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    role_id: user?.role.id || "",
  };
  //   const { data: roles, error } = useSWR("api/roles", fetchWithToken);
  const FormikRef = useRef();
  const avatarRef = useRef();
  const onChangeImage = (e, index) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    FormikRef.current.setFieldValue(index, files[0]);
  };
  // const [isSmallestThan768] = useMediaQuery("(max-width: 768px)");
  const [errors, setErrors] = useState({});
  const onSubmit = useCallback(
    async (values) => {
      const formData = jsonToFormData(values);
      formData.append("_method", "put");
      await instance()
        .post(`api/profile/${user?.id}/update`, formData, {
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
          // window.location.reload();
          dispatch({
            type: SET_USER,
            payload: res.data.data,
          });
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
    <>
      {/* <Head>
        <title>Dashboard - BUMDes Laut Sakti Daratan Bertuah</title>
      </Head> */}
      <div className="bg-section">
        <h3 className="font-bold text-xl text-primary">Profile</h3>
        <p className="font-base tracking-wide text-secondary">
          Edit Profil kamu disini.
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
                  {/* {!roles && !error ? (
                    <BlueSpinner />
                  ) : (
                    <div className="mt-2">
                      <FormControl id="role">
                        <FormLabel>Role</FormLabel>
                        <Select
                          placeholder="Role"
                          isInvalid={errors?.role_id}
                          size="lg"
                          variant="outline"
                          focusBorderColor="blue.600"
                          name="role_id"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          {roles?.map((item, i) => (
                            <option key={i} value={item.id}>
                              {item.role_name}
                            </option>
                          ))}
                        </Select>
                        <p className="text-red-500">{errors?.role_id}</p>
                      </FormControl>
                    </div>
                  )} */}
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
                                src={
                                  user?.avatar ? user?.avatar : "/vercel.svg"
                                }
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
                    Edit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
    </>
  );
}

profileConfiguration.layout = Admin;
