"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/components/utils/format-date"
import { ImageIcon } from "lucide-react"
import Image from "next/image"
import { DataTableColumnHeader } from "@/components/shared/data-table"
import { CategoryStatusBadge } from "./components/category-status-badge"
import { CategoryRowActions } from "./components/category-row-actions"
import type { Category } from "./types/category.types"

export const categoryColumns: ColumnDef<Category>[] = [
  {
    id: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    cell: ({ row }) => {
      const category = row.original
      return (
        <div className="flex items-center gap-3">
          <div className="relative flex size-10 shrink-0 items-center justify-center rounded-md bg-muted overflow-hidden">
            {category.image ? (
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="40px"
                className="object-cover"
              />
            ) : (
              <ImageIcon className="size-4 text-muted-foreground" />
            )}
          </div>
          <span className="font-medium">{category.name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
    cell: ({ getValue }) => (
      <span className="block max-w-[300px] truncate text-muted-foreground">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "slug",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Slug" />,
    cell: ({ getValue }) => (
      <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
        {getValue() as string}
      </code>
    ),
  },
  {
    accessorKey: "productCount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Products" />,
    cell: ({ getValue }) => (
      <Badge variant="secondary">{getValue() as number}</Badge>
    ),
  },
  {
    accessorKey: "displayOrder",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order" />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">
        {formatDate(getValue() as string)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ getValue }) => (
      <CategoryStatusBadge status={getValue() as string} />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row }) => <CategoryRowActions category={row.original} />,
  },
]

export const categoryExportColumns = [
  { key: "name" as const, label: "Category" },
  { key: "description" as const, label: "Description" },
  { key: "slug" as const, label: "Slug" },
  { key: "productCount" as const, label: "Products" },
  { key: "displayOrder" as const, label: "Order" },
  { key: "createdAt" as const, label: "Created" },
  { key: "status" as const, label: "Status" },
]
