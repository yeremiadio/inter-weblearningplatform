import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useRef,
} from "react";
import Portal from "./Portal";

export const Modal = forwardRef(
  (
    {
      children,
      defaultOpened = false,
      clearState = null,
      disableCloseOutside = false,
    },
    ref
  ) => {
    const [open, setOpen] = useState(defaultOpened);
    const itRef = useRef(null);
    const isMounted = useRef(false);

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          if (isMounted.current) setOpen(true);
        },
        close: () => {
          if (isMounted.current) setOpen(false);
          if (clearState) clearState();
        },
      }),
      [open]
    );

    const handleEscape = useCallback((e) => {
      if (e.keyCode === 27) setOpen(false);
    }, []);

    useEffect(() => {
      isMounted.current = true;
      const handleClickOutside = (event) => {
        if (!itRef || !itRef.current) return false;
        if (
          !open ||
          itRef.current.contains(event.target) ||
          disableCloseOutside
        ) {
          return false;
        }
        setOpen(!open);
        if (clearState) clearState();
      };

      document.addEventListener("keydown", handleEscape, false);
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        isMounted.current = false;
        document.removeEventListener("keydown", handleEscape, false);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [open, handleEscape, itRef]);
    return (
      <Portal selector="#portal">
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="fixed z-50 inset-0 overflow-y-auto"
            onClose={setOpen}
          >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div
                  ref={itRef}
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                >
                  <div>{children}</div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </Portal>
    );
  }
);
