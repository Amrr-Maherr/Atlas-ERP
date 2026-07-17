import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PackageOpenIcon } from "lucide-react";
import { Product } from "../types/product.types";

type ProductsEmptyProps = {
  data: Product[];
  isLoading: boolean;
  error: Error | null;
};

export function ProductsEmpty({ data, isLoading, error }: ProductsEmptyProps) {
  if (isLoading || error || data.length > 0) return null;
  return (
    <Card className="rounded-lg">
      <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
        <PackageOpenIcon className="size-8 text-muted-foreground" />
        <p className="text-sm font-medium">No products yet</p>
        <p className="text-xs text-muted-foreground">
          Create your first product to get started.
        </p>
        <Button size="sm">Add Product</Button>
      </CardContent>
    </Card>
  );
}
