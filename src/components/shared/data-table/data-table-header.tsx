"use client"

import type { Table as TableInstance } from "@tanstack/react-table"
import { flexRender } from "@tanstack/react-table"
import { TableHead, TableHeader, TableRow } from "@/components/ui/table"

type DataTableHeaderProps<TData> = {
  table: TableInstance<TData>
}

export function DataTableHeader<TData>({ table }: DataTableHeaderProps<TData>) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              className={header.id === "actions" ? "text-end" : undefined}
            >
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  )
}
