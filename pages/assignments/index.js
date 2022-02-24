import { Tab } from "@headlessui/react";
import React from "react";
import Admin from "../../layouts/Admin.js";
import classNames from "../../utils/tailwindClassNames";
import BlueSpinner from "../../components/Spinner/BlueSpinner";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher.js";
// import CustomCard from "../../components/Card/Card.js";
import EmptyDataComponent from "../../components/EmptyData.js";
import { Button } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
// import Head from "next/head";
import Link from "next/link";

export default function assignments() {
  const {
    data: quizzes,
    mutate,
    error,
  } = useSWR([`api/quizzes`], (url) => fetcher(url), {
    revalidateOnFocus: false,
  });
  console.log(quizzes);
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
            ) : quizzes?.length === 0 ? (
              <EmptyDataComponent title="Kuis" href="assignments/create" />
            ) : (
              <>
                <div className="flex justify-end mb-4">
                  <Button
                    colorScheme="blue"
                    className="ml-auto"
                    onClick={() => router.push("assignments/create")}
                    leftIcon={<PlusIcon className="w-4 h-4" />}
                  >
                    Tambah
                  </Button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {quizzes.map((item) => (
                    <div
                      key={item.id}
                      className="hover:shadow-default-weblearning transition-all delay-75 border border-gray-200 rounded-lg bg-white"
                    >
                      <img
                        src={
                          item.thumbnail !== null
                            ? thumbnail
                            : "/imgPlaceholder.jpg"
                        }
                        alt=""
                        className="w-full h-60 object-cover rounded-lg rounded-b-none"
                      />
                      <div className="p-4">
                        <h3 className="text-primary text-xl lg:text-2xl font-bold line-clamp-2 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-secondary leading-loose text-base line-clamp-3 my-2">
                          Start Date: {item.start_date}
                        </p>
                        <p className="text-secondary leading-loose text-base line-clamp-3 my-2">
                          End Date: {item.end_date}
                        </p>
                        <p className="text-secondary leading-loose text-base line-clamp-3 my-2">
                          Duration: {item.duration}
                        </p>
                        <Link
                          href={
                            item.slug ? `assignments/play/${item.slug}` : "/"
                          }
                        >
                          <a>
                            <Button
                              colorScheme={"blue"}
                              size="sm"
                              colorScheme="blue"
                              isFullWidth
                            >
                              Play
                            </Button>
                          </a>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
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
