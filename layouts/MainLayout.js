import Navbar from "../components/Navbar/Navbar";
// import Head from "next/head";
import { motion } from "framer-motion";
import MainSideBar from "../components/Sidebar/MainSidebar";
import { useState } from "react";
// import Head from '../'
function MainLayout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-wrapper">
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
      <footer className="bottom-0 p-4 bg-blue-inter">
        <p className="text-sm text-white text-center opacity-50">
          Copyright - Inter "Web Learning Platform" {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default MainLayout;
