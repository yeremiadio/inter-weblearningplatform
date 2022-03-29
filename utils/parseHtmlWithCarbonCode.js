import parse, { domToReact } from "html-react-parser";
import { UnControlled as UnControlledEditor } from "react-codemirror2";

import React from "react";

const CodeEditor = (props) => {
  const { value, rest } = props;
  let CodeMirror = null;
  if (
    typeof window !== "undefined" &&
    typeof window.navigator !== "undefined"
  ) {
    CodeMirror = require("codemirror/lib/codemirror");
    require("codemirror/theme/dracula.css");
    require("codemirror/mode/jsx/jsx");
  }
  return (
    <div className="bg-[#282A36] p-3 overflow-hidden rounded-md">
      <UnControlledEditor
        value={value}
        {...rest}
        options={{
          readOnly: true,
          mode: "jsx",
          theme: "dracula",
          // lineWrapping: true,
        }}
        onChange={(editor, data, value) => {
          return;
        }}
      />
    </div>
  );
};

export default CodeEditor;

export function parseHtmlWithCarbonCode(text) {
  function replaceCommaLine(data) {
    //convert string to array and remove whitespace
    let dataToArray = data.split(";").map((item) => item.trim());
    //convert array to string replacing comma with new line
    return dataToArray.join(";\n");
  }
  const options = {
    replace: ({ name, attribs, children }) => {
      if (name === "ol") {
        return (
          <ol type="1" style={{ listStyleType: "decimal", paddingLeft: 24 }}>
            {domToReact(children, options)}
          </ol>
        );
      }
      if (name === "ul") {
        return (
          <ul style={{ listStyleType: "circle", paddingLeft: 24 }}>
            {domToReact(children, options)}
          </ul>
        );
      }
      if (name === "pre") {
        const arr = [];
        for (var i = 0; i < children.length; i++) {
          if (children[i].data !== undefined) {
            arr.push(children[i].data);
          }
        }
        const text = arr.join(" ");
        const dataCode = replaceCommaLine(text);
        return (
          <div className="mt-4">
            <CodeEditor value={dataCode} />
          </div>
        );
      }
    },
  };

  return parse(text, options);
}
