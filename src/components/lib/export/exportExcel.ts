import type { ExportColumn } from "./exportCsv"

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export function exportExcel<T extends Record<string, unknown>>(
  data: T[],
  columns: ExportColumn<T>[],
  filename: string
) {
  const headerRow = columns
    .map((col) => `<Cell><Data ss:Type="String">${escapeXml(col.label)}</Data></Cell>`)
    .join("")

  const dataRows = data
    .map((row) => {
      const cells = columns
        .map((col) => {
          const value = row[col.key]
          const display = value == null ? "" : String(value)
          return `<Cell><Data ss:Type="String">${escapeXml(display)}</Data></Cell>`
        })
        .join("")
      return `<Row>${cells}</Row>`
    })
    .join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  <Worksheet ss:Name="Data">
    <Table>
      <Row>${headerRow}</Row>
      ${dataRows}
    </Table>
  </Worksheet>
</Workbook>`

  const blob = new Blob([xml], { type: "application/vnd.ms-excel" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${filename}.xls`
  a.click()
  URL.revokeObjectURL(url)
}
