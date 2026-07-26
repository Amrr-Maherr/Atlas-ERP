# Atlas ERP

A modern enterprise resource planning (ERP) demo application built with Next.js 16, React 19, and TypeScript.

---

## Project Overview

Atlas ERP is a full-stack frontend scaffold for managing core business entities in an IT retail/wholesale context. It demonstrates real-world UI patterns, data fetching, client caching, and feature-based architecture for mid-sized web applications.

The application uses a mock REST API powered by `json-server` with generated seed data representing an Egyptian IT equipment distributor — including 214 products across 25 categories, 350 customers, 28 suppliers, 40 employees, 800 sales transactions, and 150 purchase orders.

### Business Modules

- **Categories** — Product category management with SEO fields and hierarchy
- **Customers** — Customer relationship management with loyalty tracking and VIP tiers
- **Suppliers** — Supplier/procurement management with ratings and verification
- **Products** — Product catalog with full inventory attributes (SKU, pricing, stock levels)
- **Employees** — HR records with departments, skills, and performance ratings
- **Sales** — Sales transaction tracking with invoicing and payment status
- **Purchase Orders** — Procurement order management with line items and approval workflow
- **Inventory** — Stock monitoring with reorder levels and warehouse locations (reads from the products endpoint with stock-focused views)

---

## Features

| Module | List | Detail | Edit | Delete | Pagination | Sort | Search | Export | Status Badge | Loading/Error/Empty |
|--------|------|--------|------|--------|------------|------|--------|--------|--------------|---------------------|
| **Authentication** | — | — | — | — | — | — | — | — | — | — |
| **Dashboard** | — | — | — | — | — | — | — | — | — | Yes |
| **Categories** | Yes | Yes | Yes | Yes | Yes | Yes | Yes | CSV/Excel/PDF | Yes | Yes |
| **Customers** | Yes | Yes | Yes | Yes | Yes | Yes | Yes | CSV/Excel/PDF | Yes | Yes |
| **Suppliers** | Yes | Yes | Yes | Yes | Yes | Yes | Yes | CSV/Excel/PDF | Yes | Yes |
| **Products** | Yes | Yes | Yes | Yes | Yes | Yes | Yes | CSV/Excel/PDF | Yes | Yes |
| **Employees** | Yes | Yes | Yes | Yes | Yes | Yes | Yes | CSV/Excel/PDF | Yes | Yes |
| **Sales** | Yes | Yes | Yes | Yes | Yes | Yes | Yes | CSV/Excel/PDF | Yes | Yes |
| **Purchase Orders** | Yes | Yes | Yes | Yes | Yes | Yes | Yes | CSV/Excel/PDF | Yes | Yes |
| **Inventory** | Yes | Yes | Yes | Yes | Yes | Yes | Yes | CSV/Excel/PDF | Yes | Yes |
| **Settings** | Yes | — | — | — | — | — | — | — | — | Yes |
| **Profile** | — | Yes | — | — | — | — | — | — | — | Yes |

