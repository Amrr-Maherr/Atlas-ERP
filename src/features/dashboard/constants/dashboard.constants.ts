export const CHART_COLORS = {
  primary: "hsl(var(--chart-1))",
  secondary: "hsl(var(--chart-2))",
  tertiary: "hsl(var(--chart-3))",
  quaternary: "hsl(var(--chart-4))",
  quinary: "hsl(var(--chart-5))",
} as const;

export const CATEGORY_CHART_COLORS = [
  "#2563eb",
  "#7c3aed",
  "#db2777",
  "#dc2626",
  "#ea580c",
  "#ca8a04",
  "#16a34a",
  "#0891b2",
  "#6366f1",
  "#a855f7",
  "#ec4899",
  "#f43f5e",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#818cf8",
  "#c084fc",
];

export const INVENTORY_STATUS_COLORS: Record<string, string> = {
  "in-stock": "#16a34a",
  "low-stock": "#ca8a04",
  "out-of-stock": "#dc2626",
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  Completed: "#16a34a",
  Processing: "#2563eb",
  Pending: "#ca8a04",
  Cancelled: "#dc2626",
  Refunded: "#6b7280",
};
