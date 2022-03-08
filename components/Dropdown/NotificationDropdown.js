import React, { Fragment } from "react";
// import { useRouter } from 'next/router';
import NotificationIlustration from "../SvgComponents/NotificationIlustration";
import { Popover, Transition } from "@headlessui/react";
import { BellIcon as BellSolidIcon } from "@heroicons/react/solid";
import { BellIcon as BellOutlineIcon } from "@heroicons/react/outline";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { Spinner } from "@chakra-ui/react";
import moment from "moment";
import { now } from "moment";
const NotificationDropdown = () => {
  const {
    data: notifications,
    mutate,
    error,
  } = useSWR([`api/notifications`], (url) => fetcher(url), {
    revalidateOnFocus: true,
  });

  return (
    <Popover>
      {({ open, close }) => (
        <>
          <Popover.Button>
            <div className="mt-1 text-secondary relative">
              {open ? (
                <BellSolidIcon className="w-7 h-7" aria-hidden="true" />
              ) : (
                <>
                  {new Date(
                    notifications?.sort((a, b) => {
                      // Turn your strings into dates, and then subtract them
                      // to get a value that is either negative, positive, or zero.
                      return new Date(b.created_at) - new Date(a.created_at);
                    })[0]?.created_at
                  ) && (
                    <div className="w-2 h-2 bg-green-500 rounded-full absolute -right-1 top-[0.2px]" />
                  )}

                  <BellOutlineIcon
                    className="w-7 h-7"
                    aria-hidden="true"
                    onClick={() => mutate(notifications, true)}
                  />
                </>
              )}
            </div>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute rounded-lg right-0 mx-2 lg:mx-4 mt-4 z-50 bg-white lg:w-screen max-w-sm lg:max-w-md overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="">
                <div className="flex justify-between items-center p-6">
                  <h3 className="text-lg font-bold">Notifications</h3>
                </div>
                {!notifications ? (
                  <Spinner />
                ) : notifications?.length === 0 ? (
                  <div className="flex flex-col justify-center items-center mb-20 h-80">
                    <NotificationIlustration className="w-3/6" />
                    <p className="mt-4 text-gray-500 text-sm">
                      Oops. There is no notification right now.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-y-auto h-80">
                    {notifications
                      ?.sort((a, b) => {
                        // Turn your strings into dates, and then subtract them
                        // to get a value that is either negative, positive, or zero.
                        return new Date(b.created_at) - new Date(a.created_at);
                      })
                      ?.map((item) => (
                        <a
                          className="px-6 py-4 cursor-pointer hover:bg-gray-50 flex items-center gap-4"
                          onClick={() => close()}
                          key={item.id}
                        >
                          <div className="flex flex-col">
                            <span>{item.text}</span>
                            <span className="text-gray-400 text-sm font-light mt-2">
                              {moment(item.created_at).fromNow()}
                            </span>
                          </div>
                        </a>
                      ))}
                    {notifications?.length >= 5 && (
                      <div className="p-6 cursor-pointer flex justify-center items-center">
                        <span className="font-medium text-blue-600 transition-all delay-75">
                          View All Notifications
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default NotificationDropdown;
