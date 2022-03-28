import React, { useEffect, useState } from "react";
import MonacoCodeEditor from "../../components/CodeEditor/MonacoCodeEditor";
import classNames from "../../utils/tailwindClassNames";
import CodeEditorNavbar from "../../components/Navbar/CodeEditorNavbar";
import { Tab } from "@headlessui/react";
import useScreenshotWebPage from "../../utils/useScreenshotWebPage";

function index() {
  const [html, setHtml] = useState(
    `<h1>Hello World</h1><button onClick="testWorld()">test</button>
    
    `
  );
  const [css, setCss] = useState(
    `* { font-family: 'Arial'; font-weight: bold; }
   
   `
  );
  const [js, setJs] = useState(`function testWorld() { alert('test') }
  
  `);
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
}

export default index;
