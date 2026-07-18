<div align="center">

# Atlas ERP

**Enterprise Resource Planning System for IT & Computer Hardware Retail**

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

A full-featured, production-ready ERP system designed for Egyptian IT and computer hardware trading companies. Built with modern web technologies and enterprise-grade architecture.

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Project Architecture](#project-architecture)
- [Screens](#screens)
- [Installation](#installation)
- [Environment](#environment)
- [Available Scripts](#available-scripts)
- [Future Roadmap](#future-roadmap)
- [Project Highlights](#project-highlights)
- [Learning Outcomes](#learning-outcomes)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

---

## Project Overview

Atlas ERP is an internal enterprise resource planning system built for companies operating in the IT and computer hardware retail space in Egypt. It centralizes core business operations — including product catalog management, customer relationships, supplier procurement, sales tracking, inventory control, employee management, and financial reporting — into a single, unified dashboard.

The system is designed for **business owners**, **operations managers**, **warehouse staff**, and **sales teams** who need real-time visibility into their business performance, stock levels, customer data, and procurement pipelines.

### Why This Architecture

- **Next.js App Router** — Server-side rendering, route groups, and nested layouts for a modular page structure
- **Feature-Based (Vertical Slice) Architecture** — Each business domain is self-contained with its own components, hooks, types, schemas, and API layer, making features easy to develop, test, and scale independently
- **JSON Server Mock API** — Enables full frontend development without a backend team, with a realistic seeded database that mirrors production data structures
- **shadcn/ui + Base UI Primitives** — Accessible, customizable UI components that don't lock the project into a rigid design system

---

## Features

### Implemented

| Feature | Description |
|---------|-------------|
| **Authentication** | Email/password login with role-based users (admin, manager, cashier, warehouse). Client-side validation, show/hide password toggle, toast notifications, and localStorage session persistence |
| **Dashboard Analytics** | KPI summary cards (Total Revenue, New Customers, Active Accounts, Growth Rate) with real API data. Monthly revenue area chart (Recharts). Tabbed cards for recent orders, top customers, low-stock alerts, and top suppliers |
| **Shared DataTable** | Reusable data table built on TanStack Table with column sorting, loading skeletons, error/empty states, pagination, and a toolbar with export actions. Used across all 8 entity list views |
| **Server-Side Pagination** | DataPagination component with ellipsis logic, wired to all 8 API endpoints using JSON Server `?_page=N&_per_page=10` with `{ data, items }` response format |
| **Data Export** | ExportMenu dropdown on every entity table. Export to CSV (via `export-to-csv`), Excel (SpreadsheetML XML), and PDF (print-ready HTML) |
| **Create Dialogs** | Reusable CreateDialog wrapper with shared PageHeader action buttons. Entity-specific form layouts for all 8 entities |
| **Sidebar Navigation** | Collapsible sidebar with categorized navigation (Main, Secondary), user avatar dropdown, Quick Create button, and responsive mobile sheet overlay |
| **Top Header** | Breadcrumb-style header with sidebar toggle trigger, page title, and optional action slot |
| **Detail Views** | Rich detail pages for all 8 entities with composed card layouts, loading skeletons, error states, and entity-specific data sections |
| **Toast Notifications** | Themed toast system with success, error, info, and warning variants using Sonner |
| **Settings** | Full settings page with tabbed UI (Company, Finance, Inventory, Sales, Notifications, Preferences). Displays all configuration values with badges for boolean settings |
| **User Profile** | Profile page showing avatar, role badge, and personal info (name, email, phone, department, position, permissions). Reads user from localStorage session |
| **Active Sidebar Links** | Sidebar navigation highlights the current route using pathname detection with `isActive` prop on menu buttons |
| **Dark Mode** | Full dark mode support via next-themes with system/light/dark toggle in the header |
| **Responsive Design** | Mobile-first responsive layout with adaptive sidebar, header, and content area |
| **UI Component Library** | 30 reusable UI primitives (Button, Card, Badge, Table, Tabs, Drawer, Sheet, Select, Checkbox, Tooltip, Dialog, Textarea, etc.) |

### Seed Data

The mock database comes pre-loaded with realistic data for an Egyptian electronics trading company:

- **18** product categories (Laptops, Desktop PCs, Monitors, etc.)
- **35+** customer records with loyalty tiers (Bronze/Silver/Gold)
- **20+** products with SKUs, barcodes, specifications, and pricing
- **10+** supplier records with ratings and payment terms
- **Employee records** with departments, salaries, and certifications
- **Sales transactions** with line items, payment methods, and shipping details
- **Purchase orders** with approval workflows and item breakdowns

---

## Tech Stack

### Core

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org) | 16.2.10 | React framework with App Router, SSR, route groups, and nested layouts |
| [React](https://react.dev) | 19.2.4 | UI library with hooks, context, and server component support |
| [TypeScript](https://www.typescriptlang.org) | ^5 | Type-safe development with strict mode enabled |

### Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| [Tailwind CSS](https://tailwindcss.com) | ^4 | Utility-first CSS with CSS-first configuration and OKLCH color tokens |
| [tw-animate-css](https://github.com/wanpan11/tw-animate-css) | ^1.4.0 | CSS animation utilities for Tailwind components |
| [Class Variance Authority](https://cva.style) | ^0.7.1 | Component variant management (Button, Badge, etc.) |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | ^3.6.0 | Intelligent Tailwind class merging without conflicts |
| [clsx](https://github.com/lukeed/clsx) | ^2.1.1 | Conditional className joining |

### UI Components

| Technology | Version | Purpose |
|------------|---------|---------|
| [shadcn/ui](https://ui.shadcn.com) | ^4.13.0 | Copy-paste UI components built on Base UI primitives (base-nova style) |
| [@base-ui/react](https://base-ui.com) | ^1.6.0 | Headless, accessible UI primitives powering shadcn components |
| [Lucide React](https://lucide.dev) | ^1.24.0 | Consistent, lightweight icon library |

### Data & State

| Technology | Version | Purpose |
|------------|---------|---------|
| [TanStack React Query](https://tanstack.com/query) | ^5.101.2 | Server state management, caching, and data fetching |
| [Axios](https://axios-http.com) | ^1.18.1 | HTTP client for REST API communication |
| [JSON Server](https://github.com/typicode/json-server) | ^1.0.0-beta.15 | Mock REST API with full CRUD support on port 3001 |

### Forms & Validation

| Technology | Version | Purpose |
|------------|---------|---------|
| [React Hook Form](https://react-hook-form.com) | ^7.81.0 | Performant form management with minimal re-renders |
| [Zod](https://zod.dev) | ^4.4.3 | TypeScript-first schema validation |

### Tables & Drag-and-Drop

| Technology | Version | Purpose |
|------------|---------|---------|
| [TanStack React Table](https://tanstack.com/table) | ^8.21.3 | Headless table with sorting, filtering, pagination, and selection |
| [@dnd-kit](https://dndkit.com) | ^6–10 | Drag-and-drop for row reordering with vertical axis constraint |

### Charts & Visualization

| Technology | Version | Purpose |
|------------|---------|---------|
| [Recharts](https://recharts.org) | ^3.8.0 | Responsive area charts with theme-aware color configuration |

### Export

| Technology | Version | Purpose |
|------------|---------|---------|
| [export-to-csv](https://www.npmjs.com/package/export-to-csv) | ^1.4.0 | Client-side CSV export with configurable columns and options |

### Utilities

| Technology | Version | Purpose |
|------------|---------|---------|
| [Sonner](https://sonner.emilkowal.ski) | ^2.0.7 | Toast notifications with theme integration |
| [next-themes](https://github.com/pacocoursey/next-themes) | ^0.4.6 | System/light/dark theme management |
| [Framer Motion](https://www.framer.com/motion) | ^12.42.2 | Animation library for UI transitions |

### Dev Tools

| Technology | Version | Purpose |
|------------|---------|---------|
| [ESLint](https://eslint.org) | ^9 | Code linting with flat config and Next.js rules |
| [PostCSS](https://postcss.org) | — | CSS processing pipeline for Tailwind |

---

## Folder Structure

```
atlas-erp/
├── app/                          # Next.js App Router pages and layouts
│   ├── (auth)/                   # Unauthenticated route group
│   │   └── login/page.tsx        # Login page
│   └── (dashboard)/              # Authenticated route group
│       ├── layout.tsx            # Dashboard shell (Sidebar + Header)
│       └── dashboard/
│           ├── page.tsx          # Analytics dashboard
│           ├── categories/       # Category list + [id] detail
│           ├── customers/        # Customer list + [id] detail
│           ├── employees/        # Employee list + [id] detail
│           ├── inventory/        # Inventory list + [id] detail
│           ├── products/         # Product list + [id] detail
│           ├── purchase-orders/  # Purchase order list + [id] detail
│           ├── sales/            # Sale list + [id] detail
│           ├── settings/         # Application settings (tabbed sections)
│           ├── suppliers/        # Supplier list + [id] detail
│           └── profile/          # User profile page
│
├── features/                     # Feature modules (vertical slice architecture)
│   ├── auth/                     # Authentication (login form, hooks, API)
│   ├── dashboard/                # Dashboard analytics (charts, KPI cards)
│   ├── categories/               # Category CRUD (api, hooks, components, types)
│   ├── customers/                # Customer CRUD (api, hooks, components, types)
│   ├── employees/                # Employee CRUD (api, hooks, components, types)
│   ├── products/                 # Product CRUD (api, hooks, components, types)
│   ├── suppliers/                # Supplier CRUD (api, hooks, components, types)
│   ├── inventory/                # Inventory tracking (api, hooks, components, types)
│   ├── sales/                    # Sales management (api, hooks, components, types)
│   ├── purchase-orders/          # Purchase order management (api, hooks, components, types)
│   ├── settings/                 # Settings (api, hooks, components, types)
│   └── profile/                  # User profile (api, hooks, components, types, utils)
│
├── components/                   # Shared components
│   ├── layout/                   # Layout components
│   │   └── navigation/           # Sidebar, header, nav items, user menu
│   ├── shared/                   # Feature-agnostic shared components
│   │   ├── data-table/           # Reusable DataTable (TanStack Table)
│   │   ├── create-dialog/        # Reusable create dialog wrapper
│   │   ├── pagination/           # DataPagination component
│   │   └── page-header.tsx       # Page header with title + actions slot
│   ├── lib/                      # Shared libraries
│   │   └── export/               # CSV, Excel, PDF export utilities
│   └── ui/                       # 30 shadcn/ui primitives
│
├── providers/                    # React context providers
│   └── query-provider.tsx        # TanStack Query client (60s stale time)
│
├── hooks/                        # Shared custom hooks
│   └── use-mobile.ts             # Responsive breakpoint detection
│
├── lib/                          # Shared libraries
│   └── utils.ts                  # cn() utility (clsx + tailwind-merge)
│
├── types/                        # Shared TypeScript types
├── constants/                    # Application constants
├── config/                       # App configuration
├── utils/                        # Shared utility functions
├── assets/                       # Static assets (icons, images, illustrations)
├── styles/                       # Global style definitions
│
├── db/                           # JSON Server database
│   ├── merge-db.js               # Script to merge JSON files into db.json
│   └── [categories|customers|employees|products|...]/  # Per-entity seed data
│
├── scripts/                      # Build and utility scripts
│   └── enrich-db.js              # Database enrichment script
│
└── public/                       # Static public assets (logo, illustrations)
```

### Why Feature-Based Architecture

Traditional projects organize code by technical type (all components in one folder, all hooks in another). Atlas ERP uses **feature-based (vertical slice) architecture** instead:

- **Each feature is self-contained** — `auth`, `dashboard`, `customers`, etc. each have their own `api/`, `components/`, `hooks/`, `types/` directories
- **No cross-feature imports** — Features don't depend on each other, making them independently developable and testable
- **Scales with complexity** — Adding a new feature means creating one new folder, not scattering code across 5+ directories
- **Clear ownership** — When working on "Products", everything you need lives in `src/features/products/`

---

## Project Architecture

### Separation of Concerns

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│  Pages → Components → UI Primitives                     │
├─────────────────────────────────────────────────────────┤
│                    Business Logic Layer                  │
│  Hooks → Services → Schemas → Types                     │
├─────────────────────────────────────────────────────────┤
│                    Data Access Layer                     │
│  API Handlers → Axios → JSON Server                     │
└─────────────────────────────────────────────────────────┘
```

### Reusable UI System

The `components/ui/` directory contains **30 shadcn/ui primitives** that form the design system foundation. Every component follows the same pattern:

- Built on headless `@base-ui/react` primitives
- Styled with Tailwind CSS and CVA variants
- Fully accessible (ARIA attributes, keyboard navigation)
- Theme-aware (light/dark mode support)
- Composable and extendable

### Shared Components

The `components/shared/` directory contains feature-agnostic components used across all entity views:

- **DataTable** — TanStack Table wrapper with sorting, loading/error/empty states, pagination, toolbar with export
- **DataPagination** — Ellipsis-based pagination component
- **CreateDialog** — Reusable dialog wrapper for entity creation forms
- **PageHeader** — Title + description + optional actions slot

### Data Flow

1. **Pages** are thin wrappers that compose feature components, manage pagination state, and pass data
2. **Components** receive data as props and render tables, forms, and detail views
3. **Hooks** (React Query) manage server state, caching, and API communication
4. **API handlers** use Axios to communicate with the REST backend
5. **Types** ensure end-to-end type safety

### State Management

| Layer | Technology | Scope |
|-------|-----------|-------|
| Server State | TanStack React Query | API data, caching, mutations |
| Form State | React Hook Form | Form inputs, validation, submission |
| UI State | React Context | Sidebar open/close, theme |
| Client State | localStorage | Auth session persistence |

---

## Screens

| Screen | Route | Status | Description |
|--------|-------|--------|-------------|
| **Login** | `/login` | Implemented | Split-screen authentication with email/password form, validation, and role-based login |
| **Dashboard** | `/dashboard` | Implemented | Analytics overview with KPI cards, monthly revenue chart, tabbed order/customer/inventory/supplier cards |
| **Categories** | `/dashboard/categories` | Implemented | Paginated list with export, create dialog, detail view with stats and SEO info |
| **Customers** | `/dashboard/customers` | Implemented | Paginated list with export, create dialog, detail view with contact/order/payment sections |
| **Suppliers** | `/dashboard/suppliers` | Implemented | Paginated list with export, create dialog, detail view with verification/rating/orders info |
| **Products** | `/dashboard/products` | Implemented | Paginated list with export, create dialog, detail view with pricing/stock/specifications |
| **Employees** | `/dashboard/employees` | Implemented | Paginated list with export, create dialog, detail view with department/salary/performance |
| **Sales** | `/dashboard/sales` | Implemented | Paginated list with export, create dialog, detail view with invoice/payment/financial breakdown |
| **Purchase Orders** | `/dashboard/purchase-orders` | Implemented | Paginated list with export, create dialog, detail view with items/payment/shipping sections |
| **Inventory** | `/dashboard/inventory` | Implemented | Paginated list with export, create dialog, detail view with stock levels/pricing/locations |
| **Settings** | `/dashboard/settings` | Implemented | Application settings displayed in tabbed sections (Company, Finance, Inventory, Sales, Notifications, Preferences) |
| **Profile** | `/dashboard/profile` | Implemented | User profile with avatar, personal info, department, permissions, and activity dates |

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org) 18+ (recommended: 20+)
- [npm](https://www.npmjs.com) or [yarn](https://yarnpkg.com) or [pnpm](https://pnpm.io)

### Setup

```bash
# Clone the repository
git clone https://github.com/Amrr-Maherr/Atlas-ERP.git
cd atlas-erp

# Install dependencies
npm install

# Build the mock database
npm run build-db

# Start the JSON Server (mock API on port 3001)
npm run json-server

# In a new terminal, start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Default Login Credentials

| Email | Password | Role |
|-------|----------|------|
| admin@atlaserp.com | 123456 | Admin |
| manager@atlaserp.com | 123456 | Manager |
| cashier@atlaserp.com | 123456 | Cashier |
| warehouse@atlaserp.com | 123456 | Warehouse |

---

## Environment

Create a `.env.local` file in the project root:

```env
# API Base URL (JSON Server)
NEXT_PUBLIC_API_URL=http://localhost:3001
```

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | `http://localhost:3001` | Base URL for the REST API backend |

---

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start the Next.js development server on port 3000 |
| `build` | `npm run build` | Create a production build |
| `start` | `npm run start` | Start the production server |
| `lint` | `npm run lint` | Run ESLint with Next.js core-web-vitals and TypeScript rules |
| `json-server` | `npm run json-server` | Build the database and start JSON Server on port 3001 |
| `build-db` | `npm run build-db` | Merge individual JSON seed files into a single `db.json` |

---

## Future Roadmap

> The following features are planned but not yet implemented.

### CRUD Operations (In Progress)

- [x] **Read Operations** — List views with pagination, sorting, and detail pages for all 8 entities
- [x] **Export** — CSV, Excel, and PDF export for all entity tables
- [ ] **Create Operations** — Wire up form submissions with mutation hooks, validation, and cache invalidation
- [ ] **Update Operations** — Edit dialogs with form state, mutation hooks, and optimistic updates
- [ ] **Delete Operations** — Confirmation dialogs with mutation hooks and cache invalidation
- [ ] **Form Validation** — Zod schemas for all entity forms

### Authentication & Security

- [x] **Login** — Email/password with role-based users and localStorage session
- [ ] **JWT Authentication** — Token-based auth with refresh tokens
- [ ] **Route Guards** — Middleware-protected routes for authenticated users only
- [ ] **Role-Based Access Control (RBAC)** — Permission-based feature access
- [ ] **Session Management** — Automatic logout and session timeout

### Reporting & Analytics

- [x] **Dashboard Analytics** — KPI cards, monthly revenue chart, tabbed overview cards
- [x] **Export to CSV** — Client-side CSV export for all entities
- [x] **Export to Excel** — SpreadsheetML XML export
- [x] **Export to PDF** — Print-ready HTML export
- [ ] **Sales Reports** — Daily, weekly, monthly revenue analytics
- [ ] **Inventory Reports** — Stock movement and valuation reports
- [ ] **Financial Reports** — Profit/loss, expense tracking, and tax summaries

### User Experience

- [x] **Dark Mode** — System/light/dark toggle via next-themes
- [x] **Responsive Design** — Mobile-first with adaptive sidebar and layouts
- [ ] **Global Search** — Full-text search across all entities
- [ ] **Advanced Filtering** — Multi-criteria filtering with saved presets
- [ ] **Notifications** — Real-time alerts for low stock, new orders, etc.
- [ ] **Activity Timeline** — Audit trail for all system actions
- [ ] **Multi-language** — Arabic and English language support
- [ ] **Multi-currency** — EGP, USD, EUR currency handling

### Infrastructure

- [ ] **Database Migration** — Migrate from JSON Server to Supabase/PostgreSQL
- [ ] **Unit Tests** — Jest + React Testing Library coverage
- [ ] **E2E Tests** — Playwright or Cypress end-to-end testing
- [ ] **CI/CD Pipeline** — GitHub Actions for automated testing and deployment
- [ ] **Docker** — Containerized development and production environments
- [ ] **Deployment** — Vercel / AWS / DigitalOcean deployment guides

---

## Project Highlights

- **Feature-Based Architecture** — Vertical slice design where each business domain is self-contained with its own API layer, components, hooks, and types
- **Enterprise-Ready Folder Structure** — Scalable project organization that mirrors real-world business domains
- **Shared DataTable** — Reusable TanStack Table component with sorting, pagination, export, and loading/error/empty states — used across all 8 entity views
- **Data Export** — Client-side CSV, Excel, and PDF export on every entity table with configurable column mappings
- **Server-Side Pagination** — Ellipsis-based pagination wired to all 8 API endpoints with consistent `{ data, items }` response format
- **Reusable UI System** — 30 accessible, theme-aware components built on Base UI primitives with CVA variants
- **Type-Safe Development** — End-to-end TypeScript with strict mode, typed API responses, and entity-specific type definitions
- **Design System** — Comprehensive design tokens using OKLCH color space, documented in `DESIGN_SYSTEM.md`
- **Rich Seed Data** — Realistic mock database with relational data for an Egyptian electronics trading company
- **Responsive by Default** — Mobile-first design with adaptive sidebar, header, and content layouts
- **Modern Tech Stack** — Next.js 16, React 19, Tailwind CSS v4, and the latest shadcn/ui (Base UI primitives)

---

## Learning Outcomes

This project demonstrates:

- **Large-Scale React Architecture** — Feature-based organization with vertical slice modules
- **Next.js App Router Mastery** — Route groups, nested layouts, server components, and client components
- **State Management** — TanStack Query for server state, React Hook Form for forms, Context for UI state
- **API Integration** — RESTful data fetching with Axios, React Query caching, and server-side pagination patterns
- **Shared Component Design** — Building reusable DataTable, CreateDialog, and PageHeader components used across all entities
- **Data Export** — Client-side CSV, Excel, and PDF generation with configurable column mappings
- **Reusable Component Design** — Building a composable UI system with shadcn/ui and CVA
- **Data Table Engineering** — TanStack Table integration with sorting, pagination, and toolbar actions
- **Design System Implementation** — OKLCH color tokens, CSS custom properties, and theme management
- **Modern CSS** — Tailwind CSS v4 with CSS-first configuration and utility-first patterns
- **Clean Project Organization** — Separation of concerns across presentation, business logic, and data layers

---

## Screenshots

> Screenshots coming soon.

| Dashboard | Login | Products |
|-----------|-------|----------|
| ![Dashboard](public/screenshot-dashboard.png) | ![Login](public/screenshot-login.png) | ![Products](public/screenshot-products.png) |

| Customers | Inventory | Sales |
|-----------|-----------|-------|
| ![Customers](public/screenshot-customers.png) | ![Inventory](public/screenshot-inventory.png) | ![Sales](public/screenshot-sales.png) |

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat:     New feature
fix:      Bug fix
docs:     Documentation changes
style:    Code style changes (formatting, etc.)
refactor: Code refactoring
test:     Adding or updating tests
chore:    Build process or auxiliary tool changes
```

### Development Guidelines

- Follow the existing code style and conventions
- Place new features in `src/features/` using the vertical slice structure
- Use existing UI components from `src/components/ui/` before creating new ones
- Write TypeScript for all new files
- Run `npm run lint` before committing

---

## Author

**Amrr Maherr**

- GitHub: [@Amrr-Maherr](https://github.com/Amrr-Maherr)

---

## License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Amrr Maherr

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

Built with Next.js, React, and Tailwind CSS

</div>
