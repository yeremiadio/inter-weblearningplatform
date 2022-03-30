import {
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import UserDropdown from "../Dropdown/UserDropdown";
import { useToast } from "@chakra-ui/toast";
import { useDispatch, useSelector } from "react-redux";
import { storeCode, updateCode } from "../../redux/actions/codeAction";
import { RESET_ERRORS, RESET_USER } from "../../constants/types";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import {
  CloudDownloadIcon,
  DotsVerticalIcon,
  InboxInIcon,
} from "@heroicons/react/solid";

function CodeEditorNavbar({ codeNode, data = {}, isEdited = false }) {
  const [isSmallestThan768] = useMediaQuery("(max-width: 768px)");
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

  const downloadCode = async () => {
    let zip = new JSZip();
    if (data.type === "frontend") {
      await Object.values(JSON.parse(data.code)).forEach((item, index) => {
        if (index === 0) {
          zip.file("index.html", item);
        }
        if (index === 1) {
          zip.file("style.css", item);
        }
        if (index === 2) {
          zip.file("script.js", item);
        }
      });
      zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, "code.zip");
      });
    }
    if (data.type === "js") {
      var blob = new Blob([data.code], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, `script.js`);
    } else {
      return;
    }
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
        {!isSmallestThan768 ? (
          <>
            <IconButton
              icon={<InboxInIcon className="w-6 h-6" />}
              variant="ghost"
              _hover={{ color: "white" }}
              onClick={downloadCode}
            />
            <IconButton
              icon={<CloudDownloadIcon className="w-6 h-6" />}
              variant="ghost"
              _hover={{ color: "white" }}
              isLoading={isFetching}
              onClick={onSubmitCode}
            />
          </>
        ) : (
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<DotsVerticalIcon className="w-6 h-6" />}
              variant="ghost"
              colorScheme={"blue"}
            />
            <MenuList textColor={"black"}>
              <MenuItem onClick={downloadCode}>Download</MenuItem>
              <MenuItem>Save to Cloud</MenuItem>
            </MenuList>
          </Menu>
        )}
        <UserDropdown user={auth?.user?.user} darkMode />
      </div>
    </nav>
  );
}

export default CodeEditorNavbar;
