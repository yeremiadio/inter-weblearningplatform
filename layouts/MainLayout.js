import Navbar from "../components/Navbars/Navbar";
import Head from "next/head";
import { motion } from "framer-motion";
import MainSideBar from "../components/Siderbars/MainSidebar";
import { useState } from "react";
// import Head from '../'
function MainLayout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Head>
        <title>Web Learning Platform</title>
      </Head>
      <MainSideBar open={open} setOpen={setOpen} />
      <Navbar open={open} setOpen={setOpen} />
      <main>
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
  );
}

export default MainLayout;
