import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type SupplierDetailsSkeletonProps = { isLoading: boolean };

export function SupplierDetailsSkeleton({ isLoading }: SupplierDetailsSkeletonProps) {
  if (!isLoading) return null;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-7 w-40" />
        <div className="flex-1" />
        <Skeleton className="h-7 w-16 rounded-full" />
      </div>
      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-start gap-4">
            <Skeleton className="size-16 shrink-0 rounded-lg" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-full max-w-sm" />
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Separator />
          <Skeleton className="h-4 w-32 rounded" />
          <div className="grid grid-cols-2 gap-4 @[400px]/card:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
