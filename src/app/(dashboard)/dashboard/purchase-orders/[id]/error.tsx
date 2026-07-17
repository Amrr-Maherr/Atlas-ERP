"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircleIcon, RefreshCwIcon } from "lucide-react";

export default function PurchaseOrderDetailsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col gap-6 p-6">
      <Card className="border-[var(--destructive)] bg-[var(--destructive)]/5">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <AlertCircleIcon className="size-10 text-[var(--destructive)]" />
          <div className="flex flex-col gap-1">
            <p className="text-base font-semibold text-[var(--destructive)]">
              Something went wrong
            </p>
            <p className="text-sm text-muted-foreground">
              {error.message || "An unexpected error occurred."}
            </p>
            {error.digest && (
              <p className="text-xs text-muted-foreground">
                Error ID: {error.digest}
              </p>
            )}
          </div>
          <Button onClick={reset} variant="outline" size="sm">
            <RefreshCwIcon className="size-4" />
            Try again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
