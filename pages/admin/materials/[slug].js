import React from "react";
import instance from "../../../utils/instance";

export default function DetailMaterial({ page }) {
  return <div>Ini detail Materi {page.id}</div>;
}

export async function getStaticPaths() {
  const res = await instance().get(`api/pages`);
  const data = await res.data.data;

  const paths = data.map((item) => {
    return {
      params: { slug: item.slug.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  const res = await instance().get(`api/pages/${slug}/content`);
  const page = await res.data;

  return { props: { page } };
}
