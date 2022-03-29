import React, { useRef } from "react";
import dynamic from "next/dynamic";
const MonacoEditor = dynamic(import("@monaco-editor/react"), {
  ssr: false,
});
const MonacoCodeEditor = ({
  theme = "",
  language = "",
  setValue,
  readOnly = false,
  value,
  ...rest
}) => {
  const handleChange = (val, ev) => {
    setValue(val);
  };
  return (
    <MonacoEditor
      theme={theme ? theme : "vs-dark"}
      options={{
        acceptSuggestionOnCommitCharacter: true,
        acceptSuggestionOnEnter: "on",
        accessibilitySupport: "auto",
        autoIndent: true,
        automaticLayout: true,
        codeLens: true,
        colorDecorators: true,
        contextmenu: true,
        cursorBlinking: "blink",
        cursorSmoothCaretAnimation: false,
        cursorStyle: "line",
        disableLayerHinting: false,
        disableMonospaceOptimizations: false,
        dragAndDrop: false,
        fixedOverflowWidgets: true,
        folding: true,
        foldingStrategy: "auto",
        fontLigatures: false,
        formatOnPaste: true,
        formatOnType: true,
        hideCursorInOverviewRuler: false,
        highlightActiveIndentGuide: true,
        links: true,
        lineNumbers: "on",
        mouseWheelZoom: false,
        multiCursorMergeOverlapping: true,
        multiCursorModifier: "alt",
        overviewRulerBorder: true,
        overviewRulerLanes: 2,
        quickSuggestions: true,
        quickSuggestionsDelay: 100,
        readOnly: readOnly,
        renderControlCharacters: false,
        renderFinalNewline: true,
        renderIndentGuides: true,
        renderLineHighlight: "all",
        renderWhitespace: "none",
        revealHorizontalRightPadding: 30,
        roundedSelection: true,
        rulers: [],
        scrollBeyondLastColumn: 5,
        scrollBeyondLastLine: true,
        selectOnLineNumbers: true,
        selectionClipboard: true,
        selectionHighlight: true,
        showFoldingControls: "mouseover",
        smoothScrolling: true,
        suggestOnTriggerCharacters: true,
      }}
      onChange={handleChange}
      defaultLanguage={language}
      defaultValue={value}
      {...rest}
    />
  );
};

export default MonacoCodeEditor;
