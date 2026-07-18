"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { formatDate } from "@/components/utils/format-date"
import { ImageIcon, EyeIcon, PencilIcon, Trash2Icon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { CategoryStatusBadge } from "./components/category-status-badge"
import type { Category } from "./types/category.types"

export const categoryColumns: ColumnDef<Category>[] = [
  {
    id: "name",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original
      return (
        <div className="flex items-center gap-3">
          <div className="relative flex size-10 shrink-0 items-center justify-center rounded-md bg-muted overflow-hidden">
            {category.image ? (
              <Image src={category.image} alt={category.name} fill sizes="40px" className="object-cover" />
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
    header: "Description",
    cell: ({ getValue }) => (
      <span className="block max-w-[300px] truncate text-muted-foreground">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ getValue }) => (
      <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{getValue() as string}</code>
    ),
  },
  {
    accessorKey: "productCount",
    header: "Products",
    cell: ({ getValue }) => <Badge variant="secondary">{getValue() as number}</Badge>,
  },
  {
    accessorKey: "displayOrder",
    header: "Order",
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
    cell: ({ getValue }) => <CategoryStatusBadge status={getValue() as string} />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original
      return (
        <div className="flex items-center justify-end gap-1">
          <Link href={`/dashboard/categories/${category.id}`} className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}>
            <EyeIcon />
          </Link>
          <Button variant="ghost" size="icon-sm"><PencilIcon /></Button>
          <Button variant="destructive" size="icon-sm"><Trash2Icon /></Button>
        </div>
      )
    },
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
