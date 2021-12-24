import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import React, { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { themeProvider } from "../utils/theme";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import Router from "next/router";
import LoadingPageSpinner from "../components/Spinner/LoadingPageSpinner";

function MyApp({ Component, pageProps, router }) {
  const [loading, setLoading] = useState(false);
  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });
  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <React.Fragment>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <Head>
            <title>Web Learning Platform</title>
          </Head>
          <ChakraProvider theme={themeProvider}>
            <NextNProgress color="#2563EB" options={{ showSpinner: false }} />
            {loading ? (
              <LoadingPageSpinner />
            ) : (
              <AnimatePresence exitBeforeEnter>
                <Layout>
                  <Component {...pageProps} key={router.route} />
                </Layout>
              </AnimatePresence>
            )}
          </ChakraProvider>
        </React.Fragment>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
