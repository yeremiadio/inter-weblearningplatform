// import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { Fragment, useCallback } from "react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import instance from "../../utils/instance";
import { useToast } from "@chakra-ui/toast";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";

const ChakraMenuDropdown = ({ selectedData = {}, mutate, name = "", data }) => {
  const toast = useToast();
  const deleteSelectedData = useCallback(async () => {
    await instance()
      .delete(`api/${name}/${selectedData?.id || selectedData?.slug}/delete`)
      .then((res) => {
        toast({
          title: "Success",
          status: "success",
          description: `${name} Deleted Successfully`,
          isClosable: true,
          duration: 3000,
        });
        mutate(
          [
            ...data.filter(
              (item) =>
                item.id || item.slug !== selectedData?.id || selectedData?.slug
            ),
          ],
          true
        );
      })
      .catch((err) => {
        toast({
          title: "Error",
          status: "error",
          description: `Error deleting ${name}`,
          isClosable: true,
          duration: 3000,
        });
      });
  }, []);
  return (
    <Menu as={"div"} className="relative px-2">
      <Menu.Button>
        <DotsVerticalIcon className="w-5 h-5" arial-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition transform duration-100 ease-out"
        enterFrom="opacity-0 scale-90"
        enterTo="opacity-100 scale-100"
        leave="transition transform duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-90"
      >
        <Menu.Items
          className={
            "origin-top-right right-2 mt-1 absolute overflow-hidden bg-white shadow-default-weblearning w-48 rounded-lg"
          }
        >
          <Menu.Item>
            <Link
              href={{
                pathname: `materials/edit/[slug]`,
                query: { slug: selectedData.slug },
              }}
            >
              <a className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                Edit
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <a
              onClick={deleteSelectedData}
              className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
            >
              Delete
            </a>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ChakraMenuDropdown;
