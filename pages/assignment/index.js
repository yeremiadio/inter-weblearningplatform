import React from "react";
import Admin from "../../layouts/Admin.js";
// import Head from "next/head";

export default function assignment() {
  return (
    <>
      <div className="bg-section">
        <h3 className="font-bold text-xl text-primary">Tugas</h3>
        <p className="font-base tracking-wide text-secondary">
          Kelola tugasmu disini
        </p>
      </div>
    </>
  );
}

assignment.layout = Admin;
