"use client"

import type { Table } from "@tanstack/react-table"
import { ExportMenu } from "@/components/ui/export-menu"
import type { ExportColumn } from "@/components/lib/export/exportCsv"

type DataTableToolbarProps<TData extends Record<string, unknown>> = {
  table: Table<TData>
  exportColumns: ExportColumn<TData>[]
  exportFilename: string
}

export function DataTableToolbar<TData extends Record<string, unknown>>({
  table,
  exportColumns,
  exportFilename,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-end">
      <ExportMenu
        data={table.getFilteredRowModel().rows.map((r) => r.original)}
        columns={exportColumns}
        filename={exportFilename}
      />
    </div>
  )
}
