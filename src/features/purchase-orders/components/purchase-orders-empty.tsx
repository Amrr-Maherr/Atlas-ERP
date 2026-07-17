import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpenIcon } from "lucide-react";
import { PurchaseOrder } from "../types/purchase-order.types";

type PurchaseOrdersEmptyProps = {
  data: PurchaseOrder[];
  isLoading: boolean;
  error: Error | null;
};

export function PurchaseOrdersEmpty({ data, isLoading, error }: PurchaseOrdersEmptyProps) {
  if (isLoading || error || data.length > 0) return null;
  return (
    <Card className="rounded-lg">
      <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
        <FolderOpenIcon className="size-8 text-muted-foreground" />
        <p className="text-sm font-medium">No purchase orders yet</p>
        <p className="text-xs text-muted-foreground">
          Create your first purchase order to get started.
        </p>
        <Button size="sm">New Purchase Order</Button>
      </CardContent>
    </Card>
  );
}
