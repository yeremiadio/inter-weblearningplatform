const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const withPWA = require("next-pwa");

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return withPWA({
      pwa: {
        dest: "public",
        register: true,
        skipWaiting: true,
      },
      env: {
        baseUrl: process.env.LOCAL_API_URL,
      },
      trailingSlash: true,
      webpackDevMiddleware: (config) => {
        config.watchOptions = {
          poll: 1000,
          aggregateTimeout: 300,
        };
        return config;
      },
      images: {
        domains: ["*"],
      },
    });
  }

  return withPWA({
    pwa: {
      dest: "public",
      register: true,
      skipWaiting: true,
    },
    env: {
      baseUrl: process.env.API_URL,
    },
    trailingSlash: true,
    webpackDevMiddleware: (config) => {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
      return config;
    },
    images: {
      domains: ["*"],
    },
  });
};
