import React, { useState } from "react";
import Admin from "../../layouts/Admin";
import parser from "html-react-parser";
import TextEditor from "../../components/RichTextEditor/TextEditor";
export default function addMaterialPage() {
  const [content, setContent] = useState("");
  return (
    <>
      <div className="bg-section">
        <h3 className="font-bold text-xl text-primary">Tambah Materi</h3>
        <p className="font-base tracking-wide text-secondary">
          Tambah materi pembelajaran anda disini.
        </p>
        <TextEditor content={content} setContent={setContent} />
      </div>
      {parser(content)}
    </>
  );
}

addMaterialPage.layout = Admin;
