import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import EmptyDataComponent from "../../../components/EmptyData";
import DetailEssayComponent from "../../../components/Pages/Assignment/DetailEssayComponent";
import DetailQuizComponent from "../../../components/Pages/Assignment/DetailQuizComponent";
// import LoadingPageSpinner from "../../../components/Spinner/LoadingPageSpinner";
import Admin from "../../../layouts/Admin";
import BlueSpinner from "../../../components/Spinner/BlueSpinner";
import { fetcher } from "../../../utils/fetcher";
import { useToast } from "@chakra-ui/toast";
import ResultComponent from "../../../components/Pages/Assignment/Result/ResultComponent";

const singleIdResult = () => {
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();
  const { data, mutate, error } = useSWR(
    [`api/result/single/${id}`],
    (url) => fetcher(url),
    {
      revalidateOnFocus: true,
    }
  );

  console.log(data);

  if (!data && !error) {
    return <BlueSpinner />;
  } else if (!data && error) {
    return (
      <EmptyDataComponent
        title={error?.message}
        isAddable={false}
        href={"/assignments"}
      />
    );
  }

  return (
    <>
      <img
        src={data.quiz.thumbnail ? data.quiz.thumbnail : "/imgPlaceholder.jpg"}
        alt=""
        className="w-full lg:h-96 object-cover rounded-lg mb-4"
      />
      <div className="bg-section">
        <ResultComponent result={data} />
      </div>
    </>
  );
};

singleIdResult.layout = Admin;

export default singleIdResult;
