import React from "react";
import Admin from "../../layouts/Admin.js";
// import Head from "next/head";

export default function materials() {
  return (
    <>
      <div className="bg-section">
        <h3 className="font-bold text-xl text-primary">Materi</h3>
        <p className="font-base tracking-wide text-secondary">
          Kelola materi pembelajaran anda disini.
        </p>
      </div>
    </>
  );
}

materials.layout = Admin;
