import { Card, CardContent } from "@/components/ui/card";
import { AlertCircleIcon } from "lucide-react";

type PurchaseOrdersErrorProps = { error: Error | null };

export function PurchaseOrdersError({ error }: PurchaseOrdersErrorProps) {
  if (!error) return null;
  return (
    <Card className="border-[var(--destructive)] bg-[var(--destructive)]/5">
      <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
        <AlertCircleIcon className="size-8 text-[var(--destructive)]" />
        <p className="text-sm font-medium text-[var(--destructive)]">
          Failed to load purchase orders
        </p>
        <p className="text-xs text-muted-foreground">{error.message}</p>
      </CardContent>
    </Card>
  );
}
