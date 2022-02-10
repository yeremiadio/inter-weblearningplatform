import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { store } from "../../../redux/store";
import { fetcher } from "../../../utils/fetcher";
import instance from "../../../utils/instance";

function slugFrontend() {
  // const router = useRouter();

  // if (!router.query) {
  //   router.replace("/playground");
  // }
  // const { data, mutate, error } = useSWR(
  //   { url: `api/code/${router.query.slug}` },
  //   (url) => fetcher(url),
  //   {
  //     revalidateOnFocus: false,
  //     revalidateOnMount: true,
  //   }
  // );
  // const [titleCode, setTitleCode] = useState("");
  // useEffect(() => {
  //   if (data) {
  //     setTitleCode(data.title);
  //     console.log(`title: ${data.title}`);
  //   }
  // }, [data]);

  return <div>test</div>;
}

export default slugFrontend;
