import React, { useEffect, useState } from "react";
import useScreenshotWebPage from "../../../utils/useScreenshotWebPage";
import MonacoCodeEditor from "../../CodeEditor/MonacoCodeEditor";
import CodeEditorNavbar from "../../Navbar/CodeEditorNavbar";
import { Tab } from "@headlessui/react";
import classNames from "../../../utils/tailwindClassNames";

const FrontendEditorDetailComponent = ({ code }) => {
  const parsedCode = JSON.parse(code.code);
  const [html, setHtml] = useState(
    parsedCode
      ? parsedCode.html
      : `<h1>Hello World</h1><button onClick="testWorld()">test</button>
      
      
      `
  );
  const [css, setCss] = useState(
    parsedCode
      ? parsedCode.css
      : `* { font-family: 'Arial'; font-weight: bold; }
      
      `
  );
  const [js, setJs] = useState(
    parsedCode
      ? parsedCode.js
      : `function testWorld() { alert('test') }
    
    `
  );
  const [srcDoc, setSrcDoc] = useState("");
  const [codeNodeElement, codeRef] = useScreenshotWebPage(html, css, js);
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
    <div className="bg-gray-900" ref={codeRef}>
      <CodeEditorNavbar
        codeNode={codeNodeElement}
        codeTitle={code.title}
        isEdited={true}
        data={{
          type: "frontend",
          code: JSON.stringify({ html: html, css: css, js: js }),
          userId: code.user_id,
        }}
      />
      <div className="min-h-screen h-1/2 mt-24">
        <div className="bg-gray-700">
          <Tab.Group>
            <Tab.List className={"flex overflow-y-auto"}>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "p-4 font-medium",
                    "text-gray-400",
                    selected && "border-blue-500 border-b-2"
                  )
                }
              >
                HTML
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "p-4 font-medium",
                    "text-gray-400",
                    selected && "border-blue-500 border-b-2"
                  )
                }
              >
                CSS
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "p-4 font-medium",
                    "text-gray-400",
                    selected && "border-blue-500 border-b-2"
                  )
                }
              >
                Javascript
              </Tab>
            </Tab.List>
            <Tab.Panels className={"mb-2"}>
              <Tab.Panel>
                <MonacoCodeEditor
                  height="50vh"
                  language="html"
                  value={html}
                  setValue={setHtml}
                />
              </Tab.Panel>
              <Tab.Panel>
                <MonacoCodeEditor
                  height="50vh"
                  language="css"
                  value={css}
                  setValue={setCss}
                />
              </Tab.Panel>
              <Tab.Panel>
                <MonacoCodeEditor
                  height="50vh"
                  language="javascript"
                  value={js}
                  setValue={setJs}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
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
};

export default FrontendEditorDetailComponent;
