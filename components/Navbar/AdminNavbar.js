import React, { useState } from "react";
import UserDropdown from "../Dropdown/UserDropdown";
import { MenuIcon } from "@heroicons/react/solid";
import { Badge, Spinner, Tag } from "@chakra-ui/react";
import router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import instance from "../../utils/instance";
import { getAuthUserInfo } from "../../redux/actions/authAction";
import { useToast } from "@chakra-ui/toast";
import useCheckOs from "../../utils/useCheckOs";
import NotificationDropdown from "../Dropdown/NotificationDropdown";
const AdminNavbar = ({ setOpen, open, user }) => {
  const auth = useSelector((state) => state.auth);
  const isMobileOs = useCheckOs();
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
      {isMobileOs ? (
        <>
          <div className="flex justify-between p-4 lg:py-4 lg:px-8 bg-white mt-0 fixed w-full z-40 top-0 border-b border-gray-200">
            <div className="flex items-center flex-1">
              <img
                src="/interWithText.svg"
                onClick={() => router.replace("/dashboard")}
                className="w-24 object-cover cursor-pointer"
              />
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
              <div className="flex items-center gap-3">
                <NotificationDropdown />
                <UserDropdown user={user} />
              </div>
            </>
          </div>
        </>
      ) : (
        <>
          {/* Wb or Mobile Viewport */}
          <div className="flex justify-between p-4 lg:py-4 lg:px-8 bg-white mt-0 fixed w-full z-40 top-0 border-b border-gray-200">
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
              <div className="flex items-center gap-4">
                <NotificationDropdown />
                <UserDropdown user={user} />
              </div>
            </>
          </div>
        </>
      )}
    </>
  );
};

export default AdminNavbar;
