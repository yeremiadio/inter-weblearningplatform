import { Button, Input, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Editor from "../components/CodeEditor/Editor";
import instance from "../utils/instance";

function testPage() {
  const initialState = `/*    
  Write your first code...
  
*/\n\nconsole.log(42);`;
  const [data, setData] = useState([]);
  const [code, setCode] = useState(initialState);
  const [outputData, setOutputData] = useState("");
  const [loading, setLoading] = useState("");
  const [question, setQuestion] = useState(
    "Buatlah kode dengan menampilkan 42"
  );
  const initialValues = {
    question: question,
    outputCode: code,
  };
  const resetCode = () => {
    setCode(initialState);
  };
  const removeItemData = (index) => {
    let array = [...data];
    array.splice(index, 1);
    setData(array);
  };
  const resetOutput = () => {
    setOutputData("");
  };
  const runCode = async () => {
    const codeData = {
      files: [
        {
          name: "main.js",
          content: code,
        },
      ],
    };
    setLoading(true);
    try {
      const res = await instance().post("api/code", codeData);
      setOutputData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    const postData = {
      question: question,
      output: outputData?.stdout,
    };
    if (question === "" || code === "") {
      window.alert("Masukkan semua field terlebih dahulu");
    } else {
      setData((prev) => [...prev, postData]);
      window.alert(JSON.stringify(postData));
      setQuestion("");
      resetCode();
      resetOutput();
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <div className="grid grid-cols-1 text-white lg:grid-cols-2 h-screen">
        <div className="bg-blue-900 grid place-items-center">
          <div className="bg-white border text-gray-800 border-gray-100 p-4 rounded lg:shadow w-full sm:w-3/5 md:w-3/5 lg:w-10/12">
            <div>
              <label className="mb-4">Pertanyaan</label>
              <Input
                size="lg"
                variant="outline"
                focusBorderColor="blue.600"
                name="question"
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Masukkan Pertanyaan..."
              />
            </div>
            <div className="mt-4">
              <label className="mb-4">Code</label>
              <Editor
                language="javascript"
                displayName="JS"
                value={code}
                onChange={setCode}
              />
              <div className="mt-4">
                {loading ? (
                  ""
                ) : outputData?.stderr !== "" ? (
                  <p className="text-red-500">{outputData?.stderr}</p>
                ) : (
                  <div>{outputData?.stdout}</div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <Button
                onClick={runCode}
                isFullWidth
                colorScheme={"blue"}
                size={"md"}
                isLoading={loading}
                loadingText="Checking"
              >
                Run Code
              </Button>
              <Button
                onClick={onSubmit}
                isFullWidth
                size={"md"}
                disabled={outputData === "" && true}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-gray-800">
          Data:
          <br />
          <div className="flex flex-col">
            {data.map((item, i) => (
              <div key={i}>
                <p>No. {i + 1}</p>
                <h3>{item?.question}</h3>
                <p>{item?.output}</p>
                <Button colorScheme={"red"} onClick={() => removeItemData(i)}>
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default testPage;
