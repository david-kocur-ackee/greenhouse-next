# Plan: Implement @mocks-server/main Mocks

## Context

The app currently requires a live backend to function during development. `@mocks-server/main@4.1.0` is already installed in the root `package.json` devDependencies but is completely unconfigured. This plan sets it up to intercept all API endpoints so the app can run without a real backend, and to support multiple scenarios (happy path, error states, empty schedule, etc.).

The Next.js rewrite in `next.config.ts` proxies `/api/:path*` → `NEXT_PUBLIC_API_BASE_URL/:path*`, so pointing that env var at the mock server is all that's needed to wire everything together.

## Files to Create

```
/mocks.config.cjs                   ← server config (.cjs avoids ESM conflict from "type":"module")
/mocks/package.json                 ← overrides "type":"commonjs" for the mocks/ subtree
/mocks/collections.json             ← named scenario collections
/mocks/routes/measurements.js       ← GET /measurements/{temperature,co2,humidity}
/mocks/routes/preset.js             ← GET /current-preset
/mocks/routes/watering-toggle.js    ← GET + POST /watering-system/toggle
/mocks/routes/schedule.js           ← GET + POST /schedule, PUT + DELETE /schedule/:id
/mocks/routes/login.js              ← POST /login
```

## Files to Modify

- `/package.json` — add `"mocks"` and `"mocks:ci"` scripts
- `/apps/web/package.json` — add `"dev:mocks"` script

## Domain Shapes (confirmed from source)

| Response | Shape |
|---|---|
| `Measurement` (current) | `{ value: number, timestamp: number }` |
| `Measurement[]` (history) | 48 points × 30-min intervals |
| `IntervalDto` | `{ id, startTime: "HH:mm:ss", endTime: "HH:mm:ss", dayOfWeek: 0–6 }` |
| `Preset` | `{ id, name, thresholds: [{ type, min, max }] }` |
| Toggle | `{ state: boolean }` |
| Login | `{ token: string }` |

## Key Implementation Details

### ESM Conflict Resolution
Root `package.json` has `"type": "module"`, so `.js` files at root are ESM. Two mitigations:
1. Name the config `mocks.config.cjs` (explicit CommonJS)
2. Add `mocks/package.json` with `{ "type": "commonjs" }` so all route files in `mocks/` use CJS

### Query String Routing
mocks-server uses Express and matches on path only — `?current=true` is NOT part of route matching. Use `type: "middleware"` variants that inspect `req.query.current` to return either a single current reading or the historical array from the same route ID.

### Stateful CRUD (schedule + toggle)
Module-level variables in the middleware variants simulate in-memory state across requests. State resets on server restart — intentional for mocks.

### Collections

| Collection | Purpose |
|---|---|
| `default` | All happy-path responses; stateful toggle + schedule CRUD |
| `error-state` | Sensor 503s + login 401 (inherits from default) |
| `no-schedule` | Empty schedule array (inherits from default) |
| `watering-on` | Toggle fixed to `true` (inherits from default) |

## Script Additions

**Root `/package.json`:**
```json
"mocks": "mocks-server",
"mocks:ci": "mocks-server --no-watch"
```

**`/apps/web/package.json`:**
```json
"dev:mocks": "NEXT_PUBLIC_API_BASE_URL=http://localhost:3100 next dev"
```

## How to Run

```bash
# Terminal 1 — start mock server (port 3100, admin UI on 3110)
yarn mocks

# Terminal 2 — start Next.js pointed at mock server
cd apps/web && yarn dev:mocks
```

Alternatively, add `NEXT_PUBLIC_API_BASE_URL=http://localhost:3100` to `apps/web/.env.local` and just run `yarn dev`.

## Verification

1. `yarn mocks` starts with no errors and prints "Server started"
2. `curl http://localhost:3100/measurements/temperature?current=true` returns `{ value: 22.4, timestamp: ... }`
3. `curl http://localhost:3100/measurements/temperature` returns an array of 48 objects
4. `curl http://localhost:3100/schedule` returns 3 seeded intervals
5. `curl -X POST http://localhost:3100/login -H 'Content-Type: application/json' -d '{"email":"a","password":"b"}'` returns `{ token: "mock-jwt-token-greenhouse-2026" }`
6. `yarn dev:mocks` in `apps/web` loads the home page with charts populated from mock data
7. Admin UI at `http://localhost:3110` lets you switch to `error-state` collection to test error UX
