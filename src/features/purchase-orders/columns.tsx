"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { formatDate } from "@/components/utils/format-date"
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { PurchaseOrderStatusBadge } from "./components/purchase-order-status-badge"
import type { PurchaseOrder } from "./types/purchase-order.types"

export const purchaseOrderColumns: ColumnDef<PurchaseOrder>[] = [
  {
    accessorKey: "poNumber",
    header: "PO Number",
    cell: ({ getValue }) => (
      <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{getValue() as string}</code>
    ),
  },
  {
    id: "itemCount",
    header: "Items",
    cell: ({ row }) => (
      <Badge variant="secondary">{row.original.items.length}</Badge>
    ),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ getValue }) => (
      <span className="text-sm font-medium tabular-nums">${(getValue() as number).toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ getValue }) => (
      <Badge variant="outline" className="text-xs">{getValue() as string}</Badge>
    ),
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">{formatDate(getValue() as string)}</span>
    ),
  },
  {
    accessorKey: "expectedDate",
    header: "Expected",
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">{formatDate(getValue() as string)}</span>
    ),
  },
  {
    accessorKey: "orderStatus",
    header: "Status",
    cell: ({ getValue }) => <PurchaseOrderStatusBadge status={getValue() as string} />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const po = row.original
      return (
        <div className="flex items-center justify-end gap-1">
          <Link href={`/dashboard/purchase-orders/${po.id}`} className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}>
            <EyeIcon />
          </Link>
          <Button variant="ghost" size="icon-sm"><PencilIcon /></Button>
          <Button variant="destructive" size="icon-sm"><Trash2Icon /></Button>
        </div>
      )
    },
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
