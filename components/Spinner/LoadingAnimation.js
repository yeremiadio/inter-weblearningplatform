import * as React from "react";

const LoadingAnimation = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{
      margin: "auto",
      background: "0 0",
      display: "block",
      shapeRendering: "auto",
    }}
    width={202}
    height={202}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <circle cx={84} cy={50} r={10} fill="#004d73">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="0.8333333333333334s"
        calcMode="spline"
        keyTimes="0;1"
        values="9;0"
        keySplines="0 0.5 0.5 1"
        begin="0s"
      />
      <animate
        attributeName="fill"
        repeatCount="indefinite"
        dur="3.3333333333333335s"
        calcMode="discrete"
        keyTimes="0;0.25;0.5;0.75;1"
        values="#004d73;#dbebfa;#007fdb;#00334e;#004d73"
        begin="0s"
      />
    </circle>
    <circle cx={16} cy={50} r={10} fill="#004d73">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="3.3333333333333335s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="0;0;9;9;9"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="0s"
      />
      <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="3.3333333333333335s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="16;16;16;50;84"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="0s"
      />
    </circle>
    <circle cx={50} cy={50} r={10} fill="#00334e">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="3.3333333333333335s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="0;0;9;9;9"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.8333333333333334s"
      />
      <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="3.3333333333333335s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="16;16;16;50;84"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.8333333333333334s"
      />
    </circle>
    <circle cx={84} cy={50} r={10} fill="#007fdb">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="3.3333333333333335s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="0;0;9;9;9"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-1.6666666666666667s"
      />
      <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="3.3333333333333335s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="16;16;16;50;84"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-1.6666666666666667s"
      />
    </circle>
    <circle cx={16} cy={50} r={10} fill="#dbebfa">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="3.3333333333333335s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="0;0;9;9;9"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-2.5s"
      />
      <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="3.3333333333333335s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="16;16;16;50;84"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-2.5s"
      />
    </circle>
  </svg>
);

export default LoadingAnimation;
