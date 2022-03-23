import { Box, Button, Spinner } from "@chakra-ui/react";
import { TrashIcon } from "@heroicons/react/solid";
import { toPng } from "html-to-image";
import React, { useEffect, useRef, useState } from "react";
import instance from "../../../utils/instance";
import useScreenshotWebPage from "../../../utils/useScreenshotWebPage";
import Editor from "../../CodeEditor/Editor";
import CodeEditorNavbar from "../../Navbar/CodeEditorNavbar";
import FrameOutputPreviewComponent from "./FrameOutputPreviewComponent";

const JsEditorDetailComponent = ({ data, mutate, error }) => {
  const initialState = `/*    
  Write your first code...
*/



`;
  const [code, setCode] = useState(data ? data.code : initialState);
  const [outputData, setOutputData] = useState("");
  const [loading, setLoading] = useState("");
  const [codeNodeElement, codeRef] = useScreenshotWebPage("", "", code);
  const resetCode = () => {
    setCode(initialState);
  };
  const resetOutput = () => {
    setOutputData("");
  };
  const runCode = async () => {
    const data = {
      files: [
        {
          name: "main.js",
          content: code,
        },
      ],
    };
    setLoading(true);
    try {
      const res = await instance().post("api/code-glot", data);
      setOutputData(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div ref={codeRef}>
      <CodeEditorNavbar
        isEdited={true}
        codeNode={codeNodeElement}
        data={{
          type: "js",
          code: code,
        }}
      />
      <div>
        <div className="bg-gray-900 flex flex-col lg:flex-row mt-24">
          <Editor
            language="javascript"
            className="overflow-y-scroll max-h-96"
            displayName="JS"
            value={code}
            onChange={setCode}
          />
        </div>
        <div className="m-4">
          <Box
            display={{ lg: "flex" }}
            justifyContent={"space-between"}
            gridGap={2}
            mb={2}
          >
            <div className="flex gap-2 mb-2 lg:mb-0">
              <Button colorScheme={"blue"} size={"md"} onClick={runCode}>
                {"Run >"}
              </Button>
              <Button size={"md"} variant={"outline"} onClick={resetCode}>
                Reset
              </Button>
            </div>
            <Button
              size={"md"}
              colorScheme={"red"}
              leftIcon={<TrashIcon className="w-4 h-4" />}
              variant={"outline"}
              onClick={resetOutput}
            >
              Clear Output
            </Button>
          </Box>
          <div>
            {loading ? (
              <Spinner
                color="blue.500"
                thickness="3px"
                emptyColor="gray.200"
                size="md"
              />
            ) : outputData?.stderr !== "" ? (
              <p className="text-red-500">{outputData?.stderr}</p>
            ) : (
              <div>{outputData?.stdout}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsEditorDetailComponent;
