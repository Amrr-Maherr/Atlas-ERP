# Atlas ERP

Professional, modular ERP demo built with Next.js and TypeScript.

---

## Project Overview

- **Project name:** Atlas ERP
- **Short description:** A modern enterprise resource planning (ERP) demo application showcasing a feature-driven Next.js + TypeScript stack with a component-driven UI, local JSON API, and developer tooling for rapid prototyping.
- **Purpose / Problem solved:** Provides a full-stack frontend scaffold for managing core business entities (customers, products, suppliers, sales, purchase orders, employees, categories) to demonstrate real-world UI patterns, data fetching, client caching, and feature organisation for mid-sized web apps.
- **Key highlights:** Clean feature-based layout under `src/features`, TypeScript-first codebase, server-state management with TanStack Query, mock REST API via `json-server`, component primitives (shadcn/Tailwind), and tooling for generating and merging seed data.

---

## Features

- Authentication (email/password login against the seed `users` JSON).
- Dashboard with aggregated lists (categories, customers, suppliers, products, sales, purchase orders, employees).
- CRUD-style read pages for: Customers, Products, Suppliers, Employees, Categories, Sales, Purchase Orders.
- Pagination-friendly list endpoints and client-side paging.
- Reusable UI primitives and layout components (cards, tables, dialogs, forms, inputs, pagination).
- Export utilities (CSV export helper included).
- Drag-and-drop usage (dnd-kit) and basic charts (Recharts) for dashboards.
- Local development mock API via `json-server` with generated seed data.

> See the `src/features` folder for the concrete feature implementations.

---

## Tech Stack

| Area | Libraries / Tools |
|---|---|
| Framework | Next.js 16 (app router) |
| Language | TypeScript, React 19 |
| Styling | Tailwind CSS v4, utility-first CSS |
| UI primitives | shadcn components, custom `src/components/ui` set |
| State management | TanStack Query (react-query) for server state; local React state for UI state |
| Data fetching | Axios (`src/lib/api.ts`) + TanStack Query wrappers |
| Forms | react-hook-form |
| Validation | zod (present in deps for schemas) |
| Charts | Recharts |
| Drag & Drop | @dnd-kit/core (+ sortable & modifiers) |
| Animations | framer-motion |
| Notifications | sonner |
| Icons | lucide-react |
| Dev / Mock API | json-server, local `db.json`, DB generation scripts |

---

## Project Architecture

The project follows a feature-driven architecture with a component/UI primitives layer and application-level providers.

- `src/app` — Next.js app entry, global layout, fonts and global CSS.
- `src/components` — Reusable UI components and small composable primitives (ui folder contains form controls, table, dialog, etc.).
- `src/features` — Feature modules (auth, customers, products, suppliers, sales, purchase-orders, inventory, employees, dashboard, settings, profile, categories, branches). Each feature typically contains `api/`, `components/`, `hooks/`, `pages/` and `types/` when needed.
- `src/lib` — Small runtime utilities and `api.ts` (axios wrapper configured with `NEXT_PUBLIC_API_URL`).
- `src/providers` — Global providers (QueryClientProvider wrapper in `query-provider.tsx`).
- `src/utils` and `src/hooks` — Application helpers and custom hooks.
- `db/`, `scripts/` — Local development and seed data generator utilities.

Folder tree (simplified):

```
src/
├─ app/                # Next.js app router (layouts, pages)
├─ components/         # UI primitives and shared components
│  └─ ui/              # shadcn-style component primitives
├─ features/           # Feature modules (auth, customers, products, ...)
├─ providers/          # React providers (React Query, theme)
├─ lib/                # api.ts, utils
└─ styles/             # styling helpers

db/
scripts/
package.json
next.config.ts
tsconfig.json
```

### Design patterns used

- Feature-based modularization (each domain encapsulates its API, hooks and components).
- Provider pattern for global concerns (React Query client, theme provider).
- Axios wrapper (`src/lib/api.ts`) centralises base URL and common HTTP configuration.
- React Query for server-state caching and request lifecycle management.

---

## Application Flow

### Authentication flow

- Login is implemented in `src/features/auth` and performs a lookup against the mock users endpoint (`/users`) using `src/lib/api.ts`.
- On successful login the app stores a minimal `user` object in `localStorage` and sets a browser cookie (no JWT in this demo). The client redirects to `/dashboard`.
- Authorization is primarily client-side: route guards or server middleware are not implemented — adjust for production by integrating real auth tokens and server-side route protection.

### Data fetching flow

- All server requests go through `src/lib/api.ts` (axios instance). The base URL is `process.env.NEXT_PUBLIC_API_URL` or `http://localhost:3001`.
- TanStack Query is used to perform queries and mutations; caching behavior is configured in `src/providers/query-provider.tsx` (staleTime = 60s).

### UI / State update flow

- Forms use `react-hook-form` for validation and controlled inputs.
- After successful mutations, components either rely on React Query invalidation or local navigation to update UI state.

### Error handling

- API errors are surfaced through try/catch and mutation `onError` handlers; components show toasts (`sonner`) for user-friendly errors.

---

## Main Modules / Feature Notes

Below are the main feature folders and what they contain (refer to `src/features` for code):

