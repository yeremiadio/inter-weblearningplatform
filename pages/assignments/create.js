import React from "react";
import BackButton from "../../components/Buttons/BackButton";
import Admin from "../../layouts/Admin";

function createMaterial() {
  window.onbeforeunload = function () {
    return "Are you sure you want to leave?";
  };
  return (
    <>
      <BackButton />
      <div className="bg-section">test</div>
    </>
  );
}

createMaterial.layout = Admin;

export default createMaterial;
