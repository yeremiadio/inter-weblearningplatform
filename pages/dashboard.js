import React, { useEffect, useState } from "react";
import Admin from "../layouts/Admin.js";
import Head from "next/head";
import { Box, Spinner } from "@chakra-ui/react";
import {
  AcademicCapIcon,
  BookOpenIcon,
  CodeIcon,
  PencilAltIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { fetcher } from "../utils/fetcher.js";
import useSWR from "swr";
import dynamic from "next/dynamic";
// import instance from "../utils/instance.js";

const Chart = dynamic(() => import("react-apexcharts").then((mod) => mod), {
  ssr: false,
});

const CustomCardTotal = ({ name = "", count = 0, icon = null, href = "" }) => {
  const router = useRouter();
  return (
    <div
      className="bg-white px-6 py-4 border border-gray-300 text-primary rounded-md hover:shadow-default-weblearning transition-all delay-75 cursor-pointer"
      onClick={() => router.push(href)}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <div>
          <h1 className="text-2xl font-bold">{count}</h1>
          <p className="text-base text-gray-500">{`${name}`}</p>
        </div>
        <div>{icon}</div>
      </Box>
    </div>
  );
};

export default function dashboard() {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   const ac = new AbortController();
  //   instance()
  //     .get("api/fetch-dashboard")
  //     .then((res) => {
  //       // setData(res.data.data);
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(err));
  //   return () => {
  //     ac.abort();
  //   };
  // }, []);
  const { data, error } = useSWR(
    [`api/fetch-dashboard`],
    (url) => fetcher(url),
    {
      revalidateOnFocus: false,
    }
  );
  // // const [allDataCount, setAllDataCount] = useState(data.all_data_count);
  // console.log(data);
  const allDataCount = [
    {
      id: 1,
      name: "Materi",
      count: data?.all_data_count?.material,
      href: "materials",
      icon: <BookOpenIcon className="w-6 h-6" />,
    },
    {
      id: 2,
      name: "User",
      count: data?.all_data_count?.user,
      href: "users",
      icon: <AcademicCapIcon className="w-6 h-6" />,
    },
    {
      id: 3,
      name: "Role",
      count: data?.all_data_count?.role,
      href: "users",
      icon: <UserGroupIcon className="w-6 h-6" />,
    },
    {
      id: 4,
      name: "Code Editor",
      count: 3,
      href: "playground",
      icon: <CodeIcon className="w-6 h-6" />,
    },
    {
      id: 5,
      name: "Tugas",
      count: data?.all_data_count?.quiz,
      href: "assignment",
      icon: <PencilAltIcon className="w-6 h-6" />,
    },
  ];
  return (
    <>
      <Head>
        <title>Dashboard - Web Learning Platform</title>
      </Head>
      <h3 className="font-bold text-xl text-primary">Dashboard</h3>
      <p className="font-base tracking-wide text-secondary">
        Kelola aktivitasmu disini
      </p>
      <div className="my-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-4">
          {allDataCount.map((item) => (
            <CustomCardTotal
              key={item.id}
              name={item.name}
              count={item.count}
              href={item.href}
              icon={item.icon}
            />
          ))}
        </div>
        <div className="my-4 flex flex-col lg:flex-row text-primary gap-4">
          <div className="rounded-md p-4 hover:shadow-default-weblearning transition-all delay-75 flex-auto w-full bg-white border border-gray-300">
            <h3 className="font-bold text-lg">Jumlah Materi per Bulan</h3>
            {!error && data !== undefined ? (
              <Chart
                type="bar"
                options={{
                  chart: {
                    type: "bar",
                    height: 350,
                  },
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      columnWidth: "55%",
                      endingShape: "rounded",
                    },
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  stroke: {
                    show: true,
                    width: 2,
                    colors: ["transparent"],
                  },
                  xaxis: {
                    categories: data?.data_materials_count_by_month?.months,
                  },
                  yaxis: {
                    title: {
                      text: "Jumlah Materi",
                    },
                  },
                  fill: {
                    opacity: 1,
                  },
                  tooltip: {
                    y: {
                      formatter: function (val) {
                        return val;
                      },
                    },
                  },
                }}
                series={[
                  {
                    name: "Materi",
                    data: data?.data_materials_count_by_month?.month_count,
                  },
                ]}
                width="100%"
              />
            ) : (
              <div className="flex justify-center items-center h-36">
                <Spinner
                  color="blue.500"
                  thickness="3px"
                  emptyColor="gray.200"
                  size="lg"
                />
              </div>
            )}
          </div>
          <div className="rounded-md p-4 hover:shadow-default-weblearning transition-all delay-75 flex-auto lg:w-4/6 bg-white border border-gray-300">
            <h3 className="font-bold text-lg">Jumlah Anggota</h3>
            {/* <Chart type='donut' */}
            {!error && data !== undefined ? (
              <div className="grid place-items-center h-full">
                <Chart
                  type="pie"
                  options={{
                    dataLabels: { enabled: true },
                    labels: data?.all_roles_count?.names,
                  }}
                  series={data?.all_roles_count?.count}
                  className="w-60 lg:w-96"
                />
              </div>
            ) : (
              <div className="flex justify-center items-center h-36">
                <Spinner
                  color="blue.500"
                  thickness="3px"
                  emptyColor="gray.200"
                  size="lg"
                />
              </div>
            )}
          </div>
        </div>
        <div className="rounded-md p-4 hover:shadow-default-weblearning transition-all delay-75 flex-auto w-full bg-white border border-gray-300">
          <p className="text-center">Data Center</p>
        </div>
      </div>
    </>
  );
}

dashboard.layout = Admin;
