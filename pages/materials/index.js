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
import { useSelector } from "react-redux";

function index() {
  const router = useRouter();
  // const [page, setPage] = useState(1);
  // const toast = useToast();
  const [filterText, setFilterText] = useState("");
  const auth = useSelector((state) => state.auth.user);
  const {
    data: materials,
    mutate,
    error,
  } = useSWR([`api/materials/latest`], (url) => fetcher(url), {
    revalidateOnFocus: false,
  });
  const { errorMessage, errorStatus } = useErrorSwr(error);
  const filteredMaterials = materials?.data?.filter(
    (item) =>
      (item.title &&
        item.title.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.description &&
        item.description.toLowerCase().includes(filterText.toLowerCase()))
  );
  return (
    <>
      {errorStatus ? (
        <span className="text-md font-bold">{errorMessage}</span>
      ) : !materials ? (
        <BlueSpinner />
      ) : materials?.data?.length === 0 ? (
        <EmptyDataComponent
          href="materials/create"
          isAddable={auth.user.roles[0].name !== "student" && true}
        />
      ) : (
        <>
          <div className="flex justify-between items-center flex-col lg:flex-row mb-4">
            <div className="mb-4 lg:mb-0">
              <InputGroup className="bg-white">
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon className="text-gray-300 w-6 h-6" />}
                />
                <Input
                  placeholder="Cari judul materi..."
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </InputGroup>
            </div>
            {auth.user.roles[0].name !== "student" && (
              <Button
                colorScheme="blue"
                className="ml-auto"
                onClick={() => router.push("materials/create")}
                leftIcon={<PlusIcon className="w-4 h-4" />}
              >
                Tambah
              </Button>
            )}
          </div>
          <div>
            {!materials?.data ? (
              <div className="flex flex-col justify-center items-center">
                <BlueSpinner thickness="3.5px" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {filteredMaterials?.length === 0 ? (
                    <div>Data not found</div>
                  ) : (
                    filteredMaterials?.map((item) => (
                      <CustomCard
                        data={materials?.data}
                        mutate={mutate}
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        isEditable={true}
                        description={item.description}
                        thumbnail={item.thumbnail}
                        slug={{
                          pathname: `materials/[slug]`,
                          query: { slug: item.slug },
                        }}
                      />
                    ))
                  )}
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
