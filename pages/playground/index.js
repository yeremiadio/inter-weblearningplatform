import React from "react";
import Admin from "../../layouts/Admin.js";
// import Head from "next/head";

export default function playground() {
  return (
    <>
      <div className="bg-section">
        <h3 className="font-bold text-xl text-primary">Playground</h3>
        <p className="font-base tracking-wide text-secondary">
          Belajar coding langsung disini.
        </p>
      </div>
    </>
  );
}

playground.layout = Admin;
