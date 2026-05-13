# Architecture

ElectroHub follows the React.js edition described in the planning files.

```text
React + Vite SPA -> Express REST API -> MongoDB
```

The current implementation reads and writes MongoDB collections through `backend/lib/mongodb.js`. Seed data for local/demo environments lives only in `backend/scripts/seed.js`.

## Frontend

- `src/pages`: route-level screens
- `src/components`: reusable UI blocks
- `src/hooks`: custom hooks such as cart persistence
- `src/services`: API and storage wrappers
- `src/store`: Redux-ready structure

## Backend

- `routes`: REST endpoints
- `middleware`: auth, admin guard and error handling
- `lib`: JWT and MongoDB helpers
- `scripts`: database ping and seed utilities
