import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import UserDropdown from "../Dropdown/UserDropdown";
import { useToast } from "@chakra-ui/toast";
// import { useSelector } from "react-redux";
import instance from "../../utils/instance";
import { CloudIcon } from "@heroicons/react/solid";

function CodeEditorNavbar({ data = {}, auth = {} }) {
  const router = useRouter();
  const toast = useToast();
  const [titleCode, setTitleCode] = useState("untitled");
  const [isLoading, setLoading] = useState(false);
  const onChangeTitleProject = (value) => {
    setTitleCode(value);
  };
  const onSubmitCode = async () => {
    setLoading(true);
    await instance()
      .post("/api/code/create", { title: titleCode, ...data })
      .then((res) => {
        setLoading(false);
        toast({
          title: "Success",
          description: "Success saved",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        setLoading(false);
        toast({
          title: "Error",
          description: "Unexpected Error",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };
  return (
    <nav className="flex justify-between p-6 lg:py-6 lg:px-8 bg-gray-900 text-white mt-0 fixed w-full z-40 top-0 border-b border-gray-700">
      <div className="hidden w-1/4 md:flex items-center">
        <img
          src="/interWithText.svg"
          onClick={() => router.replace("/")}
          className="w-full md:w-1/4 mb-2 object-cover cursor-pointer"
        />
      </div>
      <Editable
        justifyContent={"center"}
        className="line-clamp-1 p-2 mt-1"
        onChange={onChangeTitleProject}
        defaultValue={"Untitled Project"}
        value={titleCode}
      >
        <EditablePreview />
        <EditableInput />
      </Editable>
      <div className="flex items-center gap-4">
        <Button
          className="text-white"
          colorScheme={"blue"}
          onClick={onSubmitCode}
          isLoading={isLoading}
          loadingText="Processing"
          leftIcon={<CloudIcon className="w-6 h-6" />}
        >
          Save
        </Button>
        <UserDropdown user={auth} darkMode />
      </div>
    </nav>
  );
}

export default CodeEditorNavbar;
