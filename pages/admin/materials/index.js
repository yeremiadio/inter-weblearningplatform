import { useToast } from "@chakra-ui/toast";
import { useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import useSWR from "swr";
import Admin from "../../../layouts/Admin";
import { fetcher } from "../../../utils/fetcher";
import MaterialActionButtonsTable from "../../../components/Actions/MaterialActionButtonsTable";
import { Modal } from "../../../components/Modal/Modal";
import AddPageModal from "../../../components/Modal/Components/Material/AddMaterialModal";
import BlueSpinner from "../../../components/Spinner/BlueSpinner";
import { Button } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/solid";
import moment from "moment";

export default function MaterialPage() {
  const auth = useSelector((state) => state.auth);
  const {
    data: pages,
    mutate,
    error,
  } = useSWR([`api/pages`], (url) => fetcher(url), {
    revalidateOnFocus: false,
  });
  const addModalRef = useRef();
  const deleteModalRef = useRef();
  const [selectedIndexData, setIndexData] = useState(0);
  const [selectedData, setSelectedData] = useState();
  const toast = useToast();
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
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
      name: "Actions",
      selector: (row, index) => (
        <MaterialActionButtonsTable
          row={row}
          onClick={() => setIndexData(index)}
          setData={setSelectedData}
          deleteParent={deleteModalRef}
        />
      ),
    },
  ];
  const handleChangeSelectRows = ({ selectedRows }) => {
    console.log("Selected Rows: ", selectedRows);
  };
  return (
    <>
      <Modal ref={addModalRef}>
        <AddPageModal
          parent={addModalRef}
          toast={toast}
          mutate={mutate}
          users={pages}
        />
      </Modal>
      <div className="bg-section">
        <div className="flex items-center">
          <div>
            <h3 className="font-bold text-xl text-primary">Materi</h3>
            <p className="font-base tracking-wide text-secondary">
              Kelola semua materi kamu disini.
            </p>
          </div>
          <Button
            colorScheme="blue"
            className="mt-2 ml-auto"
            leftIcon={<PlusIcon className="w-4 h-4" />}
            onClick={() => addModalRef.current.open()}
          >
            Tambah
          </Button>
        </div>
        {!pages && error ? (
          <BlueSpinner />
        ) : (
          <div className="mt-4">
            <DataTable
              columns={columns}
              data={pages}
              pagination
              onSelectedRowsChange={handleChangeSelectRows}
            />
          </div>
        )}
      </div>
    </>
  );
}

MaterialPage.layout = Admin;
