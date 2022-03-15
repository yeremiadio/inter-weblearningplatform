import React, { useEffect, useState } from "react";
import Editor from "../../CodePenEditor/Editor";
import CodeEditorNavbar from "../../Navbar/CodeEditorNavbar";
const FrontendEditorDetailComponent = ({ code }) => {
  const parsedCode = JSON.parse(code.code);
  const [html, setHtml] = useState(
    parsedCode ? parsedCode.html : "<h1>Hello World</h1>"
  );
  const [css, setCss] = useState(
    parsedCode ? parsedCode.css : "* { font-family: 'Arial'; }"
  );
  const [js, setJs] = useState(
    parsedCode ? parsedCode.js : "function testWorld() { alert('test') }"
  );
  const [srcDoc, setSrcDoc] = useState("");

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
    <div className="bg-gray-900">
      <CodeEditorNavbar
        getImage={getImage}
        image={image}
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
        <div className="h-screen bg-white" id="node-code" ref={codeRef}>
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
