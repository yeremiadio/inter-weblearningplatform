import React, { useState } from "react";
import Editor from "../../../components/CodeEditor/Editor";
import { Box, Button, Spinner } from "@chakra-ui/react";
import instance from "../../../utils/instance";
import { TrashIcon } from "@heroicons/react/solid";
import CodeEditorNavbar from "../../../components/Navbar/CodeEditorNavbar";
import axios from "axios";
import { useSelector } from "react-redux";

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await axios.get(process.env.baseUrl + "/api/codes");
  const codes = await res.data.data;

  // Get the paths we want to pre-render based on posts
  const paths = codes.map((item) => ({
    params: { slug: item.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps(ctx) {
  const { params } = ctx;
  // Pass data to the page via props
  const res = await axios.get(
    process.env.baseUrl + `/api/code/single/${params.slug}`
  );
  const data = await res.data.data;
  return { props: { data } };
}

function singleJsCodeEditorPage({ data }) {
  const initialState = `/*    
  Write your first code...
*/`;
  const auth = useSelector((state) => state.auth);
  const [code, setCode] = useState(data ? data.code : initialState);
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
        isEdited={true}
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

export default singleJsCodeEditorPage;
