module.exports = [
  {
    id: "get-current-preset",
    url: "/current-preset",
    method: "GET",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: {
            id: 1,
            name: "Tropical Plants",
            thresholds: [
              { type: "temperature", min: 18, max: 30 },
              { type: "humidity", min: 55, max: 85 },
              { type: "co2", min: 400, max: 1200 },
            ],
          },
        },
      },
      {
        id: "no-preset",
        type: "json",
        options: { status: 404, body: { message: "No preset configured" } },
      },
    ],
  },
];
