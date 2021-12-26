import React, { useEffect, useState } from "react";
// import instance from "../utils/instance";
import Editor from "../components/CodePenEditor/Editor";
import { Box, Button, Spinner } from "@chakra-ui/react";
import axios from "axios";
import instance from "../utils/instance";
import { TrashIcon } from "@heroicons/react/solid";

function testPage() {
  const [code, setCode] = useState("");
  const [outputData, setOutputData] = useState("");
  const [loading, setLoading] = useState("");
  const resetCode = () => {
    setCode("");
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
      const res = await instance().post("api/code", data);
      setOutputData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-gray-900 flex flex-col lg:flex-row">
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
            <div>Output: {outputData?.stdout}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default testPage;
