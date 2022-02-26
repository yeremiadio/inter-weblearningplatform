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

const playAssignment = () => {
  const router = useRouter();
  const { params } = router.query;
  const toast = useToast();
  const { data, mutate, error } = useSWR(
    [`api/quizzes/single/${params && params[1]}`],
    (url) => fetcher(url),
    {
      revalidateOnFocus: true,
    }
  );

  const isSameTypeAssignment = params ? params[0] === data?.type && true : "";
  if (!data && !error) {
    return <BlueSpinner />;
  } else if ((!data && error) || !isSameTypeAssignment) {
    return (
      <EmptyDataComponent
        title={error?.message}
        isAddable={false}
        href={"/assignments"}
      />
    );
  }

  const renderQuizTypeComponent = () => {
    switch (data?.type) {
      case "quiz":
        return (
          <DetailQuizComponent
            data={data}
            toast={toast}
            mutate={mutate}
            error={error}
          />
        );
      case "essay":
        return (
          <DetailEssayComponent data={data} mutate={mutate} error={error} />
        );
      default:
        break;
    }
  };

  return <div>{renderQuizTypeComponent()}</div>;
};

playAssignment.layout = Admin;

export default playAssignment;
