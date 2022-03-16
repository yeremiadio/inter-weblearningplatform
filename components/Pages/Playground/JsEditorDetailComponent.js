import { Box, Button, Spinner } from "@chakra-ui/react";
import { TrashIcon } from "@heroicons/react/solid";
import { toPng } from "html-to-image";
import React, { useEffect, useRef, useState } from "react";
import instance from "../../../utils/instance";
import Editor from "../../CodeEditor/Editor";
import CodeEditorNavbar from "../../Navbar/CodeEditorNavbar";
import FrameOutputPreviewComponent from "./FrameOutputPreviewComponent";

const JsEditorDetailComponent = ({ data, mutate, error }) => {
  const initialState = `/*    
  Write your first code...
*/`;
  const [code, setCode] = useState(data ? data.code : initialState);
  const jsCodeRef = useRef();
  const [outputData, setOutputData] = useState("");
  const [screenshotPage, setScreenshotPage] = useState();
  const [loading, setLoading] = useState("");
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
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const ac = new AbortController();
    if (jsCodeRef) {
      toPng(jsCodeRef.current, {
        cacheBust: true,
        height: 640,
      }).then((dataUrl) => {
        setScreenshotPage(dataUrl);
      });
    }
    return () => {
      ac.abort();
    };
  }, [code]);

  return (
    <div ref={jsCodeRef}>
      <CodeEditorNavbar
        isEdited={true}
        nodeScreenshot={screenshotPage}
        data={{
          type: "js",
          code: code,
        }}
      />
      <div ref={jsCodeRef}>
        <div className="bg-gray-900 flex flex-col lg:flex-row mt-24">
          <Editor
            language="javascript"
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
