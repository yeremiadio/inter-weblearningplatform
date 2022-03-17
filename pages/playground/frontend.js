import React, { useCallback, useEffect, useRef, useState } from "react";
import Editor from "../../components/CodePenEditor/Editor";
import CodeEditorNavbar from "../../components/Navbar/CodeEditorNavbar";
import useScreenshotWebPage from "../../utils/useScreenshotWebPage";
function index() {
  const [html, setHtml] = useState(
    `<h1>Hello World</h1><button onClick="testWorld()">test</button>`
  );
  const [css, setCss] = useState(
    "* { font-family: 'Arial'; font-weight: bold; }"
  );
  const [js, setJs] = useState("function testWorld() { alert('test') }");
  const [srcDoc, setSrcDoc] = useState("");

  const [codeNodeElement, codeRef] = useScreenshotWebPage(html, css, js);

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
    <div className="bg-gray-900" ref={codeRef}>
      <CodeEditorNavbar
        isEdited={false}
        codeNode={codeNodeElement}
        data={{
          type: "frontend",
          code: JSON.stringify({ html: html, css: css, js: js }),
        }}
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
            allow="accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"
            sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default index;
