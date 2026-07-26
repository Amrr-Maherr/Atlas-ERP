"use client"

import type { Table as TableInstance } from "@tanstack/react-table"
import { flexRender } from "@tanstack/react-table"
import { TableBody, TableCell, TableRow } from "@/components/ui/table"

type DataTableBodyProps<TData extends Record<string, unknown>> = {
  table: TableInstance<TData>
  columnCount: number
}

export function DataTableBody<TData extends Record<string, unknown>>({
  table,
  columnCount,
}: DataTableBodyProps<TData>) {
  const rows = table.getRowModel().rows

  return (
    <TableBody>
      {rows.length ? (
        rows.map((row) => (
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
          <TableCell colSpan={columnCount} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}
