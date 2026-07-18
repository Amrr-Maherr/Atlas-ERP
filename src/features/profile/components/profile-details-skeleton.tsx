import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type ProfileDetailsSkeletonProps = { isLoading: boolean };

export function ProfileDetailsSkeleton({ isLoading }: ProfileDetailsSkeletonProps) {
  if (!isLoading) return null;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-7 w-40" />
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            <Skeleton className="size-24 rounded-full" />
            <Skeleton className="h-5 w-[140px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <Skeleton className="h-5 w-[180px]" />
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="size-4" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[180px]" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
