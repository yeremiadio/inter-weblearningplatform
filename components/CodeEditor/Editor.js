import React, { useState } from "react";
import { Controlled as ControlledEditor } from "react-codemirror2";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";

export default function Editor(props) {
  let CodeMirror = null;
  if (
    typeof window !== "undefined" &&
    typeof window.navigator !== "undefined"
  ) {
    CodeMirror = require("codemirror/lib/codemirror");
    require("codemirror/theme/material-ocean.css");
    require("codemirror/mode/xml/xml");
    require("codemirror/mode/javascript/javascript");
    require("codemirror/mode/css/css");
  }
  const { language, displayName, value, onChange, ...rest } = props;
  const [open, setOpen] = useState(true);

  function handleChange(editor, data, value) {
    onChange(value);
  }

  return (
    <div
      className={
        open
          ? "w-full flex flex-col truncate"
          : "w-full flex flex-col truncate h-0"
      }
    >
      {CodeMirror && (
        <ControlledEditor
          onBeforeChange={handleChange}
          value={value}
          {...rest}
          className={"break-words"}
          options={{
            lint: true,
            mode: language,
            theme: "material-ocean",
            lineWrapping: true,
            extraKeys: { "Ctrl-Space": "autocomplete" },
            lineNumbers: true,
            autocorrect: true,
            spellcheck: true,
            smartIndent: true,
          }}
        />
      )}
    </div>
  );
}
