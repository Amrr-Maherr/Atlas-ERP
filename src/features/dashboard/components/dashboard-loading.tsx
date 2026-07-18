import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

type DashboardLoadingProps = {
  count?: number;
};

export function DashboardLoading({ count = 8 }: DashboardLoadingProps) {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1">
        <div className="h-7 w-40 bg-muted animate-pulse rounded" />
        <div className="h-4 w-64 bg-muted animate-pulse rounded" />
      </div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                  <div className="h-8 w-16 bg-muted animate-pulse rounded" />
                </div>
                <div className="h-9 w-9 bg-muted animate-pulse rounded-lg" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="h-6 w-32 bg-muted animate-pulse rounded mb-4" />
              <div className="h-[300px] bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

type DashboardErrorProps = {
  error: Error | null;
};

export function DashboardError({ error }: DashboardErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12">
      <AlertTriangle className="size-12 text-destructive" />
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-lg font-semibold">Failed to load dashboard</p>
        <p className="text-sm text-muted-foreground">
          {error?.message ?? "An unexpected error occurred."}
        </p>
      </div>
    </div>
  );
}
