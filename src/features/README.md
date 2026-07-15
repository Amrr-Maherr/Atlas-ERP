# Features

Feature modules following vertical slice architecture.

## Structure

Each feature contains only what it needs:

```
feature/
├── components/    # Feature-specific UI components
├── hooks/         # Feature-specific React hooks
├── pages/         # Page components (thin wrappers for app router)
├── schemas/       # Zod validation schemas
├── services/      # Business logic and API calls
├── types/         # TypeScript type definitions
├── utils/         # Feature-specific utilities
└── index.ts       # Barrel exports
```

## Principles

1. **Each feature is self-contained** - No cross-feature imports
2. **Pages are thin** - Only import from own feature or shared components
3. **Shared code lives in src/** - components/, hooks/, utils/, types/
4. **Lazy creation** - Only create folders when needed

## Features

| Feature | Description |
|---------|-------------|
| auth | Authentication and authorization |
| dashboard | Main dashboard and analytics |
| customers | Customer relationship management |
| employees | Employee/HR management |
| suppliers | Supplier/procurement management |
| inventory | Inventory/stock management |
| products | Product catalog management |
| settings | Application settings |
