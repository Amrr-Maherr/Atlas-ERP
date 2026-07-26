import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

type DataTableSkeletonProps = {
  columnCount: number
}

export function DataTableSkeleton({ columnCount }: DataTableSkeletonProps) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i} className="rounded-lg">
          <CardContent
            className="grid items-center gap-4 py-3"
            style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}
          >
            {Array.from({ length: columnCount }).map((_, j) => (
              <Skeleton key={j} className="h-4 w-full rounded" />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
