"use client"

import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type DataTableColumnHeaderProps = {
  title: string
  sortDirection: false | "asc" | "desc"
  onSort: () => void
  className?: string
}

export function DataTableColumnHeader({
  title,
  sortDirection,
  onSort,
  className,
}: DataTableColumnHeaderProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("-ml-3 h-8 data-[state=open]:bg-accent", className)}
      onClick={onSort}
    >
      <span>{title}</span>
      {sortDirection === "asc" ? (
        <ArrowUpIcon className="ml-2 size-3.5" />
      ) : sortDirection === "desc" ? (
        <ArrowDownIcon className="ml-2 size-3.5" />
      ) : (
        <ChevronsUpDownIcon className="ml-2 size-3.5" />
      )}
    </Button>
  )
}
