import React from "react";
import Admin from "../layouts/Admin.js";
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
import { useSelector } from "react-redux";

const Chart = dynamic(() => import("react-apexcharts").then((mod) => mod), {
  ssr: false,
});

const CustomCardTotal = ({ name = "", count = 0, icon = null, href = "" }) => {
  const router = useRouter();
  return (
    <div className="bg-white px-6 py-4 border border-gray-200 text-primary rounded-md hover:shadow-default-weblearning transition-all delay-75">
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
  const auth = useSelector((state) => state.auth.user);
  const { data, error } = useSWR(
    [`api/fetch-dashboard`],
    (url) => fetcher(url),
    {
      revalidateOnFocus: false,
    }
  );
  const allDataCount = [
    {
      id: 1,
      name: "Materi",
      count: data?.all_data_count?.material,
      icon: <BookOpenIcon className="w-6 h-6" />,
    },
    {
      id: 2,
      name: "User",
      count: data?.all_data_count?.user,
      icon: <AcademicCapIcon className="w-6 h-6" />,
    },
    {
      id: 3,
      name: "Role",
      count: data?.all_data_count?.role,

      icon: <UserGroupIcon className="w-6 h-6" />,
    },
    {
      id: 4,
      name: "Code Editor",
      count: 3,

      icon: <CodeIcon className="w-6 h-6" />,
    },
    {
      id: 5,
      name: "Tugas",
      count: data?.all_data_count?.quiz,

      icon: <PencilAltIcon className="w-6 h-6" />,
    },
  ];
  return (
    <>
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
              href={auth?.user?.roles[0]?.name !== "student" && item.href}
              icon={item.icon}
            />
          ))}
        </div>
        <div className="my-4 flex flex-col lg:flex-row text-primary gap-4">
          <div className="rounded-md p-4 hover:shadow-default-weblearning transition-all delay-75 flex-auto w-full bg-white border border-gray-200">
            <h3 className="font-bold text-lg">Skor Tugas Anda</h3>
            {/* <Chart type='donut' */}
            {!error && data !== undefined ? (
              <div>
                <Chart
                  type="area"
                  options={{
                    chart: {
                      height: 640,
                    },
                    dataLabels: {
                      enabled: false,
                    },
                    xaxis: {
                      categories: data?.data_scores_count_by_month.data
                        .filter((item) => {
                          const date1 = new Date(item.created_at).getDate();
                          const date2 = new Date().getDate();
                          return date1 === date2;
                        })
                        .map((item) =>
                          new Date(item.created_at).toLocaleTimeString()
                        ),
                    },
                    fill: {
                      type: "gradient",
                      gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        stops: [0, 90, 100],
                      },
                    },
                  }}
                  series={[
                    {
                      name: "Skor Tugas",
                      data: data?.data_scores_count_by_month.data
                        .filter((item) => {
                          const date1 = new Date(item.created_at).getDate();
                          const date2 = new Date().getDate();
                          return date1 === date2;
                        })
                        .map((item) => item.score),
                    },
                  ]}
                  width="100%"
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
          <div className="rounded-md p-4 hover:shadow-default-weblearning transition-all delay-75 flex-auto lg:w-4/6 bg-white border border-gray-200">
            <h3 className="font-bold text-lg">Jumlah Anggota</h3>
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
        <div className="rounded-md p-4 hover:shadow-default-weblearning transition-all delay-75 flex-auto w-full bg-white border border-gray-200">
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
      </div>
    </>
  );
}

dashboard.layout = Admin;
