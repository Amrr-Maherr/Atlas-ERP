"use client";

import type { Table } from "@tanstack/react-table";
import { SearchIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExportMenu } from "@/components/ui/export-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ExportColumn } from "@/components/lib/export/exportCsv";

type DataTableToolbarProps<TData extends Record<string, unknown>> = {
  table: Table<TData>;
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  exportColumns?: ExportColumn<TData>[];
  exportFilename?: string;
  sort?: string;
  sortOptions?: { value: string; label: string }[];
  onSort?: (sort: string) => void;
};

export function DataTableToolbar<TData extends Record<string, unknown>>({
  table,
  globalFilter,
  onGlobalFilterChange,
  exportColumns,
  exportFilename,
  sort,
  sortOptions = [],
  onSort,
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
      {sortOptions.length > 0 && (
        <Select
          value={sort ?? "createdAt"}
          onValueChange={(value) => value && onSort?.(value)}
        >
          <SelectTrigger className="w-44" aria-label="Sort table">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {exportColumns && exportFilename && (
        <ExportMenu
          data={table.getRowModel().rows.map((r) => r.original)}
          columns={exportColumns}
          filename={exportFilename}
        />
      )}
    </div>
  );
}
