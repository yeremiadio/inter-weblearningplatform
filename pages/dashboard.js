import React from "react";
import Admin from "../layouts/Admin.js";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import {
  BookOpenIcon,
  CodeIcon,
  PencilAltIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";

const CustomCardTotal = ({ name = "", count = 0, icon = null, href = "" }) => {
  const router = useRouter();
  return (
    <div
      className="bg-white p-6 text-gray-800 rounded-md hover:shadow-default-weblearning transition-all delay-75 cursor-pointer"
      onClick={() => router.push(href)}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <div>
          <h1 className="text-2xl font-bold">{count}</h1>
          <p className="text-base text-gray-500">{`Jumlah ${name}`}</p>
        </div>
        <div>{icon}</div>
      </Box>
    </div>
  );
};

export default function dashboard() {
  return (
    <>
      <div className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          <CustomCardTotal
            name="Materi"
            count={10}
            href="materials"
            icon={<BookOpenIcon className="w-6 h-6" />}
          />
          <CustomCardTotal
            name="User"
            count={10}
            href="users"
            icon={<UserGroupIcon className="w-6 h-6" />}
          />
          <CustomCardTotal
            name="Code Editor"
            count={10}
            href="playground"
            icon={<CodeIcon className="w-6 h-6" />}
          />
          <CustomCardTotal
            name="Tugas"
            count={10}
            href="assignment"
            icon={<PencilAltIcon className="w-6 h-6" />}
          />
        </div>
      </div>
    </>
  );
}

dashboard.layout = Admin;
