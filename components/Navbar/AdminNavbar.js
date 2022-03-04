import React, { useState } from "react";
import UserDropdown from "../Dropdown/UserDropdown";
import { MenuIcon } from "@heroicons/react/solid";
import { Badge, Spinner, Tag } from "@chakra-ui/react";
import router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import instance from "../../utils/instance";
import { getAuthUserInfo } from "../../redux/actions/authAction";
import { useToast } from "@chakra-ui/toast";

const AdminNavbar = ({ setOpen, open, user }) => {
  const auth = useSelector((state) => state.auth);
  const toast = useToast();
  const dispatch = useDispatch();
  const checkUserVerification = async () => {
    await instance()
      .get("api/check-verification/" + user?.id)
      .then((res) => router.replace("verify"))
      .catch(async (err) => await dispatch(getAuthUserInfo(toast)));
  };
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
        <>
          {user?.email_verified_at === null && (
            <Tag
              colorScheme={"yellow"}
              _disabled={auth.isFetching && true}
              className="mx-4 cursor-pointer"
              onClick={checkUserVerification}
            >
              {auth.isFetching ? <Spinner /> : "Verify Your Email"}
            </Tag>
          )}
          <UserDropdown user={user} />
        </>
      </div>
    </>
  );
};

export default AdminNavbar;
