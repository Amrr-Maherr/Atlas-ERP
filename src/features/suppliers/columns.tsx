"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/components/utils/format-date"
import { BuildingIcon } from "lucide-react"
import Image from "next/image"
import { SupplierStatusBadge } from "./components/supplier-status-badge"
import { SupplierRowActions } from "./components/supplier-row-actions"
import type { Supplier } from "./types/supplier.types"

export const supplierColumns: ColumnDef<Supplier>[] = [
  {
    id: "name",
    header: "Supplier",
    cell: ({ row }) => {
      const supplier = row.original
      return (
        <div className="flex items-center gap-3">
          <div className="relative flex size-10 shrink-0 items-center justify-center rounded-md bg-muted overflow-hidden">
            {supplier.logo ? (
              <Image src={supplier.logo} alt={supplier.companyName} fill sizes="40px" className="object-cover" />
            ) : (
              <BuildingIcon className="size-4 text-muted-foreground" />
            )}
          </div>
          <span className="font-medium">{supplier.companyName}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "contactPerson",
    header: "Contact",
    cell: ({ getValue }) => (
      <span className="block max-w-[200px] truncate text-muted-foreground">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ getValue }) => <span className="text-muted-foreground">{getValue() as string}</span>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ getValue }) => <span className="text-muted-foreground">{getValue() as string}</span>,
  },
  {
    accessorKey: "totalOrders",
    header: "Orders",
    cell: ({ getValue }) => <Badge variant="secondary">{getValue() as number}</Badge>,
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ getValue }) => (
      <span className="text-sm tabular-nums">${(getValue() as number).toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">{formatDate(getValue() as string)}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => <SupplierStatusBadge status={getValue() as string} />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <SupplierRowActions supplier={row.original} />,
  },
]

export const supplierExportColumns = [
  { key: "companyName" as const, label: "Supplier" },
  { key: "contactPerson" as const, label: "Contact" },
  { key: "phone" as const, label: "Phone" },
  { key: "country" as const, label: "Country" },
  { key: "totalOrders" as const, label: "Orders" },
  { key: "balance" as const, label: "Balance" },
  { key: "createdAt" as const, label: "Created" },
  { key: "status" as const, label: "Status" },
]
