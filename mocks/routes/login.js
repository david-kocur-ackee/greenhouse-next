module.exports = [
  {
    id: "post-login",
    url: "/login",
    method: "POST",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: {
            token: "mock-jwt-token-greenhouse-2026",
          },
        },
      },
      {
        id: "invalid-credentials",
        type: "json",
        options: {
          status: 401,
          body: { message: "Invalid email or password" },
        },
      },
      {
        id: "server-error",
        type: "json",
        options: {
          status: 500,
          body: { message: "Internal server error" },
        },
      },
    ],
  },
];
