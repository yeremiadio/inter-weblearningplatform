import React from "react";
// import LoadingSpinner from "../../assets/loading.svg";
import LoadingAnimation from "./LoadingAnimation";

export default function LoadingPageSpinner() {
  return (
    <div className="z-50 bg-white grid place-items-center h-screen">
      <LoadingAnimation className="w-24" />
    </div>
  );
}
