import { toPng } from "html-to-image";
import React, { useEffect, useRef, useState } from "react";
import useScreenshotWebPage from "../../../utils/useScreenshotWebPage";
import Editor from "../../CodePenEditor/Editor";
import CodeEditorNavbar from "../../Navbar/CodeEditorNavbar";
import FrameOutputPreviewComponent from "./FrameOutputPreviewComponent";
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
    parsedCode ? parsedCode.js : `function testWorld() { alert('test') }
    
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
        isEdited={true}
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
            className="overflow-y-scroll max-h-96"
            value={html}
            onChange={setHtml}
          />
          <Editor
            language="css"
            displayName="CSS"
            className="overflow-y-scroll max-h-96"
            value={css}
            onChange={setCss}
          />
          <Editor
            language="javascript"
            displayName="JS"
            value={js}
            className="overflow-y-scroll max-h-96"
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
};

export default FrontendEditorDetailComponent;
