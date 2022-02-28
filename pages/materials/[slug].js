import axios from "axios";
import React from "react";
import parse from "html-react-parser";
import Admin from "../../layouts/Admin";

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await axios.get(process.env.baseUrl + "/api/materials");
  const materials = await res.data.data;

  // Get the paths we want to pre-render based on posts
  const paths = materials.map((item) => ({
    params: { slug: item.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps(ctx) {
  const { params } = ctx;
  // Pass data to the page via props
  const res = await axios.get(
    process.env.baseUrl + `/api/materials/single/${params.slug}`
  );
  const material = await res.data.data;
  return { props: { material } };
}

function material({ material }) {
  return (
    <>
      <img
        src={
          material[0].thumbnail ? material[0].thumbnail : "/imgPlaceholder.jpg"
        }
        alt=""
        className="w-full lg:h-96 object-cover rounded-lg mb-4"
      />
      <div className="bg-section">
        <h3 className="text-3xl my-4 font-extrabold text-primary">
          {material[0].title}
        </h3>
        <div>
          <span className="my-4 text-lg lg:text-xl font-bold text-primary">
            Description
          </span>
          <p className="mb-4 text-secondary">{material[0].description}</p>
        </div>
        <div>
          <span className="my-4 text-lg lg:text-xl font-bold text-primary">
            Content
          </span>
          <div className="mb-4 text-secondary">
            {parse(material[0].content)}
          </div>
        </div>
      </div>
    </>
  );
}

material.layout = Admin;

export default material;
