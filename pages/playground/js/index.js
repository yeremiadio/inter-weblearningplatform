import React, { useState } from "react";
import Editor from "../../../components/CodeEditor/Editor";
import { Box, Button, Spinner } from "@chakra-ui/react";
import instance from "../../../utils/instance";
import { TrashIcon } from "@heroicons/react/solid";
import CodeEditorNavbar from "../../../components/Navbar/CodeEditorNavbar";
import { useSelector } from "react-redux";

function index() {
  const initialState = `/*    
  Write your first code...
*/`;
  const auth = useSelector((state) => state.auth);
  const [code, setCode] = useState(initialState);
  const [outputData, setOutputData] = useState("");
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

  return (
    <div>
      <CodeEditorNavbar
        isEdited={false}
        data={{
          type: "js",
          code: code,
        }}
        auth={auth.user.user}
      />
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
  );
}

export default index;