- `auth` — Login page and components. Key files: `src/features/auth/components/login-form.tsx`, `src/features/auth/api/handleLogin.ts`, `src/features/auth/hooks/useLogin.ts`.
- `dashboard` — Aggregated lists to populate the dashboard. Uses several `getDashboard*` API helpers.
- `customers` — List and detail views; API helpers under `src/features/customers/api/customers.api.ts`.
- `products`, `suppliers`, `employees`, `sales`, `purchase-orders`, `categories`, `inventory` — Each feature exposes read/list APIs in their `api/` folder and UI components for lists and detail views.
- `profile` — User/profile related API helper `src/features/profile/api/users.api.ts`.

Implementation details:

- API helpers generally return `data.data` from the JSON response and map `items`/`total` for lists. The backend (json-server) is configured to return a paginated envelope.

---

## API Layer

- Central axios instance: `src/lib/api.ts`:

```ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

export default api;
```

- Endpoints: `json-server` exposes conventional REST endpoints for resources found in `db/` such as `/customers`, `/products`, `/suppliers`, `/employees`, `/sales`, `/purchaseOrders`, `/categories`, and `/users`.
- Request/response handling: client code uses axios and expects paginated responses for list endpoints (helpers access `data.data`).
- Errors: thrown errors are caught at mutation/query layers and surfaced to the UI via `sonner` toasts.
- Caching: TanStack Query handles caching. Default `staleTime` is configured to 60 seconds.

---

## State Management

- **Server state:** TanStack Query (React Query) is used for all server interactions — queries and mutations.
- **Global UI state:** Small providers (theme provider, toasts) and local storage for the currently logged-in `user`.
- **Local component state:** `useState`, `react-hook-form` for form state.

Reasoning: React Query provides predictable caching, background refetching and mutation management which is well-suited to CRUD-style ERP interfaces.

---

## UI System

- Component structure: `src/components/ui` contains base primitives; `src/components/layout` and `src/components/shared` contain layout components and page-specific shared pieces (headers, dialogs, tables).
- Reusable components: Buttons, Inputs, Dialogs, Tables, Pagination, Avatar, Badges — all designed as reusable primitives.
- Design system approach: utility-first Tailwind CSS combined with a shadcn-style primitives layer for consistent patterns.
- Responsive strategy: Tailwind responsive utilities; shared layout components implement adaptive patterns for sidebar and content.
- Accessibility: Input labels, ARIA attributes on form controls and focus management in dialog components are used; further a11y audits recommended for production.

---

## Performance Optimizations

- Image optimisation configured in `next.config.ts` (`remotePatterns` and image quality options).
- Fonts loaded via `next/font/google` with CSS variables for efficient layout.
- React Query caching reduces redundant requests (staleTime configured).
- Bundle/code splitting: Next.js handles route-based code splitting via the app router.

---

## Security Considerations

- Current authentication is a mock flow against the local JSON API; do NOT use this in production.
- Recommendations for production hardening:
  - Use secure token-based authentication (JWT/OAuth) with secure, HttpOnly cookies.
  - Implement server-side route guards and role-based access control.
  - Validate and sanitize all inputs server-side; keep client-side validation for UX only.
  - Keep secrets out of source control and use environment variables via your hosting provider.

---

## Installation & Setup

Clone repository and install dependencies:

```bash
git clone <repository-url>
cd atlas-erp
npm install
```

Environment variables (create a `.env.local` at project root):

```
NEXT_PUBLIC_API_URL=http://localhost:3001
# Add any other env vars required by your deployment
```

Local development:

1. Generate or merge the local DB (seed data):

```bash
npm run generate-db
```

2. Run the mock API server (json-server):

```bash
npm run json-server
```

3. Run Next.js in dev mode:

```bash
npm run dev
```

Production build (standard Next.js):

```bash
npm run build
npm start
```

Notes:
- `json-server` runs on port `3001` by default. Ensure `NEXT_PUBLIC_API_URL` points to the running mock API when developing locally.

---

## Deployment

This is a Next.js application and can be deployed to any platform that supports Node.js and Next (Vercel, Netlify with adapter, AWS, DigitalOcean App Platform, etc.). For production:

- Replace the mock API with a production API (REST or GraphQL). Update `NEXT_PUBLIC_API_URL` to the production endpoint.
- Use secure authentication tokens and server-side session management.
- Set up environment variables and CI pipelines to run `npm run build` and deploy the `.next` output.

---

## Screenshots

Add screenshots of the main pages here (Dashboard, Login, Customers, Products). (Placeholder)

---

## Future Improvements

- Replace mock JSON API with a real backend (Node/Express, Rails, or serverless functions).
- Implement secure authentication (server-issued JWTs or OAuth) and server-side authorization.
- Add end-to-end tests and CI pipeline.
- Improve accessibility (a11y), automated audits and keyboard navigation.
- Implement optimistic updates and richer offline support for TanStack Query.
- Add Storybook for isolated UI component documentation.

---

## Author

- Project: Atlas ERP
- Repository maintained by the project author (see commit history for contributors).

---

For details on implementation, open the major modules in `src/features` and the central axios instance `src/lib/api.ts`.
