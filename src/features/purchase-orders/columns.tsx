"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/components/utils/format-date"
import { DataTableColumnHeader } from "@/components/shared/data-table"
import { PurchaseOrderStatusBadge } from "./components/purchase-order-status-badge"
import { PurchaseOrderRowActions } from "./components/purchase-order-row-actions"
import type { PurchaseOrder } from "./types/purchase-order.types"

export const purchaseOrderColumns: ColumnDef<PurchaseOrder>[] = [
  {
    accessorKey: "poNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="PO Number" />,
    cell: ({ getValue }) => (
      <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{getValue() as string}</code>
    ),
  },
  {
    id: "itemCount",
    header: "Items",
    enableSorting: false,
    cell: ({ row }) => (
      <Badge variant="secondary">{row.original.items.length}</Badge>
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
    cell: ({ getValue }) => (
      <span className="text-sm font-medium tabular-nums">${(getValue() as number).toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Payment" />,
    cell: ({ getValue }) => (
      <Badge variant="outline" className="text-xs">{getValue() as string}</Badge>
    ),
  },
  {
    accessorKey: "orderDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order Date" />,
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">{formatDate(getValue() as string)}</span>
    ),
  },
  {
    accessorKey: "expectedDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Expected" />,
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">{formatDate(getValue() as string)}</span>
    ),
  },
  {
    accessorKey: "orderStatus",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ getValue }) => <PurchaseOrderStatusBadge status={getValue() as string} />,
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row }) => <PurchaseOrderRowActions purchaseOrder={row.original} />,
  },
]

export const purchaseOrderExportColumns = [
  { key: "poNumber" as const, label: "PO Number" },
  { key: "total" as const, label: "Total" },
  { key: "paymentMethod" as const, label: "Payment" },
  { key: "orderDate" as const, label: "Order Date" },
  { key: "expectedDate" as const, label: "Expected" },
  { key: "orderStatus" as const, label: "Status" },
]
