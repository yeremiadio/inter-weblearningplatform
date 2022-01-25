import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { RESET_ERRORS, RESET_USER } from "../../constants/types";
import useLocalStorage from "../../utils/useLocalStorage";
import Editor from "../../components/CodePenEditor/Editor";
import UserDropdown from "../../components/Dropdown/UserDropdown";
import { useToast } from "@chakra-ui/toast";

function code() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const ac = new AbortController();
    if (
      auth.isAuthenticated === false ||
      auth.data.token === undefined ||
      auth.data.token === ""
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <div className="flex justify-between p-6 lg:py-6 lg:px-8 bg-white mt-0 fixed w-full z-40 top-0 border-b border-gray-200">
        <div className="w-1/4 flex items-center">
          <img
            src="/interWithText.svg"
            onClick={() => router.replace("/")}
            className="w-full md:w-1/4 object-cover cursor-pointer"
          />
        </div>
        <UserDropdown user={auth.data.user} />
      </div>
      <div className="mt-20 min-h-screen h-1/2">
        <div className="bg-gray-900 flex flex-col lg:flex-row">
          <Editor
            language="xml"
            displayName="HTML"
            value={html}
            onChange={setHtml}
          />
          <Editor
            language="css"
            displayName="CSS"
            value={css}
            onChange={setCss}
          />
          <Editor
            language="javascript"
            displayName="JS"
            value={js}
            onChange={setJs}
          />
        </div>
        <div className="h-screen">
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </>
  );
}

export default code;
