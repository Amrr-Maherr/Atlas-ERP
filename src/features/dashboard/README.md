# Dashboard Feature

Handles the main dashboard and analytics for Atlas ERP.

## Structure

```
dashboard/
├── components/    # Dashboard-specific UI components
├── pages/         # Page components and data
├── schemas/       # Zod validation schemas
├── services/      # Business logic
├── types/         # TypeScript types
├── utils/         # Utility functions
└── index.ts       # Barrel exports
```

## Components

- `section-cards.tsx` - KPI summary cards
- `chart-area-interactive.tsx` - Interactive area chart
- `data-table.tsx` - Data table with DnD sorting

## Pages

- `dashboard-page.tsx` - Main dashboard layout
- `data.json` - Sample data for the data table
