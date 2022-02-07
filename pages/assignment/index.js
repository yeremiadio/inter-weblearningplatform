import React from "react";
import Admin from "../../layouts/Admin.js";
// import Head from "next/head";

export default function assignment() {
  const divAssignmentOption =
    "transition-all delay-75 hover:-translate-y-1 rounded-md p-4 flex flex-col justify-center items-center border bg-white shadow-default-weblearning border-gray-200 w-full cursor-pointer lg:w-1/4 h-64";
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-center mt-16 lg:mt-36">
        <div className={divAssignmentOption}>
          <h3 className="text-primary text-2xl font-bold">Interactive Quiz</h3>
        </div>
        <div className={divAssignmentOption}>
          <h3 className="text-primary text-2xl font-bold">Essay</h3>
        </div>
      </div>
    </>
  );
}

assignment.layout = Admin;
