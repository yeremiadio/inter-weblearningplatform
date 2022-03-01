import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RESET_ERRORS, RESET_USER } from "../../../constants/types";
import Editor from "../../../components/CodePenEditor/Editor";
import { useToast } from "@chakra-ui/toast";
import CodeEditorNavbar from "../../../components/Navbar/CodeEditorNavbar";

function frontendEditorPage() {
  const dispatch = useDispatch();
  const toast = useToast();
  const auth = useSelector((state) => state.auth);
  const [html, setHtml] = useState("<h1>Hello World</h1>");
  const [css, setCss] = useState("* { font-family: 'Arial'; }");
  const [js, setJs] = useState("function testWorld() { alert('test') }");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const ac = new AbortController();
    if (
      auth.isAuthenticated === false ||
      auth.user.token === undefined ||
      auth.user.token === ""
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
      <head>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>
          ${js}
        </script>
      </body>
    </html>
    
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div className="bg-gray-900">
      <CodeEditorNavbar
        isEdited={false}
        data={{
          type: "frontend",
          code: JSON.stringify({ html: html, css: css, js: js }),
        }}
        auth={auth.user.user}
      />
      <div className="mt-20 min-h-screen h-1/2">
        <div className="flex flex-col lg:flex-row border-t border-gray-700 py-4">
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
        <div className="h-screen bg-white">
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
    </div>
  );
}

export default frontendEditorPage;
