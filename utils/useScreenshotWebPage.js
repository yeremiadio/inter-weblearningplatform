import { useCallback, useState } from "react";

function useScreenshotWebPage(props) {
  const [codeNodeElement, setCodeNodeElement] = useState(null);
  const codeRef = useCallback(
    (node) => {
      if (node) {
        setCodeNodeElement(node);
      } else {
        return;
      }
    },
    [props]
  );
  return [codeNodeElement, codeRef];
}

export default useScreenshotWebPage;
