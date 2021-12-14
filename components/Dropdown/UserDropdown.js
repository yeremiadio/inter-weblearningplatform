import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { logoutUser } from "../../redux/actions/authAction";
import { useToast } from "@chakra-ui/toast";

const UserDropdown = ({ user, setOpen, open }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const logOut = useCallback(async () => {
    if (window !== undefined || errors.entries.status === 401) {
      dispatch(logoutUser(toast));
      router.replace("/");
    }
  });
  return (
    <Menu as="div" className="relative flex items-center">
      <Menu.Button className="flex items-center">
        <img
          className="w-8 h-8 object-cover inline rounded-full"
          src={user?.avatar ? user?.avatar : "/vercel.svg"}
          alt=""
        />
        <p className="inline mx-2 text-secondary font-medium text-sm tracking-wide">
          {user?.name || ""}
        </p>

        <ChevronDownIcon className="inline h-4 w-4 mt-0.5 mr-4 text-secondary" />
      </Menu.Button>

      <Transition
        enter="transition transform duration-100 ease-out"
        enterFrom="opacity-0 scale-90"
        enterTo="opacity-100 scale-100"
        leave="transition transform duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-90"
      >
        <Menu.Items className="origin-top-right mt-6 focus:outline-none absolute right-2 bg-white overflow-hidden rounded-md shadow-lg border w-48">
          <Menu.Item>
            <a
              className={
                router.pathname.indexOf("dashboard") !== -1
                  ? "block px-4 py-2 text-sm text-gray-700 cursor-pointer bg-gray-100"
                  : "block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              }
              href="/dashboard"
            >
              Dashboard
            </a>
          </Menu.Item>
          <Menu.Item>
            <a
              className={
                router.pathname.indexOf("profile") !== -1
                  ? "block px-4 py-2 text-sm text-gray-700 cursor-pointer bg-gray-100"
                  : "block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              }
              href="/admin/profile"
            >
              Profile
            </a>
          </Menu.Item>
          <Menu.Item>
            <a
              className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={logOut}
            >
              Logout
            </a>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserDropdown;
