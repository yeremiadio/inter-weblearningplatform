import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import instance from "../../utils/instance";
import { useToast } from "@chakra-ui/toast";

const ChakraMenuDropdown = ({ selectedData = {}, mutate, quizzes }) => {
  const toast = useToast();
  const deleteQuiz = useCallback(async () => {
    await instance()
      .delete(`api/quizzes/${selectedData?.slug}/delete`)
      .then((res) => {
        toast({
          title: "Success",
          status: "success",
          description: "Quiz Deleted Successfully",
          isClosable: true,
          duration: 3000,
        });
        mutate(
          [...quizzes.filter((item) => item.slug !== selectedData?.slug)],
          false
        );
      })
      .catch((err) => {
        toast({
          title: "Error",
          status: "error",
          description: "Error deleting quiz",
          isClosable: true,
          duration: 3000,
        });
      });
  }, [selectedData?.slug]);

  //   const router = useRouter();
  return (
    <Menu>
      <MenuButton
        px={4}
        py={2}
        transition="all 0.2s"
        borderRadius="md"
        borderWidth="1px"
        _hover={{ bg: "gray.400" }}
        _expanded={{ bg: "blue.400" }}
        _focus={{ boxShadow: "outline" }}
      >
        <DotsVerticalIcon className="w-5 h-5" />
      </MenuButton>
      <MenuList>
        <MenuItem>Edit</MenuItem>
        <MenuItem onClick={deleteQuiz}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ChakraMenuDropdown;
