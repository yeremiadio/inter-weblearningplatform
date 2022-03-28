import React, { useRef } from "react";
import Admin from "../../layouts/Admin";
import useSWR from "swr";
import { useRouter } from "next/router";
import { fetcher } from "../../utils/fetcher";
import BlueSpinner from "../../components/Spinner/BlueSpinner";
import EmptyDataComponent from "../../components/EmptyData";
import { parseHtmlWithCarbonCode } from "../../utils/parseHtmlWithCarbonCode";
function material() {
  const router = useRouter();
  const { slug } = router.query;
  const { data: material, error } = useSWR(
    [`api/materials/single/${slug}`],
    (url) => fetcher(url),
    {
      revalidateOnFocus: false,
    }
  );
  const contentRef = useRef();

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
          <div className="bg-section my-4">
            <h1 className="text-4xl my-4 font-extrabold text-gray-900">
              {material?.title}
            </h1>
            <p className="mt-2 mb-4 text-gray-800">
              {material?.description}
            </p>
          </div>
          <div className="bg-section">
            <div className="mb-4 text-gray-800" id="content" ref={contentRef}>
              {parseHtmlWithCarbonCode(material.content)}
            </div>
          </div>
        </>
      )}
    </>
  );
}

material.layout = Admin;

export default material;
