import { mkConfig, generateCsv, download } from "export-to-csv"

export type ExportColumn<T> = {
  key: keyof T
  label: string
}

export function exportCsv<T extends Record<string, unknown>>(
  data: T[],
  columns: ExportColumn<T>[],
  filename: string
) {
  const config = mkConfig({
    filename,
    useKeysAsHeaders: false,
    columnHeaders: columns.map((col) => ({
      key: String(col.key),
      displayLabel: col.label,
    })),
  })

  const csv = generateCsv(config)(data as { [k: string]: string | number | boolean | null }[])
  download(config)(csv)
}
