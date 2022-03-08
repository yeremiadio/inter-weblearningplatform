import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import instance from "../../utils/instance";
import { useToast } from "@chakra-ui/toast";

const ChakraMenuDropdown = ({ selectedData = {}, mutate, name = "", data }) => {
  const toast = useToast();
  const deleteQuiz = useCallback(async () => {
    await instance()
      .delete(`api/${name}/${selectedData?.id || selectedData?.slug}/delete`)
      .then((res) => {
        toast({
          title: "Success",
          status: "success",
          description: "Quiz Deleted Successfully",
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
    <Menu variant={"absolute"} className='z-50'>
      <MenuButton px={4} py={2} transition="all 0.2s" variant={"ghost"}>
        <DotsVerticalIcon className="w-5 h-5" />
      </MenuButton>
      <MenuList>
        {/* <MenuItem>Edit</MenuItem> */}
        <MenuItem onClick={deleteQuiz}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ChakraMenuDropdown;
