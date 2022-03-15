import React from "react";
import Admin from "../../layouts/Admin";
import CreateEditAssigmentComponent from "../../components/Pages/Assignment/CreateEditAssigmentComponent";
function create() {
  return (
    <>
      <CreateEditAssigmentComponent isEditable={false} />
    </>
  );
}

create.layout = Admin;

export default create;
