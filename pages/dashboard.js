import React from "react";
import Admin from "../layouts/Admin.js";
import Head from "next/head";

export default function dashboard() {
  return (
    <>
      {/* <Head>
        <title>Dashboard - BUMDes Laut Sakti Daratan Bertuah</title>
      </Head> */}
      <div className="bg-section">
        <h3 className="font-bold text-xl text-primary">Dashboard</h3>
        <p className="font-base tracking-wide text-secondary">
          Lihat Progressmu disini.
        </p>
      </div>
    </>
  );
}

dashboard.layout = Admin;
