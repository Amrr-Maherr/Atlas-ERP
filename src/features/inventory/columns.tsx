"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Button, buttonVariants } from "@/components/ui/button"
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { InventoryStatusBadge } from "./components/inventory-status-badge"
import type { InventoryItem } from "./types/inventory.types"

export const inventoryColumns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ getValue }) => <span className="text-sm font-medium">{getValue() as string}</span>,
  },
  {
    accessorKey: "sku",
    header: "SKU",
    cell: ({ getValue }) => (
      <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{getValue() as string}</code>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ getValue }) => <span className="text-sm tabular-nums">{getValue() as number}</span>,
  },
  {
    accessorKey: "minStock",
    header: "Min Stock",
    cell: ({ getValue }) => (
      <span className="text-sm tabular-nums text-muted-foreground">{getValue() as number}</span>
    ),
  },
  {
    accessorKey: "reorderLevel",
    header: "Reorder Level",
    cell: ({ getValue }) => (
      <span className="text-sm tabular-nums text-muted-foreground">{getValue() as number}</span>
    ),
  },
  {
    accessorKey: "costPrice",
    header: "Cost Price",
    cell: ({ getValue }) => (
      <span className="text-sm tabular-nums">${(getValue() as number).toLocaleString()}</span>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const item = row.original
      return <InventoryStatusBadge status={item.stock <= item.minStock ? "low" : "in-stock"} />
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const item = row.original
      return (
        <div className="flex items-center justify-end gap-1">
          <Link href={`/dashboard/inventory/${item.id}`} className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}>
            <EyeIcon />
          </Link>
          <Button variant="ghost" size="icon-sm"><PencilIcon /></Button>
          <Button variant="destructive" size="icon-sm"><Trash2Icon /></Button>
        </div>
      )
    },
  },
]

export const inventoryExportColumns = [
  { key: "name" as const, label: "Product" },
  { key: "sku" as const, label: "SKU" },
  { key: "stock" as const, label: "Stock" },
  { key: "minStock" as const, label: "Min Stock" },
  { key: "reorderLevel" as const, label: "Reorder Level" },
  { key: "costPrice" as const, label: "Cost Price" },
]
