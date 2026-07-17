import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpenIcon } from "lucide-react";
import { Supplier } from "../types/supplier.types";

type SuppliersEmptyProps = {
  data: Supplier[];
  isLoading: boolean;
  error: Error | null;
};

export function SuppliersEmpty({ data, isLoading, error }: SuppliersEmptyProps) {
  if (isLoading || error || data.length > 0) return null;
  return (
    <Card className="rounded-lg">
      <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
        <FolderOpenIcon className="size-8 text-muted-foreground" />
        <p className="text-sm font-medium">No suppliers yet</p>
        <p className="text-xs text-muted-foreground">
          Create your first supplier to get started.
        </p>
        <Button size="sm">Add Supplier</Button>
      </CardContent>
    </Card>
  );
}
