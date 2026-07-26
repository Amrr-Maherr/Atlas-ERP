"use client"

import { useState } from "react"
import type { ColumnDef, SortingState } from "@tanstack/react-table"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Table } from "@/components/ui/table"
import { DataTableHeader } from "./data-table-header"
import { DataTableBody } from "./data-table-body"
import { DataTableSkeleton } from "./data-table-skeleton"
import { DataTableEmpty } from "./data-table-empty"
import { DataTableError } from "./data-table-error"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"
import type { ExportColumn } from "@/components/lib/export/exportCsv"

type DataTableProps<TData extends Record<string, unknown>, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  error?: Error | null
  page?: number
  per_page?: number
  total?: number
  onChangePage?: (page: number) => void
  exportColumns?: ExportColumn<TData>[]
  exportFilename?: string
  emptyTitle?: string
  emptyDescription?: string
}

export function DataTable<TData extends Record<string, unknown>, TValue>({
  columns,
  data,
  isLoading,
  error,
  page = 1,
  per_page = 10,
  total = 0,
  onChangePage,
  exportColumns,
  exportFilename,
  emptyTitle = "No results",
  emptyDescription = "No data available.",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
    state: { sorting, globalFilter },
  })

  if (isLoading) {
    return <DataTableSkeleton columnCount={columns.length} />
  }

  if (error) {
    return <DataTableError error={error} />
  }

  if (data.length === 0) {
    return <DataTableEmpty title={emptyTitle} description={emptyDescription} />
  }

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        exportColumns={exportColumns}
        exportFilename={exportFilename}
      />
      <div className="rounded-lg border">
        <Table>
          <DataTableHeader table={table} />
          <DataTableBody table={table} columnCount={columns.length} />
        </Table>
      </div>
      <div className="flex justify-end">
        <DataTablePagination
          page={page}
          per_page={per_page}
          total={total}
          onChangePage={onChangePage}
        />
      </div>
    </div>
  )
}
