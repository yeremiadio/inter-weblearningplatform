import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/toast";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { toPng } from "html-to-image";
import useScreenshotWebPage from "../../utils/useScreenshotWebPage";
import CarbonCodeEditor from "../../components/CodeEditor/CarbonCodeEditor";

function carbon() {
  const defaultValue = `const pluckDeep = key => obj => key.split('.').reduce((accum, key) => accum[key], obj)

    const compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res)
    
    const unfold = (f, seed) => {
      const go = (f, seed, acc) => {
        const res = f(seed)
        return res ? go(f, res[1], acc.concat([res[0]])) : acc
      }`;

  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const toast = useToast();
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

  const codeLang = [
    {
      name: "HTML/XML",
      value: "xml",
    },
    {
      name: "CSS",
      value: "css",
    },
    {
      name: "Javascript",
      value: "javascript",
    },
  ];

  const [code, setCode] = useState(defaultValue);
  const [codeNodeElement, codeRef] = useScreenshotWebPage(code);
  const [languages, setLanguages] = useState(codeLang[2].value);

  function handleChangeLanguage(e) {
    setLanguages(e.target.value);
  }

  function downloadLink() {
    toPng(codeNodeElement)
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "export";
        link.href = dataUrl;
        link.click();
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  }
  return (
    <div className="min-h-screen bg-[#202425]">
      <div className="grid grid-cols-1 place-content-center place-items-center min-h-screen">
        <div className="w-full lg:w-1/2 relative m-4">
          <div className="mx-4 mb-8 flex justify-center items-center">
            <Link href={"/dashboard"}>
              <a>
                <img src="/inter-whitetext.svg" alt="" className="w-24" />
              </a>
            </Link>
          </div>
          <div className="flex gap-2 mx-2">
            <div>
              <select
                className="block w-full py-[14px] px-4 pr-8 text-white bg-[#0E1112] rounded leading-tight focus:outline-none"
                onChange={handleChangeLanguage}
              >
                {codeLang.map((item, i) => (
                  <option key={i} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                onClick={downloadLink}
                className="bg-[#0E1112] text-white font-bold leading-normal border-none px-6 py-[13px] rounded-md"
              >
                Download
              </button>
            </div>
          </div>
          <div className="p-2 h-full" ref={codeRef}>
            <CarbonCodeEditor
              setCode={setCode}
              code={code}
              className={"break-words"}
              options={{
                lint: true,
                mode: languages,
                theme: "seti",
                lineWrapping: true,
                extraKeys: { "Ctrl-Space": "autocomplete" },
                lineNumbers: true,
                autocorrect: true,
                spellcheck: true,
                smartIndent: true,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default carbon;
