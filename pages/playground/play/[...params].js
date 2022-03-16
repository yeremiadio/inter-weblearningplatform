import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import BlueSpinner from "../../../components/Spinner/BlueSpinner";
import EmptyDataComponent from "../../../components/EmptyData";
import FrontendEditorDetailComponent from "../../../components/Pages/Playground/FrontendEditorDetailComponent";
import JsEditorDetailComponent from "../../../components/Pages/Playground/JsEditorDetailComponent";

const play = () => {
  const router = useRouter();
  const { params } = router.query;
  const { data, mutate, error } = useSWR(
    [`api/codes/single/${params && params[1]}`],
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
        href={"/playground"}
      />
    );
  }
  const renderPlaygroundTypeComponent = () => {
    switch (data?.type) {
      case "frontend":
        return (
          <FrontendEditorDetailComponent
            code={data}
            mutate={mutate}
            error={error}
          />
        );
      case "js":
        return (
          <JsEditorDetailComponent data={data} mutate={mutate} error={error} />
        );
      default:
        break;
    }
  };
  return <div>{renderPlaygroundTypeComponent()}</div>;
};

export default play;
