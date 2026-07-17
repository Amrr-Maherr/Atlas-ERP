import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpenIcon } from "lucide-react";
import { InventoryItem } from "../types/inventory.types";

type InventoryEmptyProps = {
  data: InventoryItem[];
  isLoading: boolean;
  error: Error | null;
};

export function InventoryEmpty({ data, isLoading, error }: InventoryEmptyProps) {
  if (isLoading || error || data.length > 0) return null;
  return (
    <Card className="rounded-lg">
      <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
        <FolderOpenIcon className="size-8 text-muted-foreground" />
        <p className="text-sm font-medium">No inventory items yet</p>
        <p className="text-xs text-muted-foreground">
          Add your first product to start tracking inventory.
        </p>
        <Button size="sm">Add Product</Button>
      </CardContent>
    </Card>
  );
}
