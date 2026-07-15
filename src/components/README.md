# Components

Reusable UI components shared across all features.

## Structure

```
components/
├── ui/            # shadcn/ui primitives (Button, Input, Table, etc.)
├── layout/        # Layout components
│   └── navigation/  # Sidebar, header, nav components
└── shared/        # Feature-agnostic shared components
```

## UI Components

All shadcn/ui components are located in `ui/`. These are low-level primitives that should be composed into higher-level components.

## Navigation Components

Layout navigation components (`app-sidebar`, `site-header`, `nav-*`) are in `layout/navigation/`. These handle the app shell structure.
