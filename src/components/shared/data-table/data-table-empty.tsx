import { Card, CardContent } from "@/components/ui/card"
import { InboxIcon } from "lucide-react"

type DataTableEmptyProps = {
  title?: string
  description?: string
}

export function DataTableEmpty({
  title = "No results",
  description = "No data available.",
}: DataTableEmptyProps) {
  return (
    <Card className="rounded-lg">
      <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
        <InboxIcon className="size-8 text-muted-foreground" />
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
