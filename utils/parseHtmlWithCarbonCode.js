import CarbonCodeEditor from "../components/CodeEditor/CarbonCodeEditor";
import parse, { domToReact } from "html-react-parser";

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
            <CarbonCodeEditor
              code={dataCode}
              className={"break-words"}
              options={{
                lint: true,
                mode: "javascript",
                theme: "seti",
                lineWrapping: true,
                extraKeys: { "Ctrl-Space": "autocomplete" },
                lineNumbers: true,
                autocorrect: true,
                spellcheck: true,
                smartIndent: true,
              }}
            />
          </div>
        );
      }
    },
  };

  return parse(text, options);
}
