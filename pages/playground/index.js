import { useRouter } from "next/router";
import React, { Fragment } from "react";
import Admin from "../../layouts/Admin.js";
import { Tab } from "@headlessui/react";
import classNames from "../../utils/tailwindClassNames.js";
import DataTable from "react-data-table-component";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher.js";
import BlueSpinner from "../../components/Spinner/BlueSpinner";
import moment from "moment";
import { Tag, TagLabel } from "@chakra-ui/react";

export default function playground() {
  const router = useRouter();
  const {
    data: codehistories,
    mutate,
    error,
  } = useSWR([`api/code/histories`], (url) => fetcher(url), {
    revalidateOnFocus: false,
  });
  const items = [
    {
      id: 1,
      name: "Frontend Editor",
      desc: "Frontend Editor merupakan Code Editor yang mencakup HTML, CSS, dan Javascript",
      image: "/codemirror.png",
      href: "/playground/frontend-editor",
    },
    {
      id: 2,
      name: "JS Code Editor",
      desc: "Javascript Editor merupakan compiler yang hanya mengeluarkan output kode javascript",
      image: "/javascriptlogo.png",
      href: "/playground/js-editor",
    },
    {
      id: 3,
      name: "Webpage Builder",
      desc: "Webpage Builder merupakan fitur belajar web dengan drag and drop komponen",
      image: "/webpage.jpg",
      href: "/playground/webpage-builder",
    },
  ];
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => (
        <Tag
          size={"md"}
          borderRadius="full"
          variant="solid"
          colorScheme={
            row.type === "frontend"
              ? "blue"
              : row.type === "js"
              ? "yellow"
              : "purple"
          }
        >
          <TagLabel>{row.type}</TagLabel>
        </Tag>
      ),
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => moment(row.created_at).format("L"),
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row) => moment(row.updated_at).format("L"),
      sortable: true,
    },
    {
      name: "Link",
      selector: (row) => (
        <Link href={`playground/${row.slug}`}>
          <a>View</a>
        </Link>
      ),
      sortable: true,
    },
  ];
  return (
    <>
      <Tab.Group>
        <Tab.List className={"bg-white mb-6 overflow-hidden rounded"}>
          <Tab
            className={({ selected }) =>
              classNames(
                "p-4",
                "",
                selected ? "border-blue-500 border-b-2" : "text-gray-400"
              )
            }
          >
            Playground
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "p-4",
                "",
                selected ? "border-blue-500 border-b-2" : "text-gray-400"
              )
            }
          >
            Your works
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => router.push(item.href)}
                  className="hover:shadow-lg cursor-pointer transition-all delay-75 bg-white border border-gray-200 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-60 object-cover rounded-lg rounded-b-none"
                  />
                  <div className="p-4">
                    <h3 className="text-primary text-xl lg:text-2xl font-bold line-clamp-2 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-secondary leading-loose text-base line-clamp-3 my-2">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Panel>
          <Tab.Panel>
            {!codehistories ? (
              <BlueSpinner />
            ) : (
              <div className="mt-4">
                <DataTable columns={columns} data={codehistories} pagination />
              </div>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}

playground.layout = Admin;
