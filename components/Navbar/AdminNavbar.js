import React from "react";
import UserDropdown from "../Dropdown/UserDropdown";
import { MenuIcon } from "@heroicons/react/solid";

const AdminNavbar = ({ setOpen, open, user }) => {
  return (
    <>
      <div className="flex justify-between p-4 lg:py-6 lg:px-8 bg-white mt-0 fixed w-full z-40 top-0 border-b border-gray-200">
        <div className="flex items-center flex-1">
          <button
            onClick={() => setOpen(!open)}
            className="mr-3 md:hidden flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-secondary"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
        <UserDropdown user={user} />
      </div>
    </>
  );
};

export default AdminNavbar;