import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import UserDropdown from "../Dropdown/UserDropdown";
import { useToast } from "@chakra-ui/toast";
import { CloudIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { storeCode, updateCode } from "../../redux/actions/codeAction";
import { RESET_ERRORS, RESET_USER } from "../../constants/types";
import { toPng } from "html-to-image";

function CodeEditorNavbar({ codeNode, data = {}, isEdited = false }) {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const toast = useToast();
  const isFetching = useSelector((state) => state.code.isFetching);
  const code = useSelector((state) => state.code.data);
  const dispatch = useDispatch();
  useEffect(() => {
    const ac = new AbortController();
    if (
      auth?.isAuthenticated === false ||
      auth?.user?.token === undefined ||
      auth?.user?.token === ""
    ) {
      dispatch({
        type: RESET_USER,
      });
      dispatch({
        type: RESET_ERRORS,
      });
      router.replace("/login");
      toast({
        title: "Error",
        description: "Not Authenticated",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      return ac.abort();
    }
  }, []);

  const [titleCode, setTitleCode] = useState(
    isEdited ? code.title : "untitled"
  );
  const onChangeTitleProject = (value) => {
    setTitleCode(value);
  };

  const onSubmitCode = async () => {
    if (codeNode === null) {
      return;
    }
    !isEdited
      ? await toPng(codeNode, {
          cacheBust: true,
          width: 320,
          height: 640,
          quality: 0.5,
        })
          .then(async (dataUrl) => {
            // console.log({ title: titleCode, screenshot: dataUrl, ...data });
            await dispatch(
              storeCode(
                { title: titleCode, screenshot: dataUrl, ...data },
                router,
                toast
              )
            );
          })
          .catch((err) => {
            console.log(err);
          })
      : // : console.log({ title: titleCode, ...data });
        await dispatch(
          updateCode({ title: titleCode, ...data }, router, toast)
        );
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
          isLoading={isFetching}
          leftIcon={<CloudIcon className="w-6 h-6" />}
        >
          Save
        </Button>
        <UserDropdown user={auth?.user?.user} darkMode />
      </div>
    </nav>
  );
}

export default CodeEditorNavbar;
