import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import AdminSidebar from "../components/Sidebar/AdminSidebar";
import { RESET_USER, RESET_ERRORS } from "../constants/types";
import { motion } from "framer-motion";

import { useToast } from "@chakra-ui/toast";

function Admin({ children }) {
  const auth = useSelector((state) => state.auth);
  // const errors = useSelector((state) => state.errors);
  const toast = useToast();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const ac = new AbortController();
    if (
      auth.isAuthenticated === false ||
      auth.user.token === undefined ||
      auth.user.token === ""
    ) {
      dispatch({
        type: RESET_USER,
      });
      dispatch({
        type: RESET_ERRORS,
      });
      router.replace("/login");
      toast({
        title: "Error",
        description: "Not Authenticated",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      return ac.abort();
    }
  }, []);
  return (
    <>
      <div className="flex min-h-screen" style={{ background: "#f7fafc" }}>
        <AdminSidebar open={open} setOpen={setOpen} />
        <div className="overflow-y-auto flex-1">
          <AdminNavbar user={auth.user.user} setOpen={setOpen} open={open} />
          <main className="wrapper">
            <motion.div
              initial="initial"
              animate="animate"
              variants={{
                initial: {
                  opacity: 0,
                },
                animate: {
                  opacity: 1,
                },
              }}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Admin;
