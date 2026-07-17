import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

type SalesSkeletonProps = { isLoading: boolean };

export function SalesSkeleton({ isLoading }: SalesSkeletonProps) {
  if (!isLoading) return null;
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i} className="rounded-lg">
          <CardContent className="grid grid-cols-9 items-center gap-4 py-3">
            <Skeleton className="h-5 w-16 rounded" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-8 rounded-full" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-4 w-16" />
            <div className="flex items-center justify-end gap-1">
              <Skeleton className="size-7 rounded-lg" />
              <Skeleton className="size-7 rounded-lg" />
              <Skeleton className="size-7 rounded-lg" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
