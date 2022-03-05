import React from "react";
import parse from "html-react-parser";
import Admin from "../../layouts/Admin";
import useSWR from "swr";
import { useRouter } from "next/router";
import { fetcher } from "../../utils/fetcher";
import BlueSpinner from "../../components/Spinner/BlueSpinner";
import EmptyDataComponent from "../../components/EmptyData";
function material() {
  const router = useRouter();
  const { slug } = router.query;
  const {
    data: material,
    mutate,
    error,
  } = useSWR([`api/materials/single/${slug}`], (url) => fetcher(url), {
    revalidateOnFocus: true,
  });
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
              <div className="mb-4 text-secondary">
                {parse(material.content)}
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
