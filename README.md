# Service Pulse — Observability Dashboard Demo

A newly created portfolio demo built with React, TypeScript and Vite. It presents a fictional service-health dashboard with search, status filtering, summaries and service details. Every metric and incident is synthetic and static; this is not a real employer system, live monitoring tool or a past client project.

## Run

Requires Node.js 20 or newer.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. To check the model and production build:

```bash
npm test
npm run build
```

## Design and limits

The data model, filtering and summary logic live in `src/model.ts` and are covered by unit tests. The interface includes labelled controls, keyboard-focus styles, a responsive layout and a clear demo-data label. There is no backend, authentication, real telemetry, charting, alert management or deployment. A production system would require a real data source, authentication, accessible UI testing and security review.
