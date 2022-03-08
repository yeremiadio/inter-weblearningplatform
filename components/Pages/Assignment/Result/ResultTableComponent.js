import {
  Tag,
  InputGroup,
  Input,
  InputLeftElement,
  Button,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import useSWR from "swr";
import { fetcher } from "../../../../utils/fetcher";
import { SearchIcon } from "@heroicons/react/solid";
import BlueSpinner from "../../../Spinner/BlueSpinner";
import { CSVLink } from "react-csv";
import { useRouter } from "next/router";
const ResultTableComponent = ({ isAdmin = true, auth }) => {
  const {
    data: results,
    mutate,
    error,
  } = useSWR(
    [`api/result/${isAdmin ? "all" : "user"}/submitted`],
    (url) => fetcher(url),
    {
      revalidateOnFocus: false,
    }
  );
  const [filterText, setFilterText] = useState("");
  const router = useRouter();

  const filteredResults = results?.filter(
    (item) =>
      item.quiz.title &&
      item.quiz.title.toLowerCase().includes(filterText.toLowerCase())
  );
  const columns = isAdmin
    ? [
        {
          name: "Name",
          selector: (row) => row.user.name,
          sortable: true,
        },
        {
          name: "Email",
          selector: (row) => row.user.email,
          sortable: true,
        },
        {
          name: "Quiz Title",
          selector: (row) => row.quiz.title,
          sortable: true,
        },
        {
          name: "Type",
          selector: (row) => (
            <Tag
              className="my-2"
              size={"md"}
              colorScheme={row.quiz.type === "quiz" ? "blue" : "yellow"}
            >
              {row.quiz.type}
            </Tag>
          ),
          sortable: true,
        },
        {
          name: "Score",
          selector: (row) => +row.score,
          sortable: true,
        },
        {
          name: "Submitted Date",
          selector: (row) => moment(row.created_at).format("L"),
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
                    pathname: "assignments/result/[...params]",
                    query: { params: [row.quiz_id, row.user.id] },
                  })
                }
              >
                View
              </Button>
            </div>
          ),
          sortable: true,
        },
      ]
    : [
        {
          name: "Quiz Title",
          selector: (row) => row.quiz.title,
          sortable: true,
        },
        {
          name: "Type",
          selector: (row) => (
            <Tag
              className="my-2"
              size={"md"}
              colorScheme={row.quiz.type === "quiz" ? "blue" : "yellow"}
            >
              {row.quiz.type}
            </Tag>
          ),
          sortable: true,
        },
        {
          name: "Score",
          selector: (row) => +row.score,
          sortable: true,
        },
        {
          name: "Submitted Date",
          selector: (row) => moment(row.created_at).format("L"),
          sortable: true,
        },
      ];
  const headers = isAdmin
    ? [
        {
          label: "Nama",
          key: "user.name",
        },
        {
          label: "Email",
          key: "user.email",
        },
        {
          label: "Judul Kuis",
          key: "quiz.title",
        },
        {
          label: "Tipe Kuis",
          key: "quiz.type",
        },
        {
          label: "Skor",
          key: "score",
        },
        {
          label: "Tanggal Submit",
          key: "created_at",
        },
        {
          label: "Tanggal Update",
          key: "updated_at",
        },
      ]
    : [
        {
          label: "Judul Kuis",
          key: "quiz.title",
        },
        {
          label: "Tipe Kuis",
          key: "quiz.type",
        },
        {
          label: "Skor",
          key: "score",
        },
        {
          label: "Tanggal Submit",
          key: "created_at",
        },
        {
          label: "Tanggal Update",
          key: "updated_at",
        },
      ];

  const exportCSVProps = {
    filename: isAdmin
      ? `ResultAssignmentInter_${new Date()}.csv`
      : `ResultAssignmentInter_${auth.user.name}_${new Date()}.csv`,
    headers: headers,
    data: results ? results : "",
  };

  const handleChangeSelectRows = ({ selectedRows }) => {
    console.log("Selected Rows: ", selectedRows);
  };
  return (
    <>
      <div className="my-4">
        <InputGroup className="bg-white">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon className="text-gray-300 w-6 h-6" />}
          />
          <Input
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Cari judul kuis..."
          />
        </InputGroup>
      </div>
      <div className="my-4">
        <CSVLink {...exportCSVProps}>
          <Button variant="solid" colorScheme={"green"}>
            Export CSV
          </Button>
        </CSVLink>
      </div>
      {!results ? (
        <BlueSpinner />
      ) : (
        <DataTable
          columns={columns}
          data={filteredResults}
          pagination
          onSelectedRowsChange={handleChangeSelectRows}
        />
      )}
    </>
  );
};

export default ResultTableComponent;
