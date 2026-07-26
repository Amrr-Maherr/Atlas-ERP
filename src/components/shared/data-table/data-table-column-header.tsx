"use client"

import type { Column } from "@tanstack/react-table"
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>
  title: string
  className?: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn("h-8 px-2 text-sm font-medium", className)}>{title}</div>
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("-ml-3 h-8 data-[state=open]:bg-accent", className)}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      <span>{title}</span>
      {column.getIsSorted() === "desc" ? (
        <ArrowDownIcon className="ml-2 size-3.5" />
      ) : column.getIsSorted() === "asc" ? (
        <ArrowUpIcon className="ml-2 size-3.5" />
      ) : (
        <ChevronsUpDownIcon className="ml-2 size-3.5" />
      )}
    </Button>
  )
}
