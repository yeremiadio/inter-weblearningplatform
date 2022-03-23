import React from "react";
import { Controlled as ControlledEditor } from "react-codemirror2";

const CarbonCodeEditor = ({ code, setCode, ...rest }) => {
  let CodeMirror = null;
  if (
    typeof window !== "undefined" &&
    typeof window.navigator !== "undefined"
  ) {
    CodeMirror = require("codemirror/lib/codemirror");
    require("codemirror/theme/seti.css");
    require("codemirror/mode/xml/xml");
    require("codemirror/mode/javascript/javascript");
    require("codemirror/mode/css/css");
  }

  function handleChange(editor, data, value) {
    setCode(value);
  }
  return (
    <div
      className="bg-[#0E1112] rounded-lg overflow-hidden"
      style={{ minHeight: "400px" }}
    >
      <img src="/macos-buttons.svg" className="w-10 h-10 ml-4" alt="" />
      <ControlledEditor
        onBeforeChange={handleChange}
        value={code}
        className={"break-words"}
        {...rest}
      />
    </div>
  );
};

export default CarbonCodeEditor;
