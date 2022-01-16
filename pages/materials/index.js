import { Button } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/solid";
import React from "react";
import useSWR from "swr";
import CustomCard from "../../components/Card/Card.js";
import EmptyDataComponent from "../../components/EmptyData.js";
import Admin from "../../layouts/Admin.js";
import { store } from "../../redux/store.js";
import { fetcher } from "../../utils/fetcher.js";
import instance from "../../utils/instance.js";

function materialsPage() {
  const {
    data: materials,
    mutate,
    error,
  } = useSWR([`api/materials`], (url) => fetcher(url), {
    revalidateOnFocus: false,
  });
  return (
    <>
      {!error && materials?.length === 0 ? (
        <EmptyDataComponent title="Materi" />
      ) : (
        <>
          <div className="flex items-center flex-col lg:flex-row">
            <Button
              colorScheme="blue"
              className="mt-2 ml-auto"
              leftIcon={<PlusIcon className="w-4 h-4" />}
            >
              Tambah
            </Button>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {materials?.map((item) => (
                <CustomCard
                  name={item.title}
                  description={item.description}
                  thumbnail={item.thumbnail}
                  slug={`materials/${item.slug}`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default materialsPage;

materialsPage.layout = Admin;
