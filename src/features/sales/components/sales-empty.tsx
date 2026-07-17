import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpenIcon } from "lucide-react";
import { Sale } from "../types/sale.types";

type SalesEmptyProps = {
  data: Sale[];
  isLoading: boolean;
  error: Error | null;
};

export function SalesEmpty({ data, isLoading, error }: SalesEmptyProps) {
  if (isLoading || error || data.length > 0) return null;
  return (
    <Card className="rounded-lg">
      <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
        <FolderOpenIcon className="size-8 text-muted-foreground" />
        <p className="text-sm font-medium">No sales yet</p>
        <p className="text-xs text-muted-foreground">
          Create your first sale to get started.
        </p>
        <Button size="sm">New Sale</Button>
      </CardContent>
    </Card>
  );
}
