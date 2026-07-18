"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { formatDate } from "@/components/utils/format-date"
import { UserIcon, EyeIcon, PencilIcon, Trash2Icon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { CustomerStatusBadge } from "./components/customer-status-badge"
import type { Customer } from "./types/customer.types"

export const customerColumns: ColumnDef<Customer>[] = [
  {
    id: "name",
    header: "Customer",
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
    header: "Email",
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
    accessorKey: "city",
    header: "City",
    cell: ({ getValue }) => <span className="text-muted-foreground">{getValue() as string}</span>,
  },
  {
    accessorKey: "totalOrders",
    header: "Orders",
    cell: ({ getValue }) => <Badge variant="secondary">{getValue() as number}</Badge>,
  },
  {
    accessorKey: "totalSpent",
    header: "Total Spent",
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
    cell: ({ getValue }) => <CustomerStatusBadge status={getValue() as string} />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const customer = row.original
      return (
        <div className="flex items-center justify-end gap-1">
          <Link href={`/dashboard/customers/${customer.id}`} className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}>
            <EyeIcon />
          </Link>
          <Button variant="ghost" size="icon-sm"><PencilIcon /></Button>
          <Button variant="destructive" size="icon-sm"><Trash2Icon /></Button>
        </div>
      )
    },
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
