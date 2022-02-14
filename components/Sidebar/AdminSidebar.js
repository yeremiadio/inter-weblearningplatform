import React, { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  CubeIcon,
  HomeIcon,
  PuzzleIcon,
  UserGroupIcon,
  XIcon,
  DocumentTextIcon,
  ClipboardIcon,
  CodeIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import { Transition, Dialog } from "@headlessui/react";
// import { useSelector } from "react-redux";
import { Disclosure } from "@headlessui/react";
const AdminSidebar = ({ setOpen, open }) => {
  const router = useRouter();
  const navigations = [
    {
      id: 1,
      name: "Dashboard",
      href: "/dashboard",
      icon: (
        <HomeIcon
          style={{
            width: 22,
            color:
              router.pathname.indexOf("/dashboard") !== -1
                ? "text-white"
                : "group-hover:text-gray-800",
          }}
        />
      ),
    },
    {
      id: 2,
      name: "Assignments",
      href: "/assignments",
      icon: (
        <ClipboardIcon
          style={{
            width: 22,
            color:
              router.pathname.indexOf("/assignments") !== -1
                ? "text-white"
                : "group-hover:text-gray-800",
          }}
        />
      ),
    },
    {
      id: 3,
      name: "Playground",
      href: "/playground",
      icon: (
        <CodeIcon
          style={{
            width: 22,
            color:
              router.pathname.indexOf("/playground") !== -1
                ? "text-white"
                : "group-hover:text-gray-800",
          }}
        />
      ),
      children: [
        {
          id: 1,
          name: "Frontend Editor",
          href: "/frontend-editor",
        },
        {
          id: 2,
          name: "Javascript Editor",
          href: "/js-editor",
        },
        {
          id: 3,
          name: "Webpage Builder",
          href: "/webpage-builder",
        },
      ],
    },
    {
      id: 4,
      name: "Materials",
      href: "/materials",
      icon: (
        <DocumentTextIcon
          style={{
            width: 22,
            color:
              router.pathname.indexOf("/materials") !== -1
                ? "text-white"
                : "group-hover:text-gray-800",
          }}
        />
      ),
    },
    {
      id: 5,
      name: "Users",
      href: "/users",
      icon: (
        <UserGroupIcon
          style={{
            width: 22,
            color:
              router.pathname.indexOf("/users") !== -1
                ? "text-white"
                : "group-hover:text-gray-800",
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
          className="fixed inset-0 z-40 md:hidden"
        >
          <Transition.Child
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
            as="div"
            className="flex z-10 relative flex-col w-72 h-screen bg-white md:hidden"
          >
            <button
              onClick={() => setOpen(false)}
              className="hover:ring-2 hover:ring-gray-300 flex absolute top-2 right-2 justify-center items-center w-10 h-10 rounded-full"
              type="button"
            >
              <XIcon className="w-6 h-6 text-secondary" />
            </button>
            <div className="py-4 px-6 mt-14 flex flex-col justify-center items-center">
              <img
                src="/interWithText.svg"
                onClick={() => router.replace("/")}
                className="w-3/5 cursor-pointer object-cover"
              />
            </div>
            <div className="mb-10 mt-8">
              <ul className="md:flex-col md:min-w-screen flex flex-col list-none pt-2 mx-4 space-y-2">
                {navigations.map((item) => (
                  <li
                    className="items-center group text-blue-600"
                    onClick={() => setOpen(false)}
                    key={item.id}
                  >
                    <Link href={item.href}>
                      <span
                        className={
                          "transition-all delay-75 " +
                          (router.pathname.indexOf(item.href) !== -1
                            ? "rounded flex w-full items-center space-x-3 py-2 px-4 cursor-pointer bg-blue-100 font-semibold"
                            : "rounded flex w-full items-center space-x-3 py-2 px-4 group-hover:text-gray-800 cursor-pointer font-normal text-gray-600")
                        }
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </span>
                    </Link>
                  </li>
                ))}
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

      {/* Desktop */}
      <div className="hidden w-64 bg-white border-r border-gray-220 md:block fixed h-full z-50">
        <div className="py-4 px-6 mt-12 flex flex-col justify-center items-center">
          <img
            src="/interWithText.svg"
            onClick={() => router.replace("/")}
            className="w-3/5 object-cover cursor-pointer"
          />
        </div>
        <div className="my-6">
          <ul className="md:flex-col md:min-w-screen flex flex-col list-none pt-2 mx-4 space-y-2">
            {navigations.map((item) => (
              <li
                className="items-center group text-blue-600"
                onClick={() => setOpen(false)}
                key={item.id}
              >
                <Link href={item.href}>
                  <span
                    className={
                      "transition-all delay-75 " +
                      (router.pathname.indexOf(item.href) !== -1
                        ? "rounded flex w-full items-center space-x-3 py-2 px-4 cursor-pointer bg-blue-100 font-semibold"
                        : "rounded flex w-full items-center space-x-3 py-2 px-4 group-hover:text-gray-800 cursor-pointer font-normal text-gray-600")
                    }
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
