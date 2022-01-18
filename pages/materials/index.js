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
import React, { useState } from "react";
import useSWR from "swr";
import CustomCard from "../../components/Card/Card.js";
import EmptyDataComponent from "../../components/EmptyData.js";
import Admin from "../../layouts/Admin.js";
import { fetcher } from "../../utils/fetcher.js";
import BlueSpinner from "../../components/Spinner/BlueSpinner";
import { paginate } from "../../utils/paginateData.js";

function materialsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const {
    data: data,
    mutate,
    error,
  } = useSWR([`api/materials`], (url) => fetcher(url), {
    revalidateOnFocus: false,
  });
  const materials = paginate(data, page, 6, search);
  console.log(materials);

  const onSearch = (event) => {
    let keyword = event.target.value;
    setSearch(keyword);
  };

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
          <div className="flex justify-between items-center flex-col lg:flex-row mb-4">
            <div className="mb-4 lg:mb-0">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon className="text-gray-300 w-6 h-6" />}
                />
                <Input
                  placeholder="Cari materimu..."
                  onChange={(e) => onSearch(e)}
                />
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {!error ? (
                materials?.data?.map((item) => (
                  <CustomCard
                    key={item.id}
                    name={item.title}
                    description={item.description}
                    thumbnail={item.thumbnail}
                    slug={`materials/${item.slug}`}
                  />
                ))
              ) : (
                <BlueSpinner />
              )}
            </div>
            <div className="flex justify-center items-center my-8 gap-2">
              <IconButton
                icon={<ChevronLeftIcon className="w-6 h-6" />}
                disabled={page <= 1 && true}
                onClick={() => setPage((prev) => prev - 1)}
              />
              <IconButton
                icon={<ChevronRightIcon className="w-6 h-6" />}
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page === materials?.total_pages && true}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default materialsPage;

materialsPage.layout = Admin;
