import axios from "axios";
import React from "react";
import Cookies from "js-cookie";

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

function material() {
  return <div>material</div>;
}

export default material;
