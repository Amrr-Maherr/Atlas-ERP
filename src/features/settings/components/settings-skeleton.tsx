import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type SettingsSkeletonProps = { isLoading: boolean };

export function SettingsSkeleton({ isLoading }: SettingsSkeletonProps) {
  if (!isLoading) return null;
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-10 w-[400px]" />
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-[140px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 w-[100px]" />
              <Skeleton className="mt-1 h-3 w-[200px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