**Notes:**
- All CRUD entity pages (Categories through Inventory) include a **Create Dialog** UI, but the create forms are not yet wired to POST endpoints.
- The **Inventory** feature reads from the same `/products` endpoint as Products, presenting a stock-focused view with computed status based on stock vs minimum stock levels.
- **Settings** displays configuration data in a tabbed layout (Company, Finance, Inventory, Sales, Notifications, Preferences).

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
| Drag & Drop | [@dnd-kit](https://dndkit.com/) (core, sortable, modifiers, utilities) |
| Animations | [Framer Motion v12](https://www.framer.com/motion/) |
| Notifications | [Sonner v2](https://sonner.emilkowal.dev/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Theme | [next-themes](https://github.com/pacocoursey/next-themes) |
| Export | [export-to-csv](https://www.npmjs.com/package/export-to-csv) (CSV), custom XML-based Excel, browser print-based PDF |
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
  components/   → Shared UI primitives, layout, and export utilities
  lib/          → Core utilities (axios instance, cn helper)
  providers/    → Global React providers
  hooks/        → Global hooks (use-mobile)
  types/        → Shared TypeScript types (placeholder)
  config/       → Configuration (placeholder)
  constants/    → Shared constants (placeholder)
  utils/        → Shared utilities (placeholder)
  assets/       → Static assets
  styles/       → Additional styles
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

Update and delete operations use `useMutation`:

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
| Users | `/users` | GET (by email, for authentication) |

### Response Format

List endpoints return paginated responses via `json-server`'s `_page` and `_per_page` query parameters. API helpers extract and return `{ items, total }` from the response envelope.

### Database Collections

| Collection | Records | Description |
|------------|---------|-------------|
| `categories` | 25 | Product categories with SEO metadata |
| `customers` | 350 | Customer profiles with loyalty data |
| `suppliers` | 28 | Supplier/vendor records |
| `products` | 214 | Full product catalog |
| `employees` | 40 | Employee records with departments |
| `sales` | 800 | Sales transactions |
| `saleItems` | 2,818 | Line items for sales (not yet accessed by features) |
| `purchaseOrders` | 150 | Procurement orders with line items |
| `settings` | 22 | Application configuration settings |
| `users` | 4 | User accounts for authentication |

---

## Project Structure

```
atlas-erp/
├── db/                              # Seed data (JSON files per resource)
│   ├── categories/
│   ├── customers/
│   ├── employees/
│   ├── products/
│   ├── purchaseOrders/
│   ├── sales/
│   ├── saleItems/
│   ├── settings/
│   ├── suppliers/
│   ├── users/
│   └── merge-db.js                  # Merges all JSON files into db.json
├── scripts/
│   ├── generate-erp-data.js         # Generates realistic seed data
│   └── enrich-db.js                 # Enriches records with additional fields
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── (auth)/
│   │   │   └── login/page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx           # Sidebar + header shell
│   │   │   └── dashboard/
│   │   │       ├── page.tsx         # Main dashboard
│   │   │       ├── categories/      # List + [id] detail + loading + error
│   │   │       ├── customers/       # List + [id] detail + loading + error
│   │   │       ├── suppliers/       # List + [id] detail + loading + error
│   │   │       ├── products/        # List + [id] detail + loading + error
│   │   │       ├── employees/       # List + [id] detail + loading + error
│   │   │       ├── sales/           # List + [id] detail + loading + error
│   │   │       ├── purchase-orders/ # List + [id] detail + loading + error
│   │   │       ├── inventory/       # List + [id] detail + loading + error
│   │   │       ├── profile/
│   │   │       └── settings/
│   │   ├── layout.tsx               # Root layout (fonts, providers)
│   │   ├── page.tsx                 # Redirects to /login
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                      # 31 shadcn/ui primitives + ExportMenu
│   │   ├── layout/navigation/       # Sidebar, header, nav components
│   │   ├── shared/                  # DataTable, CreateDialog, DeleteButton, PageHeader, Pagination
│   │   ├── lib/export/              # CSV, Excel, PDF export utilities
│   │   ├── utils/                   # Date formatting utility
│   │   ├── theme-provider.tsx
│   │   └── mode-toggle.tsx
│   ├── features/
│   │   ├── auth/                    # Login form, roles, authentication logic
│   │   ├── categories/              # CRUD + components + hooks + types
│   │   ├── customers/               # CRUD + components + hooks + types
│   │   ├── dashboard/               # KPI cards, charts, aggregated data
│   │   ├── employees/               # CRUD + components + hooks + types
│   │   ├── inventory/               # Stock management (reads /products)
│   │   ├── products/                # CRUD + components + hooks + types
│   │   ├── profile/                 # User profile
│   │   ├── purchase-orders/         # CRUD + components + hooks + types
│   │   ├── sales/                   # CRUD + components + hooks + types
│   │   ├── settings/                # App configuration (read-only)
│   │   └── suppliers/               # CRUD + components + hooks + types
│   ├── hooks/
│   │   └── use-mobile.ts            # Mobile breakpoint hook
│   ├── lib/
│   │   ├── api.ts                   # Axios instance
│   │   └── utils.ts                 # cn() class merge utility
│   ├── providers/
│   │   ├── index.ts
│   │   └── query-provider.tsx       # TanStack Query provider
│   ├── types/                       # Shared TypeScript types (placeholder)
│   ├── config/                      # Configuration (placeholder)
│   ├── constants/                   # Shared constants (placeholder)
│   ├── utils/                       # Shared utilities (placeholder)
│   ├── assets/                      # Static assets
│   ├── styles/                      # Additional styles
│   └── proxy.ts                     # Cookie-based auth redirect helper
├── .env.local                       # NEXT_PUBLIC_API_URL=http://localhost:3001
├── components.json                  # shadcn/ui configuration
├── db.json                          # Merged database (generated)
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
├── index.ts                         # Barrel exports
├── api/
│   └── <feature>.api.ts             # API functions (getList, getOne, update, delete)
├── components/
│   ├── <feature>-list.tsx           # Full list view with DataTable
│   ├── <feature>-table.tsx          # Table component
│   ├── <feature>-table-row.tsx      # Individual row
│   ├── <feature>-form.tsx           # Create/edit form
│   ├── <feature>-edit-dialog.tsx    # Edit modal
│   ├── <feature>-details.tsx        # Detail page wrapper
│   ├── <feature>-details-header.tsx
│   ├── <feature>-details-card.tsx
│   ├── <feature>-details-skeleton.tsx
│   ├── <feature>-details-error.tsx
│   ├── <feature>-skeleton.tsx       # List loading state
│   ├── <feature>-error.tsx          # List error state
│   ├── <feature>-empty.tsx          # Empty state
│   ├── <feature>-status-badge.tsx
│   ├── <feature>-row-actions.tsx
│   └── delete-<feature>-button.tsx
├── hooks/
│   └── <feature>.hooks.ts           # useQuery/useMutation wrappers
├── types/
│   └── <feature>.types.ts           # TypeScript interfaces
└── columns.tsx                      # TanStack Table column definitions
```

**Note:** The Products feature uses a split file structure for API and hooks (one file per operation) rather than a single consolidated file.

---

## Forms and Validation

Forms are built with **React Hook Form v7** for state management and field-level validation. Each entity feature includes:

- A **Form** component (`<feature>-form.tsx`) with field definitions, default values, and validation rules
- An **Edit Dialog** (`<feature>-edit-dialog.tsx`) wrapping the form in a modal with save/cancel actions
- A **Create Dialog** (shared `CreateDialog` component) for new entity creation (UI only, not yet wired to API)

Validation is handled through React Hook Form's built-in validation rules (required fields, min/max length, pattern matching). Zod is available as a dependency for schema-based validation where needed.

After successful mutations, components call `queryClient.invalidateQueries()` to refresh server state and show toast notifications via Sonner.

---

## Authentication and Authorization

Authentication is **client-side only**:

- Login form validates email and password against the `/users` endpoint
- On success, the user object is stored in `localStorage` and as a `user` cookie
- The cookie is used for route protection — a helper in `src/proxy.ts` checks for the cookie and redirects unauthenticated users to `/login`
- Four roles are defined: `Admin`, `Manager`, `Sales`, `Cashier`
- Roles are stored in the user object but **not enforced** in the UI (no route guards or permission-based rendering)

---

## Installation & Setup

### Prerequisites

- Node.js 18+
- npm

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
# Regenerate seed data (214 products, 350 customers, 28 suppliers, 40 employees, 800 sales)
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
- **Shared components** (`src/components/shared/`) — Feature-agnostic composites (DataTable, CreateDialog, DeleteButton, PageHeader, DataPagination).
- **Feature components** — Domain-specific UI within each feature module.

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

- **Create operations** — Wire up existing create form dialogs to POST endpoints for full CRUD
- **Real backend** — Replace json-server with a production API (REST or GraphQL)
- **Server-side auth** — Implement JWT/OAuth with server-side route protection and middleware
- **Role-based access** — Enforce permissions based on user roles in the UI and API
- **Testing** — Add unit tests, integration tests, and E2E tests (Playwright/Cypress)
- **CI/CD** — Set up GitHub Actions for linting, testing, and deployment
- **Optimistic updates** — Implement optimistic mutations in TanStack Query for better UX
- **Offline support** — Add service worker and offline caching with React Query
- **Storybook** — Document UI components in isolation
- **Internationalization** — Add i18n support for multi-language UI

---

## License

This project is for demonstration purposes. See repository for license details.
