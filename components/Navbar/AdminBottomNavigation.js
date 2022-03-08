import {
  ClipboardIcon,
  CodeIcon,
  DocumentTextIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";

const AdminBottomNavigation = ({ auth, router, setOpen }) => {
  const navigations = [
    {
      id: 1,
      name: "Home",
      href: "/dashboard",
      icon: (
        <HomeIcon
          style={{
            width: 20,
            color:
              router.pathname.indexOf("/dashboard") !== -1
                ? "text-white"
                : "group-hover:text-gray-800",
          }}
        />
      ),
    },
    {
      id: 2,
      name: "Tugas",
      href: "/assignments",
      icon: (
        <ClipboardIcon
          style={{
            width: 20,
            color:
              router.pathname.indexOf("/assignments") !== -1
                ? "text-white"
                : "group-hover:text-gray-800",
          }}
        />
      ),
    },
    {
      id: 3,
      name: "Code",
      href: "/playground",
      icon: (
        <CodeIcon
          style={{
            width: 20,
            color:
              router.pathname.indexOf("/playground") !== -1
                ? "text-white"
                : "group-hover:text-gray-800",
          }}
        />
      ),
      children: [
        {
          id: 1,
          name: "Frontend Editor",
          href: "/frontend-editor",
        },
        {
          id: 2,
          name: "Javascript Editor",
          href: "/js-editor",
        },
        {
          id: 3,
          name: "Webpage Builder",
          href: "/webpage-builder",
        },
      ],
    },
    {
      id: 4,
      name: "Materi",
      href: "/materials",
      icon: (
        <DocumentTextIcon
          style={{
            width: 20,
            color:
              router.pathname.indexOf("/materials") !== -1
                ? "text-white"
                : "group-hover:text-gray-800",
          }}
        />
      ),
    },
    {
      id: 5,
      name: "Users",
      href: "/users",
      icon: (
        <UserGroupIcon
          style={{
            width: 20,
            color:
              router.pathname.indexOf("/users") !== -1
                ? "text-white"
                : "group-hover:text-gray-800",
          }}
        />
      ),
    },
  ];
  return (
    <div className="bg-white border border-t border-gray-200 z-40 fixed inset-x-0 bottom-0 mt-72">
      <ul
        className={
          "px-4 py-2 space-x-3 grid place-items-center " +
          (auth.user?.roles[0].name === "admin" ||
          auth.user?.roles[0].name === "teacher"
            ? `grid-cols-5`
            : `grid-cols-4`)
        }
      >
        {navigations.map((item) => (
          <li
            className={
              "group text-blue-600 text-[12px] w-20 " +
              (item.name === "Users" &&
                auth.user?.roles[0]?.name === "student" &&
                "hidden")
            }
            onClick={() => setOpen(false)}
            key={item.id}
          >
            <Link href={item.href}>
              <span
                className={
                  "p-2 transition-all delay-75 rounded flex flex-col text-center justify-center items-center space-y-[1px] " +
                  (router.pathname.indexOf(item.href) !== -1
                    ? "cursor-pointer font-medium"
                    : "group-hover:text-gray-800 font-normal cursor-pointer text-gray-600")
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminBottomNavigation;
