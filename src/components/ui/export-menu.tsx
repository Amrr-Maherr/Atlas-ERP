"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DownloadIcon, FileSpreadsheetIcon, FileTextIcon, TableIcon } from "lucide-react"
import { exportCsv, type ExportColumn } from "@/components/lib/export/exportCsv"
import { exportExcel } from "@/components/lib/export/exportExcel"
import { exportPdf } from "@/components/lib/export/exportPdf"

type ExportMenuProps<T extends Record<string, unknown>> = {
  className?: string
  data: T[]
  columns: ExportColumn<T>[]
  filename: string
}

export function ExportMenu<T extends Record<string, unknown>>({
  className,
  data,
  columns,
  filename,
}: ExportMenuProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="sm" className={cn("gap-1.5", className)} />}>
          <DownloadIcon className="size-4" />
          <span className="hidden sm:inline">Export</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={4}>
        <DropdownMenuItem onClick={() => exportCsv(data, columns, filename)}>
          <TableIcon className="size-4 text-muted-foreground" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportExcel(data, columns, filename)}>
          <FileSpreadsheetIcon className="size-4 text-muted-foreground" />
          Export as Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportPdf(data, columns, filename)}>
          <FileTextIcon className="size-4 text-muted-foreground" />
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
