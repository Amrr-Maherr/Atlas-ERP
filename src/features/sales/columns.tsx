"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/components/utils/format-date"
import { DataTableColumnHeader } from "@/components/shared/data-table"
import { SaleStatusBadge } from "./components/sale-status-badge"
import { SaleRowActions } from "./components/sale-row-actions"
import type { Sale } from "./types/sale.types"

export const saleColumns: ColumnDef<Sale>[] = [
  {
    accessorKey: "invoiceNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Invoice" />,
    cell: ({ getValue }) => (
      <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{getValue() as string}</code>
    ),
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ getValue }) => (
      <span className="block max-w-[200px] truncate text-muted-foreground">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "employeeName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Employee" />,
    cell: ({ getValue }) => <span className="text-muted-foreground">{getValue() as string}</span>,
  },
  {
    accessorKey: "items",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Items" />,
    cell: ({ getValue }) => <Badge variant="secondary">{getValue() as number}</Badge>,
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
    accessorKey: "orderStatus",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ getValue }) => <SaleStatusBadge status={getValue() as string} />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">{formatDate(getValue() as string)}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row }) => <SaleRowActions sale={row.original} />,
  },
]

export const saleExportColumns = [
  { key: "invoiceNumber" as const, label: "Invoice" },
  { key: "customerName" as const, label: "Customer" },
  { key: "employeeName" as const, label: "Employee" },
  { key: "items" as const, label: "Items" },
  { key: "total" as const, label: "Total" },
  { key: "paymentMethod" as const, label: "Payment" },
  { key: "orderStatus" as const, label: "Status" },
  { key: "createdAt" as const, label: "Created" },
]
