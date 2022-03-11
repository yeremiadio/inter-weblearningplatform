import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import CreateEditMaterialComponent from "../../../components/Pages/Material/CreateEditMaterialComponent";
import Admin from "../../../layouts/Admin";
import { fetcher } from "../../../utils/fetcher";
const edit = () => {
  const router = useRouter();
  const { data: material } = useSWR(
    [`api/materials/single/${router.query.slug}`],
    (url) => fetcher(url),
    {
      revalidateOnFocus: true,
    }
  );
  return (
    <>
      <div className="bg-section">
        <h3 className="font-bold text-xl text-primary">Edit Materi</h3>
        <CreateEditMaterialComponent isEditable={true} data={material} />
      </div>
    </>
  );
};

edit.layout = Admin;

export default edit;
