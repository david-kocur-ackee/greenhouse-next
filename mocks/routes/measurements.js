function makeHistory(base, spread) {
  const now = Date.now();
  const points = [];
  for (let i = 47; i >= 0; i--) {
    points.push({
      value: parseFloat((base + (Math.random() - 0.5) * spread * 2).toFixed(1)),
      timestamp: now - i * 30 * 60 * 1000,
    });
  }
  return points;
}

// Generated once at server start so charts show consistent data
const TEMP_HISTORY = makeHistory(22.0, 3.0);
const CO2_HISTORY = makeHistory(820, 180);
const HUMIDITY_HISTORY = makeHistory(64, 12);

module.exports = [
  {
    id: "get-measurements-temperature",
    url: "/measurements/temperature",
    method: "GET",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            if (req.query.current === "true") {
              res.status(200).json({ value: 22.4, timestamp: Date.now() });
            } else {
              res.status(200).json(TEMP_HISTORY);
            }
          },
        },
      },
      {
        id: "error",
        type: "json",
        options: { status: 503, body: { message: "Temperature sensor unavailable" } },
      },
    ],
  },
  {
    id: "get-measurements-co2",
    url: "/measurements/co2",
    method: "GET",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            if (req.query.current === "true") {
              res.status(200).json({ value: 812, timestamp: Date.now() });
            } else {
              res.status(200).json(CO2_HISTORY);
            }
          },
        },
      },
      {
        id: "error",
        type: "json",
        options: { status: 503, body: { message: "CO2 sensor unavailable" } },
      },
    ],
  },
  {
    id: "get-measurements-humidity",
    url: "/measurements/humidity",
    method: "GET",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            if (req.query.current === "true") {
              res.status(200).json({ value: 67, timestamp: Date.now() });
            } else {
              res.status(200).json(HUMIDITY_HISTORY);
            }
          },
        },
      },
      {
        id: "error",
        type: "json",
        options: { status: 503, body: { message: "Humidity sensor unavailable" } },
      },
    ],
  },
];
