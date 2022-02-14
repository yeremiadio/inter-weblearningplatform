import React from "react";
import BackButton from "../../components/Buttons/BackButton";
import Admin from "../../layouts/Admin";

function createMaterial() {
  return (
    <>
      <BackButton />
      <div className="bg-section">test</div>
    </>
  );
}

createMaterial.layout = Admin;

export default createMaterial;
