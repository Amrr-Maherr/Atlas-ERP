"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircleIcon, InboxIcon } from "lucide-react"
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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
  })

  if (isLoading) {
    return <DataTableSkeleton columnCount={columns.length} />
  }

  if (error) {
    return (
      <Card className="border-[var(--destructive)] bg-[var(--destructive)]/5">
        <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
          <AlertCircleIcon className="size-8 text-[var(--destructive)]" />
          <p className="text-sm font-medium text-[var(--destructive)]">
            Something went wrong
          </p>
          <p className="text-xs text-muted-foreground">{error.message}</p>
        </CardContent>
      </Card>
    )
  }

  if (data.length === 0) {
    return (
      <Card className="rounded-lg">
        <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
          <InboxIcon className="size-8 text-muted-foreground" />
          <p className="text-sm font-medium">{emptyTitle}</p>
          <p className="text-xs text-muted-foreground">{emptyDescription}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {exportColumns && exportFilename && (
        <DataTableToolbar
          table={table}
          exportColumns={exportColumns}
          exportFilename={exportFilename}
        />
      )}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className={header.id === "actions" ? "text-end" : undefined}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
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

function DataTableSkeleton({ columnCount }: { columnCount: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i} className="rounded-lg">
          <CardContent className="grid items-center gap-4 py-3" style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}>
            {Array.from({ length: columnCount }).map((_, j) => (
              <Skeleton key={j} className="h-4 w-full rounded" />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
