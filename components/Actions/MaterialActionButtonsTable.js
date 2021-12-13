import { IconButton } from "@chakra-ui/react";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/solid";
import React from "react";
import { Box } from "@chakra-ui/layout";
import Link from "next/link";

const ActionButtonsTable = ({ row, onClick, setData, deleteParent }) => {
  return (
    <Box display="flex" className="gap-1" onClick={onClick}>
      <Link href={`materials/${row?.slug}`}>
        <IconButton
          icon={<EyeIcon className="w-5 h-5" />}
          style={{ borderRadius: "2rem" }}
          variant="ghost"
        />
      </Link>
      <Link href={`materials/edit/${row?.slug}`}>
        <IconButton
          icon={<PencilIcon className="w-5 h-5" />}
          style={{ borderRadius: "2rem" }}
          variant="ghost"
        />
      </Link>
      <IconButton
        onClick={() => {
          deleteParent?.current.open();
          setData(row);
        }}
        icon={<TrashIcon className="w-5 h-5" />}
        style={{ borderRadius: "2rem" }}
        variant="ghost"
      />
    </Box>
  );
};

export default ActionButtonsTable;
