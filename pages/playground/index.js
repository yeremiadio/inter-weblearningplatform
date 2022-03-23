import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import Admin from "../../layouts/Admin.js";
import { Tab } from "@headlessui/react";
import classNames from "../../utils/tailwindClassNames.js";
import DataTable from "react-data-table-component";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher.js";
import BlueSpinner from "../../components/Spinner/BlueSpinner";
import moment from "moment";
import { Box, Button, Spinner, Tag, TagLabel } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { deleteCode } from "../../redux/actions/codeAction.js";
import { useToast } from "@chakra-ui/toast";
import CustomSearchInput from "../../components/Inputs/CustomSearchInput.js";
function playground() {
  const router = useRouter();
  const auth = useSelector((state) => state.auth.user);
  const toast = useToast();
  // const refCreateWebPageBuilder = useRef();
  const {
    data: codes,
    mutate,
    error,
  } = useSWR([`api/codes`], (url) => fetcher(url), {
    revalidateOnFocus: false,
  });
  const [filterText, setFilterText] = useState("");
  const authUserCodeHistories = codes?.filter(
    (item) => item.user_id === auth.user.id
  );
  const filteredCodeHistories = codes?.filter(
    (item) =>
      item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
  );
  const items = [
    {
      id: 1,
      name: "Frontend Editor",
      desc: "Frontend Editor merupakan Code Editor yang mencakup HTML, CSS, dan Javascript",
      image: "/codemirror.png",
      status: "live",
      type: "frontend",
      href: "/playground/frontend",
    },
    {
      id: 2,
      name: "JS Code Editor",
      desc: "Javascript Editor merupakan compiler yang hanya mengeluarkan output kode javascript",
      image: "/javascriptlogo.png",
      type: "js",
      status: "live",
      href: "/playground/js",
    },
    {
      id: 3,
      name: "Carbon Code Editor",
      desc: "Carbon Code Editor merupakan fitur yang digunakan mempresentasikan kode menjadi lebih menarik",
      image: "/carbon_(1).png",
      type: "js",
      status: "live",
      href: "/playground/carbon",
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
        <div className="flex flex-col lg:flex-row py-2 gap-2">
          <Button
            size={"sm"}
            onClick={() =>
              router.push({
                pathname: "playground/play/[...params]",
                query: { params: [row.type, row.slug] },
              })
            }
          >
            Play
          </Button>
          <Button
            size={"sm"}
            colorScheme={"red"}
            onClick={() =>
              deleteCode(row.id, authUserCodeHistories, mutate, toast)
            }
          >
            Delete
          </Button>
        </div>
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
                "p-4 font-medium",
                "",
                selected ? "border-blue-500 border-b-2" : "text-gray-400"
              )
            }
          >
            Collections
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
            Playground
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
            Your works
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="mb-4">
              <CustomSearchInput
                placeholder="Cari judul kode..."
                setFilterText={setFilterText}
              />
            </div>
            {!codes && !error ? (
              <Box display={"flex"} alignItems="center">
                <Spinner colorScheme={"blue"} />
              </Box>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredCodeHistories?.length === 0
                  ? "Data Not Found"
                  : filteredCodeHistories?.map((item) => (
                      <div key={item.id} className="flex flex-col">
                        <div
                          className={`aspect-[16/9] cursor-pointer rounded-lg bg-cover bg-center bg-no-repeat overflow-hidden h-56 lg:h-44 border border-gray-200`}
                          onClick={() =>
                            router.push({
                              pathname: "playground/play/[...params]",
                              query: { params: [item.type, item.slug] },
                            })
                          }
                        >
                          <img
                            src={item.screenshot}
                            alt=""
                            className="object-cover"
                          />
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="font-medium text-lg line-clamp-1">
                            {item.title}
                          </span>
                          <span className="text-sm line-clamp-1">
                            {item.user.name}
                          </span>
                        </div>
                      </div>
                    ))}
              </div>
            )}
          </Tab.Panel>
          <Tab.Panel>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() =>
                    item.type === "webpage-builder"
                      ? ""
                      : router.push(item.href)
                  }
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
            {error ? (
              <BlueSpinner />
            ) : (
              <>
                <div className="mb-4">
                  <CustomSearchInput
                    placeholder="Cari judul kode..."
                    setFilterText={setFilterText}
                  />
                </div>
                <div className="mt-4">
                  <DataTable
                    columns={columns}
                    data={authUserCodeHistories?.filter(
                      (item) =>
                        item.title &&
                        item.title
                          .toLowerCase()
                          .includes(filterText.toLowerCase())
                    )}
                    pagination
                  />
                </div>
              </>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}

playground.layout = Admin;

export default playground;
