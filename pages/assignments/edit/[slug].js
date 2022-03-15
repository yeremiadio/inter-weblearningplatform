import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import CreateEditAssignmentComponent from "../../../components/Pages/Assignment/CreateEditAssigmentComponent";
import Admin from "../../../layouts/Admin";
import { fetcher } from "../../../utils/fetcher";

const edit = () => {
  const router = useRouter();
  const { data: assigment } = useSWR(
    [`api/quizzes/single/${router.query.slug}`],
    (url) => fetcher(url),
    {
      revalidateOnFocus: true,
    }
  );
  return (
    <>
      <CreateEditAssignmentComponent isEditable={true} data={assigment} />
    </>
  );
};
edit.layout = Admin;
export default edit;
