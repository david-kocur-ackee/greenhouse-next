// Module-level state simulates the watering system toggle across requests.
// Resets to false on every server restart — intentional for mocks.
let toggleState = false;

module.exports = [
  {
    id: "get-watering-toggle",
    url: "/watering-system/toggle",
    method: "GET",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: (_req, res) => {
            res.status(200).json({ state: toggleState });
          },
        },
      },
      {
        id: "off",
        type: "json",
        options: { status: 200, body: { state: false } },
      },
      {
        id: "on",
        type: "json",
        options: { status: 200, body: { state: true } },
      },
    ],
  },
  {
    id: "post-watering-toggle",
    url: "/watering-system/toggle",
    method: "POST",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            // Accept explicit state from body, or flip current state
            if (typeof req.body?.state === "boolean") {
              toggleState = req.body.state;
            } else {
              toggleState = !toggleState;
            }
            res.status(200).json({ state: toggleState });
          },
        },
      },
      {
        id: "error",
        type: "json",
        options: { status: 500, body: { message: "Toggle failed" } },
      },
    ],
  },
];
