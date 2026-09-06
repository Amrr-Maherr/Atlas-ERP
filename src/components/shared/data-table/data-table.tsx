"use client";

import { useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table } from "@/components/ui/table";
import { DataTableHeader } from "./data-table-header";
import { DataTableBody } from "./data-table-body";
import { DataTableSkeleton } from "./data-table-skeleton";
import { DataTableEmpty } from "./data-table-empty";
import { DataTableError } from "./data-table-error";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import type { ExportColumn } from "@/components/lib/export/exportCsv";

const IMPORTANT_SORT_FIELDS = new Set([
  "name",
  "sku",
  "category",
  "price",
  "stock",
  "status",
  "createdAt",
  "orderDate",
  "invoiceNumber",
  "poNumber",
  "total",
  "paymentStatus",
  "orderStatus",
]);

type DataTableProps<TData extends Record<string, unknown>, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  error?: Error | null;
  page?: number;
  per_page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
  search?: string;
  sort?: string;
  onSearch?: (search: string) => void;
  onSort?: (sort: string) => void;
  exportColumns?: ExportColumn<TData>[];
  exportFilename?: string;
  emptyTitle?: string;
  emptyDescription?: string;
};

export function DataTable<TData extends Record<string, unknown>, TValue>({
  columns,
  data,
  isLoading,
  error,
  page = 1,
  per_page = 10,
  total = 0,
  onChangePage,
  search,
  sort,
  onSearch,
  onSort,
  exportColumns,
  exportFilename,
  emptyTitle = "No results",
  emptyDescription = "No data available.",
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState(search ?? "");

  useEffect(() => {
    const timer = setTimeout(() => onSearch?.(globalFilter), 300);
    return () => clearTimeout(timer);
  }, [globalFilter, onSearch]);

  const columnSortOptions = columns.flatMap((column) => {
    const key =
      "accessorKey" in column && typeof column.accessorKey === "string"
        ? column.accessorKey
        : column.id;
    if (
      !key ||
      column.enableSorting === false ||
      key === "actions" ||
      !IMPORTANT_SORT_FIELDS.has(key)
    )
      return [];
    const label = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (value) => value.toUpperCase());
    return [
      { value: key, label: `${label} (A-Z)` },
      { value: `-${key}`, label: `${label} (Z-A)` },
    ];
  });
  const sortOptions = [
    { value: "createdAt", label: "Created At (newest)" },
    { value: "-createdAt", label: "Created At (oldest)" },
    ...columnSortOptions.filter(
      (option) => option.value !== "createdAt" && option.value !== "-createdAt",
    ),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    enableSorting: false,
    manualSorting: true,
    manualFiltering: true,
    state: { globalFilter },
  });

  if (isLoading) {
    return <DataTableSkeleton columnCount={columns.length} />;
  }

  if (error) {
    return <DataTableError error={error} />;
  }

  if (data.length === 0) {
    return <DataTableEmpty title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        sort={sort}
        sortOptions={sortOptions}
        onSort={onSort}
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
  );
}
