import { Button } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import CustomCard from "../../components/Card/Card.js";
import EmptyDataComponent from "../../components/EmptyData.js";
import Admin from "../../layouts/Admin.js";
import { store } from "../../redux/store.js";
import { fetcher } from "../../utils/fetcher.js";
import instance from "../../utils/instance.js";
import BlueSpinner from "../../components/Spinner/BlueSpinner";
import { motion } from "framer-motion";

function materialsPage() {
  const router = useRouter();
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
        <EmptyDataComponent href="materials/create" title="Materi" />
      ) : !materials ? (
        <div className="flex flex-col justify-center items-center">
          <BlueSpinner thickness="3.5px" />
        </div>
      ) : (
        <>
          <div className="flex items-center flex-col lg:flex-row mb-4">
            <Button
              colorScheme="blue"
              className="ml-auto"
              onClick={() => router.push("materials/create")}
              leftIcon={<PlusIcon className="w-4 h-4" />}
            >
              Tambah
            </Button>
          </div>
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              initial: {
                opacity: 0,
              },
              animate: {
                opacity: 1,
              },
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {materials?.map((item) => (
                <CustomCard
                  key={item.id}
                  name={item.title}
                  description={item.description}
                  thumbnail={item.thumbnail}
                  slug={`materials/${item.slug}`}
                />
              ))}
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}

export default materialsPage;

materialsPage.layout = Admin;
