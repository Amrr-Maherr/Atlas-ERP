"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { formatDate } from "@/components/utils/format-date"
import { ImageIcon, PencilIcon, Trash2Icon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ProductStatusBadge } from "./components/product-status-badge"
import type { Product } from "./types/product.types"

export const productColumns: ColumnDef<Product>[] = [
  {
    id: "name",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className="flex items-center gap-3">
          <div className="relative flex size-10 shrink-0 items-center justify-center rounded-md bg-muted overflow-hidden">
            {product.image ? (
              <Image src={product.image} alt={product.name} fill sizes="40px" className="object-cover" />
            ) : (
              <ImageIcon className="size-4 text-muted-foreground" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{product.name}</span>
            <span className="text-xs text-muted-foreground">{product.brand}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "sku",
    header: "SKU",
    cell: ({ getValue }) => (
      <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{getValue() as string}</code>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ getValue }) => (
      <span className="block max-w-[200px] truncate text-muted-foreground">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ getValue }) => (
      <span className="font-medium tabular-nums">${getValue() as number}</span>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ getValue }) => <Badge variant="secondary">{getValue() as number}</Badge>,
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
    cell: ({ getValue }) => <ProductStatusBadge status={getValue() as string} />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className="flex items-center justify-end gap-1">
          <Link href={`/dashboard/products/${product.id}`} className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}>
            <PencilIcon />
          </Link>
          <Button variant="destructive" size="icon-sm"><Trash2Icon /></Button>
        </div>
      )
    },
  },
]

export const productExportColumns = [
  { key: "name" as const, label: "Product" },
  { key: "sku" as const, label: "SKU" },
  { key: "description" as const, label: "Description" },
  { key: "price" as const, label: "Price" },
  { key: "stock" as const, label: "Stock" },
  { key: "createdAt" as const, label: "Created" },
  { key: "status" as const, label: "Status" },
]
