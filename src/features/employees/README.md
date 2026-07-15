# Employees Feature

This module handles employee management, HR, and workforce functionality for the Atlas ERP system.

## Folder Structure

| Folder | Purpose |
|--------|---------|
| api/ | API client functions and HTTP requests |
| components/ | UI components specific to this feature |
| hooks/ | Custom React hooks for this feature |
| schemas/ | Zod validation schemas |
| services/ | Business logic and data transformation |
| types/ | TypeScript type definitions |
| utils/ | Feature-specific utility functions |
| constants/ | Constants and configuration values |
| store/ | State management (Zustand/Redux) |
| lib/ | Feature-specific library utilities |
| actions/ | Server actions (Next.js) |
| mappers/ | Data mapping/transformation functions |
| validators/ | Form and input validation |
| permissions/ | Access control and permissions |
| config/ | Feature configuration |

## Notes

- Keep feature-specific code within this module
- Import shared utilities from `@/utils`, `@/hooks`, `@/types`
- Use barrel exports via `index.ts`
