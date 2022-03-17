import React, { useEffect, useRef, useState } from "react";
import { Formik, Field, Form } from "formik";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import { loginUser, registerUser } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/toast";
import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/media-query";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { sleep } from "../utils/sleep";

import { RESET_ERRORS, RESET_USER } from "../constants/types";

function Register() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  const FormikRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const auth = useSelector((state) => state.auth);
  const errors = useSelector((state) => state.errors.entries);
  const toast = useToast();
  const [isSmallestThan768] = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    auth.isAuthenticated &&
      auth.user.token !== undefined &&
      router.replace("dashboard");
  }, [auth]);

  const onSubmit = async (values) => {
    values.password_confirmation = values.password;
    await dispatch(registerUser(values, toast, router));
    if (errors) {
      await sleep(3000);
      dispatch({
        type: "RESET_ERRORS",
      });
    }
  };
  return (
    <>
      <div className="bg-white h-screen">
        <div className="mx-4 flex flex-col justify-center items-center h-full">
          <Link href="/">
            <a>
              <img
                src="/interWithText.svg"
                alt="logo"
                className="object-cover w-24 mb-6 cursor-pointer transition-all delay-75 hover:-translate-y-1"
              />
            </a>
          </Link>

          {/* Card */}
          <div className="bg-white border border-gray-200 p-4 rounded sm:w-3/5 md:w-3/5 lg:w-4/12">
            <div className="text-center">
              <h3 className="text-primary text-lg font-bold tracking-wide">
                Register
              </h3>
              <p className="text-secondary text-base">
                Silahkan lengkapi data anda.
              </p>
            </div>
            <div>
              <Formik
                initialValues={initialValues}
                innerRef={FormikRef}
                onSubmit={onSubmit}
              >
                {() => (
                  <Form>
                    <>
                      <div className="mt-4">
                        <label className={errors?.name && "text-red-500"}>
                          Nama
                        </label>
                        <Field
                          as={Input}
                          isInvalid={errors.name && true}
                          size="lg"
                          variant="outline"
                          focusBorderColor="blue.600"
                          name="name"
                          placeholder="Masukkan Nama..."
                        />
                        {errors?.name && (
                          <Transition
                            show={errors?.name && true}
                            enter="transition-opacity duration-75"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <span className="text-red-500">{errors?.name}</span>
                          </Transition>
                        )}
                      </div>
                      <div className="mt-4">
                        <label className={errors.name && "text-red-500"}>
                          Email
                        </label>
                        <Field
                          as={Input}
                          isInvalid={errors?.email && true}
                          size="lg"
                          variant="outline"
                          focusBorderColor="blue.600"
                          type="email"
                          name="email"
                          placeholder="Masukkan Email..."
                        />
                      </div>
                      {errors?.email && (
                        <Transition
                          show={errors?.email && true}
                          enter="transition-opacity duration-75"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="transition-opacity duration-150"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <span className="text-red-500">{errors?.email}</span>
                        </Transition>
                      )}
                      <div className="mt-4">
                        <label className={errors?.password && "text-red-500"}>
                          Password
                        </label>
                        <InputGroup>
                          <Field
                            as={Input}
                            size="lg"
                            isInvalid={errors?.password && true}
                            variant="outline"
                            focusBorderColor="blue.600"
                            pr="4.5rem"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Masukkan password..."
                          />
                          <InputRightElement width="4.5rem">
                            <button
                              type="button"
                              className="absolute top-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeIcon className="w-5 h-5 text-secondary" />
                              ) : (
                                <EyeOffIcon className="w-5 h-5 text-secondary" />
                              )}
                            </button>
                          </InputRightElement>
                        </InputGroup>
                      </div>
                      {errors?.password && (
                        <Transition
                          show={errors?.password && true}
                          enter="transition-opacity duration-75"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="transition-opacity duration-150"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <span className="text-red-500">
                            {errors?.password}
                          </span>
                        </Transition>
                      )}
                      <div className="my-4 text-right">
                        <span className="text-secondary">
                          Sudah memiliki akun? Klik{" "}
                        </span>
                        <Link href="/login">
                          <a className="text-blue-600 font-medium">Login</a>
                        </Link>
                      </div>
                      <Button
                        colorScheme="blue"
                        isLoading={auth.isFetching}
                        loadingText="Checking"
                        isFullWidth={isSmallestThan768 && true}
                        type="submit"
                        size="md"
                        px="6"
                      >
                        Register
                      </Button>
                    </>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
