import React, { useEffect } from "react";
import "grapesjs/dist/css/grapes.min.css";
import { useRouter } from "next/dist/client/router";
import geditorConfig from "../../utils/grapesjs/geditor_config";
import { useDispatch, useSelector } from "react-redux";

import { RESET_ERRORS, RESET_USER } from "../../constants/types";
import { useToast } from "@chakra-ui/toast";

export default function webPageBuilder() {
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
  const router = useRouter();
  const toast = useToast();
  useEffect(() => {
    if (
      auth.isAuthenticated === false ||
      auth.data.token === undefined ||
      auth.data.token === ""
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
      geditorConfig(assets);
    }
  }, [assets]);
  return (
    <>
      <div id="editor" />
    </>
  );
}
