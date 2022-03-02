import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import CustomCard from "../../components/Card/Card.js";
import EmptyDataComponent from "../../components/EmptyData.js";
import Admin from "../../layouts/Admin.js";
import { fetcher } from "../../utils/fetcher.js";
import BlueSpinner from "../../components/Spinner/BlueSpinner";
import { getERrorSwr } from "../../utils/getErrorSwr.js";
import { useToast } from "@chakra-ui/toast";
import useErrorSwr from "../../utils/useErrorSwr.js";

function index() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const toast = useToast();
  const [search, setSearch] = useState("");
  const {
    data: materials,
    mutate,
    error,
  } = useSWR([`api/materials/latest`], (url) => fetcher(url), {
    revalidateOnFocus: false,
  });
  const { errorMessage, errorStatus } = useErrorSwr(error);

  return (
    <>
      {errorStatus ? (
        <span className="text-md font-bold">{errorMessage}</span>
      ) : !materials ? (
        <BlueSpinner />
      ) : materials?.data.length === 0 ? (
        <EmptyDataComponent href="materials/create" />
      ) : (
        <>
          <div className="flex justify-between items-center flex-col lg:flex-row mb-4">
            <div className="mb-4 lg:mb-0">
              <InputGroup className="bg-white">
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon className="text-gray-300 w-6 h-6" />}
                />
                <Input placeholder="Cari materimu..." />
              </InputGroup>
            </div>
            <Button
              colorScheme="blue"
              className="ml-auto"
              onClick={() => router.push("materials/create")}
              leftIcon={<PlusIcon className="w-4 h-4" />}
            >
              Tambah
            </Button>
          </div>
          <div>
            {!materials?.data ? (
              <div className="flex flex-col justify-center items-center">
                <BlueSpinner thickness="3.5px" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {materials?.data?.map((item) => (
                    <CustomCard
                      key={item.id}
                      name={item.title}
                      description={item.description}
                      thumbnail={item.thumbnail}
                      slug={`materials/${item.slug}`}
                    />
                  ))}
                </div>
                <div className="flex justify-center items-center my-8 gap-2"></div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default index;

index.layout = Admin;
