"use client"

import type { Table } from "@tanstack/react-table"
import { SearchIcon, XIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ExportMenu } from "@/components/ui/export-menu"
import type { ExportColumn } from "@/components/lib/export/exportCsv"

type DataTableToolbarProps<TData extends Record<string, unknown>> = {
  table: Table<TData>
  globalFilter: string
  onGlobalFilterChange: (value: string) => void
  exportColumns?: ExportColumn<TData>[]
  exportFilename?: string
}

export function DataTableToolbar<TData extends Record<string, unknown>>({
  table,
  globalFilter,
  onGlobalFilterChange,
  exportColumns,
  exportFilename,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1 max-w-sm">
        <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => onGlobalFilterChange(e.target.value)}
          className="pl-8"
        />
        {globalFilter && (
          <Button
            variant="ghost"
            size="icon-xs"
            className="absolute right-1 top-1/2 -translate-y-1/2"
            onClick={() => onGlobalFilterChange("")}
          >
            <XIcon />
          </Button>
        )}
      </div>
      {exportColumns && exportFilename && (
        <ExportMenu
          data={table.getFilteredRowModel().rows.map((r) => r.original)}
          columns={exportColumns}
          filename={exportFilename}
        />
      )}
    </div>
  )
}
