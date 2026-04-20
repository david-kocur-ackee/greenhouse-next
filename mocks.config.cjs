module.exports = {
  server: {
    port: 3100,
    cors: {
      enabled: true,
      options: {
        preflightContinue: false,
      },
    },
  },
  mock: {
    collections: {
      selected: "default",
    },
    routes: {
      delay: 0,
    },
  },
  files: {
    path: "./mocks",
  },
};
