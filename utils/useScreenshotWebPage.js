import { useCallback, useState } from "react";

function useScreenshotWebPage(html = "", css = "", js = "") {
  const [codeNodeElement, setCodeNodeElement] = useState(null);
  const codeRef = useCallback(
    (node) => {
      if (node) {
        setCodeNodeElement(node);
      } else {
        return;
      }
    },
    [html, css, js]
  );
  return [codeNodeElement, codeRef];
}

export default useScreenshotWebPage;
