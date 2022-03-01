import React, { Fragment, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ChatAltIcon,
  CubeIcon,
  HomeIcon,
  IdentificationIcon,
  XIcon,
} from "@heroicons/react/solid";
// import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
// import ActiveLink from "../ActiveLink";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import { logoutUser } from "../../actions/auth/authAction";
import { Box } from "@chakra-ui/layout";
// import { logOut } from "../../utils/auth";
const MainSideBar = ({ setOpen, open }) => {
  const auth = useSelector((state) => state.auth);
  const toast = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const logOut = useCallback(async () => {
    if (window !== undefined || errors.entries.status === 401) {
      dispatch(logoutUser(toast));
      router.replace("/");
    }
  });
  const navigations = [
    {
      href: "/",
      name: "Home",
      icon: (
        <HomeIcon
          style={{
            width: 24,
            color:
              router.asPath === Object.keys("href") ||
              router.pathname === Object.keys("href")
                ? "text-white"
                : "text-secondary",
          }}
        />
      ),
    },
    {
      href: "/about",
      name: "About",
      icon: (
        <IdentificationIcon
          style={{
            width: 24,
            color:
              router.asPath === Object.keys("href") ||
              router.pathname === Object.keys("href")
                ? "text-white"
                : "text-secondary",
          }}
        />
      ),
    },
    {
      href: "/products",
      name: "Products",
      icon: (
        <CubeIcon
          style={{
            width: 24,
            color:
              router.pathname.indexOf("/products") == -1
                ? "text-white"
                : "text-secondary",
          }}
        />
      ),
    },
    {
      href: "/contact",
      name: "Contact Us",
      icon: (
        <ChatAltIcon
          style={{
            width: 24,
            color:
              router.asPath === Object.keys("href") ||
              router.pathname === Object.keys("href")
                ? "text-white"
                : "text-secondary",
          }}
        />
      ),
    },
  ];
  return (
    <>
      {/* Mobile */}
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          onClose={() => setOpen(false)}
          className="fixed inset-0 z-40 lg:hidden"
        >
          <Transition.Child
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
            as="div"
            className="flex z-10 relative flex-col w-72 float-right bg-white shadow-boxShadow-siderbar-main h-screen lg:hidden"
          >
            <button
              onClick={() => setOpen(false)}
              className="hover:ring-2 hover:ring-gray-300 flex absolute top-6 right-7 justify-center items-center w-10 h-10 rounded-full"
              type="button"
            >
              <XIcon className="w-7 h-7 text-secondary" />
            </button>

            <div className="mb-10 mt-20 flex flex-col h-screen justify-between">
              <ul className="md:min-w-screen flex flex-col list-none pt-2 mx-4 space-y-1">
                {auth.isAuthenticated && (
                  <li className="items-center py-4">
                    <div className="flex gap-4 mx-2">
                      <>
                        <img
                          src={
                            auth.user.user.avatar !== null
                              ? `${process.env.baseUrl}/assets/images/user/avatar/${auth.user.user.avatar}`
                              : "/interWithText.svg"
                          }
                          onClick={() => router.replace("/dashboard")}
                          className="w-12 h-12 rounded-full object-cover focus:border-2 focus:border-blue-700"
                        />
                        <div className="flex flex-col">
                          <h3 className="text-primary">
                            Hello, {auth.user.user.name}
                          </h3>
                          <a
                            onClick={logOut}
                            className="text-primary font-bold"
                          >
                            Logout
                          </a>
                        </div>
                      </>
                    </div>
                  </li>
                )}
                <li className="items-center" onClick={() => setOpen(false)}>
                  <Link href="/">
                    <span
                      className={
                        "flex w-full my-1 transition-all delay-75 items-center space-x-3 py-3 px-4 rounded cursor-pointer " +
                        (router.asPath === "/" || router.pathname === "/"
                          ? "bg-blue-500 text-white font-medium"
                          : "font-normal text-secondary")
                      }
                    >
                      <HomeIcon
                        style={{
                          width: 24,
                          color:
                            router.asPath === "/" || router.pathname === "/"
                              ? "text-white"
                              : "text-secondary",
                        }}
                      />
                      <span>Home</span>
                    </span>
                  </Link>
                </li>
                <li className="items-center" onClick={() => setOpen(false)}>
                  <Link href="/about">
                    <span
                      className={
                        "flex w-full my-1 transition-all delay-75 items-center space-x-3 py-3 px-4 rounded cursor-pointer " +
                        (router.asPath === "/about" ||
                        router.pathname === "/about"
                          ? "bg-blue-500 text-white font-medium"
                          : "font-normal text-secondary")
                      }
                    >
                      <IdentificationIcon
                        style={{
                          width: 24,
                          color:
                            router.asPath === "/about" ||
                            router.pathname === "/about"
                              ? "text-white"
                              : "text-secondary",
                        }}
                      />
                      <span>About</span>
                    </span>
                  </Link>
                </li>
                <li className="items-center" onClick={() => setOpen(false)}>
                  <Link href="/products">
                    <span
                      className={
                        "flex w-full my-1 transition-all delay-75 items-center space-x-3 py-3 px-4 rounded cursor-pointer " +
                        (router.pathname.indexOf("/products") !== -1
                          ? "bg-blue-500 text-white font-medium"
                          : "font-normal text-secondary")
                      }
                    >
                      <CubeIcon
                        style={{
                          width: 24,
                          color:
                            router.pathname.indexOf("/products") !== -1
                              ? "text-white"
                              : "text-secondary",
                        }}
                      />
                      <span>Products</span>
                    </span>
                  </Link>
                </li>
                <li className="items-center" onClick={() => setOpen(false)}>
                  <Link href="/contact">
                    <span
                      className={
                        "flex w-full my-1 transition-all delay-75 items-center space-x-3 py-3 px-4 rounded cursor-pointer " +
                        (router.asPath === "/contact" ||
                        router.pathname === "/contact"
                          ? "bg-blue-500 text-white font-medium"
                          : "font-normal text-secondary")
                      }
                    >
                      <ChatAltIcon
                        style={{
                          width: 24,
                          color:
                            router.asPath === "/contact" ||
                            router.pathname === "/contact"
                              ? "text-white"
                              : "text-secondary",
                        }}
                      />
                      <span>Contact Us</span>
                    </span>
                  </Link>
                </li>
                {auth.isAuthenticated === false && (
                  <li className="items-center py-4">
                    <div className="mx-2">
                      <Box display="flex" className="w-full gap-2 flex-col">
                        <Button
                          onClick={() => setOpen(false)}
                          colorScheme="blue"
                          variant="outline"
                        >
                          <Link href="/login">
                            <a>Login</a>
                          </Link>
                        </Button>
                        <Button
                          onClick={() => setOpen(false)}
                          colorScheme="gray"
                        >
                          <Link href="/register">
                            <a>Register</a>
                          </Link>
                        </Button>
                      </Box>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </Transition.Child>
          <Transition.Child
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            as="div"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-50" />
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default MainSideBar;
