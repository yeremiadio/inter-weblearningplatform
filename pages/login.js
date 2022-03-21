import React, { useEffect, useRef, useState } from "react";
import { Formik, Field, Form } from "formik";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import { loginUser } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/toast";
import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/media-query";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { sleep } from "../utils/sleep";

function Login() {
  const initialValues = {
    email: "",
    password: "",
  };
  const FormikRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const auth = useSelector((state) => state.auth);
  const errors = useSelector((state) => state.errors.entries);
  const toast = useToast();
  // const [isSmallestThan768] = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    auth.isAuthenticated &&
      auth.user.token !== undefined &&
      router.replace("dashboard");
  }, [auth]);

  const onSubmit = async (values) => {
    await dispatch(loginUser(values, toast, router));
    if (errors) {
      await sleep(3000);
      dispatch({
        type: "RESET_ERRORS",
      });
    }
  };
  return (
    <>
      <div className="grid lg:grid-cols-2">
        <div>
          <div className="relative">
            <Link href="/">
              <a>
                <img
                  src="/interWithText.svg"
                  alt="logo"
                  className="object-cover absolute top-6 left-8 w-24 mb-6 cursor-pointer transition-all delay-75 hover:-translate-y-1"
                />
              </a>
            </Link>
          </div>
          <div className="px-4 md:px-12 lg:px-24 min-h-screen grid grid-cols-1 place-content-center">
            {/* Card */}
            <div className="bg-white rounded">
              <div className="text-center">
                <h3 className="text-primary text-lg font-bold tracking-wide">
                  Login
                </h3>
                <p className="text-secondary text-base">
                  Silahkan masukkan kredensial anda.
                </p>
              </div>
              <div>
                <Formik
                  initialValues={initialValues}
                  innerRef={FormikRef}
                  onSubmit={onSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <>
                        <div className="mt-4">
                          <label className={errors?.email && "text-red-500"}>
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
                            <span className="text-red-500">{errors.email}</span>
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
                              {errors.password}
                            </span>
                          </Transition>
                        )}
                        <div className="my-4 text-right">
                          <span className="text-secondary">
                            Belum memiliki akun? Klik{" "}
                          </span>
                          <Link href="/register">
                            <a className="text-blue-600 font-medium">
                              Register
                            </a>
                          </Link>
                        </div>
                        <Button
                          colorScheme="blue"
                          isLoading={auth.isFetching && isSubmitting}
                          loadingText="Checking"
                          isFullWidth
                          type="submit"
                          size="md"
                          px="6"
                        >
                          Login
                        </Button>
                      </>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden bg-blue-inter w-full min-h-screen lg:grid grid-cols-1 place-items-center text-white px-4 text-center">
          <div className="flex justify-center items-center flex-col">
            <div className="w-9/12">
              <img src={"/ilus-coding-1.svg"} className="h-1/6" alt="" />
            </div>
            <span className="text-2xl font-bold mt-6 my-2">
              Belajar menjadi mudah
            </span>
            <p className="text-base px-32">
              Inter memberikan berbagai fitur untuk kamu yang ingin terjun karir
              menjadi web programmer.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
