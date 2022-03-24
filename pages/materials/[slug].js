import React, { useRef, useEffect, useState } from "react";
import parse, { domToReact } from "html-react-parser";
import Admin from "../../layouts/Admin";
import useSWR from "swr";
import { useRouter } from "next/router";
import { fetcher } from "../../utils/fetcher";
import BlueSpinner from "../../components/Spinner/BlueSpinner";
import EmptyDataComponent from "../../components/EmptyData";
import CarbonCodeEditor from "../../components/CodeEditor/CarbonCodeEditor";
function material() {
  const router = useRouter();
  const { slug } = router.query;
  const {
    data: material,
    error,
  } = useSWR([`api/materials/single/${slug}`], (url) => fetcher(url), {
    revalidateOnFocus: false,
  });
  const contentRef = useRef();
  function replaceCommaLine(data) {
    //convert string to array and remove whitespace
    let dataToArray = data.split(";").map((item) => item.trim());
    //convert array to string replacing comma with new line
    return dataToArray.join(";\n");
  }
  function parseWithCarbonCode(text) {
    const options = {
      replace: ({ name, attribs, children }) => {
        if (name === "pre") {
          const arr = [];
          for (var i = 0; i < children.length; i++) {
            if (children[i].data !== undefined) {
              arr.push(children[i].data);
            }
          }
          const text = arr.join(" ");
          const dataCode = replaceCommaLine(text);
          return (
            <div className="mt-4">
              <CarbonCodeEditor
                code={dataCode}
                className={"break-words"}
                options={{
                  lint: true,
                  mode: "javascript",
                  theme: "seti",
                  lineWrapping: true,
                  extraKeys: { "Ctrl-Space": "autocomplete" },
                  lineNumbers: true,
                  autocorrect: true,
                  spellcheck: true,
                  smartIndent: true,
                }}
              />
            </div>
          );
        }
      },
    };

    return parse(text, options);
  }

  return (
    <>
      {!material && !error ? (
        <BlueSpinner />
      ) : error ? (
        <EmptyDataComponent
          href="/materials"
          isAddable={false}
          title={error?.message}
        />
      ) : (
        <>
          <img
            src={material?.thumbnail || "../../imgPlaceholder.jpg"}
            alt=""
            className="w-full lg:h-96 object-cover rounded-lg mb-4"
          />
          <div className="bg-section">
            <h3 className="text-3xl my-4 font-extrabold text-primary">
              {material?.title}
            </h3>
            <div>
              <span className="my-4 text-lg lg:text-xl font-bold text-primary">
                Description
              </span>
              <p className="mb-4 text-secondary">{material?.description}</p>
            </div>
            <div>
              <span className="my-4 text-lg lg:text-xl font-bold text-primary">
                Content
              </span>
              <div
                className="mb-4 text-secondary"
                id="content"
                ref={contentRef}
              >
                {parseWithCarbonCode(material.content)}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

material.layout = Admin;

export default material;
