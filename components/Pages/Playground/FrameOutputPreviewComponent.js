import React, { forwardRef } from "react";

const FrameOutputPreviewComponent = forwardRef(
  ({ code, children, ...rest }, ref) => {
    if (code.type === "frontend") {
      return (
        <iframe ref={ref} {...rest}>
          {children}
        </iframe>
      );
    } else if (code.type === "js") {
      return (
        <div ref={ref} {...rest}>
          {children}
        </div>
      );
    }
  }
);
export default FrameOutputPreviewComponent;
