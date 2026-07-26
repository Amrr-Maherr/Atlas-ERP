"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/components/utils/format-date"
import { UserIcon } from "lucide-react"
import Image from "next/image"
import { DataTableColumnHeader } from "@/components/shared/data-table"
import { CustomerStatusBadge } from "./components/customer-status-badge"
import { CustomerRowActions } from "./components/customer-row-actions"
import type { Customer } from "./types/customer.types"

export const customerColumns: ColumnDef<Customer>[] = [
  {
    id: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row }) => {
      const customer = row.original
      return (
        <div className="flex items-center gap-3">
          <div className="relative flex size-10 shrink-0 items-center justify-center rounded-md bg-muted overflow-hidden">
            {customer.avatar ? (
              <Image src={customer.avatar} alt={customer.name} fill sizes="40px" className="object-cover" />
            ) : (
              <UserIcon className="size-4 text-muted-foreground" />
            )}
          </div>
          <span className="font-medium">{customer.name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ getValue }) => (
      <span className="block max-w-[200px] truncate text-muted-foreground">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Phone" />,
    cell: ({ getValue }) => <span className="text-muted-foreground">{getValue() as string}</span>,
  },
  {
    accessorKey: "city",
    header: ({ column }) => <DataTableColumnHeader column={column} title="City" />,
    cell: ({ getValue }) => <span className="text-muted-foreground">{getValue() as string}</span>,
  },
  {
    accessorKey: "totalOrders",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Orders" />,
    cell: ({ getValue }) => <Badge variant="secondary">{getValue() as number}</Badge>,
  },
  {
    accessorKey: "totalSpent",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Spent" />,
    cell: ({ getValue }) => (
      <span className="text-sm tabular-nums">${(getValue() as number).toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">{formatDate(getValue() as string)}</span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ getValue }) => <CustomerStatusBadge status={getValue() as string} />,
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row }) => <CustomerRowActions customer={row.original} />,
  },
]

export const customerExportColumns = [
  { key: "name" as const, label: "Customer" },
  { key: "email" as const, label: "Email" },
  { key: "phone" as const, label: "Phone" },
  { key: "city" as const, label: "City" },
  { key: "totalOrders" as const, label: "Orders" },
  { key: "totalSpent" as const, label: "Total Spent" },
  { key: "createdAt" as const, label: "Created" },
  { key: "status" as const, label: "Status" },
]
