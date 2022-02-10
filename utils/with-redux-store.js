import React from "react";
import { initializeStore } from "../redux/store";

const isServer = typeof window === "undefined";
const NEXTJS_REDUX_STORE = "NEXTJS_REDUX_STORE";

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[NEXTJS_REDUX_STORE]) {
    window[NEXTJS_REDUX_STORE] = initializeStore(initialState);
  }
  return window[NEXTJS_REDUX_STORE];
}

const withReduxStore = (App) => {
  return class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrCreateStore();

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === "function") {
        appProps = await App.getInitialProps(appContext);
      }
      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      };
    }
    static async getServerSideProps(appContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrCreateStore();

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};
      if (typeof App.getServerSideProps === "function") {
        appProps = await App.getServerSideProps(appContext);
      }
      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      };
    }

    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};

export default withReduxStore;
