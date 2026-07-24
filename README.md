# Atlas ERP

A modern enterprise resource planning (ERP) demo application built with Next.js 16, React 19, and TypeScript.

---

## Project Overview

Atlas ERP is a full-stack frontend scaffold for managing core business entities in an IT retail/wholesale context. It demonstrates real-world UI patterns, data fetching, client caching, and feature-based architecture for mid-sized web applications.

The application uses a mock REST API powered by `json-server` with generated seed data representing an Egyptian IT equipment distributor — including 200+ products across 25 categories, 30+ customers, suppliers, employees, sales transactions, and purchase orders.

### Business Modules

- **Categories** — Product category management with SEO fields and hierarchy
- **Customers** — Customer relationship management with loyalty tracking and VIP tiers
- **Suppliers** — Supplier/procurement management with ratings and verification
- **Products** — Product catalog with full inventory attributes (SKU, pricing, stock levels)
- **Employees** — HR records with departments, skills, and performance ratings
- **Sales** — Sales transaction tracking with invoicing and payment status
- **Purchase Orders** — Procurement order management with line items and approval workflow
- **Inventory** — Stock monitoring with reorder levels and warehouse locations

---

## Features

| Module | Capabilities |
|--------|-------------|
| **Authentication** | Email/password login against seed users, role-based access (Admin, Manager, Sales, Cashier), session via localStorage + cookie |
| **Dashboard** | Aggregated KPI cards (Revenue, Customers, Orders, Products), monthly revenue chart, order status breakdown, inventory/customer stats |
| **Categories** | Paginated list, detail view, edit dialog, status badges, SEO metadata display |
| **Customers** | Paginated list, detail view, edit dialog, VIP status, loyalty points, payment terms |
| **Suppliers** | Paginated list, detail view, edit dialog, verification status, ratings, delivery tracking |
| **Products** | Paginated list, detail view, edit dialog, SKU/barcode, pricing tiers, stock levels, specifications |
| **Employees** | Paginated list, detail view, edit dialog, department/position, skills, performance ratings |
| **Sales** | Paginated list, detail view, invoice tracking, payment methods, order status |
| **Purchase Orders** | Paginated list, detail view, line items, supplier linkage, approval workflow |
| **Inventory** | Paginated list, detail view, stock levels, reorder alerts, warehouse locations |
| **Settings** | Application configuration display (read-only) |
| **Profile** | User profile details |

Each entity page includes loading skeletons, error boundaries, empty states, and CSV/Excel/PDF export options.

---

## Tech Stack

