import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { themeProvider } from "../utils/theme";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps, router }) {
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
            <AnimatePresence exitBeforeEnter>
              <Layout>
                <NextNProgress options={{ showSpinner: false }} />
                <Component {...pageProps} key={router.route} />
              </Layout>
            </AnimatePresence>
          </ChakraProvider>
        </React.Fragment>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
