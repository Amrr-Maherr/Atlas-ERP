"use client"

import DataPagination from "@/components/shared/pagination/data-pagination"

type DataTablePaginationProps = {
  page?: number
  per_page?: number
  total?: number
  onChangePage?: (page: number) => void
}

export function DataTablePagination({
  page = 1,
  per_page = 10,
  total = 0,
  onChangePage,
}: DataTablePaginationProps) {
  return (
    <DataPagination
      page={page}
      per_page={per_page}
      total={total}
      onChangePage={onChangePage}
    />
  )
}
