import React, { useState } from "react";
import { Controlled as ControlledEditor } from "react-codemirror2";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";

export default function CodeEditor(props) {
  let CodeMirror = null;
  if (
    typeof window !== "undefined" &&
    typeof window.navigator !== "undefined"
  ) {
    CodeMirror = require("codemirror/lib/codemirror");
    require("codemirror/theme/material.css");
    require("codemirror/mode/xml/xml");
    require("codemirror/mode/javascript/javascript");
    require("codemirror/mode/css/css");
  }
  const { language, displayName, value, onChange } = props;
  const [open, setOpen] = useState(true);

  function handleChange(editor, data, value) {
    onChange(value);
  }

  return (
    <div className="w-full flex flex-col p-2 truncate">
      <div
        className="flex justify-between bg-gray-900 p-2 rounded-b-lg text-white"
        onClick={() => setOpen((prevOpen) => !prevOpen)}
      >
        {displayName}
        <button
          type="button"
          className="ml-2 bg-none border-none text-white cursor-pointer"
        >
          {open ? (
            <ChevronDownIcon className="w-5 h-5" />
          ) : (
            <ChevronUpIcon className="w-5 h-5" />
          )}
        </button>
      </div>
      <div
        className={
          open
            ? "w-full flex flex-col p-2 truncate"
            : "w-full flex flex-col p-2 truncate h-0"
        }
      >
        {CodeMirror && (
          <ControlledEditor
            onBeforeChange={handleChange}
            value={value}
            className={"break-words"}
            options={{
              lint: true,
              mode: language,
              theme: "material",
              lineWrapping: true,
              extraKeys: { "Ctrl-Space": "autocomplete" },
              lineNumbers: true,
            }}
          />
        )}
      </div>
    </div>
  );
}
