import React from "react";

export default function LoadingPageSpinner() {
  return (
    <div className="h-screen relative z-50 bg-white flex justify-center items-center mb-12">
      <img src="../loading.svg" className="w-24" alt="spinner" />
    </div>
  );
}
