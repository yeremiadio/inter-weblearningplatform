import { Tab } from "@headlessui/react";
import React from "react";
import Admin from "../../layouts/Admin.js";
import classNames from "../../utils/tailwindClassNames";
import BlueSpinner from "../../components/Spinner/BlueSpinner";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher.js";
import CustomCard from "../../components/Card/Card.js";
import EmptyDataComponent from "../../components/EmptyData.js";
import { Button } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
// import Head from "next/head";

export default function assignments() {
  const {
    data: quizzes,
    mutate,
    error,
  } = useSWR([`api/quizzes`], (url) => fetcher(url), {
    revalidateOnFocus: false,
  });
  const router = useRouter();
  return (
    <>
      <Tab.Group>
        <Tab.List className={"bg-white mb-6 overflow-hidden rounded"}>
          <Tab
            className={({ selected }) =>
              classNames(
                "p-4 font-medium",
                "",
                selected ? "border-blue-500 border-b-2" : "text-gray-400"
              )
            }
          >
            Assignments
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "p-4 font-medium",
                "",
                selected ? "border-blue-500 border-b-2" : "text-gray-400"
              )
            }
          >
            Your Results
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            {!quizzes || error ? (
              <BlueSpinner />
            ) : quizzes.data?.length === 0 ? (
              <EmptyDataComponent title="Kuis" href="assignments/create" />
            ) : (
              <div className="flex justify-between items-center flex-col lg:flex-row mb-4">
                <Button
                  colorScheme="blue"
                  className="ml-auto"
                  onClick={() => router.push("assignments/create")}
                  leftIcon={<PlusIcon className="w-4 h-4" />}
                >
                  Tambah
                </Button>
                {quizzes.data?.map((item) => (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <CustomCard
                      key={item.id}
                      title={item.title}
                      thumbnail={item.thumbnail}
                    />
                  </div>
                ))}
              </div>
            )}
          </Tab.Panel>
          <Tab.Panel>
            <div className="mt-4">data table</div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}

assignments.layout = Admin;
