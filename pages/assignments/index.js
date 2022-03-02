import { Tab } from "@headlessui/react";
import React from "react";
import Admin from "../../layouts/Admin.js";
import classNames from "../../utils/tailwindClassNames";
import BlueSpinner from "../../components/Spinner/BlueSpinner";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher.js";
// import CustomCard from "../../components/Card/Card.js";
import EmptyDataComponent from "../../components/EmptyData.js";
import { Button, Tag } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
// import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import QuizzesCard from "../../components/Card/QuizzesCard.js";
import useErrorSwr from "../../utils/useErrorSwr.js";
import { useSelector } from "react-redux";
import ResultTableComponent from "../../components/Pages/Assignment/Result/ResultTableComponent.js";

export default function assignments() {
  const {
    data: quizzes,
    mutate,
    error,
  } = useSWR([`api/quizzes`], (url) => fetcher(url), {
    revalidateOnFocus: false,
  });
  const auth = useSelector((state) => state.auth.user);
  const { errorMessage, errorStatus } = useErrorSwr(error);
  const router = useRouter();
  return (
    <>
      {errorStatus ? (
        <span className="text-md font-bold">{errorMessage}</span>
      ) : !quizzes ? (
        <BlueSpinner />
      ) : quizzes.length === 0 ? (
        <EmptyDataComponent href="assignments/create" isAddable={true} />
      ) : (
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
            {auth.user.roles[0].name !== "student" && (
              <Tab
                className={({ selected }) =>
                  classNames(
                    "p-4 font-medium",
                    "",
                    selected ? "border-blue-500 border-b-2" : "text-gray-400"
                  )
                }
              >
                Submitted Results
              </Tab>
            )}
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
                <EmptyDataComponent href="assignments/create" />
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
                      <QuizzesCard
                        key={item.id}
                        quizzes={quizzes}
                        mutate={mutate}
                        id={item.id}
                        title={item.title}
                        type={item.type}
                        thumbnail={item.thumbnail}
                        endDate={item.end_date}
                        results={item.results}
                        startDate={item.start_date}
                        slug={{
                          pathname: "assignments/play/[...params]",
                          query: { params: [item.type, item.slug] },
                        }}
                        duration={item.duration}
                        questionLength={item.questions.length}
                        isEditable={true}
                      />
                    ))}
                  </div>
                </>
              )}
            </Tab.Panel>
            {auth.user.roles[0].name !== "student" && (
              <Tab.Panel>
                <div className="mt-4">
                  <ResultTableComponent isAdmin={true} />
                </div>
              </Tab.Panel>
            )}
            <Tab.Panel>
              <div className="mt-4">
                <ResultTableComponent isAdmin={false} auth={auth} />
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      )}
    </>
  );
}

assignments.layout = Admin;