| Area | Technology |
|------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) 5 |
| UI Library | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) (base-nova style) |
| Server State | [TanStack Query v5](https://tanstack.com/query) |
| Table | [TanStack Table v8](https://tanstack.com/table) |
| Forms | [React Hook Form v7](https://react-hook-form.com/) |
| Validation | [Zod v4](https://zod.dev/) |
| HTTP Client | [Axios](https://axios-http.com/) |
| Mock API | [json-server v1](https://github.com/typicode/json-server) |
| Charts | [Recharts v3](https://recharts.org/) |
| Drag & Drop | [@dnd-kit](https://dndkit.com/) (core, sortable, modifiers) |
| Animations | [Framer Motion v12](https://www.framer.com/motion/) |
| Notifications | [Sonner v2](https://sonner.emilkowal.dev/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Theme | [next-themes](https://github.com/pacocoursey/next-themes) |
| Export | [export-to-csv](https://www.npmjs.com/package/export-to-csv) |
| Font | Geist Sans, Geist Mono, Inter (via `next/font/google`) |

---

## Architecture

The project follows a **feature-based vertical slice architecture**. Each business domain is encapsulated into an isolated module under `src/features/`, containing its own API layer, hooks, components, types, and utilities.

### Design Principles

- **Feature isolation** — Each feature module is self-contained. Features do not import from each other directly.
- **Consistent patterns** — Every entity feature follows the same component structure (list, table, form, details, dialogs, badges, skeleton/error/empty states).
- **Separation of concerns** — API calls, hooks, types, and UI components are separated into dedicated folders within each feature.
- **Shared primitives** — Reusable UI components live in `src/components/ui/` and `src/components/shared/`, used across all features.
- **Provider pattern** — Global concerns (React Query client, theme, tooltips, toasts) are handled via providers in the root layout.

### Layer Separation

```
src/
  app/          → Route definitions and page compositions
  features/     → Domain logic (api, hooks, components, types)
  components/   → Shared UI primitives and layout
  lib/          → Core utilities (axios instance, cn helper)
  providers/    → Global React providers
```

---

## Data Fetching

All server state is managed through **TanStack Query v5**.

### Queries

Each feature defines `useQuery` hooks for list and detail data:

```typescript
// Example from src/features/customers/hooks/customers.hooks.ts
export function useCustomers({ page, per_page }) {
  return useQuery({
    queryKey: ["customers", page, per_page],
    queryFn: () => getCustomers({ page, per_page }),
  });
}
```

### Mutations

Create, update, and delete operations use `useMutation`:

```typescript
export function useDeleteCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Customer deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete customer");
    },
  });
}
```

### Cache Invalidation Strategy

- After successful mutations, relevant query keys are invalidated to trigger automatic refetch.
- `staleTime` is set to **60 seconds** globally to balance freshness and performance.
- Query keys follow the pattern `["resourceName", ...params]` for granular invalidation.

---

## API Layer

### Axios Instance

A centralized axios instance is configured in `src/lib/api.ts`:

```typescript
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

export default api;
```

### Endpoint Structure

The `json-server` backend exposes conventional REST endpoints:

| Resource | Endpoint | Operations |
|----------|----------|-----------|
| Categories | `/categories` | GET (list), GET `/:id`, PATCH `/:id`, DELETE `/:id` |
| Customers | `/customers` | GET (list), GET `/:id`, PATCH `/:id`, DELETE `/:id` |
| Suppliers | `/suppliers` | GET (list), GET `/:id`, PATCH `/:id`, DELETE `/:id` |
| Products | `/products` | GET (list), GET `/:id`, PATCH `/:id`, DELETE `/:id` |
| Employees | `/employees` | GET (list), GET `/:id`, PATCH `/:id`, DELETE `/:id` |
| Sales | `/sales` | GET (list), GET `/:id`, PATCH `/:id`, DELETE `/:id` |
| Purchase Orders | `/purchaseOrders` | GET (list), GET `/:id`, PATCH `/:id`, DELETE `/:id` |
| Settings | `/settings` | GET (list), GET `/:id` |
| Users | `/users` | GET (by email, for auth) |

### Response Format

List endpoints return paginated responses via `json-server`'s `_page` and `_per_page` query parameters. API helpers extract and return `{ items, total }` from the response envelope.

---

## Project Structure

```
atlas-erp/
├── db/                          # Seed data (JSON files per resource)
│   ├── categories/
│   ├── customers/
│   ├── employees/
│   ├── products/
│   ├── purchaseOrders/
│   ├── sales/
│   ├── saleItems/
│   ├── suppliers/
│   ├── users/
│   └── merge-db.js              # Merges all JSON files into db.json
├── scripts/
│   ├── generate-erp-data.js     # Generates realistic seed data
│   └── enrich-db.js             # Enriches records with additional fields
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/
│   │   │   └── login/page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx       # Sidebar + header shell
│   │   │   └── dashboard/
│   │   │       ├── page.tsx     # Main dashboard
│   │   │       ├── categories/  # List + [id] detail
│   │   │       ├── customers/   # List + [id] detail
│   │   │       ├── suppliers/   # List + [id] detail
│   │   │       ├── products/    # List + [id] detail
│   │   │       ├── employees/   # List + [id] detail
│   │   │       ├── sales/       # List + [id] detail
│   │   │       ├── purchase-orders/ # List + [id] detail
│   │   │       ├── inventory/   # List + [id] detail
│   │   │       ├── profile/
│   │   │       └── settings/
│   │   ├── layout.tsx           # Root layout (fonts, providers)
│   │   ├── page.tsx             # Redirects to /login
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                  # 30+ shadcn/ui primitives
│   │   ├── layout/navigation/   # Sidebar, header, nav components
│   │   ├── shared/              # DataTable, CreateDialog, DeleteButton, PageHeader, Pagination
│   │   ├── lib/export/          # CSV, Excel, PDF export utilities
│   │   ├── theme-provider.tsx
│   │   └── mode-toggle.tsx
│   ├── features/
│   │   ├── auth/                # Login, roles
│   │   ├── categories/          # CRUD + components + hooks + types
│   │   ├── customers/           # CRUD + components + hooks + types
│   │   ├── dashboard/           # KPI cards, charts, aggregated data
│   │   ├── employees/           # CRUD + components + hooks + types
│   │   ├── inventory/           # Stock management (reads /products)
│   │   ├── products/            # CRUD + components + hooks + types
│   │   ├── profile/             # User profile
│   │   ├── purchase-orders/     # CRUD + components + hooks + types
│   │   ├── sales/               # CRUD + components + hooks + types
│   │   ├── settings/            # App configuration (read-only)
│   │   └── suppliers/           # CRUD + components + hooks + types
│   ├── lib/
│   │   ├── api.ts               # Axios instance
│   │   └── utils.ts             # cn() class merge utility
│   ├── providers/
│   │   └── query-provider.tsx   # TanStack Query provider
│   └── hooks/
│       └── use-mobile.ts        # Mobile breakpoint hook
├── .env.local                   # NEXT_PUBLIC_API_URL=http://localhost:3001
├── components.json              # shadcn/ui configuration
├── db.json                      # Merged database (generated)
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
└── package.json
```

### Feature Module Structure

Each feature follows a consistent internal layout:

```
src/features/<feature>/
├── index.ts                     # Barrel exports
├── api/
│   └── <feature>.api.ts         # API functions (getList, getOne, update, delete)
├── components/
│   ├── <feature>-list.tsx       # Full list view with DataTable
│   ├── <feature>-table.tsx      # Table component
│   ├── <feature>-table-row.tsx  # Individual row
│   ├── <feature>-form.tsx       # Create/edit form
│   ├── <feature>-edit-dialog.tsx # Edit modal
│   ├── <feature>-details.tsx    # Detail page wrapper
│   ├── <feature>-details-header.tsx
│   ├── <feature>-details-card.tsx
│   ├── <feature>-details-skeleton.tsx
│   ├── <feature>-details-error.tsx
│   ├── <feature>-skeleton.tsx   # List loading state
│   ├── <feature>-error.tsx      # List error state
│   ├── <feature>-empty.tsx      # Empty state
│   ├── <feature>-status-badge.tsx
│   ├── <feature>-row-actions.tsx
│   └── delete-<feature>-button.tsx
├── hooks/
│   └── <feature>.hooks.ts       # useQuery/useMutation wrappers
├── types/
│   └── <feature>.types.ts       # TypeScript interfaces
└── columns.tsx                  # TanStack Table column definitions
```

---

## Installation & Setup

### Prerequisites

- Node.js 18+
- npm or pnpm

### Steps

```bash
# Clone the repository
git clone <repository-url>
cd atlas-erp

# Install dependencies
npm install

# Create environment file
cp .env .env.local
```

### Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Running the Application

You need **two terminals** — one for the mock API and one for the Next.js dev server:

```bash
# Terminal 1: Start the mock API server (generates DB if needed, then starts json-server on port 3001)
npm run json-server

# Terminal 2: Start the Next.js development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Data Management

```bash
# Regenerate seed data (200+ products, 30+ customers, suppliers, employees, sales)
npm run generate-db

# Rebuild db.json from individual JSON files without regenerating
npm run build-db
```

### Production Build

```bash
npm run build
npm start
```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run json-server` | Build DB + start json-server on port 3001 |
| `npm run generate-db` | Generate seed data + merge into db.json |
| `npm run build-db` | Merge individual JSON files into db.json |

---

## Development Guidelines

### Naming Conventions

- **Files:** kebab-case (`customer-form.tsx`, `customers.api.ts`)
- **Components:** PascalCase (`CustomerForm`, `CustomersTable`)
- **Hooks:** camelCase with `use` prefix (`useCustomers`, `useDeleteCustomer`)
- **Types:** PascalCase (`Customer`, `CustomerType`)
- **API functions:** camelCase, verb-first (`getCustomers`, `deleteCustomer`, `updateCustomer`)
- **Route groups:** Parentheses for layouts — `(auth)`, `(dashboard)`

### Feature Isolation

- Each feature lives in `src/features/<feature>/` and is self-contained.
- Features do **not** import from other features. Shared functionality goes in `src/components/` or `src/lib/`.
- Every feature exports its public API through `index.ts` barrel files.

### Reusable Components

- **UI primitives** (`src/components/ui/`) — Low-level building blocks (Button, Input, Dialog, Table, etc.). Based on shadcn/ui.
- **Shared components** (`src/components/shared/`) — Feature-agnostic composites (DataTable, CreateDialog, DeleteButton, PageHeader).
- **Feature components** — Domain-specific UI within each feature module.

### Forms

- Forms use **React Hook Form** for state management and validation.
- Validation schemas are defined with **Zod** where applicable.
- After successful mutations, components call `queryClient.invalidateQueries()` to refresh server state.

### State Management

- **Server state** — Managed entirely by TanStack Query (queries, mutations, cache).
- **UI state** — Local `useState` and React Hook Form.
- **Global state** — Theme (next-themes), auth user (localStorage + cookie).
- No global state library (Redux, Zustand, etc.) is used.

---

## Design System

A comprehensive design system is documented in `DESIGN_SYSTEM.md`, covering:

- Brand personality and visual identity
- oklch color palette (light/dark themes)
- Typography scale (Geist Sans/Mono)
- Spacing, border radius, and elevation tokens
- Component specifications (buttons, inputs, cards, tables, charts)
- Motion and animation tokens
- Accessibility guidelines (WCAG 2.1 AA)
- Responsive breakpoints (sm through 2xl)

---

## Future Improvements

- **Create operations** — Wire up create forms to POST endpoints for full CRUD
- **Real backend** — Replace json-server with a production API (REST or GraphQL)
- **Server-side auth** — Implement JWT/OAuth with server-side route protection and middleware
- **Testing** — Add unit tests, integration tests, and E2E tests (Playwright/Cypress)
- **CI/CD** — Set up GitHub Actions for linting, testing, and deployment
- **Optimistic updates** — Implement optimistic mutations in TanStack Query for better UX
- **Offline support** — Add service worker and offline caching with React Query
- **Storybook** — Document UI components in isolation
- **Internationalization** — Add i18n support for multi-language UI
- **Accessibility audit** — Full a11y review and keyboard navigation improvements
- **Role-based access** — Server-enforced permissions based on user roles

---

## License

This project is for demonstration purposes. See repository for license details.
