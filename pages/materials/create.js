import React from "react";
import Admin from "../../layouts/Admin";
import CreateEditMaterialComponent from "../../components/Pages/Material/CreateEditMaterialComponent";
export default function create() {
  return (
    <>
      <div className="bg-section">
        <h3 className="font-bold text-xl text-primary">Tambah Materi</h3>
        <CreateEditMaterialComponent />
      </div>
    </>
  );
}

create.layout = Admin;
