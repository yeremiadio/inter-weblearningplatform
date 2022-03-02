import React, { useEffect, useState } from "react";
import "grapesjs/dist/css/grapes.min.css";
import geditorConfig from "../../../utils/grapesjs/geditor_config";
import { useDispatch, useSelector } from "react-redux";
import { RESET_ERRORS, RESET_USER } from "../../../constants/types";
import { useToast } from "@chakra-ui/toast";
import NavbarDefaultAdmin from "../../../components/Navbar/NavbarDefaultAdmin";
import axios from "axios";

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await axios.get(process.env.baseUrl + "/api/codes");
  const codes = await res.data.data;

  // Get the paths we want to pre-render based on posts
  const paths = codes.map((item) => ({
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
    process.env.baseUrl + `/api/code/single/${params.slug}`
  );
  const data = await res.data.data;
  return { props: { data } };
}

export default function webpage({ data }) {
  const assets = [
    {
      type: "image",
      src: "http://placehold.it/350x250/459ba8/fff/image2.jpg",
      height: 350,
      width: 250,
    },
    {
      src: "http://placehold.it/350x250/79c267/fff/image3.jpg",
      height: 350,
      width: 250,
    },
    {
      src: "http://placehold.it/350x250/79c267/fff/image3.jpg",
      height: 350,
      width: 250,
    },
  ];
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();
  useEffect(() => {
    if (
      auth.isAuthenticated === false ||
      auth.user.token === undefined ||
      auth.user.token === ""
    ) {
      dispatch({
        type: RESET_USER,
      });
      dispatch({
        type: RESET_ERRORS,
      });
      router.replace("/login");
      toast({
        title: "Error",
        description: "Not Authenticated",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      geditorConfig(data.slug, assets);
    }
  }, [assets]);
  return (
    <>
      <NavbarDefaultAdmin />
      <div id="editor" className='mt-16' />
    </>
  );
}
