import axios from "axios";
import React from "react";
import Image from "next/image";
import { useFormik } from "formik";

const PostsPage = ({ posts }) => {
  const addPost = useFormik({
    initialValues: {
      title: "",
      description: "",
      files: "",
    },
    onSubmit: (values) => {
      axios
        .post(`${process.env.API_URL}/posts`, values)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
  });
  return (
    <div className="container mx-auto bg-blue-300">
      <section className="m-4 border border-black">
        {posts.map((post) => (
          <div className="rounded p-4 hover:shadow" key={post.id}>
            <h5 className="font-bold">{post.title}</h5>
            <p>{post.description}</p>
            <Image
              src={post.files[0] ? post.files[0]?.url : "/imgPlaceholder.jpg"}
              alt=""
              placeholder="blur"
              width={300}
              height={300}
              blurDataURL={
                post.files[0]
                  ? post.files[0]?.formats.thumbnail.url
                  : "/imgPlaceholder.jpg"
              }
            />
          </div>
        ))}
      </section>
      <section className="m-4">
        <form onSubmit={addPost.handleSubmit}>
          <label htmlFor="title">Deskripsi</label>
          <input
            className="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            type="text"
            name="title"
            value={addPost.values.title}
            onChange={addPost.handleChange}
            placeholder="Masukkan Judul"
          />
          <label htmlFor="description">Title</label>
          <input
            className="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            type="text"
            name="description"
            onChange={addPost.handleChange}
            value={addPost.values.description}
            placeholder="Masukkan Deskripsi"
          />
          <button
            type="submit"
            className="h-12 px-6 my-2 text-lg text-indigo-100 transition-colors duration-150 bg-red-500 rounded-lg focus:shadow-outline hover:bg-red-800"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.API_URL}/posts`);
  const posts = res.data;
  console.log(posts);

  if (!posts) {
    return {
      notFound: true,
    };
  }
  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default PostsPage;
