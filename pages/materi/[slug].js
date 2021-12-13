import instance from "../utils/instance";

export default function DetailMateri({ page }) {
  return <>{page.name}</>;
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await instance().get("api/pages");
  const pages = await res.data.data;

  // Get the paths we want to pre-render based on posts
  const paths = pages.map((page) => ({
    params: { slug: page.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  try {
    const res = await instance().get(`api/pages/${params.slug}`);
    const page = await res.data.data;
    return { props: { page } };
  } catch (err) {
    console.log(err);
    window.close();
  }
}
