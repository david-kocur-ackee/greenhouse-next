// In-memory schedule state. Seeded with realistic greenhouse watering intervals.
// dayOfWeek: 0=Monday … 6=Sunday (matches IntervalDto from the domain layer)
let nextId = 4;
let intervals = [
  { id: 1, startTime: "07:00:00", endTime: "07:15:00", dayOfWeek: 0 }, // Monday morning
  { id: 2, startTime: "12:00:00", endTime: "12:10:00", dayOfWeek: 2 }, // Wednesday midday
  { id: 3, startTime: "18:30:00", endTime: "18:45:00", dayOfWeek: 4 }, // Friday evening
];

module.exports = [
  {
    id: "get-schedule",
    url: "/schedule",
    method: "GET",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: (_req, res) => {
            res.status(200).json(intervals);
          },
        },
      },
      {
        id: "empty",
        type: "json",
        options: { status: 200, body: [] },
      },
    ],
  },
  {
    id: "post-schedule",
    url: "/schedule",
    method: "POST",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const payload = req.body;
            // Accept { intervals: [...] } or a bare array or a single object
            const toAdd = Array.isArray(payload)
              ? payload
              : Array.isArray(payload?.intervals)
                ? payload.intervals
                : [payload];

            const created = toAdd.map((item) => ({
              id: nextId++,
              startTime: item.startTime,
              endTime: item.endTime,
              dayOfWeek: item.dayOfWeek,
            }));
            intervals = [...intervals, ...created];
            res.status(201).json(created.length === 1 ? created[0] : created);
          },
        },
      },
      {
        id: "error",
        type: "json",
        options: { status: 400, body: { message: "Invalid interval data" } },
      },
    ],
  },
  {
    id: "put-schedule",
    url: "/schedule/:id",
    method: "PUT",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const id = parseInt(req.params.id, 10);
            const idx = intervals.findIndex((i) => i.id === id);
            if (idx === -1) {
              return res.status(404).json({ message: "Interval not found" });
            }
            intervals[idx] = { id, ...req.body };
            res.status(200).json(intervals[idx]);
          },
        },
      },
      {
        id: "not-found",
        type: "json",
        options: { status: 404, body: { message: "Interval not found" } },
      },
    ],
  },
  {
    id: "delete-schedule",
    url: "/schedule/:id",
    method: "DELETE",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const id = parseInt(req.params.id, 10);
            const before = intervals.length;
            intervals = intervals.filter((i) => i.id !== id);
            if (intervals.length === before) {
              return res.status(404).json({ message: "Interval not found" });
            }
            res.status(204).send();
          },
        },
      },
      {
        id: "error",
        type: "json",
        options: { status: 500, body: { message: "Delete failed" } },
      },
    ],
  },
];
