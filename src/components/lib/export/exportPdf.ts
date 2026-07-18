import type { ExportColumn } from "./exportCsv"

export function exportPdf<T extends Record<string, unknown>>(
  data: T[],
  columns: ExportColumn<T>[],
  filename: string
) {
  const headerCells = columns
    .map((col) => `<th style="padding:8px 12px;border-bottom:2px solid #333;text-align:left;font-weight:600;">${col.label}</th>`)
    .join("")

  const bodyRows = data
    .map((row) => {
      const cells = columns
        .map((col) => {
          const value = row[col.key]
          const display = value == null ? "" : String(value)
          return `<td style="padding:6px 12px;border-bottom:1px solid #ddd;">${display}</td>`
        })
        .join("")
      return `<tr>${cells}</tr>`
    })
    .join("")

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>${filename}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { font-size: 18px; margin-bottom: 16px; }
    table { width: 100%; border-collapse: collapse; }
    @media print {
      body { margin: 0; }
    }
  </style>
</head>
<body>
  <h1>${filename}</h1>
  <table>
    <thead><tr>${headerCells}</tr></thead>
    <tbody>${bodyRows}</tbody>
  </table>
  <script>window.print();</script>
</body>
</html>`

  const win = window.open("", "_blank")
  if (win) {
    win.document.write(html)
    win.document.close()
  }
}
